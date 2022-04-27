const locations = {
    Initial: { lng: -73.9712 },
    "New York": { lat: 40.7831, lng: -73.9712, altitude: 2.25 },
    Omaha: { lat: 41.2565, lng: -95.9345, altitude: 2.25 },
    UK: { lat: 51.5074, lng: -0.1278, altitude: 1.2 },
    Japan: { lat: 36.2048, lng: 138.2529, altitude: 1.7 },
    "New Zealand": { lat: -40.9006, lng: 174.886, altitude: 0.9 },
    Gulf: { lat: 25.276987, lng: 78.8718 },
    Asia: { lat: 34.047863, lng: 100.619652 },
    America: { lat: 37.090240, lng: -95.712891 },
    Africa: { lat: 9.1021, lng: 18.2812 },
    LatinAmerica: { lat: 14.6048, lng: 59.0625 },
};

// CONFIGURATIONS
const config = {
    startColor: "#FFFFFF",
    endColor: "#f70505",
    binResolution: 4,
    showGraticules: true,
    showHalo: true,
    globeImage: "./assets/basemap.jpg",
    backgroundColor: "#000000",
    autoRotate: true,
    autoRotateSpeed: -0.72,
    lookAt: "Omaha",
    duration: 2000,
    fNum: d3.format(".2f"),
    scaleMax: 2000000,
    heightFactor: 0.0000002,
    camRotX: 0,
    camRotY: 0,
};

let isTouchCapable = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;

// CODE
const { startColor, endColor, binResolution } = config;

let lastAltitude = null;
let firstAltitude = null;

const toOneScale = d3.scaleLinear().domain([config.scaleMax, 0]).range([0, 1]);

const weightColor = d3.scaleSequential(d3.interpolateWarm);
const myGlobe = Globe({ 'waitForGlobeReady': true })
    (document.getElementById("globeViz"))
    // .globeImageUrl(config.globeImage)
    .showGraticules(config.showGraticules)
    .showAtmosphere(config.showHalo)
    .backgroundColor(config.backgroundColor)

