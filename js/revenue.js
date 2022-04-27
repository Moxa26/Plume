var period;

$(document).ready(async function () {
    await chartUtility.init();
    var intervalObj = setInterval(function () {
        var fileType = localStorage.getItem("data_file_type") ?? "Stored Data";
        if (fileType == "Stored Data" ? jsonCSVData.length == storedSheetsName.length : jsonCSVData.length == sheetsName.length) {
            clearInterval(intervalObj);
            bindDatePickerDropDown(objectKeyValue.Revenue);
            var selectedPeriod = localStorage.getItem("currentPeriod");
            if (selectedPeriod) {
                selectedPeriod = JSON.parse(selectedPeriod);
                period = selectedPeriod[0].period;
                bindRevenueChart(period);
            } else {
                period = "Quarter";
                bindRevenueChart(period);
            }
        }
    });
})

function bindRevenueChart(period) {
    bindRevenueChartSummary('summary' + period + 'JsonData');
    bindRevenueChartRevenue('revenue' + period + 'JsonData');
    bindRevenueChartARR('arr' + period + 'JsonData');
}

function bindRevenueChartSummary(keyName) {
    drawLineColumnChart('revenueLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Revenue, objectKeyValue.Revenue));
    drawLineColumnChart('arrLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.ARR, objectKeyValue.ARR));
    drawLineColumnChart('arpaLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.ARPA, objectKeyValue.ARPA));
    drawLineColumnChart('arpuLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.ARPU, objectKeyValue.ARPU));
    drawStackedColumnChart('stackedColumnRevenueRecurring', getStackedColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Revenue, objectKeyValue.RecurringRevenue));
}

function bindRevenueChartRevenue(keyName) {
    drawStackedColumnChartNormal('stackedColumnRevenue', getStackedColumnNormalSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Region));
    drawStackedColumnChartNormal('stackedColumnRevenueProduct', getStackedColumnNormalSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Product));
}


function bindRevenueChartARR(keyName) {
    drawAreaChart('revenueArea', 0.2, getAreaSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.CSPSize));
    drawStackedColumnChartNormal('stackedColumnARRProduct', getStackedColumnNormalSeriesData(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Product));
    drawStackedColumnChart('stackedColumnARRChannel', getStackedColumnSeriesDataARR(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Channel));
}