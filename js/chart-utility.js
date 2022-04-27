var jsonCSVData = [];
var dateArray = [];
var selectionValue = "";
var currentPage = "Dashboard";
const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const quarterList = ["Q1", "Q2", "Q3", "Q4"];
const CSPSizeList = ["S1", "S2", "S3", "M4", "L5"];
const DriveFolderId = "1A0XCHghH23jC7rhE57Wi4fCplcRkn3i-";

const sheetsName = [
    { id: "Sample Data Source  - Summary Sheet (Month Wise).csv", name: "summaryMonthJsonData" },
    { id: "Sample Data Source  - Summary Sheet (Quater Wise).csv", name: "summaryQuarterJsonData" },
    { id: "Sample Data Source  - Summary Sheet (Year Wise).csv", name: "summaryYearJsonData" },
    { id: "Sample Data Source  - Revenue Sheet (Month Wise).csv", name: "revenueMonthJsonData" },
    { id: "Sample Data Source  - Revenue Sheet (Quater Wise).csv", name: "revenueQuarterJsonData" },
    { id: "Sample Data Source  - Revenue Sheet (Year Wise).csv", name: "revenueYearJsonData" },
    { id: "Sample Data Source  - ARR Sheet (Month Wise).csv", name: "arrMonthJsonData" },
    { id: "Sample Data Source  - ARR Sheet (Quater Wise).csv", name: "arrQuarterJsonData" },
    { id: "Sample Data Source  - ARR Sheet (Year Wise).csv", name: "arrYearJsonData" },
    { id: "Sample Data Source  - Active Households Sheet (Month Wise).csv", name: "activeHouseholdsMonthJsonData" },
    { id: "Sample Data Source  - Active Households Sheet (Quater Wise).csv", name: "activeHouseholdsQuarterJsonData" },
    { id: "Sample Data Source  - Active Households Sheet (Year Wise).csv", name: "activeHouseholdsYearJsonData" },
    { id: "Sample Data Source  - TCV_ACV Sheet Month Wise.csv", name: "tcv_ACVMonthJsonData" },
    { id: "Sample Data Source  -  TCV_ACV Sheet Quater Wise.csv", name: "tcv_ACVQuarterJsonData" },
    { id: "Sample Data Source  - TCV_ACV Sheet Year Wise.csv", name: "tcv_ACVYearJsonData" },
    { id: "Sample Data Source -  Cumulative Count Month Wise.csv", name: "cumulativeMonthJsonData" },
    { id: "Sample Data Source -  Cumulative Count Quater Wise.csv", name: "cumulativeQuarterJsonData" },
    { id: "Sample Data Source -  Cumulative Count Year Wise.csv", name: "cumulativeYearJsonData" }
];
const storedSheetsName = [
    { id: "files/Sample Data Source  - Summary Sheet (Month Wise).csv", name: "summaryMonthJsonData" },
    { id: "files/Sample Data Source  - Summary Sheet (Quater Wise).csv", name: "summaryQuarterJsonData" },
    { id: "files/Sample Data Source  - Summary Sheet (Year Wise).csv", name: "summaryYearJsonData" },
    { id: "files/Sample Data Source  - Revenue Sheet (Month Wise).csv", name: "revenueMonthJsonData" },
    { id: "files/Sample Data Source  - Revenue Sheet (Quater Wise).csv", name: "revenueQuarterJsonData" },
    { id: "files/Sample Data Source  - Revenue Sheet (Year Wise).csv", name: "revenueYearJsonData" },
    { id: "files/Sample Data Source  - ARR Sheet (Month Wise).csv", name: "arrMonthJsonData" },
    { id: "files/Sample Data Source  - ARR Sheet (Quater Wise).csv", name: "arrQuarterJsonData" },
    { id: "files/Sample Data Source  - ARR Sheet (Year Wise).csv", name: "arrYearJsonData" },
    { id: "files/Sample Data Source  - Active Households Sheet (Month Wise).csv", name: "activeHouseholdsMonthJsonData" },
    { id: "files/Sample Data Source  - Active Households Sheet (Quater Wise).csv", name: "activeHouseholdsQuarterJsonData" },
    { id: "files/Sample Data Source  - Active Households Sheet (Year Wise).csv", name: "activeHouseholdsYearJsonData" },
    { id: "files/Sample Data Source  - TCV_ACV Sheet Month Wise.csv", name: "tcv_ACVMonthJsonData" },
    { id: "files/Sample Data Source  -  TCV_ACV Sheet Quater Wise.csv", name: "tcv_ACVQuarterJsonData" },
    { id: "files/Sample Data Source  - TCV_ACV Sheet Year Wise.csv", name: "tcv_ACVYearJsonData" },
    { id: "files/Sample Data Source -  Cumulative Count Month Wise.csv", name: "cumulativeMonthJsonData" },
    { id: "files/Sample Data Source -  Cumulative Count Quater Wise.csv", name: "cumulativeQuarterJsonData" },
    { id: "files/Sample Data Source -  Cumulative Count Year Wise.csv", name: "cumulativeYearJsonData" }
];
const percentageKeyValueName = ["Gross Margin", "Net Retention", "EBIDTA Margin", "FCF Margin", "LTM FCF Margin", "Rule of 40", "Sales Efficiency", "LTV/CAC"];
const GlobeCharts = {
    ARR: "ARR",
    ACV: "ACV",
    REVENUE: "Revenue",
    ACTIVEHOUSEHOLD: "Active Households"
}
const objectKeyValue = {
    ACV: "ACV",
    ARPA: "ARPA",
    ARPU: "ARPU",
    ARR: "ARR",
    ActiveHouseholds: "Active Households",

    COGS: "",
    Channel: "Channel",
    CSPSize: "CSP Size",
    CustomerName: "Customer Name",
    Direct: "Direct",
    EBIDTA: "",
    EBIDTAMargin: "EBIDTA Margin",
    FCFMargin: "FCF Margin",
    GrossMargin: "Gross Margin",
    LTVCAC: "LTV / CAC",
    LTMEBIDTAMargin: "",
    LTMFCFMargin: "LTM FCF Margin",
    LTMRevenueGrowtRate: "",
    NetRetention: "Net Retention",
    NumberofCSPs: "",
    Product: "Product",
    Partner: "Channel",
    RecurringRevenue: "Recurring Revenue",
    Region: "Region",
    Revenue: "Revenue",
    Ruleof40: "Rule of 40",
    SMExpenses: "",
    SalesEfficiency: "Sales Efficiency",
    SoftwareCOGS: "",
    SoftwareGrossMargin: "",
    SoftwareRevenue: "",
    TCV: "TCV",
    Time: "Time",
    CumulativeCustomers: "Cumulative Customers"
}

const CSPSizeColor = [
    '#6269FF',
    '#0FDCFF',
    '#17E3AE',
    '#FFC500',
    '#F78673'
];

const revenueColorList = [
    '#AEAEB5',
    '#9293B5',
    '#484CB5',
    '#2F2F70'
];

var chartUtility = {
    init: async function () {
        showDatePicker();
        currentPeriodDropdown();
        cardTitleTooltip();
        var fileType = localStorage.getItem("data_file_type") ?? "Stored Data";
        $("input[type=radio][name=data_file_type][value='" + fileType + "']").prop('checked', true);
        if (fileType == "Stored Data") {
            await getFileJsonCSVData();
        }
        else {
            await get_doc(localStorage.getItem("access_token"));
        }
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
    }
}
$('input[type=radio][name=data_file_type]').change(async function () {
    jsonCSVData = [];
    localStorage.setItem("data_file_type", this.value);
    if (this.value == 'Stored Data') {
        await getFileJsonCSVData();
    }
    else {
        await get_doc(localStorage.getItem("access_token"));
    }
    var intervalObj = setInterval(function () {
        if (jsonCSVData.length > 0) {
            clearInterval(intervalObj);
            var selectedPeriod = localStorage.getItem("currentPeriod");
            var period = "";
            if (selectedPeriod) {
                selectedPeriod = JSON.parse(selectedPeriod);
                period = selectedPeriod[0].period;
            } else {
                period = "Quarter";
            }
            if (currentPage === "Dashboard") {
                setTimeout(function () {
                    bindDashboardChart(period);
                    var defaultRegion = $("#btnRegion").text().trim();
                    $("#btnRegion").html('<i class="ri-map-pin-range-line"></i> ' + defaultRegion);
                    changeGlobeTooltip(defaultRegion);
                }, 1000)
            } else if (currentPage === "Revenue") {
                setTimeout(function () {
                    bindRevenueChart(period);
                }, 1000)
            } else if (currentPage === "Booking") {
                setTimeout(function () {
                    bindBookingChart(period);
                }, 1000)

            } else if (currentPage === "Profitability") {
                setTimeout(function () {
                    bindProfitabilityChart(period);
                }, 1000)

            } else {
                setTimeout(function () {
                    bindDashboardChart(period);
                }, 1000)
            }
        }
    })
});


//#region CsvData
/*============================================================
    This function is use for read data from the CSV file
============================================================*/
async function getFileJsonCSVData() {
    storedSheetsName.forEach(async function (sheet, i) {
        await getDataFromCSVToJson(sheet.id, sheet.name);
    })
}
//#endregion

//#region GoogeSheetCsvData
async function get_doc(access_token, pageToken = undefined, q = undefined,) {
    var driveSheets = [];
    $.ajax({
        url: 'https://www.googleapis.com/drive/v3/files',
        async: false,
        data: {
            corpora: 'user',
            fields: 'files(id,name,size,mimeType,parents,webViewLink,trashed),nextPageToken',
            q: "'" + DriveFolderId + "' in parents",
            pageSize: 1000,
            pageToken: pageToken,
        },
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        Type: "GET",
        success: async function (response) {
            if (response.files.length > 0) {
                var fileList = response.files;
                fileList.forEach(function (file, i) {
                    var obj = sheetsName.find(x => x.id == file.name);
                    if (obj != undefined) {
                        driveSheets.push({ "id": file.id, "name": obj.name });
                    }
                })
                if (driveSheets.length == 0) {
                    toastr.error("No Permission");
                    $("input[type=radio][name=data_file_type][value='Stored Data']").prop('checked', true);
                    localStorage.setItem("data_file_type", "Stored Data");
                    await getFileJsonCSVData();
                } else {
                    await getFilesFromDrive(driveSheets, access_token);
                }
            }
            else {
                toastr.error("No Permission");
                $("input[type=radio][name=data_file_type][value='Stored Data']").prop('checked', true);
                localStorage.setItem("data_file_type", "Stored Data");
                await getFileJsonCSVData();
            }
        },
        error: async function (err) {
            toastr.error("No Permission");
            $("input[type=radio][name=data_file_type][value='Stored Data']").prop('checked', true);
            localStorage.setItem("data_file_type", "Stored Data");
            await getFileJsonCSVData();
        }
    })
}

async function getFilesFromDrive(driveSheets, access_token) {
    await driveSheets.forEach(async function (sheetsObj, i) {
        const url = 'https://www.googleapis.com/drive/v3/files/' + sheetsObj.id + '?alt=media'
        if (self.fetch) {
            var setHeaders = new Headers();
            setHeaders.append('Authorization', 'Bearer ' + access_token);
            setHeaders.append('Content-Type', 'application/json');

            var setOptions = {
                method: 'GET',
                headers: setHeaders
            };

            await fetch(url, setOptions)
                .then(response => {
                    if (response.ok) {
                        var reader = response.body.getReader();
                        var decoder = new TextDecoder();
                        reader.read().then(async function (result) {
                            var data = {}
                            data = decoder.decode(result.value, { stream: !result.done });
                            //console.log(data);
                            await convertDataFromCSVToJson(data, sheetsObj.name);
                        });
                    }
                    else {
                        //toastr.error("UnAuthorised Access");
                    }
                }).catch(error => {
                    toastr.error("There is an error " + error.message);
                });
        }
    })
}
//#endregion

