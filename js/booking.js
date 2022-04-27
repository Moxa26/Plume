var period;

$(document).ready(async function () {
    await chartUtility.init();
    var intervalObj = setInterval(function () {
        var fileType = localStorage.getItem("data_file_type") ?? "Stored Data";
        if (fileType == "Stored Data" ? jsonCSVData.length == storedSheetsName.length : jsonCSVData.length == sheetsName.length) {
            clearInterval(intervalObj);
            bindDatePickerDropDown("Booking");
            var selectedPeriod = localStorage.getItem("currentPeriod");
            if (selectedPeriod) {
                selectedPeriod = JSON.parse(selectedPeriod);
                period = selectedPeriod[0].period;
                bindBookingChart(period);
            } else {
                period = "Quarter";
                bindBookingChart(period);
            }
        }
    });
})

function bindBookingChart(period) {
    bindBookingChartSummary('summary' + period + 'JsonData');
    bindBookingChartTCVACV('tcv_ACV' + period + 'JsonData');
}

function bindBookingChartSummary(keyName) {
    drawLineColumnChart('tcvLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, "TCV", "TCV"));
    drawLineColumnChart('acvLineColumn', getLineColumnSeriesData(jsonCSVData.find(o => o.key === keyName).value, "ACV", "ACV"));
}

function bindBookingChartTCVACV(keyName) {
    drawAreaChart('TCVByCSP', 0.2, getAreaSeriesDataTCVACVbySize(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.CSPSize, objectKeyValue.TCV));
    drawAreaChart('ACVByCSP', 0.2, getAreaSeriesDataTCVACVbySize(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.CSPSize, objectKeyValue.ACV));
    drawAreaChart('TCVByRegion', 0, getAreaSeriesDataTCVACV(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Region, objectKeyValue.TCV));
    drawAreaChart('ACVByCSPRegion', 0, getAreaSeriesDataTCVACV(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Region, objectKeyValue.ACV));
    drawStackedColumnChartNormal('TCVByProduct', getStackedColumnNormalSeriesDataTCVACV(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Product, objectKeyValue.TCV));
    drawStackedColumnChartNormal('ACVByProduct', getStackedColumnNormalSeriesDataTCVACV(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Product, objectKeyValue.ACV));
    drawStackedColumnChart('ACVByChannel', getStackedColumnSeriesDataTCVACV(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Channel, objectKeyValue.ACV));
    drawStackedColumnChart('TCVByChannel', getStackedColumnSeriesDataTCVACV(jsonCSVData.find(o => o.key === keyName).value, objectKeyValue.Channel, objectKeyValue.TCV));
}