/**
 * Created by USER on 9/24/2019.
 */

var showReportsMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

/* ======= Ajax call to get the Detailed Report at Gewog Level ======= */
function getDetailedGewogRep(){
    var reportType="detailedGewog";
    var selDzRep1Index = $("#selectDzongkhagRep1Id").selectedIndex;
    var selGewogRep1Index =document.getElementById("selectGewogRep1Id").selectedIndex;
    var startDateRep1 = $("#dateRep1StartId").val();
    var endDateRep1 = $("#dateRep1EndId").val();
    if(selDzRep1Index==0){
        alert("Please Select a Dzongkhag");
    }else if(selGewogRep1Index==0){
        alert("Please Select a Gewog");
    }else if(startDateRep1==""){
        alert("Please Select a Start Date");
    }else if(endDateRep1==""){
        alert("Please Select a  End Date");
    }else {
        document.getElementById("loadingTd").style.display = "block";
        document.getElementById("loadingTd").innerHTML = "<br/><div align='center'></div><b>LOADING REPORT .....</b>";
        var selectedDzongkhagRep1 = $("#selectDzongkhagRep1Id").val();
        var selectedGewogRep1 = $("#selectGewogRep1Id").val();
        reportType = "repDetailedGewog";
        var selectedGewogName = "";
        var selectedGewogName = document.getElementById("selectGewogRep1Id").options[selGewogRep1Index].innerHTML;
        $.ajax({
            url: dcrc_lib.baseUrl() + 'showReports/getDetailedGewogReport?selectedDzongkhagRep1=' + selectedDzongkhagRep1 +
            '&selectedGewogRep1=' + selectedGewogRep1 + '&selectedGewogName=' + selectedGewogName + '&startDateRep1=' + startDateRep1 + '&endDateRep1=' + endDateRep1 + '&reportType=' + reportType,
            type: 'GET',
            success: function (msg) {
                var inp = msg;
                if (inp != '') { //plaintext response can be pipe seperated values also. need to split here
                    document.getElementById("loadingTd").style.display = "none";
                    $('#resultTd').show();
                    $('#resultDiv').html(inp);
                }
            },
            error: function (data, textStatus, errorThrown) {
                //if there is some error handling mechanism that needs to be implemented
            }
        });
    }
}

/* ======= Ajax Call to export the report in PDF format =======*/
function exportPDF(){
    //alert("exportPDF ");
// 		   repDetailedGewog  repDetailedVillage  repSummaryCountry
    var selDzRep1Index = document.getElementById("selectDzongkhagRep1Id").selectedIndex;
    var selGewogRep1Index = document.getElementById("selectGewogRep1Id").selectedIndex;
    var selectedDzongkhagRep1 = document.getElementById("selectDzongkhagRep1Id").options[selDzRep1Index].value;
    var selectedGewogRep1 = document.getElementById("selectGewogRep1Id").options[selGewogRep1Index].value;
    var selectedGewogName= document.getElementById("selectGewogRep1Id").options[selGewogRep1Index].innerHTML;
    var startDateRep1 = document.getElementById('dateRep1StartId').value;
    var endDateRep1 = document.getElementById('dateRep1EndId').value;
    var reportType = "repDetailedGewog";
    window.open(dcrc_lib.baseUrl() +"showReports/exportToPdf?selectedDzongkhagRep1="+selectedDzongkhagRep1+"&selectedGewogRep1="
    +selectedGewogRep1+'&selectedGewogName='+selectedGewogName+"&startDate="+startDateRep1+"&endDate="+endDateRep1+"&reportType="+reportType);

}

/* ======= Ajax Call to export the report in Excel format =======*/
function exportExcel(){

    //alert("inside the exportExcel ....");
    var selDzRep1Index = document.getElementById("selectDzongkhagRep1Id").selectedIndex;
    var selGewogRep1Index = document.getElementById("selectGewogRep1Id").selectedIndex;

    var selectedDzongkhagRep1 = document.getElementById("selectDzongkhagRep1Id").options[selDzRep1Index].value;
    var selectedGewogRep1 = document.getElementById("selectGewogRep1Id").options[selGewogRep1Index].value;

    var selectedGewogName= document.getElementById("selectGewogRep1Id").options[selGewogRep1Index].innerHTML;

    var startDateRep1 = document.getElementById('dateRep1StartId').value;
    var endDateRep1 = document.getElementById('dateRep1EndId').value;
    var reportType = "repDetailedGewog";

    window.open(dcrc_lib.baseUrl() +"showReports/exportToExcel?selectedDzongkhagRep1="+selectedDzongkhagRep1+"&selectedGewogRep1="
    +selectedGewogRep1+'&selectedGewogName='+selectedGewogName+"&startDate="+startDateRep1+"&endDate="+endDateRep1+"&reportType="+reportType);
}