function loadAuthClient() {
    gapi.load('auth2', initGoogleAuth);
}

function initGoogleAuth(clientId = $("meta[name='google-signin-client_id']").attr("content")) {

    const scopes = [
        'openid',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/documents'
    ]
    const scope = scopes.join(' ')

    gapi.auth2.init({
        client_id: clientId,
        scope: scope
    }).then(() => {
        document.getElementById('sign-in-btn').disabled = false;
    }).catch(err => {
        toastr.error(err);
    });
}

function signIn() {
    gapi.auth2.getAuthInstance().signIn().then((response) => {
        localStorage.setItem("access_token", response.xc.access_token);
    }).catch(err => {
        toastr.error(err.error);
    });
}

function signOut() {
    gapi.auth2.getAuthInstance().signOut().then((response) => {
    }).catch(err => {
        console.log(err);
    });
}

function bindDatePickerDropDown(param = "Dashboard") {
    currentPage = param;
    $("#monthlyDatePicker").datepicker({
        format: "mm/yyyy",
        startView: "months",
        // viewMode: "months",
        minViewMode: "months",
        showOn: 'button',
        orientation: 'left',
        constrainInput: true,
        endDate: new Date(),
    }).on('changeDate', function (e) {
        var month = e.date.getMonth();
        var monthName = monthList[month];
        var year = e.date.getFullYear();
        setDataValue(month, monthName, year, "Month");
        $(this).datepicker('hide');
        $(".submenu-left").css("display", "none");
        $(".dropdown-menu.time-toggle").css("display", "none");
        $(".dropdown-menu.time-toggle").addClass("dropdown-refresh");
        if (param === "Dashboard") {
            setTimeout(function () {
                bindDashboardChart("Month");
                var defaultRegion = $("#btnRegion").text().trim();
                $("#btnRegion").html('<i class="ri-map-pin-range-line"></i> ' + defaultRegion);
                changeGlobeTooltip(defaultRegion);
            }, 1000)
        } else if (param === "Revenue") {
            setTimeout(function () {
                bindRevenueChart("Month");
            }, 1000)
        } else if (param === "Booking") {
            setTimeout(function () {
                bindBookingChart("Month");
            }, 1000)

        } else if (param === "Profitability") {
            setTimeout(function () {
                bindProfitabilityChart("Month");
            }, 1000)

        } else {
            setTimeout(function () {
                bindDashboardChart("Month");
            }, 1000)

        }
        IsCheckedDateSelectedOrNot('month');
    });

    $("#quarterlyDatePicker").datepicker({
        format: "mm/yyyy",
        startView: "year",
        minViewMode: "months",
        showOn: 'button',
        orientation: 'left',
        autoClose: true,
        endDate: new Date(),
    }).on('changeDate', function (e) {
        var month = e.date.getMonth();
        var quarterName = quarterList[month];
        var year = e.date.getFullYear();
        setDataValue(quarterName, quarterName, year, "Quarter");
        InitQuartlyMonth();
        IsCheckedDateSelectedOrNot('quarter');
        $(this).datepicker('hide');
        $(".submenu-left").css("display", "none");
        $(".dropdown-menu.time-toggle").css("display", "none");
        $(".dropdown-menu.time-toggle").addClass("dropdown-refresh");

        if (param === "Dashboard") {
            setTimeout(function () {
                bindDashboardChart("Quarter");
                var defaultRegion = $("#btnRegion").text().trim();
                $("#btnRegion").html('<i class="ri-map-pin-range-line"></i> ' + defaultRegion);
                changeGlobeTooltip(defaultRegion);
            }, 1000)
        } else if (param === "Revenue") {
            setTimeout(function () {
                bindRevenueChart("Quarter");
            }, 1000)
        } else if (param === "Booking") {
            setTimeout(function () {
                bindBookingChart("Quarter");
            }, 1000)

        } else if (param === "Profitability") {
            setTimeout(function () {
                bindProfitabilityChart("Quarter");
            }, 1000)

        } else {
            setTimeout(function () {
                bindDashboardChart("Quarter");
            }, 1000)

        }
    });

    $('.prev, .next, .year').on('click', function (e) {
        setTimeout(function () {
            QuarterlyDatePickerLoad();
        }, 5);
    });

    $(".show-datepicker").on('click', function () {
        $('#yearlyDatePicker th.next').unbind();
        $('#yearlyDatePicker th.next').bind('click', function (e) {
            setTimeout(function () {
                IsCheckedDateSelectedOrNot(selectionValue);
            }, 5);
        });
        $('#yearlyDatePicker th.prev').unbind();
        $('#yearlyDatePicker th.prev').bind('click', function (e) {
            setTimeout(function () {
                IsCheckedDateSelectedOrNot(selectionValue);
            }, 5);
        });


    });

    function QuarterlyDatePickerLoad() {
        $("#quarterlyDatePicker .month").each(function (i, el) {
            if (i == 0) {
                // Jan
                el.textContent = 'Q1';
                $(el).attr("data-id", "Q1");
            } else if (i == 3) {
                // Apr
                el.textContent = 'Q2';
                $(el).attr("data-id", "Q2");
            } else if (i == 6) {
                // Jul
                el.textContent = 'Q3';
                $(el).attr("data-id", "Q3");
            } else if (i == 9) {
                //Oct
                el.textContent = 'Q4';
                $(el).attr("data-id", "Q4");
            } else {
                $(el).remove();
            }
        });
        IsCheckedDateSelectedOrNot(selectionValue);

    }

    QuarterlyDatePickerLoad();

    function InitQuartlyMonth() {
        QuarterlyDatePickerLoad();
    }

    function IsCheckedDateSelectedOrNot(_selection) {
        if (_selection == "month") {
            $('#quarterlyDatePicker .month.focused').removeClass('focused');
            $('#yearlyDatePicker .year.focused').removeClass('focused');
        } else if (_selection == "year") {
            $('#monthlyDatePicker .month.focused').removeClass('focused');
            $('#quarterlyDatePicker .month.focused').removeClass('focused');
        } else if (_selection == "quarter") {
            let __quarterList = $("#myDropdown").find("a").html().split(" ");
            if (__quarterList.length > 1 &&
                (__quarterList[0] === "Q1" ||
                    __quarterList[0] === "Q2" ||
                    __quarterList[0] === "Q3" ||
                    __quarterList[0] === "Q4")) {
                $('#monthlyDatePicker .month.focused').removeClass('focused');
                $('#yearlyDatePicker .year.focused').removeClass('focused');

                $('#quarterlyDatePicker .month').removeClass('focused');
                $('#quarterlyDatePicker .month').removeClass('active');

                $('#quarterlyDatePicker .month[data-id="' + __quarterList[0] + '"]').addClass('focused');
                $('#quarterlyDatePicker .month[data-id="' + __quarterList[0] + '"]').addClass('active');

                //data-id="Q1"
            } else {

            }
        } else {
            $('#monthlyDatePicker .month.focused').removeClass('focused');
            $('#quarterlyDatePicker .month.focused').removeClass('focused');
            $('#yearlyDatePicker .year.focused').removeClass('focused');
        }

        selectionValue = _selection;
    }

    $("#yearlyDatePicker").datepicker({
        format: "mm/yyyy",
        startView: "years",
        minViewMode: "years",
        showOn: 'button',
        orientation: 'left',
        endDate: new Date(),
    }).on('changeDate', function (e) {
        var month = 0;
        var monthName = '';
        var year = e.date.getFullYear();
        setDataValue(month, monthName, year, "Year");
        IsCheckedDateSelectedOrNot('year');
        $(this).datepicker('hide');
        $(".submenu-left").css("display", "none");
        $(".dropdown-menu.time-toggle").css("display", "none");
        $(".dropdown-menu.time-toggle").addClass("dropdown-refresh");
        if (param === "Dashboard") {
            setTimeout(function () {
                bindDashboardChart("Year");
                var defaultRegion = $("#btnRegion").text().trim();
                $("#btnRegion").html('<i class="ri-map-pin-range-line"></i> ' + defaultRegion);
                changeGlobeTooltip(defaultRegion);
            }, 1000)

        } else if (param === "Revenue") {
            setTimeout(function () {
                bindRevenueChart("Year");
            }, 1000)

        } else if (param === "Booking") {
            setTimeout(function () {
                bindBookingChart("Year");
            }, 1000)
        } else if (param === "Profitability") {
            setTimeout(function () {
                bindProfitabilityChart("Year");
            }, 1000)

        } else {
            setTimeout(function () {
                bindDashboardChart("Year");
            }, 1000)

        }
    });
    IsCheckedDateSelectedOrNot("");
}

function setDataValue(month, monthName, year, period) {
    var currentPeriodRange = [{
        month: month,
        year: year,
        period: period
    }]
    localStorage.setItem("currentPeriod", JSON.stringify(currentPeriodRange));
    var text = monthName + ' ' + year;
    if (period == "Month") {
        text = monthName + ' ' + year;
    } else if (period == "Quarter") {
        text = month + ' ' + year;
    } else {
        text = year == new Date().getFullYear() ? year + " YTD" : year;
    }
    localStorage.removeItem("seriesData");
    $(".time-period-txt").text(text);
}

function showDatePicker() {
    $(".show-datepicker").click(function (e) {
        $(".submenu-left").css("display", "none");
        $(".time-toggle").addClass("show");
        $(".submenu-left[data-id='" + $(this).text().trim() + "']").css("display", "block");
    })
}

function cardTitleTooltip() {
    const template = document.getElementById('template');
    tippy('.my-tooltip', {
        content(reference) {
            const id = reference.getAttribute('data-template');
            const template = document.getElementById(id);
            return template.innerHTML;
        },
        theme: 'custom',
        placement: 'right',
        allowHTML: true,
        arrow: true
    });
}


//#region High Chart
/*============================================================
   This function is use for bind chart using dynamic data
============================================================*/