var regionList = "";
// logic for hexbinning: https://github.com/vasturiano/three-globe/blob/963ced45317cda9fbb51032ab1a1465a5d8ca4d5/src/layers/hexbin.js#L75-L83
d3.json('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson').then(worldData => {
    regionList = worldData;
    myGlobe
        .polygonsData(worldData.features)
        .polygonAltitude(0.01)
        .polygonCapColor(() => '3F4041')
        .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
        .polygonStrokeColor(() => '#111')
        .onPolygonClick(hoverD => myGlobe
            .polygonCapColor(d => {
                if (d === hoverD) {
                    config.autoRotate = !config.autoRotate;
                    myGlobe.controls().autoRotate = config.autoRotate;
                    return '303030'
                } else {
                    return '3F4041'
                }
            }),
        )
        .onPolygonHover(hoverD => myGlobe
            .polygonCapColor(d => {
                if (config.autoRotate) {
                    if (d === hoverD) {
                        changeGlobeTooltip(hoverD);
                        return '1A1A1A'
                    } else {
                        return '3F4041'
                    }
                } else {
                    return '303030'
                }
            }),
        )
        .polygonsTransitionDuration(300)

    const startTime = new Date(new Date().toUTCString().substr(0, 25));
    startTime.setMinutes(0);
    startTime.setHours(0);
    const endTime = new Date(new Date().toUTCString().substr(0, 25));
    endTime.setHours(23);
    endTime.setMinutes(0);
    timeScale = d3.scaleTime().domain([startTime, endTime]).range([0, 96]);

    const date = new Date(new Date().toUTCString().substr(0, 25));
    const currentTimeSlice = Math.max(1, Math.floor(timeScale(date)) < 96 ? Math.floor(timeScale(date)) : 96);

    function getMinAltitude(data) {
        let activeSet = data.map(item => item.active);
        const min = Math.min(...activeSet);
        const max = Math.max(...activeSet);
        return Math.max(min, max * 0.05);
    }

    function getMaxAltitude(data) {
        let activeSet = data.map(item => item.active);
        const max = Math.max(...activeSet);
        return Math.min(max, max * 0.3);
    }

    const directoryText = d3.text("https://www.plume.com/wp-json/mess/v1/world-data").then((t) => {
        const directoryJSON = xmlToJSON(t);
        const slices = directoryJSON.ListBucketResult.Contents.filter((d) => {
            if (d.Key.includes("ts_int=") && d.Key.endsWith(".csv")) {
                return true;
            } else return false;
        }).map((x) => {
            return {
                slice: parseInt(x.Key.split("/")[1].split("ts_int=")[1], 10),
                url: `https://www.plume.com/wp-json/mess/v1/world-data/${x.Key}`,
            };
        });


        const sliceURL = findURLForSlice(currentTimeSlice, slices);

        global_counter = directoryJSON.ListBucketResult.Contents.filter((d) => {
            if (d.Key.includes("global_counter") && d.Key.endsWith(".csv")) {
                return true;
            } else return false;
        }).map((x) => {
            return `https://www.plume.com/wp-json/mess/v1/world-data/${x.Key}`;
        });

        globalCounterCSV = global_counter[0];

        let counterNumFormat = d3.format(",");

        d3.csv(globalCounterCSV).then((data) => {
            const totalHH = +data[0].global_active_hh;
            d3.select("#total-hh").text(counterNumFormat(totalHH));
        });
        d3.csv(sliceURL).then((data) => {
            data = data.map((d) => {
                const centroid = h3.h3ToGeo(d.h3);

                return {
                    ...d,
                    latitude: +d.lat,
                    longitude: +d.lng,
                    active: +d.active,
                    active_hh: +d.active_hh_30d,
                    sumWeight: +d.active_devices,
                };
            });

            const actDevFormat = d3.format(",");


            const minAltidude = getMinAltitude(data);
            const maxAltidude = getMaxAltitude(data);
            // const globeData = compressDataset(data);

            myGlobe
                .pointsData(data)
                // .hexBinResolution(4)
                .pointLat((d) => d.latitude)
                .pointLng((d) => d.longitude)
                .pointAltitude((d) => {
                    // console.log(d)
                    return Math.min(maxAltidude, Math.max(d.active, minAltidude)) * config.heightFactor
                })
                .onPointHover((p) => {
                    // console.log("point", p)

                    myGlobe.controls().autoRotate = !p && config.autoRotate;
                    // if (!p) return d3.select("#tooltip").html("").classed("hidden", true);
                    // if (!p.active) return d3.select("#tooltip").html("").classed("hidden", true);
                    if (p) {
                        const active = p.active
                        const active_hh = p.active_hh_30d

                        // drawSemiCircleDonutChartTooltip('revenueDonut', seriesDataArr['semiCircleDonutSeriesData']);
                        // drawSemiCircleDonutChartTooltip('arrDonut', seriesDataArr['semiCircleDonutSeriesData']);
                        // drawSemiCircleDonutChartTooltip('acvDonut', seriesDataArr['semiCircleDonutSeriesData']);
                        // drawSemiCircleDonutChartTooltip('activeHouseholdDonut', seriesDataArr['semiCircleDonutSeriesData']);

                        //drawLineChart('revenueLine', seriesDataArr['revenueLineSeriesData']);
                        //drawLineChart('arrLine', seriesDataArr['arrLineSeriesData']);
                        //drawLineChart('acvLine', seriesDataArr['acvLineSeriesData']);
                        //drawLineChart('activeHouseholdLine', seriesDataArr['activeHouseholdLineLineSeriesData']);

                        // console.log(active, active_hh)

                        //         d3.select("#tooltip")
                        //             .html(
                        //                 `
                        //   <h4>Current Active Devices</h4>
                        //   <span class="active-devices">${actDevFormat(active)}</span>
                        //   <h4>Homes</h4>
                        //   <span class="active-devices">${actDevFormat(active_hh)}</span>
                        //   `
                        //             )
                        //             .classed("hidden", false);
                    }

                })

            toOneScale.domain([1, config.scaleMax]);
            updateColor();

            myGlobe.pointOfView(locations[config.lookAt], 2000);
            myGlobe.controls().autoRotate = true;
            myGlobe.controls().autoRotateSpeed = -0.68;

            d3.select("#zoom-controls button").on("click", () => {
                myGlobe.controls().enableZoom = !myGlobe.controls().enableZoom;
                config.autoRotate = true;
                myGlobe.controls().autoRotate = true;
                d3.select("#zoom-controls button").classed(
                    "zoom-enabled",
                    myGlobe.controls().enableZoom
                );
                if (myGlobe.controls().enableZoom) { d3.select("#zoom-controls button").html("Scroll to Zoom"); } else { d3.select("#zoom-controls button").html("Click to Enable Zoom"); }
            });

            const seriesDataArr1 = {
                "semiCircleDonutSeriesData": [{
                    "data": [{
                        "name": "$ 15.0",
                        "y": 15.00,
                        "color": "#6269FF",
                        "sliced": true
                    }]
                }],
            }

            // drawSemiCircleDonutChartTooltip('revenueDonut', seriesDataArr1['semiCircleDonutSeriesData']);
            // drawSemiCircleDonutChartTooltip('arrDonut', seriesDataArr1['semiCircleDonutSeriesData']);
            // drawSemiCircleDonutChartTooltip('acvDonut', seriesDataArr1['semiCircleDonutSeriesData']);
            // drawSemiCircleDonutChartTooltip('activeHouseholdDonut', seriesDataArr1['semiCircleDonutSeriesData']);

        });
    });
});

