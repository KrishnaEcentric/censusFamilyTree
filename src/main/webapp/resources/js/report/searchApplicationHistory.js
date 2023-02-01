/**
 * Created by USER on 9/24/2019.
 */
var searchApplicationHistoryMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var searchApplicationHistory = (function () {
    "use strict";
    var isSubmitted = false;
    var housingAllotmentPendingReportGrid = $('#housingAllotmentPendingReportGrid');
    var searchApplicationHistoryHeader=$('#searchApplicationHistoryHeader');
    var SearchHistoryDtlsTable=$('#SearchHistoryDtlsTable');

    /**
     * To get base url
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'searchApplicationHistory/'
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
            $('#housingAllotmentPendingReportForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(housingAllotmentPendingReportMsg.processingFormData);
                        return;
                    }

                    $('#btnGenerateReport').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'getHousingAllotmentPendingReport',
                        type: 'POST',
                        data: $(form).serializeArray(),
                        success: function (res) {
                            var columnDef = [
                                {
                                    data: 'applicationDate', render: function (data) {
                                    return formatAsDate(data);
                                }
                                },
                                {data: 'tenantCIDNumber'},
                                {data: 'tenantName'},
                                {data: 'employeeID'},
                                {data: 'employmentType'},
                                {data: 'maritalStatus'},
                                {data: 'gradeID'},
                                {data: 'designation'},
                                {data: 'mobileNumber'}
                            ];

                            if (res.status == 1) {
                                $('#reportExport').removeClass('hidden');
                                housingAllotmentPendingReportGrid.dataTable().fnDestroy();
                                housingAllotmentPendingReportGrid.find('tbody').empty();
                                housingAllotmentPendingReportGrid.dataTable({
                                    data: res.dto,
                                    columns: columnDef
                                });
                            } else if (res.status == 5) {
                                $('#reportExport').addClass('hidden');
                                housingAllotmentPendingReportGrid.dataTable().fnDestroy();
                                housingAllotmentPendingReportGrid.find('tbody').empty();
                                housingAllotmentPendingReportGrid.dataTable({
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
            var formID = $('#housingAllotmentPendingReportForm');
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
            var formID = $('#housingAllotmentPendingReportForm');
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

    function _getSearchHistory() {
        $('#btnSearch').on('click', function () {
            var cidSrpNoID = $('#cidSrpNo').val();
            $.ajax({
                url: _baseURL() + 'searchApplicationHistory',
                type: 'GET',
                data: {cidNo: cidSrpNoID},
                success: function (res) {
                    debugger;
                    searchApplicationHistoryHeader.addClass('hidden');
                    $('#searchCitizenHeaderDetail').removeClass('hidden');
                    _searchList(res);
                }

            });
        })
    }
    function _searchList(dto) {
        var columnDef = [
            {data: 'cidNumber'},
            {data: 'applicationNumber'},
            {data: 'serviceName'},
            {data: 'submittedBy'},
            {data: 'submittedDate', render: function (data) {
                return formatAsDate(data);}
            },
            {data: 'actorName'},
            {data: 'appOrRejDate', render: function (data) {
                return formatAsDate(data);}
            }
        ];

        if (dto.length > 0) {
            SearchHistoryDtlsTable.dataTable().fnDestroy();
            SearchHistoryDtlsTable.find('tbody').empty();
            SearchHistoryDtlsTable.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            SearchHistoryDtlsTable.dataTable().fnDestroy();
            SearchHistoryDtlsTable.find('tbody').empty();
            SearchHistoryDtlsTable.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }

    return {
        getDepartmentDropdownList: getDepartmentDropdownList,
        generateReport: generateReport,
        generateXlsReport: generateXlsReport,
        generatePdfReport: generatePdfReport,
        _getSearchHistory:_getSearchHistory

    };

})();

$(document).ready(function () {
    $('#housingAllotmentPendingReportGrid').dataTable();

    searchApplicationHistory.getDepartmentDropdownList();
    searchApplicationHistory.generateReport();
    searchApplicationHistory.generateXlsReport();
    searchApplicationHistory.generatePdfReport();
    searchApplicationHistory._getSearchHistory();
});