function drawAreaChart(chartId, opacity, areaSeriesData) {
    areaSeriesData.forEach(function (obj, index) {
        obj["marker"] = ({
            symbol: 'circle',
            radius: 4,
        })
    })
    Highcharts.chart(chartId, {
        chart: {
            type: 'area',
            style: {
                fontFamily: 'wigrum-reg',
                fontSize: '16px'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: JSON.parse(localStorage.getItem("seriesData")),
            type: 'category',
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            lineWidth: 0,
            tickWidth: 1,
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        yAxis: [{
            tickLength: 0,
            title: {
                text: ''
            },
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        {
            tickLength: 0,
            title: {
                text: ''
            },
            opposite: true,
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        }
        ],
        legend: {
            align: 'left',
            verticalAlign: 'top',
            x: 30,
            y: -15,
            itemMarginLeft: 50,
            itemMarginRight: 50,
            symbolPadding: 10,
            symbolWidth: 10,
            symbolHeight: 10,
            itemStyle: {
                fontWeight: '400'
            },
            labelFormatter: function () {
                return '<span style="color:' + this.color + ';">' + this.name + '</span>';
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        tooltip: {
            shared: true,
            useHTML: true,
            valueDecimals: 2,
            valuePrefix: "$",
            formatter: function () {
                if (this.x.includes("<br>")) {
                    this.x = this.x.replace("<br>", " ");
                }
                var tooltip = "<div class='areaChart-tooltipTitle'>" + this.x + "</div>";
                $(this.points).each(function (i, point, ele) {
                    var pointValue = convertNumberToMillion(point.y);
                    var color = point.color;
                    tooltip += "<div class='areaChart-tooltip'> " +
                        "<div class='areaChartLeft' style = 'color: " + color + "' ><span style='color: " + color + "'>&#9679;</span> " + point.series.name + " </div>" +
                        "<div  class='areaChartRight'>" + pointValue + "</div>" +
                        "</div>";
                })
                return tooltip;
            },
            //headerFormat: '<b>{point.x}</b>',
            //pointFormat: '<div class="areaChart-tooltip"><svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{series.name}</span>  {point.y}</div><br/>',
            backgroundColor: '#2c2c2c',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            symbol: 'circle'
                        }
                    }
                },

                fillOpacity: opacity
            },
            area: {
                stacking: 'normal'
            }
        },
        color: [
            '#6269FF',
            '#0FDCFF',
            '#17E3AE',
            '#FFC500',
            '#F78673'
        ],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: areaSeriesData
    });
}

function drawLineChart(chartId, key, lineSeriesData) {
    var valueSuffix = "%";
    if (key == "SalesEfficiency" || key == "CACLTV") {
        valueSuffix = "";
        $.each(lineSeriesData.data, function (i, x) {
            $.each(x.data, function (i, value) {

                x.data[i] = convertPercentageToFriction(value)

            })

        })
    }
    Highcharts.seriesTypes.line.prototype.drawLegendSymbol = Highcharts.seriesTypes.area.prototype.drawLegendSymbol;
    Highcharts.chart(chartId, {
        chart: {
            type: 'line',
            style: {
                fontFamily: 'wigrum-reg'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
            categories: JSON.parse(localStorage.getItem("seriesData")),
            tickmarkPlacement: 'on',
            tickWidth: 1,
            lineWidth: 0,
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        yAxis: [{
            tickLength: 0,
            title: {
                text: ''
            },
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                },

            }
        },
        {
            tickLength: 0,
            title: {
                text: ''
            },
            opposite: true,
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        }
        ],
        tooltip: {
            shared: true,
            valueDecimals: 1,
            headerFormat: '<b>{point.x}</b><br/>',
            valueSuffix: valueSuffix,
            pointFormat: '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{series.name}</span> : {point.y}<br/>',
            backgroundColor: '#2c2c2c',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        legend: {
            align: 'left',
            verticalAlign: 'top',
            x: 30,
            y: -15,
            itemMarginLeft: 50,
            itemMarginRight: 50,
            symbolPadding: 10,
            symbolWidth: 10,
            symbolHeight: 10,
            itemStyle: {
                fontWeight: '400'
            },
            labelFormatter: function () {
                return '<span style="color:' + this.color + ';">' + this.name + '</span>';
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                },
                shadow: true,
                pointWidth: 10
            },
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: lineSeriesData.data
    });
    var startValue = period.toLowerCase() == "year" ? lineSeriesData.data[0].data[lineSeriesData.data[0].data.length - 2] : lineSeriesData.data[0].data[0];
    var lastValue = lineSeriesData.data[0].data[lineSeriesData.data[0].data.length - 1];
    lastValue = lastValue ?? 0;
    var caluclatePeriodDiff = parseFloat(lastValue - startValue);
    var preiodPercentage = parseFloat(parseFloat(caluclatePeriodDiff / startValue) * 100);
    if ((isNaN(preiodPercentage) || (!isFinite(preiodPercentage)))) {
        preiodPercentage = 0.0;
    }
    if (key == "Gross Margin" || key == "EBIDTA" || key == "FCFMargin" || key == "LTM FCF Margin" || key == "RuleOf40") {
        if ((isNaN(preiodPercentage) || (!isFinite(preiodPercentage)))) {
            $("#" + chartId).parent().find(".desc-tag-line h3").html("0.0 <span>%</span>")
        } else {
            $("#" + chartId).parent().find(".desc-tag-line h3").html(lastValue.toFixed(1) + " <span>%</span>")
        }
    } else if (key == "SalesEfficiency" || key == "CACLTV") {
        if ((isNaN(preiodPercentage) || (!isFinite(preiodPercentage)))) {
            $("#" + chartId).parent().find(".desc-tag-line h3").html("0.0 <span>%</span>")
        } else {
            $("#" + chartId).parent().find(".desc-tag-line h3").html((lastValue).toFixed(1))
        }
    }
    else {
        if ((isNaN(preiodPercentage) || (!isFinite(preiodPercentage)))) {
            $("#" + chartId).parent().find(".desc-tag-line h3").text("$0.0")
        } else {
            $("#" + chartId).parent().find(".desc-tag-line h3").text("$" + lastValue.toFixed(1) + "")
        }
    }
    // if (preiodPercentage > 0) {
    //     $("#" + chartId).parent().find(".growth-ratio").removeClass("down");
    // } else {
    //     $("#" + chartId).parent().find(".growth-ratio").addClass("up");
    // }


    if (preiodPercentage > 0) {
        $("#" + chartId).parent().find(".growth-ratio").removeClass("down");
        $("#" + chartId).parent().find(".growth-ratio img").attr("src", "assets/images/up-triangle.png");

    } else if (preiodPercentage < 0) {
        $("#" + chartId).parent().find(".growth-ratio").addClass("down");
        $("#" + chartId).parent().find(".growth-ratio img").attr("src", "assets/images/down-triangle.png");
    } else {
        $("#" + chartId).parent().find(".growth-ratio").removeClass("down");
        $("#" + chartId).parent().find(".growth-ratio img").attr("src", "assets/images/up-triangle.png")

    }
    if (lineSeriesData.categories.length > 0) {
        if (period.toLowerCase() == "year") {
            $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text(lineSeriesData.categories[lineSeriesData.categories.length - 2]);
            $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(lineSeriesData.categories[lineSeriesData.categories.length - 1])
        } else {
            $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text(lineSeriesData.categories[0]);
            $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(lineSeriesData.categories[lineSeriesData.categories.length - 1])
        }
    }
    else {
        var selectedPeriod = localStorage.getItem("currentPeriod");
        if (selectedPeriod) {
            selectedPeriod = JSON.parse(selectedPeriod);
            if (period.toLowerCase() == "month") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text(monthList[selectedPeriod[0].month] + " " + (selectedPeriod[0].year - 1));
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(monthList[selectedPeriod[0].month] + " " + selectedPeriod[0].year)
            }
            else if (period.toLowerCase() == "quarter") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text([selectedPeriod[0].month] + " " + (selectedPeriod[0].year - 1));
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text([selectedPeriod[0].month] + " " + selectedPeriod[0].year);
            }
            else if (period.toLowerCase() == "year") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text((selectedPeriod[0].year - 1));
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(selectedPeriod[0].year)
            }
        }
    }
    $("#" + chartId).parent().find(".growth-ratio small.diffValue").text(Math.abs(preiodPercentage.toFixed(1)) + "%");
}

function drawLineColumnChart(chartId, lineColumnSeriesData) {
    //var chartName = chartId;
    //chartName = chartName.replace('LineColumn', '');
    //chartName = capitalizeFirstLetter(chartName);
    var chartData = lineColumnSeriesData;
    var valuePrefix = "", valueSuffix = "", valueDecimals = 2;
    if (lineColumnSeriesData[0].name == "Net Retention" || lineColumnSeriesData[0].name == "Gross Margin") {
        valuePrefix = "";
        valueSuffix = "%";
        valueDecimals = 1;
    }
    else if (lineColumnSeriesData[0].name == "ARPU") {
        valuePrefix = "$";
        valueSuffix = "";
        valueDecimals = 1;
    }
    else {
        valuePrefix = "$";
        valueSuffix = "";
        valueDecimals = 2;
    }
    Highcharts.chart(chartId, {
        chart: {
            zoomType: 'xy',
            style: {
                fontFamily: 'wigrum-reg'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            visible: false,
            categories: JSON.parse(localStorage.getItem("seriesData"))
        },
        yAxis: {
            visible: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                shadow: true,
                pointWidth: 10
            },
            column: {
                borderColor: null,
                borderRadiusTopLeft: 10,
                borderRadiusTopRight: 10,
                borderRadiusBottomLeft: 10,
                borderRadiusBottomRight: 10
            }
        },
        tooltip: {
            shared: true,
            valueDecimals: valueDecimals,
            valuePrefix: valuePrefix,
            valueSuffix: valueSuffix,
            formatter: function () {
                var currentPeriod, currentValue, previousPeriod, previousValue, currentTooltip, previousTooltip, splitValue;
                var title = chartData[0].name;
                if (this.points[0].x.includes("<br>")) {
                    splitValue = this.points[0].x.split("<br>");
                    currentPeriod = splitValue[0] + " " + (splitValue[1]).toString();
                    previousPeriod = splitValue[0] + " " + (splitValue[1] - 1).toString();
                    currentValue = this.points[0].y;
                    previousValue = this.points[1].y;
                } else if (this.points[0].x.includes("Q")) {
                    splitValue = this.points[0].x.split(" ");
                    currentPeriod = splitValue[0] + " " + (splitValue[1]).toString();
                    previousPeriod = splitValue[0] + " " + (splitValue[1] - 1).toString();
                    currentValue = this.points[0].y;
                    previousValue = this.points[1].y;
                } else {
                    splitValue = this.points[0].x;
                    currentPeriod = splitValue.toString();
                    previousPeriod = (splitValue - 1).toString();
                    currentValue = this.points[0].y;
                    let indexOfPreviousValue = chartData.map(x => x.categories)[0].indexOf(Number(previousPeriod));
                    if (indexOfPreviousValue > -1) {
                        previousValue = Number(chartData.map(x => x.data)[0][indexOfPreviousValue]);
                    } else {
                        previousValue = 0;
                    }
                }
                if (title == "Net Retention" || title == "Gross Margin") {
                    currentTooltip = '<svg width="10" height="10" style="color:#44bdb8">&#9679;</svg> <span style="color:#44bdb8">' + currentPeriod + '</span> : ' + currentValue.toLocaleString('en-US') + '<span>%</span><br/>';
                    previousTooltip = '<svg width="10" height="10" style="color:#6269FF">&#9679;</svg> <span style="color:#6269FF">' + previousPeriod + '</span> : ' + previousValue.toLocaleString('en-US') + '<span>%</span><br/>';
                } else {
                    currentTooltip = '<svg width="10" height="10" style="color:#44bdb8">&#9679;</svg> <span style="color:#44bdb8">' + currentPeriod + '</span> : <span>$</span>' + currentValue.toLocaleString('en-US') + '<br/>';
                    previousTooltip = '<svg width="10" height="10" style="color:#6269FF">&#9679;</svg> <span style="color:#6269FF">' + previousPeriod + '</span> : <span>$</span>' + previousValue.toLocaleString('en-US') + '<br/>';
                }
                var comparisonTitle = "Comparison";
                var caluclatePeriodDiff = parseFloat(currentValue - previousValue);
                var preiodPercentage = parseFloat(parseFloat(caluclatePeriodDiff / previousValue) * 100).toFixed(1);
                if (!$.isNumeric(preiodPercentage)) {
                    preiodPercentage = 0;
                }
                var comparisonTooltip = '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">' + comparisonTitle + '</span> : ' + preiodPercentage + '<span>%</span><br/>';
                var tooltip = title + "<br>" + currentTooltip + previousTooltip + comparisonTooltip;
                return tooltip;
            },
            //headerFormat: '<b>{point.x}</b><br/>',
            //pointFormat: '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{series.name}</span> : {point.y}<br/>',
            backgroundColor: '#2C2C2C',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: lineColumnSeriesData
    });
    var startValue = period.toLowerCase() == "year" ? lineColumnSeriesData[0].data[lineColumnSeriesData[0].data.length - 2] : lineColumnSeriesData[1].data[lineColumnSeriesData[1].data.length - 1]
    var lastValue = lineColumnSeriesData[0].data[lineColumnSeriesData[0].data.length - 1];
    lastValue = lastValue ?? 0;
    var caluclatePeriodDiff = parseFloat(lastValue - startValue);
    var preiodPercentage = parseFloat(parseFloat(caluclatePeriodDiff / startValue) * 100);
    if (lineColumnSeriesData[0].name == "Net Retention" || lineColumnSeriesData[0].name == "Gross Margin") {
        $("#" + chartId).parent().find(".price-title-wrap h3").html(lastValue.toFixed(1) + "<span> %</span>")
    }
    else {
        $("#" + chartId).parent().find(".price-title-wrap h3").html("$" + convertNumberToPrecision(lastValue))
    }
    if (preiodPercentage > 0) {
        $("#" + chartId).parent().find(".growth-ratio").removeClass("down");
        $("#" + chartId).parent().find(".growth-ratio img").attr("src", "assets/images/up-triangle.png");
    } else if (preiodPercentage < 0) {
        $("#" + chartId).parent().find(".growth-ratio").addClass("down");
        $("#" + chartId).parent().find(".growth-ratio img").attr("src", "assets/images/down-triangle.png");
    } else {
        $("#" + chartId).parent().find(".growth-ratio").removeClass("down");
        $("#" + chartId).parent().find(".growth-ratio img").attr("src", "assets/images/up-triangle.png")
    }
    if ((!isFinite(preiodPercentage)) || isNaN(preiodPercentage) || (!$.isNumeric(preiodPercentage))) {
        preiodPercentage = 0;
    }
    $("#" + chartId).parent().find(".growth-ratio small.diffValue").text(Math.abs(preiodPercentage.toFixed(1)) + "%");
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        month = selectedPeriod[0].period;
        if (lineColumnSeriesData[0].categories.length > 0) {
            if (month.toLowerCase() == "month") {
                var splitValue = lineColumnSeriesData[0].categories[0].split(" ")[1];
                var sliceMonthValue = lineColumnSeriesData[0].categories[0].slice(0, 3);
                var monthIndex = (monthList.indexOf(sliceMonthValue));
                var splitValueForLast = lineColumnSeriesData[0].categories[lineColumnSeriesData[0].categories.length - 1].split(" ")[1];
                var sliceMonthValueForLast = lineColumnSeriesData[0].categories[lineColumnSeriesData[0].categories.length - 1].slice(0, 3);
                var monthIndexForLast = (monthList.indexOf(sliceMonthValueForLast));
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text(monthList[monthIndex] + " " + splitValue);
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(monthList[monthIndexForLast] + " " + splitValueForLast)
            } else if (month.toLowerCase() == "quarter") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text(lineColumnSeriesData[0].categories[0]);
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(lineColumnSeriesData[0].categories[lineColumnSeriesData[0].categories.length - 1])
            }
            else if (month.toLowerCase() == "year") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text(lineColumnSeriesData[0].categories[lineColumnSeriesData[0].categories.length - 2]);
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(lineColumnSeriesData[0].categories[lineColumnSeriesData[0].categories.length - 1])
            }
        }
        else {
            if (month.toLowerCase() == "month") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text(monthList[selectedPeriod[0].month] + " " + (selectedPeriod[0].year - 1));
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(monthList[selectedPeriod[0].month] + " " + selectedPeriod[0].year)
            }
            else if (month.toLowerCase() == "quarter") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text([selectedPeriod[0].month] + " " + (selectedPeriod[0].year - 1));
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text([selectedPeriod[0].month] + " " + selectedPeriod[0].year);
            }
            else if (month.toLowerCase() == "year") {
                $("#" + chartId).parent().find(".desc-tag-line p").eq(1).text((selectedPeriod[0].year - 1));
                $("#" + chartId).parent().find(".desc-tag-line p").eq(0).text(selectedPeriod[0].year)
            }
        }
    }
}