var showReports = (function () {
    "use strict";
    var isSubmitted = false;
    var maintenanceCompletionReportGrid = $('#maintenanceCompletionReportGrid');

    /**
     * To get base url
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'showReports/'
    }

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('#selectDzongkhagRep1Id').on('change', function () {
            var dzongkhagOfBirth = $(this).val();
            $.ajax({
                url: _baseURL() + 'getGewogDropdownList',
                type: 'GET',
                data: {dzongkhagID: dzongkhagOfBirth},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#selectGewogRep1Id'), res, 'integer');
                    $('#villageOfBirth').empty();
                }
            });
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#selectGewogRep2Name').on('change', function () {
            var gewogOfBirth = $(this).val();
            $.ajax({
                url: _baseURL() + 'getVillageDropdownList',
                type: 'GET',
                data: {gewogID: gewogOfBirth},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#selectVillageRep2Id'), res, 'integer');
                }
            });
        });
    }

    /**
     * To get location dropdown list
     */
    function getLocationDropdownList() {
        $('#dzongkhagID').on('change', function () {
            $.ajax({
                url: _baseURL() + 'getLocationDropdownList',
                type: 'GET',
                data: {dzongkhagID: $(this).val()},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#locationID'), res, 'integer', true);
                }
            });
        });
    }

    /**
     * To get department dropdown list
     */
    function getDepartmentDropdownList() {
        $('#ministryID').on('change', function () {
            $.ajax({
                url: _baseURL() + 'getDepartmentDropdownList',
                type: 'GET',
                data: {ministryID: $(this).val()},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#departmentID'), res, 'integer', true);
                }
            });
        });
    }

    /**
     * To generate the report.
     */
    function generateReport() {
        $('#btnGenerateReport').on('click', function () {
            $('#maintenanceCompletionReportForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(maintenanceCompletionReportMsg.processingFormData);
                        return;
                    }

                    $('#btnGenerateReport').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'getMaintenanceCompletionReport',
                        type: 'POST',
                        data: $(form).serializeArray(),
                        success: function (res) {
                            var columnDef = [
                                {data: 'quarterNumber'},
                                {data: 'tenantCIDNumber'},
                                {data: 'tenantName'},
                                {data: 'detailedRequest'},
                                {data: 'serviceName'},
                                {data: 'submissionDate'},
                                {data: 'approvalDate'},
                                {data: 'locationName'}
                            ];

                            if (res.status == 1) {
                                $('#reportExport').removeClass('hidden');
                                maintenanceCompletionReportGrid.dataTable().fnDestroy();
                                maintenanceCompletionReportGrid.find('tbody').empty();
                                maintenanceCompletionReportGrid.dataTable({
                                    data: res.dto,
                                    columns: columnDef
                                });
                            } else if (res.status == 5) {
                                $('#reportExport').addClass('hidden');
                                maintenanceCompletionReportGrid.dataTable().fnDestroy();
                                maintenanceCompletionReportGrid.find('tbody').empty();
                                maintenanceCompletionReportGrid.dataTable({
                                    data: null,
                                    columns: columnDef
                                });
                            } else {
                                errorMsg(res.text)
                            }
                        }, complete: function () {
                            $('#btnGenerateReport').attr('disabled', false);
                            isSubmitted = false;
                        }
                    });
                }
            });
        });
    }

    /**
     * To export report to xls format
     */
    function generateXlsReport() {
        $('#xlsExport').on('click', function () {
            var formID = $('#maintenanceCompletionReportForm');
            $('#reportFormat').val('xls');

            if (formID.valid()) {
                $.ajax({
                    url: _baseURL() + 'report',
                    type: 'GET',
                    data: formID.serializeArray(),
                    success: function (res) {
                        if (res.status == 1) {
                            window.open(dcrc_lib.baseReportLocation() + res.dto.reportName, $('#reportName').val());
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text);
                        }
                    }
                });
            }
        });
    }

    /**
     * To export report to pdf format
     */
    function generatePdfReport() {
        $('#pdfExport').on('click', function () {
            var formID = $('#maintenanceCompletionReportForm');
            $('#reportFormat').val('pdf');

            if (formID.valid()) {
                $.ajax({
                    url: _baseURL() + 'report',
                    type: 'GET',
                    data: formID.serializeArray(),
                    success: function (res) {
                        if (res.status == 1) {
                            window.open(dcrc_lib.baseReportLocation() + res.dto.reportName, $('#reportName').val());
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text);
                        }
                    }
                });
            }
        });
    }

    return {
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        getLocationDropdownList: getLocationDropdownList,
        getDepartmentDropdownList: getDepartmentDropdownList,
        generateReport: generateReport,
        generateXlsReport: generateXlsReport,
        generatePdfReport: generatePdfReport
    };

})();

$(document).ready(function () {
    $('#monthlyCollectionReportGrid').dataTable();

    showReports.getGewogDropdownList();
    showReports.getVillageDropdownList();
    showReports.getLocationDropdownList();
    showReports.getDepartmentDropdownList();
    showReports.generateReport();
    showReports.generateXlsReport();
    showReports.generatePdfReport();
});