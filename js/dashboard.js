var period;

$(document).ready(async function () {
    await chartUtility.init();
    var intervalObj = setInterval(function () {
        var fileType = localStorage.getItem("data_file_type") ?? "Stored Data";
        if (fileType == "Stored Data" ? jsonCSVData.length == storedSheetsName.length : jsonCSVData.length == sheetsName.length) {
            clearInterval(intervalObj);
            bindDatePickerDropDown("Dashboard");
            var regionData = jsonCSVData.find(o => o.key === "activeHouseholdsMonthJsonData").value.map((res) => res["Region"]).filter((value, index, self) => self.map(x => x).indexOf(value) == index);
            createRegionDropdown(regionData);
            var selectedPeriod = localStorage.getItem("currentPeriod");
            if (selectedPeriod) {
                selectedPeriod = JSON.parse(selectedPeriod);
                period = selectedPeriod[0].period;
                bindDashboardChart(period);
            } else {
                period = "Quarter";
                bindDashboardChart(period);
            }
            var defaultRegion = $("#ddlRegion .dropdown-item")[0].text;
            $("#btnRegion").html('<i class="ri-map-pin-range-line"></i> ' + defaultRegion);
            //changeDonutTooltip(period, defaultRegion);
            changeGlobeTooltip(defaultRegion);
        }
    });
})

function bindDashboardChart(period) {
    bindDashboardChartSummary('summary' + period + 'JsonData');
    bindDashboardChartRevenue('revenue' + period + 'JsonData');
    bindBookingChartTCVACV('tcv_ACV' + period + 'JsonData');
    bindCumulativeChartCount('cumulative' + period + 'JsonData');
}

function changeDonutTooltip(period, defaultRegion) {
    drawSemiCircleDonutChartTooltip('revenueDonut', getSemiCircleDonutToolTipSeriesData(jsonCSVData.find(o => o.key === "revenue" + period + "JsonData").value, objectKeyValue.Region, defaultRegion));
    drawSemiCircleDonutChartTooltip('arrDonut', getSemiCircleDonutToolTipSeriesData(jsonCSVData.find(o => o.key === "arr" + period + "JsonData").value, objectKeyValue.Region, defaultRegion));
    drawSemiCircleDonutChartTooltip('acvDonut', getSemiCircleDonutSeriesDataTCVAVC(jsonCSVData.find(o => o.key === "tcv_ACV" + period + "JsonData").value, objectKeyValue.Region, defaultRegion));
    drawSemiCircleDonutChartTooltip('activeHouseholdDonut', getSemiCircleDonutToolTipSeriesData(jsonCSVData.find(o => o.key === "activeHouseholds" + period + "JsonData").value, objectKeyValue.Region, defaultRegion));

}