function drawStackedColumnChart(chartId, stackedColumnSeriesData) {
    var groupPadding = 0.2;
    if (period === "Month") {
        groupPadding = 0.2
    } else {
        groupPadding = 0.38
    }
    Highcharts.chart(chartId, {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'wigrum-reg'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
            categories: JSON.parse(localStorage.getItem("seriesData")),
            tickmarkPlacement: 'on',
            tickWidth: 1,
            lineWidth: 0,
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        yAxis: [{
            tickLength: 0,
            title: {
                text: ''
            },
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        {
            tickLength: 0,
            title: {
                text: ''
            },
            opposite: true,
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        }
        ],
        legend: {
            align: 'left',
            verticalAlign: 'top',
            x: 30,
            y: -15,
            itemMarginLeft: 50,
            itemMarginRight: 50,
            symbolPadding: 10,
            symbolWidth: 10,
            symbolHeight: 10,
            itemStyle: {
                fontWeight: '400'
            },
            labelFormatter: function () {
                return '<span style="color:' + this.color + ';">' + this.name + '</span>';
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            valuePrefix: "$",
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{series.name}</span> : {point.y}<br/>',
            backgroundColor: '#2c2c2c',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        plotOptions: {
            column: {
                stacking: '',
                dataLabels: {
                    enabled: false
                },
                borderColor: null,
                pointWidth: 8,
                opacity: 0.8,
                borderRadiusTopLeft: 10,
                borderRadiusTopRight: 10,
                borderRadiusBottomLeft: 10,
                borderRadiusBottomRight: 10
            },
            series: {
                groupPadding: groupPadding
            }
        },
        color: [
            '#6269FF',
            '#0FDCFF',
            '#17E3AE',
            '#FFC500',
            '#F78673'
        ],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: stackedColumnSeriesData
    });
}

function drawStackedColumnChartNormal(chartId, stackedColumnSeriesData) {
    var decimalValue = 2, valuePrefix = "$";
    if (chartId == "stackedColumn" || chartId == "stackedColumnCumulative") {
        decimalValue = 0;
        valuePrefix = "";
    }
    Highcharts.chart(chartId, {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'wigrum-reg'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
            categories: JSON.parse(localStorage.getItem("seriesData")),
            tickmarkPlacement: 'on',
            tickWidth: 1,
            lineWidth: 0,
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        yAxis: [{
            tickLength: 0,
            title: {
                text: ''
            },
            lineColor: '#5c5c5c',
            lineWidth: 1,
            tickWidth: 100,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        {
            tickLength: 0,
            title: {
                text: ''
            },
            opposite: true,
            lineColor: '#5c5c5c',
            lineWidth: 1,
            tickWidth: 100,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        }
        ],
        legend: {
            align: 'left',
            verticalAlign: 'top',
            x: 30,
            y: -15,
            itemMarginLeft: 50,
            itemMarginRight: 50,
            symbolPadding: 10,
            symbolWidth: 10,
            symbolHeight: 10,
            itemStyle: {
                fontWeight: '400'
            },
            labelFormatter: function () {
                return '<span style="color:' + this.color + ';">' + this.name + '</span>';
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        tooltip: {
            shared: true,
            valueDecimals: decimalValue,
            valuePrefix: valuePrefix,
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{series.name}</span> : {point.y}<br/>',
            backgroundColor: '#2c2c2c',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                fillOpacity: 8
            },
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                },
                opacity: 0.8,
                borderColor: null,
                pointWidth: 15
            }
        },
        color: [
            '#6269FF',
            '#0FDCFF',
            '#17E3AE',
            '#FFC500',
            '#F78673'
        ],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: stackedColumnSeriesData
    });

}

function drawBubbleChart(chartId, bubbleSeriesData) {
    Highcharts.chart(chartId, {
        chart: {
            type: 'bubble',
            style: {
                fontFamily: 'wigrum-reg'
            },
            // plotBorderWidth: 1,
            zoomType: 'xy',
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
            }
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{series.name}</span> : {point.y}<br/>',
            backgroundColor: '#2c2c2c',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    // useHTML: true,
                    format: '{point.name}',
                    style: {
                        color: '#C6C6C6',
                        fontSize: '12px'
                    }
                }
            },
            bubble: {
                minSize: 50,
                maxSize: 95
            }
        },
        colors: [
            '#6269FF'
        ],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: bubbleSeriesData
    });
}

function drawSemiCircleDonutChart(chartId, semiCircleDonutSeriesData) {

    var channelChart = Highcharts.chart(chartId, {
        chart: {
            type: 'pie',
            style: {
                fontFamily: 'wigrum-reg'
            },
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            },
            events: {
                load: function () {
                    var chartTitle = "";
                    if (this.series.length > 0) {
                        if (this.series[0].data.length > 0) {
                            chartTitle = this.series[0].data[0].name + " (" + this.series[0].data[0].percentage.toFixed(1) + "%) <br/>" + "$" + convertNumberToPrecision(this.series[0].data[0].y);
                        }
                    }
                    this.setTitle({ text: chartTitle });
                }
            }
        },
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            // y: 25,
            floating: true,
            style: {
                color: '#C6C6C6',
                fontSize: '16px',
                fontFamily: 'wigrum-reg',
                textTransform: 'normal'
            }
        },
        tooltip: {
            //pointFormat: '{series.name}: <b>{point.percentage}%</b>'
            formatter: function () {
                var chartTitle = this.point.name + " (" + this.percentage.toFixed(1) + "%) <br/>" + "$" + convertNumberToPrecision(this.point.y);
                refreshText(channelChart, chartTitle);
                var name = this.point.name;
                var y = this.point.y;
                var series = this.series.name;
                var color = this.color;
                var tooltipText = '<div class="myTooltip" style="background-color:#2c2c2c;border-color:#474747;border-radius:10;border-width:2;"<b>' + name + '</b><br/> <svg width="10" height="10" style="color:' + color + '">&#9679;</svg> <span style="color:' + color + '">' + name + '</span> : $' + y.toLocaleString('en-US') + '<br/></div>';
                return tooltipText;
            },
            backgroundColor: '#2C2C2C',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        legend: {},
        plotOptions: {
            pie: {
                innerSize: '90%',
                borderWidth: 4,
                borderColor: '',
                slicedOffset: 0,
                dataLabels: {
                    enabled: false,
                    connectorWidth: 0
                },

                size: '100%'
            },
            series: {
                point: {
                    events: {
                        // mouseOut: function() {
                        //     $(this.series.points[0].graphic.element).attr("opacity", 0.5)
                        // }
                    }
                }
            }
        },
        colors: [
            '#6269FF'
        ],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },

        series: semiCircleDonutSeriesData
    });

    // setTimeout(function() {
    //     $(channelChart.series[0].points[0].graphic.element).attr("opacity", 0.5)
    // }, 1000);
}

function refreshText(chart1, chartTitle) {
    chart1.setTitle({ text: chartTitle })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function drawSemiCircleDonutChartTooltip(chartId, semiCircleDonutSeriesData) {
    var chartName = chartId;
    chartName = chartName.replace('Donut', '');
    chartName = capitalizeFirstLetter(chartName);
    var donutChart = Highcharts.chart(chartId, {
        chart: {
            type: 'pie',
            style: {
                fontFamily: 'wigrum-reg'
            },
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            },
        },
        title: {
            text: '',
        },
        tooltip: {
            shared: true,
            outside: true,
            useHTML: true,
            formatter: function () {
                var pointValue = convertNumberToPrecision(this.point.y);
                var percentageValue = this.percentage.toFixed(1) + "<small>%</small>";
                var value = GlobeCharts[chartName.toUpperCase()] + "  " + pointValue + " " + percentageValue;
                return "<div class='donutChart-tooltip'>" + this.key + "<br/><span style='color:{point.color}'>&#9679;</span> <span>" + value + "</span></div>";
            },
            // headerFormat: '<b>{point.x}</b><br/>',
            // pointFormat: '<svg width="1" height="1" style="color:{point.color}">&#9679;</svg> <span style="color:{series.color}">{point.name}</span> : {point.y}<br/>',
            backgroundColor: '#2C2C2C',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        legend: {},
        plotOptions: {
            pie: {
                innerSize: '100%',
                borderWidth: 4,
                borderColor: '',
                slicedOffset: 0,
                dataLabels: {
                    connectorWidth: 0
                },
                size: '140%'
            },
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: semiCircleDonutSeriesData
    });
}

function drawColumnChart(chartId, columnSeriesData) {
    Highcharts.chart(chartId, {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'wigrum-reg'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            }
        },
        title: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
            categories: JSON.parse(localStorage.getItem("seriesData")),
            tickmarkPlacement: 'on',
            tickWidth: 1,
            lineWidth: 0,
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        yAxis: [{
            tickLength: 0,
            title: {
                text: ''
            },
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        },
        {
            tickLength: 0,
            title: {
                text: ''
            },
            opposite: true,
            lineColor: '#5c5c5c',
            lineWidth: 1,
            gridLineDashStyle: 'Dot',
            labels: {
                style: {
                    color: '#8F9397'
                }
            }
        }
        ],
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                borderColor: '#6269FF',
                pointWidth: 8
            },
            column: {
                opacity: 0.8,
                borderRadiusTopLeft: 10,
                borderRadiusTopRight: 10,
                borderRadiusBottomLeft: 10,
                borderRadiusBottomRight: 10
            }
        },
        colors: [
            '#6269FF'
        ],
        tooltip: {
            shared: true,
            // valueDecimals: 2,
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{series.name}</span> : {point.y}<br/>',
            backgroundColor: '#2c2c2c',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: columnSeriesData
    });
}

