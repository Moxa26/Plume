var period;

$(document).ready(async function () {
    await chartUtility.init();
    var intervalObj = setInterval(function () {
        var fileType = localStorage.getItem("data_file_type") ?? "Stored Data";
        if (fileType == "Stored Data" ? jsonCSVData.length == storedSheetsName.length : jsonCSVData.length == sheetsName.length) {
            clearInterval(intervalObj);
            bindDatePickerDropDown("Profitability");
            var selectedPeriod = localStorage.getItem("currentPeriod");
            if (selectedPeriod) {
                selectedPeriod = JSON.parse(selectedPeriod);
                period = selectedPeriod[0].period;
                bindProfitabilityChart(period);
            } else {
                period = "Quarter";
                bindProfitabilityChart(period);
            }
        }
    });
})

function bindProfitabilityChart(period) {
    bindProfitabilityChartSummary('summary' + period + 'JsonData', period);
}

function bindProfitabilityChartSummary(keyName, period) {
    drawLineChart('areaGrossMargin', "Gross Margin", getLineSeriesData(jsonCSVData.find(o => o.key === keyName).value, "Gross Margin", period));
    drawLineChart('areaLTMFCFMargin', 'LTM FCF Margin', getLineSeriesData(jsonCSVData.find(o => o.key === keyName).value, "LTM FCF Margin", period));
    drawLineChart('areaCACLTV', 'CACLTV', getLineSeriesData(jsonCSVData.find(o => o.key === keyName).value, "LTV/CAC", period));
    drawLineChart('areaEBIDTA', 'EBIDTA', getLineSeriesData(jsonCSVData.find(o => o.key === keyName).value, "EBIDTA Margin", period));
    drawLineChart('areaFCFMargin', 'FCFMargin', getLineSeriesData(jsonCSVData.find(o => o.key === keyName).value, "FCF Margin", period));
    drawLineChart('areaRuleOf40', 'RuleOf40', getLineSeriesData(jsonCSVData.find(o => o.key === keyName).value, "Rule of 40", period));
    drawLineChart('areaSalesEfficiency', 'SalesEfficiency', getLineSeriesData(jsonCSVData.find(o => o.key === keyName).value, "Sales Efficiency", period));
}