// Disable zoom
myGlobe.controls().enableZoom = false;
// Add auto-rotation
myGlobe.controls().autoRotate = config.autoRotate;
myGlobe.controls().autoRotateSpeed = config.autoRotateSpeed;
// interaction
myGlobe.onPointHover((p) => {
    myGlobe.controls().autoRotate = !p && config.autoRotate;
});

// responsive
window.addEventListener("resize", (e) => {
    myGlobe.width([e.target.innerWidth]);
    myGlobe.height([e.target.innerHeight]);
});

function randomColor() {
    myGlobe.polygonCapColor(() => weightColor(Math.random()));
    myGlobe.polygonStrokeColor(() => {
        "#FFFFFF";
    });
}

// GUI OPTIONS AND HANDLERS
const updateColor = () => {
    const { startColor, endColor } = config;
    myGlobe
        .pointColor((d) => weightColor(toOneScale(d.active)))
};

const parser = new DOMParser();

function domToJSON(node) {
    if (node.children.length === 0) return node.innerHTML;

    const counts = childCounts(node);
    const obj = Object.create(null);
    for (const child of node.children) {
        const { localName } = child;
        if (counts[localName] > 1) {
            (obj[localName] = obj[localName] || []).push(domToJSON(child));
        } else {
            obj[localName] = domToJSON(child);
        }
    }

    return obj;
}

childCounts = (node) => {
    const counts = {};
    for (const { localName }
        of node.children)
        counts[localName] = (counts[localName] || 0) + 1;
    return counts;
};

xmlToJSON = (src) => domToJSON(parser.parseFromString(src, "application/xml"));

findURLForSlice = (slice, slices) => {
    const found_slice = slices.filter((x) => {
        return x.slice;
    });
    if (found_slice.length > 0) {
        return found_slice[0].url;
    }
    return false;
};

function handleResize() {
    let mql = screen !== undefined && screen.width < 767;
    if (mql || isTouchCapable) {
        d3.select("#zoom-controls").remove();
        myGlobe.controls().enableZoom = true;
        config.autoRotate = true;
        myGlobe.controls().autoRotate = true;
    }
}

myGlobe.onZoom((p) => {
    if (lastAltitude !== null && lastAltitude !== p.altitude) {
        config.autoRotate = false;
        myGlobe.controls().autoRotate = false;
    }
    if (firstAltitude) {
        lastAltitude = p.altitude;
    }
});

var setIdOnCanvas = document.getElementsByTagName("canvas")[0]
setIdOnCanvas.id = 'canvasMap';

myGlobe.controls().enableZoom = true;
handleResize();

function changeGlobeLocation(regionName) {
    config.autoRotate = false;
    myGlobe.controls().autoRotate = false;
    if (regionName == "LATAM") {
        myGlobe.pointOfView(locations["LatinAmerica"], 2000);
    } else if (regionName == "US & CA") {
        myGlobe.pointOfView(locations["America"], 2000);
    } else if (regionName == "EU & Africa") {
        myGlobe.pointOfView(locations["Africa"], 2000);
    } else if (regionName == "GCC") {
        myGlobe.pointOfView(locations["Gulf"], 2000);
    } else if (regionName == "APAC") {
        myGlobe.pointOfView(locations["Asia"], 2000);
    }
    changeGlobeTooltip(regionName);
}