function drawPackedBubbleChart(chartId, bubbleSeriesData) {
    Highcharts.chart(chartId, {
        chart: {
            type: 'packedbubble',
            style: {
                fontFamily: 'wigrum-reg'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 0],
                stops: [
                    [0, 'rgba(0, 0, 0, 0)']
                ]
            },
            // height: '100%'
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.name}, {point.value}%.'
            }
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            valuePrefix: "$",
            headerFormat: '<b>{point.name}</b><br/>',
            pointFormat: '<svg width="10" height="10" style="color:{series.color}">&#9679;</svg> <span style="color:{series.color}">{point.name}</span> : {point.value}<br/>',
            backgroundColor: '#2c2c2c',
            borderColor: '#474747',
            borderRadius: 10,
            borderWidth: 2
        },
        plotOptions: {
            packedbubble: {
                minSize: 50,
                maxSize: 100,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}<br/>&nbsp&nbsp&nbsp&nbsp{point.total}%',
                    style: {
                        color: '#C6C6C6',
                        fontSize: '12px',
                    }
                }
            }
        },
        colors: [
            '#6269FF'
        ],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: bubbleSeriesData
    });

}
//#endregion

$('.topnav-hamburger').click(function () {
    $('.navbar-menu').toggleClass("active");
});

function currentPeriodDropdown() {
    let dropdowns = document.querySelectorAll('.dropdown-toggle')
    dropdowns.forEach((dd) => {
        dd.addEventListener('click', function (e) {
            var el = this.nextElementSibling
            el.style.display = el.style.display === 'block' ? 'none' : 'block'
        })
    })
}

async function getDataFromCSVToJson(filePath, keyName) {
    $.ajax({
        url: filePath,
        async: false,
        success: async function (csv) {
            await convertDataFromCSVToJson(csv, keyName);
        },
        dataType: "text",
        complete: function () {
            // call a function on complete 
        }
    });
}

async function convertDataFromCSVToJson(csvData, keyName) {
    const lines = $.csv.toArrays(csvData);
    const keys = lines[0];
    var data = lines.slice(1).map(line => {
        return line.reduce((acc, cur, i) => {
            const toAdd = {};
            var percentageColumn = percentageKeyValueName.indexOf(keys[i]);
            if (percentageColumn >= 0) {
                cur = convertPercentageToNumber(cur);
            }
            toAdd[keys[i]] = cur;
            return { ...acc, ...toAdd };
        }, {});
    });
    // jsonCSVData[keyName] = data;
    jsonCSVData.push({ key: keyName, value: data });
}

function getData(data, changeYear = false) {
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        month = selectedPeriod[0].month;
        year = selectedPeriod[0].year;
        period = selectedPeriod[0].period;
        var text = monthList[month] + ' ' + year;
        if (period == "Month") {
            text = monthList[month] + ' ' + year;
        } else if (period == "Quarter") {
            text = month + ' ' + year;
        } else {
            text = year == new Date().getFullYear() ? year + " YTD" : year;
        }
        $(".time-period-txt").text(text);
        if (period == "Quarter") {
            let __quarterList = $("#myDropdown").find("a").html().split(" ");
            if (__quarterList.length > 1 &&
                (__quarterList[0] === "Q1" ||
                    __quarterList[0] === "Q2" ||
                    __quarterList[0] === "Q3" ||
                    __quarterList[0] === "Q4")) {
                $('#monthlyDatePicker .month.focused').removeClass('focused');
                $('#yearlyDatePicker .year.focused').removeClass('focused');

                $('#quarterlyDatePicker .month').removeClass('focused');
                $('#quarterlyDatePicker .month').removeClass('active');

                $('#quarterlyDatePicker .month[data-id="' + __quarterList[0] + '"]').addClass('focused');
                $('#quarterlyDatePicker .month[data-id="' + __quarterList[0] + '"]').addClass('active');

                //data-id="Q1"
            }
        }

    } else {
        var defaultDate = getDefaultLastQuarterDate();
        month = defaultDate[0].month;
        year = defaultDate[0].year;
        period = "Quarter";
        setDataValue(month, month, year, period);
    }
    var monthsData;
    if (changeYear) {
        monthsData = calculateMonthData(month, year - 1, period);
    } else {
        monthsData = calculateMonthData(month, year, period);
    }
    var seriesData = localStorage.getItem("seriesData");
    if (seriesData == null) {
        if (period == "Month") {
            var seriesDataMonth = monthSeriesData(monthsData);
            localStorage.setItem("seriesData", JSON.stringify(seriesDataMonth));
        } else {
            localStorage.setItem("seriesData", JSON.stringify(monthsData));
        }
    }
    var list = data.filter((item, index, arr) => {
        return monthsData.find(d => d === (item.Time).toString())
    });

    var newListObj = [];
    if ((monthsData.length != list.length) && list.length > 0) {
        var newObj = JSON.stringify(list[0]);
        newListObj.push(JSON.parse(newObj));

        var uniqueDateList = list.map(x => x.Time.toString());
        var emptyDateValue = monthsData.filter(function (obj) { return uniqueDateList.indexOf(obj) == -1; });

        emptyDateValue.forEach(dateItem => {
            Object.keys(newListObj[0]).forEach((item, index) => {
                if (item == "Time") {
                    newListObj[0][item] = dateItem;
                } else {
                    newListObj[0][item] = 0;
                }
            });
            var newlistobj = JSON.stringify(newListObj[0]);
            list.push(JSON.parse(newlistobj));
        });
    }

    var result = [];
    monthsData.forEach(item => {
        list.forEach((itemList, index, arr) => {
            if (item === itemList.Time.toString()) {
                result.push(itemList);
            }
        })
    });

    result.forEach(item => {
        Object.keys(item).forEach(element => {
            if (typeof (item[element]) === "string" && (item[element].indexOf("$") !== -1 || item[element].indexOf(",") !== -1 || item[element].indexOf("%") !== -1 || $.isNumeric(item[element]))) {
                item[element] = (item[element]) ? Number(item[element].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
            }
        })
    });

    return result;
}

function getDataARR(data, key) {
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        month = selectedPeriod[0].month;
        year = selectedPeriod[0].year;
        period = selectedPeriod[0].period;
        var text = monthList[month] + ' ' + year;
        if (period == "Month") {
            text = monthList[month] + ' ' + year;
        } else if (period == "Quarter") {
            text = month + ' ' + year;
        } else {
            text = year == new Date().getFullYear() ? year + " YTD" : year;
        }
        $(".time-period-txt").text(text);
    } else {
        var defaultDate = getDefaultLastQuarterDate();
        month = defaultDate[0].month;
        year = defaultDate[0].year;
        period = "Quarter";
        setDataValue(month, month, year, period);
    }

    var monthsData = calculateMonthData(month, year, period);
    var seriesData = localStorage.getItem("seriesData");
    if (seriesData == null) {
        if (period == "Month") {
            var seriesDataMonth = monthSeriesData(monthsData);
            localStorage.setItem("seriesData", JSON.stringify(seriesDataMonth));
        } else {
            localStorage.setItem("seriesData", JSON.stringify(monthsData));
        }
    }
    var list = sortData(data, key);

    if (list) {

        var uniqueDateList = Object.keys(data[0]).map(x => x);
        var emptyDateValue = monthsData.filter(function (obj) { return uniqueDateList.indexOf(obj) == -1; });

        emptyDateValue.forEach(dateItem => {
            Object.keys(list).forEach((itemList, index, arr) => {
                list[itemList].forEach((itemListObj, newIndex, newArr) => {
                    let x = {};
                    x[dateItem.toString()] = 0;
                    list[itemList][newIndex][dateItem] = 0
                })
            });
        });
    }

    $(Object.keys(list)).each(function (index, value) {
        $(list[value]).each(function (i, item) {
            Object.keys(item).forEach(element => {
                if (typeof (item[element]) === "string" && (item[element].indexOf("$") !== -1 || item[element].indexOf(",") !== -1 || item[element].indexOf("%") !== -1 || $.isNumeric(item[element]))) {
                    item[element] = (item[element]) ? Number(item[element].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
                }
            })
        })
    });

    var _filteredData = [];
    var result = {};
    $(Object.keys(list)).each(function (index, objKey) {
        var listDataObj = [];
        _filteredData = [];
        $(list[objKey]).each(function (i, item) {
            var filteredObject = {};
            for (const key of Object.keys(item)) {
                if (key) {
                    if (monthsData.includes(key)) {
                        filteredObject[key] = item[key];
                    }
                }
            }
            if (Object.keys(filteredObject).length > 0) {
                _filteredData.push(filteredObject);
            }
        });
        if (_filteredData.length > 0) {
            Object.keys(_filteredData[0]).map(x => x).sort((a, b) => { return monthsData.indexOf(a) - monthsData.indexOf(b) }).forEach(function (keyValue, i) {
                var arrayValue = _filteredData.map(x => x[keyValue]);
                var sum = arrayValue.reduce((p, c) => p + c, 0);
                listDataObj.push(sum);
            })
        }
        result[objKey] = listDataObj;
    });
    // result["monthData"] = monthsData;
    return result;
}

function getDataRevenue(data, key) {
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        month = selectedPeriod[0].month;
        year = selectedPeriod[0].year;
        period = selectedPeriod[0].period;
        var text = monthList[month] + ' ' + year;
        if (period == "Month") {
            text = monthList[month] + ' ' + year;
        } else if (period == "Quarter") {
            text = month + ' ' + year;
        } else {
            text = year == new Date().getFullYear() ? year + " YTD" : year;
        }
        $(".time-period-txt").text(text);
    } else {
        var defaultDate = getDefaultLastQuarterDate();
        month = defaultDate[0].month;
        year = defaultDate[0].year;
        period = "Quarter";
        setDataValue(month, month, year, period);
    }
    var monthsData = calculateMonthData(month, year, period);
    var seriesData = localStorage.getItem("seriesData");
    if (seriesData == null) {
        if (period == "Month") {
            var seriesDataMonth = monthSeriesData(monthsData);
            localStorage.setItem("seriesData", JSON.stringify(seriesDataMonth));
        } else {
            localStorage.setItem("seriesData", JSON.stringify(monthsData));
        }
    }
    var list = sortData(data, key);
    $(Object.keys(list)).each(function (index, value) {
        $(list[value]).each(function (i, item) {
            Object.keys(item).forEach(element => {
                if (typeof (item[element]) === "string" && (item[element].indexOf("$") !== -1 || item[element].indexOf(",") !== -1 || item[element].indexOf("%") !== -1 || $.isNumeric(item[element]))) {
                    item[element] = (item[element]) ? Number(item[element].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
                }
            })
        })
    });
    var _filteredData = [];
    var result = {};
    $(Object.keys(list)).each(function (index, objKey) {
        var listDataObj = [];
        _filteredData = [];
        $(list[objKey]).each(function (i, item) {
            var filteredObject = {};
            for (const key of Object.keys(item)) {
                if (key) {
                    if (monthsData.includes(key)) {
                        filteredObject[key] = item[key];
                    }
                }
            }
            if (Object.keys(filteredObject).length > 0) {
                _filteredData.push(filteredObject);
            }
        });
        if (_filteredData.length > 0) {
            Object.keys(_filteredData[0]).map(x => x).sort((a, b) => { return monthsData.indexOf(a) - monthsData.indexOf(b) }).forEach(function (keyValue, i) {
                var arrayValue = _filteredData.map(x => x[keyValue]);
                var sum = arrayValue.reduce((p, c) => p + c, 0);
                listDataObj.push(sum);
            })
        }
        result[objKey] = listDataObj;
    });
    return result;
}