function bindDashboardChartSummary(keyName) {
    drawLineColumnChart('revenueLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Revenue, objectKeyValue.Revenue));
    drawLineColumnChart('arrLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.ARR, objectKeyValue.ARR));
    drawLineColumnChart('ndrLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.NetRetention, objectKeyValue.NetRetention));
    drawLineColumnChart('tcvLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.TCV, objectKeyValue.TCV));
    drawLineColumnChart('acvLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.ACV, objectKeyValue.ACV));
    drawLineColumnChart('grossMarginLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.GrossMargin, objectKeyValue.GrossMargin));
    drawColumnChart('houseHoldColumn', getColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.ActiveHouseholds));
}

function bindDashboardChartRevenue(keyName) {
    drawAreaChart('revenueArea', 0.2, getAreaSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.CSPSize));
    drawSemiCircleDonutChart('revenueSemiCircleDonut', getSemiCircleDonutSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Channel));
    drawPackedBubbleChart('revenueBubbleChart', getBubbleSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Product));
}

function bindBookingChartTCVACV(keyName) {
    //drawStackedColumnChartNormal('stackedColumn', getStackedColumnNormalSeriesDataTCVACVbySize(jsonCSVData.find(o => o.key === keyName).value, "CSP Size", "ACV"));
}

function bindCumulativeChartCount(keyName) {
    drawStackedColumnChartNormal('stackedColumnCumulative', getStackedColumnNormalSeriesDataCumulativeCount(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.CSPSize, objectKeyValue.CumulativeCustomers));
}


$("body").on('click', '#ddlRegion .dropdown-item', function (e) {
    $("#btnRegion").html('<i class="ri-map-pin-range-line"></i> ' + $(this)[0].text);
    changeGlobeLocation($(this)[0].text);
    changeGlobeTooltip($(this)[0].text);
})

function createRegionDropdown(regionData) {
    regionData = regionData.sort(function (a, b) {
        if (a < b) { return 1; }
        if (a > b) { return -1; }
        return 0;
    })
    var html = '';
    $(regionData).each(function (i, element) {
        html += '<a class="dropdown-item" href="#">' + element + '</a>'
    })
    $("#ddlRegion").append(html)
}

function changeGlobeTooltip(hoverData) {
    var regionName;
    var timePeriod = getCurrentTimePeriod();
    var gulfCountryList = ["United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Kuwait and Bahrain"];
    if (!(typeof (hoverData) == "string")) {
        regionName = hoverData.properties.REGION_UN;
        if (hoverData.properties.REGION_WB == "Latin America & Caribbean") {
            regionName = "LATAM";
        } else if (regionName == "Americas") {
            regionName = "US & CA";
        } else if (regionName == "Africa") {
            regionName = "EU & Africa";
        } else if (gulfCountryList.indexOf(hoverData.properties.NAME) > -1) {
            regionName = "GCC";
        } else if (regionName == "Asia" || regionName == "Pacific") {
            regionName = "APAC";
        }
    } else {
        regionName = hoverData;
    }

    var selectedPeriod = localStorage.getItem("currentPeriod");
    if (selectedPeriod) {
        selectedPeriod = JSON.parse(selectedPeriod);
        period = selectedPeriod[0].period;
    } else {
        period = "Quarter";
    }

    $("#btnRegion").html('<i class="ri-map-pin-range-line"></i> ' + regionName);
    changeDonutTooltip(period, regionName);
    var revenueList = jsonCSVData.find(o => o.key === "revenue" + period + "JsonData").value.filter((item, i, ar) => {
        return item.Region == regionName;
    });
    if (revenueList.length > 0) {
        revenueList = revenueList.map((item) => {
            if (typeof (item[timePeriod]) === "string" && (item[timePeriod].indexOf("$") !== -1 || item[timePeriod].indexOf(",") !== -1 || item[timePeriod].indexOf("%") !== -1 || $.isNumeric(item[timePeriod]))) {
                item[timePeriod] = (item[timePeriod]) ? Number(item[timePeriod].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
            }
            return item[timePeriod];
        });
        var total = 0
        for (var i = 0; i < revenueList.length; i++) {
            total += revenueList[i] ? parseFloat(revenueList[i]) : 0;
        }
        $("#globeRevenue h5").html("$" + convertNumberToPrecision(total));
    } else {
        $("#globeRevenue h5").html("$" + 0.0 + "<span> M</span>");
    }
    var arrList = jsonCSVData.find(o => o.key === "arr" + period + "JsonData").value.filter((item, i, ar) => {
        return item.Region == regionName;
    });
    if (arrList.length > 0) {
        arrList = arrList.map((item) => {
            if (typeof (item[timePeriod]) === "string" && (item[timePeriod].indexOf("$") !== -1 || item[timePeriod].indexOf(",") !== -1 || item[timePeriod].indexOf("%") !== -1 || $.isNumeric(item[timePeriod]))) {
                item[timePeriod] = (item[timePeriod]) ? Number(item[timePeriod].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
            }
            return item[timePeriod];
        });
        var total = 0
        for (var i = 0; i < arrList.length; i++) {
            total += arrList[i] ? parseFloat(arrList[i]) : 0;
        }
        $("#globeARR h5").html("$" + convertNumberToPrecision(total));
    } else {
        $("#globeARR h5").html("$" + 0.0 + "<span> M</span>");
    }
    var tcv_ACVList = jsonCSVData.find(o => o.key === "tcv_ACV" + period + "JsonData").value.filter((item, i, ar) => {
        return item.Region == regionName && item[period] == timePeriod;
    });
    if (tcv_ACVList.length > 0) {
        tcv_ACVList = tcv_ACVList.map((item) => {
            if (typeof (item['ACV']) === "string" && (item['ACV'].indexOf("$") !== -1 || item['ACV'].indexOf(",") !== -1 || item['ACV'].indexOf("%") !== -1 || $.isNumeric(item['ACV']))) {
                item['ACV'] = (item['ACV']) ? Number(item['ACV'].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
            }
            return item['ACV'];
        });
        var total = 0
        for (var i = 0; i < tcv_ACVList.length; i++) {
            total += tcv_ACVList[i] ? parseFloat(tcv_ACVList[i]) : 0;
        }
        $("#globeACV h5").html("$" + convertNumberToPrecision(total));
    } else {
        $("#globeACV h5").html("$" + 0.0 + "<span> M</span>");
    }
    var activeList = jsonCSVData.find(o => o.key === "activeHouseholds" + period + "JsonData").value.filter((item, i, ar) => {
        return item.Region == regionName;
    });
    if (activeList.length > 0) {
        if (typeof (activeList[0][timePeriod]) === "string" && (activeList[0][timePeriod].indexOf("$") !== -1 || activeList[0][timePeriod].indexOf(",") !== -1 || activeList[0][timePeriod].indexOf("%") !== -1 || $.isNumeric(activeList[0][timePeriod]))) {
            activeList[0][timePeriod] = (activeList[0][timePeriod]) ? Number(activeList[0][timePeriod].replaceAll(/[$@%]/g, '').replaceAll(/,/g, '')) : 0;
        }
        var total = activeList[0][timePeriod] ? activeList[0][timePeriod] : 0;
        $("#globeActiveHousehold h5").html(convertNumberToPrecision(total));
    } else {
        $("#globeActiveHousehold h5").html(0.0 + "<span> M</span>");
    }
}