function getDataTCVACV(data, key, valueKey) {
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        month = selectedPeriod[0].month;
        year = selectedPeriod[0].year;
        period = selectedPeriod[0].period;
        var text = monthList[month] + ' ' + year;
        if (period == "Month") {
            text = monthList[month] + ' ' + year;
        } else if (period == "Quarter") {
            text = month + ' ' + year;
        } else {
            text = year == new Date().getFullYear() ? year + " YTD" : year;
        }

        $(".time-period-txt").text(text);
    } else {
        var defaultDate = getDefaultLastQuarterDate();
        month = defaultDate[0].month;
        year = defaultDate[0].year;
        period = "Quarter";
        setDataValue(month, month, year, period);
    }
    var monthsData = calculateMonthData(month, year, period);
    var seriesData = localStorage.getItem("seriesData");
    if (seriesData == null) {
        if (period == "Month") {
            var seriesDataMonth = monthSeriesData(monthsData);
            localStorage.setItem("seriesData", JSON.stringify(seriesDataMonth));
        } else {
            localStorage.setItem("seriesData", JSON.stringify(monthsData));
        }
    }
    var list = data.filter((item, index, arr) => {
        return monthsData.find(d => d === (item[period]).toString())
    });
    list = sortData(list, key);

    $(Object.keys(list)).each(function (index, value) {
        $(list[value]).each(function (i, item) {
            Object.keys(item).forEach(element => {
                if (typeof (item[element]) === "string" && (item[element].indexOf("$") !== -1 || item[element].indexOf(",") !== -1 || item[element].indexOf("%") !== -1 || $.isNumeric(item[element]))) {
                    item[element] = (item[element]) ? Number(item[element].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
                }
            })
        })
    });

    var newSizeListObj = [];
    Object.keys(list).forEach((itemKey, keyIndex, arr) => {
        var newSizeListCount = [];
        var cspSize = list[itemKey].map(x => { return [x["Customer Name"], x[period]] });
        monthsData.forEach((itemDate, dateIndex) => {
            var companyName = [];
            var cspSizeCount = 0;
            cspSize.forEach((itemValue, valueIndex) => {
                if (itemDate === itemValue[1].toString() && (!companyName.includes(itemValue[0]))) {
                    companyName.push(itemValue[0]);
                    cspSizeCount += 1;
                }
            });
            newSizeListCount.push(cspSizeCount);
        });
        let x = {};
        x[itemKey.toString()] = newSizeListCount;
        newSizeListObj.push(x);
    });

    var newCspSizeList = ["S1", "S2", "S3", "M4", "L5"];
    let counter = Object.keys(newSizeListObj).length - 1;
    if (counter !== 4) {
        while (counter > -1) {
            Object.keys(newSizeListObj[counter]).forEach((it, i) => {
                if (newCspSizeList.includes(it)) {
                    let CspIndex = newCspSizeList.indexOf(it);
                    newCspSizeList.splice(CspIndex, 1);
                }
                counter--;
            });
        }
        $(newCspSizeList).each(function (i, val) {
            let x = {};
            var data = [];
            if (period == "Month") {
                data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            } else if (period == "Quarter") {
                data = [0, 0, 0, 0, 0];
            }
            else {
                data = [0, 0, 0, 0];
            }
            x[val] = data;
            newSizeListObj.push(x);
        });
    }
    newSizeListObj = newSizeListObj.sort((a, b) => { return CSPSizeList.indexOf(Object.keys(a)[0]) - CSPSizeList.indexOf(Object.keys(b)[0]) })
    return newSizeListObj;
}

function getDataCumulativeCount(data, key, valueKey) {
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        month = selectedPeriod[0].month;
        year = selectedPeriod[0].year;
        period = selectedPeriod[0].period;
        var text = monthList[month] + ' ' + year;
        if (period == "Month") {
            text = monthList[month] + ' ' + year;
        } else if (period == "Quarter") {
            text = month + ' ' + year;
        } else {
            text = year == new Date().getFullYear() ? year + " YTD" : year;
        }

        $(".time-period-txt").text(text);
    } else {
        var defaultDate = getDefaultLastQuarterDate();
        month = defaultDate[0].month;
        year = defaultDate[0].year;
        period = "Quarter";
        setDataValue(month, month, year, period);
    }
    var monthsData = calculateMonthData(month, year, period);
    var seriesData = localStorage.getItem("seriesData");
    if (seriesData == null) {
        if (period == "Month") {
            var seriesDataMonth = monthSeriesData(monthsData);
            localStorage.setItem("seriesData", JSON.stringify(seriesDataMonth));
        } else {
            localStorage.setItem("seriesData", JSON.stringify(monthsData));
        }
    }
    //var list = data.filter((item, index, arr) => {
    //    return monthsData.find(d => d === (item[period]).toString())
    //});
    var list = sortData(data, key);
    var currentPeriodList = data.map(x => x[period].toString()).filter((item, i, ar) => ar.indexOf(item) === i);

    currentPeriodList = currentPeriodList.concat(monthsData);
    currentPeriodList = currentPeriodList.filter((item, pos) => currentPeriodList.indexOf(item) === pos);
    if (period == "Quarter") {
        var sortPeriodList = currentPeriodList.sort((a, b) => {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        })
        currentPeriodList = sortPeriodList.sort((a, b) => { return parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]) });
    }
    else {
        currentPeriodList = currentPeriodList.sort((a, b) => new Date(a) - (new Date(b)));
    }

    $(Object.keys(list)).each(function (index, value) {
        $(list[value]).each(function (i, item) {
            Object.keys(item).forEach(element => {
                if (typeof (item[element]) === "string" && (item[element].indexOf("$") !== -1 || item[element].indexOf(",") !== -1 || item[element].indexOf("%") !== -1 || $.isNumeric(item[element]))) {
                    item[element] = (item[element]) ? Number(item[element].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
                }
            })
        })
    });

    var newSizeListObj = [];
    Object.keys(list).forEach((itemKey, keyIndex, arr) => {
        var newSizeListCount = [];
        var cspSize = list[itemKey].map(x => { return [x["Customer Name"], x[objectKeyValue.CSPSize], x[period]] });
        cspSize = cspSize.sort((a, b) => { return a[2] - b[2] });
        var cumulativeCount = 0;
        currentPeriodList.forEach((itemDate, dateIndex) => {
            var companyName = [];
            var cspSizeCount = 0;
            cspSize.forEach((itemValue, valueIndex) => {
                if (itemDate === itemValue[2].toString() && (!companyName.includes(itemValue[0]))) {
                    companyName.push(itemValue[0]);
                    cspSizeCount += 1;
                }
            });
            cumulativeCount += cspSizeCount;
            if (monthsData.indexOf(itemDate) !== -1) {
                newSizeListCount.push(cumulativeCount);
                //newSizeListCount.push({ "key": itemDate, "value": cumulativeCount });
            }
        });
        let x = {};
        x[itemKey.toString()] = newSizeListCount;
        newSizeListObj.push(x);
    });

    var newCspSizeList = ["S1", "S2", "S3", "M4", "L5"];
    let counter = Object.keys(newSizeListObj).length - 1;
    if (counter !== 4) {
        while (counter > -1) {
            Object.keys(newSizeListObj[counter]).forEach((it, i) => {
                if (newCspSizeList.includes(it)) {
                    let CspIndex = newCspSizeList.indexOf(it);
                    newCspSizeList.splice(CspIndex, 1);
                }
                counter--;
            });
        }
        $(newCspSizeList).each(function (i, val) {
            let x = {};
            var data = [];
            if (period == "Month") {
                data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            } else if (period == "Quarter") {
                data = [0, 0, 0, 0, 0];
            }
            else {
                data = [0, 0, 0, 0];
            }
            x[val] = data;
            newSizeListObj.push(x);
        });
    }
    newSizeListObj = newSizeListObj.sort((a, b) => { return CSPSizeList.indexOf(Object.keys(a)[0]) - CSPSizeList.indexOf(Object.keys(b)[0]) })
    return newSizeListObj;
}

function sortData(data, columnName) {
    var sortedData = {};

    for (var i = 0; i < data.length; i++) {
        var object = data[i];

        if (Object.keys(sortedData).indexOf(object[columnName].toString()) === -1) {
            sortedData[object[columnName]] = [];
        }

        sortedData[object[columnName]].push(object);
    }

    return sortedData;
}

function getLineColumnSeriesData(data, columnKey, lineKey) {
    var list = getData(data);
    var lineColumnData = [];
    var columnData = [];
    var lineData = [];
    $(list).each(function (i, element) {
        columnData.push(element[columnKey]);
        //lineData.push(element[lineKey]);
    })

    columnData = columnData.map(x => parseFloat(x));
    lineData = lineData.map(x => parseFloat(x));
    var newLineData = [];
    // lineData.forEach(function (val, i) {
    //     if (i > 0) {
    //         newLineData.push(columnData[i - 1]);
    //     } else {
    //         newLineData.push(0);
    //     }
    // })
    // lineData = newLineData;
    lineColumnData.push({
        'name': columnKey,
        'data': columnData,
        'type': 'column',
        "tooltip": {
            // "valueSuffix": " M"
        },
        "color": {
            "linearGradient": {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 1
            },
            "stops": [
                [
                    0,
                    "#1FDC90"
                ],
                [
                    1,
                    "#8884FF"
                ]
            ]
        },
        "categories": list.map(x => x.Time)
    });
    if (period.toLowerCase() != "year") {
        var lineList = getData(data, true);
        $(lineList).each(function (i, element) {
            //columnData.push(element[columnKey]);
            lineData.push(element[lineKey]);
        })
        lineColumnData.push({
            'name': lineKey,
            'data': lineData,
            'type': 'spline',
            "tooltip": {
                // "valueSuffix": " %"
            },
            "color": "#6269FF",
            "lineWidth": 4,
            "categories": list.map(x => x.Time)
        })
    }
    return lineColumnData;
}

function getStackedColumnSeriesData(data, firstKey, secondKey) {
    var list = getData(data);
    var columnData = [];
    var firstColumnData = [];
    var secondColumnData = [];
    $(list).each(function (i, element) {
        firstColumnData.push(element[firstKey]);
        secondColumnData.push(element[secondKey]);
    });
    columnData.push({
        "name": firstKey,
        "data": firstColumnData,
        "color": "#0FDCFF",
        // "time": obj.Time,
        "categories": list.map(x => x.Time)
    }, {
        "name": secondKey,
        "data": secondColumnData,
        "color": "#6269FF",
        // "time": obj.Time,
        "categories": list.map(x => x.Time)
    });
    return columnData;
}

function getStackedColumnSeriesDataARR(data, key) {
    var list = getDataARR(data, key);
    var columnData = [];
    var monthdata = [];
    monthdata = list.monthData;
    columnData.push({
        "name": objectKeyValue.Direct,
        "data": list[objectKeyValue.Direct],
        "color": "#0FDCFF",
        // "time": obj.Time,
        "categories": monthdata
    }, {
        "name": objectKeyValue.Partner,
        "data": list[objectKeyValue.Partner],
        "color": "#6269FF",
        // "time": obj.Time,
        "categories": monthdata
    });
    return columnData;
}

function getStackedColumnSeriesDataTCVACV(data, key, value) {
    var list = getDataAreaTCVACV(data, key, value);
    var columnData = [];
    columnData.push({
        "name": objectKeyValue.Direct,
        "data": list[objectKeyValue.Direct],
        "color": "#CCCEFF"
    }, {
        "name": objectKeyValue.Partner,
        "data": list[objectKeyValue.Partner],
        "color": "#5056CE"
    });
    return columnData;
}

function getStackedColumnNormalSeriesData(data, key, value) {
    var list = getDataARR(data, key);
    var lineColumnData = [];
    var colorList;
    if (Object.keys(list).length === 4) {
        colorList = ['#AEAEB5', '#9293B5', '#484CB5', '#2F2F70'];
    } else {
        colorList = ['#F78673', '#FFC500', '#17E3AE', '#0FDCFF', '#6269FF'];
    }
    Object.keys(list).forEach(function (obj, index) {
        var columnDataObj = {
            "name": obj,
            "data": list[obj],
            "color": colorList[index],
            "time": list[obj]
        };
        if (index == 0) {
            columnDataObj["borderRadiusTopLeft"] = 10;
            columnDataObj["borderRadiusTopRight"] = 10;
        } else if (index == Object.keys(list).length - 1) {
            columnDataObj["borderRadiusBottomRight"] = 10;
            columnDataObj["borderRadiusBottomLeft"] = 10;
        }
        lineColumnData.push(columnDataObj)
    });

    return lineColumnData;
}

function getStackedColumnNormalSeriesDataTCVACVbySize(data, key, value) {
    var list = getDataTCVACV(data, key, value);
    var lineColumnData = [];
    var colorList = ['#F78673', '#FFC500', '#17E3AE', '#0FDCFF', '#6269FF'];
    CSPSizeList.forEach(function (obj, index) {
        var columnDataObj = {
            "name": obj,
            "data": list[index][obj] ? list[index][obj] : 0,
            "color": colorList[index],
            // "time": list[obj] ? list[obj].map(x => x[period]) : [],
        };
        if (index == 0) {
            columnDataObj["borderRadiusTopLeft"] = 10;
            columnDataObj["borderRadiusTopRight"] = 10;
        } else if (index == Object.keys(list).length - 1) {
            //columnDataObj["borderRadiusBottomRight"] = 10;
            //columnDataObj["borderRadiusBottomLeft"] = 10;
        }
        lineColumnData.push(columnDataObj)
    });

    return lineColumnData;
}

function getStackedColumnNormalSeriesDataCumulativeCount(data, key) {
    var list = getDataCumulativeCount(data, key);
    var lineColumnData = [];
    var colorList = ['#F78673', '#FFC500', '#17E3AE', '#0FDCFF', '#6269FF'];
    CSPSizeList.forEach(function (obj, index) {
        var columnDataObj = {
            "name": obj,
            "data": list[index][obj] ? list[index][obj] : 0,
            "color": colorList[index],
            // "time": list[obj] ? list[obj].map(x => x[period]) : [],
        };
        if (index == 0) {
            columnDataObj["borderRadiusTopLeft"] = 10;
            columnDataObj["borderRadiusTopRight"] = 10;
        } else if (index == Object.keys(list).length - 1) {
            //columnDataObj["borderRadiusBottomRight"] = 10;
            //columnDataObj["borderRadiusBottomLeft"] = 10;
        }
        lineColumnData.push(columnDataObj)
    });

    return lineColumnData;
}

function getStackedColumnNormalSeriesDataTCVACV(data, key, value) {
    var list = getDataAreaTCVACV(data, key, value);
    var lineColumnData = [];
    var colorList;
    if (Object.keys(list).length === 4) {
        colorList = ['#AEAEB5', '#9293B5', '#484CB5', '#2F2F70'];
    } else {
        colorList = ['#F78673', '#FFC500', '#17E3AE', '#0FDCFF', '#6269FF'];
    }
    Object.keys(list).forEach(function (obj, index) {
        var columnDataObj = {
            "name": obj,
            "data": list[obj],
            "color": colorList[index],
            // "time": list[obj].map(x => x[period])
        };
        if (index == 0) {
            columnDataObj["borderRadiusTopLeft"] = 10;
            columnDataObj["borderRadiusTopRight"] = 10;
        } else if (index == Object.keys(list).length - 1) {
            columnDataObj["borderRadiusBottomRight"] = 10;
            columnDataObj["borderRadiusBottomLeft"] = 10;
        }
        lineColumnData.push(columnDataObj)
    });

    return lineColumnData;
}

function getAreaSeriesDataTCVACVbySize(data, key, value) {
    var displayData = [];
    var list = getDataAreaTCVACV(data, key, value);
    var colorList;
    if (Object.keys(list).length === 4) {
        colorList = ['#AEAEB5', '#9293B5', '#484CB5', '#2F2F70'];
    } else {
        colorList = ['#F78673', '#FFC500', '#17E3AE', '#0FDCFF', '#6269FF'];
    }
    CSPSizeList.forEach(function (obj, index) {
        var columnDataObj = {
            "name": obj,
            "data": list[obj],
            "color": colorList[index]
        };
        if (index == 0) {
            columnDataObj["borderRadiusTopLeft"] = 10;
            columnDataObj["borderRadiusTopRight"] = 10;
        } else if (index == Object.keys(list).length - 1) {
            columnDataObj["borderRadiusBottomRight"] = 10;
            columnDataObj["borderRadiusBottomLeft"] = 10;
        }
        displayData.push(columnDataObj)
    });
    return displayData;
}

function getAreaSeriesDataTCVACV(data, key, value) {
    var displayData = [];
    var list = getDataAreaTCVACV(data, key, value);
    var colorList;
    if (Object.keys(list).length === 4) {
        colorList = ['#AEAEB5', '#9293B5', '#484CB5', '#2F2F70'];
    } else {
        colorList = ['#F78673', '#FFC500', '#17E3AE', '#0FDCFF', '#6269FF'];
    }
    Object.keys(list).forEach(function (obj, index) {
        var columnDataObj = {
            "name": obj,
            "data": list[obj],
            "color": colorList[index]
        };
        if (index == 0) {
            columnDataObj["borderRadiusTopLeft"] = 10;
            columnDataObj["borderRadiusTopRight"] = 10;
        } else if (index == Object.keys(list).length - 1) {
            columnDataObj["borderRadiusBottomRight"] = 10;
            columnDataObj["borderRadiusBottomLeft"] = 10;
        }
        displayData.push(columnDataObj)
    });
    return displayData;
}

function getDataAreaTCVACV(data, key, valueKey) {
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        month = selectedPeriod[0].month;
        year = selectedPeriod[0].year;
        period = selectedPeriod[0].period;
        var text = monthList[month] + ' ' + year;
        if (period == "Month") {
            text = monthList[month] + ' ' + year;
        } else if (period == "Quarter") {
            text = month + ' ' + year;
        } else {
            text = year == new Date().getFullYear() ? year + " YTD" : year;
        }
        $(".time-period-txt").text(text);
    } else {
        var defaultDate = getDefaultLastQuarterDate();
        month = defaultDate[0].month;
        year = defaultDate[0].year;
        period = "Quarter";
        setDataValue(month, month, year, period);
    }
    var monthsData = calculateMonthData(month, year, period);
    var list = data.filter((item, index, arr) => {
        return monthsData.find(d => d === (item[period]).toString())
    });
    list = sortData(list, key);
    var newListObj = [];
    if (list) {
        Object.keys(list).forEach((itemList, index, arr) => {
            var newObj = JSON.stringify(list[itemList][0]);
            newListObj.push(JSON.parse(newObj));
            var uniqueDateList = list[itemList].map(x => x[period].toString());
            var emptyDateValue = monthsData.filter(function (obj) { return uniqueDateList.indexOf(obj) == -1; });
            emptyDateValue.forEach(dateItem => {

                Object.keys(newListObj[0]).forEach((item, newIndex) => {
                    if (item == period.toString()) {
                        newListObj[0][item] = dateItem;
                    } else {
                        newListObj[0][item] = 0;
                    }
                });
                var newlistobj = JSON.stringify(newListObj[0]);
                list[itemList].push(JSON.parse(newlistobj));
            });
        });
    }
    $(Object.keys(list)).each(function (index, value) {
        $(list[value]).each(function (i, item) {
            Object.keys(item).forEach(element => {
                if (typeof (item[element]) === "string" && (item[element].indexOf("$") !== -1 || item[element].indexOf(",") !== -1 || item[element].indexOf("%") !== -1 || $.isNumeric(item[element]))) {
                    item[element] = (item[element]) ? Number(item[element].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
                }
            })
        })
    });
    var monthSortedList = [];
    var result = {};
    // $(Object.keys(list)).each(function(index, value) {
    //     var listDataObj = [];
    //     var monthSortedList = sortData(list[value], period);
    //     Object.keys(monthSortedList).forEach(function(keyValue, i) {
    //         var arrayValue = monthSortedList[keyValue].map(x => x[valueKey]);
    //         var sum = arrayValue.reduce((p, c) => p + c, 0);
    //         listDataObj.push(sum);
    //     })
    //     result[value] = listDataObj;
    // });

    $(Object.keys(list)).each(function (index, value) {
        var listDataObj = [];
        //var sortValueObj = [];
        var monthSortedList = sortData(list[value], period);
        Object.keys(monthSortedList).forEach(function (keyValue, i) {
            var arrayValue = monthSortedList[keyValue].map(x => x[valueKey]);
            var sum = arrayValue.reduce((p, c) => p + c, 0);
            listDataObj.push({ 'key': keyValue, 'value': sum });
        })
        listDataObj = listDataObj.map(x => x).sort((a, b) => { return monthsData.indexOf(a.key) - monthsData.indexOf(b.key) });
        result[value] = listDataObj.map(x => x["value"]);
    });
    return result;
}

function getColumnSeriesData(data, columnKey) {
    var list = getData(data);
    var columnData = [];
    var displayData = [];

    $(list).each(function (i, element) {
        item = {};
        item["name"] = element[objectKeyValue.Time];
        item["y"] = element[columnKey];
        displayData.push(item);
    })
    displayData = displayData.map(x => ({ name: x.name, y: parseFloat(x.y) }))
    columnData.push({ 'name': 'Active Households', 'data': displayData })
    return columnData;
}

function getSemiCircleDonutSeriesData(data, keyName) {
    var list = getDataARR(data, keyName);
    var donutData = [];
    var displayData = [];
    var timePeriod = getCurrentTimePeriod();
    var colorList = ['#6269FF', "#3f4041"];
    Object.keys(list).forEach(function (obj, index) {
        //var total = list[obj].reduce(function (a, b) { return a + b }, 0);
        var total = list[obj][list[obj].length - 1] ?? 0;
        var columnDataObj = {
            "name": obj,
            "y": parseFloat(parseFloat(total).toFixed(2)),
            "color": colorList[index],
            "sliced": true
        };
        displayData.push(columnDataObj)
    });

    donutData.push({ 'data': displayData })
    return donutData;
}

function getSemiCircleDonutToolTipSeriesData(data, keyName, defaultRegion) {
    var list = getDataARR(data, keyName);
    var donutData = [];
    var displayData = [];
    var timePeriod = getCurrentTimePeriod();
    var total = 0;
    var sum = 0;
    var totalList = []
    var totalValues = [];
    var colorList = ['#6269FF', "#3f4041"];
    Object.keys(list).forEach(function (obj, index) {
        totalList.push(list[obj]);
    })
    Object.keys(list).forEach(function (obj, index) {
        var total = totalList[index].reduce(function (a, b) { return a + b }, 0);
        totalValues.push(total);
    });
    sum = data.filter(x => x[keyName] != defaultRegion).map(x => x[timePeriod]).reduce((p, c) => p + c, 0);
    Object.keys(list).forEach(function (obj, index) {
        if (obj == defaultRegion) {
            total = data.filter(x => x[keyName] == defaultRegion).map(x => x[timePeriod]).reduce((p, c) => p + c, 0)
            var columnDataObj = {
                "name": obj,
                "y": parseFloat(parseFloat(total).toFixed(2)),
                "color": "#6269FF",
                "sliced": true
            };
            displayData.push(columnDataObj)
        }
    });

    var columnDataObj = {
        "name": "Other",
        "y": parseFloat(parseFloat(sum).toFixed(2)),
        "color": "#3f4041",
        "sliced": true
    };
    displayData.push(columnDataObj)

    donutData.push({ 'data': displayData })
    return donutData;
}

function getSemiCircleDonutSeriesDataTCVAVC(data, keyName, defaultRegion) {
    var list = getDataAreaTCVACV(data, keyName, "ACV");
    var donutData = [];
    var displayData = [];
    var timePeriod = getCurrentTimePeriod();
    var total = 0;
    var sum = 0;
    var totalList = []
    var totalValues = [];
    Object.keys(list).forEach(function (obj, index) {
        totalList.push(list[obj]);
    })
    Object.keys(list).forEach(function (obj, index) {
        var total = totalList[index].reduce(function (a, b) { return a + b }, 0);
        totalValues.push(total);
    });
    sum = data.filter(x => x[keyName] != defaultRegion && x[period] == timePeriod).map(x => x[objectKeyValue.ACV]).reduce((p, c) => p + c, 0);
    Object.keys(list).forEach(function (obj, index) {
        if (obj == defaultRegion) {
            total = data.filter(x => x[keyName] == defaultRegion && x[period] == timePeriod).map(x => x[objectKeyValue.ACV]).reduce((p, c) => p + c, 0);
            var columnDataObj = {
                "name": obj,
                "y": parseFloat(parseFloat(total).toFixed(2)),
                "color": "#6269FF",
                "sliced": true
            };
            displayData.push(columnDataObj)
        }
    });

    var columnDataObj = {
        "name": "Other",
        "y": parseFloat(parseFloat(sum).toFixed(2)),
        "color": "#3f4041",
        "sliced": true
    };
    displayData.push(columnDataObj)

    donutData.push({ 'data': displayData })
    return donutData;
}

function getBubbleSeriesData(data, key) {
    var list = getDataRevenue(data, key);
    var bubbleData = [];
    var displayData = [];
    var timePeriod = getCurrentTimePeriod();
    var totalList = [];
    var sum = 0;
    Object.keys(list).forEach(function (obj, index) {
        totalList.push(list[obj]);
    })

    var totalValues = []
    Object.keys(list).forEach(function (obj, index) {
        // var total = totalList[index].reduce(function (a, b) { return a + b }, 0);
        var total = list[obj][list[obj].length - 1] ?? 0;
        totalValues.push(total);
    });
    sum = totalValues.reduce(function (a, b) { return a + b }, 0);
    totalValues.forEach(function (obj, i) {
        var percentage = Math.round((obj / sum) * 100);
        if ((isNaN(percentage) || (!isFinite(percentage)))) {
            percentage = 0.0;
        }
        var columnDataObj = {
            "name": Object.keys(list)[i],
            "value": parseFloat(parseFloat(obj).toFixed(2)),
            "total": percentage
        };
        displayData.push(columnDataObj)
    })

    bubbleData.push({ 'data': displayData })
    return bubbleData;
}

function getAreaSeriesData(data, key) {
    var displayData = [];
    var list = getDataARR(data, key);
    var colorList;
    if (Object.keys(list).length === 4) {
        colorList = ['#AEAEB5', '#9293B5', '#484CB5', '#2F2F70'];
    } else {
        colorList = ['#F78673', '#FFC500', '#17E3AE', '#0FDCFF', '#6269FF'];
    }
    CSPSizeList.forEach(function (obj, index) {
        var columnDataObj = {
            "name": obj,
            "data": list[obj],
            "color": colorList[index],
        };
        if (index == 0) {
            columnDataObj["borderRadiusTopLeft"] = 10;
            columnDataObj["borderRadiusTopRight"] = 10;
        } else if (index == Object.keys(list).length - 1) {
            columnDataObj["borderRadiusBottomRight"] = 10;
            columnDataObj["borderRadiusBottomLeft"] = 10;
        }
        displayData.push(columnDataObj)
    });
    displayData["monthData"] = list["monthData"];
    return displayData;
}

function getLineSeriesData(data, key, period) {
    var list = getData(data);
    var displayData = [];
    var displaySecondData = [];
    list.forEach(function (obj, index) {
        var lineDataObj = {
            "name": obj.Time,
            "data": obj[key],
        };
        displayData.push(lineDataObj)
    });
    if (period.toLowerCase() != "year") {
        var secondList = getData(data, true);
        secondList.forEach(function (obj, index) {
            var lineDataObj = {
                "name": obj.Time,
                "data": obj[key],
            };
            displaySecondData.push(lineDataObj)
        });
    }
    var resultData = [{
        "name": "Current",
        "data": displayData.map(x => x.data),
        "color": "#58eec7",
    }, {
        "name": "Prior",
        "data": displaySecondData.map(x => x.data),
        "color": "#999eff",
    }]
    var result = {
        categories: displayData.map(x => x.name),
        data: period.toLowerCase() != "year" ? resultData : [resultData[0]]
    }
    return result;
}

function calculateMonthData(month, year, filter = "Month") {
    var now = new Date();
    if (filter == "Quarter") {
        if (month == "Q1") {
            now = new Date(year, 0, 01);
        }
        if (month == "Q2") {
            now = new Date(year, 3, 01);
        }
        if (month == "Q3") {
            now = new Date(year, 6, 01);
        }
        if (month == "Q4") {
            now = new Date(year, 9, 01);
        }
    } else {
        now = new Date(year, month + 1, 01);
    }
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dateArray = [];
    if (filter.toLowerCase() == "month") {
        for (var i = 0; i <= 12; i++) {
            now.setMonth(now.getMonth() - 1);
            var today = months[now.getMonth()] + ' ' + now.getFullYear();
            dateArray.push(today);
        }
        dateArray.reverse();
    } else if (filter.toLowerCase() == "quarter") {
        var y = year; //year as 4 digit number
        var m = 0;
        if (month == "Q1") {
            m = 1;
        }
        if (month == "Q2") {
            m = 4;
        }
        if (month == "Q3") {
            m = 7;
        }
        if (month == "Q4") {
            m = 10
        }
        // var m = month + 1; //0 to 11 which actually is helpful here
        var q = Math.floor(m / 3) + 1; //month div 3 + 1
        var s = ""; //this holds the result
        for (var i = 0; i < 5; i++) {
            s = "Q" + q + " " + y;
            if (m < 10) {
                m = '0' + m;
            }
            var today = (m) + '/01/' + y;
            dateArray.push(s)
            if (i < 5) {
                s += " "; //another entry coming so put in space
                q--; //and roll back quarter
                m = parseInt(m) - 3 //and roll back month for quarter
            }
            if (q == 0) {
                q = 4; //we were in q1 so predecessor is q4
                y--; //and the year is one less
                m = 9 + 1 //and last quarter month
            }
        };
        dateArray.reverse();
    } else if (filter.toLowerCase() == "year") {
        var now = new Date(year, 01, 01);
        var year = now.getFullYear();
        for (var pastYear = year - 3; pastYear <= year; pastYear++) {
            dateArray.push(pastYear.toString());
        }
    }
    return dateArray;
}

function getCurrentTimePeriod() {
    var timePeriod = "";
    var period = 'Month';
    var mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        period = selectedPeriod[0].period;
        if (period == 'Month') {
            timePeriod = mlist[selectedPeriod[0].month] + " " + selectedPeriod[0].year;
        } else if (period == 'Quarter') {
            timePeriod = [selectedPeriod[0].month] + " " + selectedPeriod[0].year;
        }
        else if (period == 'Year') {
            timePeriod = selectedPeriod[0].year;
        }
    } else {
        timePeriod = "January 2022";
    }

    return timePeriod;
}

function convertNumberToPrecision(number) {
    return Math.abs(Number(number)) >= 1.0e+6

        ?
        (Math.abs(Number(number)) / 1.0e+6).toFixed(1) + "<span> M</span>"
        // Three Zeroes for Thousands
        :
        Math.abs(Number(number)) >= 1.0e+3

            ?
            (Math.abs(Number(number)) / 1.0e+3).toFixed(1) + "<span> K</span>"

            : Math.abs(Number(number).toFixed(1));
}

function convertNumberToMillion(number) {
    return (Math.abs(Number(number)) / 1.0e+6).toFixed(1) + "<span> M</span>"
}

Array.prototype.getDuplicates = function () {
    var duplicates = {};
    for (var i = 0; i < this.length; i++) {
        if (duplicates.hasOwnProperty(this[i])) {
            duplicates[this[i]].push(i);
        } else if (this.lastIndexOf(this[i]) !== i) {
            duplicates[this[i]] = [i];
        }
    }

    return duplicates;
};

function monthSeriesData(seriesData) {
    var seriesDataList = [];
    seriesData.forEach((dateItem, dateIndex) => {
        let dateString = dateItem.split(" ");
        let monthDate = dateString[0].slice(0, 3);
        let yearDate = dateString[1];
        seriesDataList.push(monthDate + "<br>" + yearDate);
    })
    return seriesDataList;
}

function convertPercentageToNumber(number) {
    return number * 100;
}

function convertPercentageToFriction(number) {
    return number / 100;
}

function getDefaultLastQuarterDate() {
    let lastQuarter;
    let lastQuarterData = [];
    for (const element of jsonCSVData) {
        if (element.key.indexOf('Quarter') !== -1) {
            const keysData = Object.keys(element.value[0]) || [];
            if (keysData.indexOf('Time') !== -1) {
                lastQuarterData.push(element.value[element.value.length - 1].Time);
            }
            else if (keysData.indexOf('Quarter') !== -1) {
                lastQuarterData.push(element.value[element.value.length - 1].Quarter);
            }
            else {
                keyQuarter = keysData.filter((data) => {
                    return data.startsWith("Q1") || data.startsWith("Q2") || data.startsWith("Q3") || data.startsWith("Q4")
                })
                lastQuarterData.push(keyQuarter[keyQuarter.length - 1]);
            }
        }
    }
    lastQuarterData = lastQuarterData.filter((item, i, ar) => ar.indexOf(item) === i);
    let maxYears
    let month = 0;
    if (lastQuarterData.length > 1) {
        const years = [];
        for (const element of lastQuarterData) {
            years.push(parseInt(element.split(' ')[1]));
        }
        maxYears = Math.max.apply(Math, years);
        if (lastQuarterData.indexOf(`Q4 ${maxYears}`) !== -1) {
            lastQuarter = `Q4 ${maxYears}`;
            month = "Q4"
        }
        else if (lastQuarterData.indexOf(`Q3 ${maxYears}`) !== -1) {
            lastQuarter = `Q3 ${maxYears}`;
            month = "Q3"
        }
        else if (lastQuarterData.indexOf(`Q2 ${maxYears}`) !== -1) {
            lastQuarter = `Q2 ${maxYears}`;
            month = "Q2"
        }
        else if (lastQuarterData.indexOf(`Q1 ${maxYears}`) !== -1) {
            lastQuarter = `Q1 ${maxYears}`;
            month = "Q1"
        }
    }
    var currentPeriodRange = [{
        month: month,
        year: maxYears
    }];
    return currentPeriodRange;
    //localStorage.setItem("currentPeriod", JSON.stringify(currentPeriodRange));
}