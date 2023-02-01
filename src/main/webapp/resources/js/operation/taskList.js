/**
 * Created by USER on 8/4/2019.
 */
var taskListMsg = {
    processingFormData: 'Your request is processing. Please wait...'
};

var taskList = (function () {
    "use strict";
    var isSubmitted = false;
    var groupTaskListGrid = $('#groupTaskListGrid');
    var myTaskListGrid = $('#myTaskListGrid');
    var rejectedListGrid = $('#rejectedListGrid');
    var ndiListGrid = $('#ndiListGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'taskList/';
    }

    function _diffbaseURL() {
        return 'ndiCitizenImage';
    }

    function filterApplicationList() {
        $('#btnFilter').on('click', function () {
            getGroupTaskList($('#serviceTypeID').val(), $('#statusTypeID').val(), $('#limitID').val(), false);
        });
    }

    /**
     * To get group task list
     */
    function getGroupTaskList(serviceTypeID, statusTypeID, limitID, loadDropdown) {
        $.ajax({
            url: _baseURL() + 'getGroupTaskList',
            type: 'GET',
            data: {serviceTypeID: serviceTypeID, statusTypeID: statusTypeID, limitID: limitID},
            success: function (res) {
                var roleCode = res.dto.currentRole.roleCode;
                    _loadGroupTaskList(res.dto.groupTaskList);
                    _loadMyTaskList(res.dto.ownTaskList, roleCode);
                    _loadRejectedList(res.dto.rejectedTaskList);
                    if (loadDropdown) {
                        _getServiceStatusDropdownList(res.dto.serviceStatusDropdownList);
                    }
                }
        });
    }

    /*To get NDI applications*/
    function getNDITaskList() {
        $.ajax({
            url: _baseURL() + 'getNDITaskList',
            type: 'GET',
            success: function (res) {
                //debugger;
                //var roleCode = res.dto.currentRole.roleCode;
                _loadNDITaskList(res.dto.ndiTaskList);
            }
        });
    }

    function _loadGroupTaskList(dto) {
        if(dto.length >=1){
            var locationName = dto[0].locationName;
        }
        var columnDef = "";
        if(locationName == null){
            columnDef = [
                {
                    data: 'applicationNumber', render: function (data) {
                    return '<input type="hidden" id="applicationNumber" value="' + data + '"/> \
                            <a href="javascript:void(0)" id="applicationNumberLink">' + data + '</a>';
                }
                },
                {data: 'serviceName'},
                {
                    data: 'submissionDate', render: function (data) {
                    return dateFormatAS(data);
                }
                },
                {
                    data: 'statusShortDesc', render: function (data) {
                    return '<input type="hidden" id="statusShortDes" value="' + data + '"/><span class="status-icon bg-success"></span> ' + data;
                }
                },
                {
                    data: 'actionDate', render: function (data) {
                    return dateFormatAS(data);
                }
                }
            ];
        } else {
            columnDef = [
                {
                    data: 'applicationNumber', render: function (data) {
                    return '<input type="hidden" id="applicationNumber" value="' + data + '"/> \
                            <a href="javascript:void(0)" id="applicationNumberLink">' + data + '</a>';
                }
                },
                {data: 'serviceName'},
                {
                    data: 'submissionDate', render: function (data) {
                    return dateFormatAS(data);
                }
                },
                {
                    data: 'statusShortDesc', render: function (data) {
                    return '<input type="hidden" id="statusShortDes" value="' + data + '"/><span class="status-icon bg-success"></span> ' + data;
                }
                },
                {
                    data: 'actionDate', render: function (data) {
                    return dateFormatAS(data);
                }
                },
                {
                    data: 'locationName'
                }
            ];
        }

        if (dto.length > 0) {
            var groupCount = dto.length;
            $('#groupTaskListCount').html('(Showing '+groupCount+' rows)');
            groupTaskListGrid.dataTable().fnDestroy();
            groupTaskListGrid.find('tbody').empty();
            groupTaskListGrid.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            var groupCount = dto.length;
            $('#groupTaskListCount').html('(Showing '+groupCount+' rows)');
            groupTaskListGrid.dataTable().fnDestroy();
            groupTaskListGrid.find('tbody').empty();
            groupTaskListGrid.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }

    function _loadMyTaskList(dto,roleCode) {
        if(dto.length >=1){
            var locationName = dto[0].locationName;
        }
        var columnDef = "";
        if(locationName == null){
            if(roleCode != "CC Operator" || roleCode != "DCRCO_OPERATOR" || roleCode !="DCRC_HQ_OP"){
                columnDef = [
                    {
                        data: 'applicationNumber', render: function (data) {
                        return ' <button class="btn btn-sm btn-danger" id="releaseTask" type="button">&nbsp;&nbsp;<i class="fa fa-times"></i></button>' +
                            '<input type="hidden" id="applicationNumber" value="' + data + '"/><a href="javascript:void(0)" id="applicationNumberLink">' + data + '</a>';
                    }
                    },
                    {
                        data: {serviceName: 'serviceName', serviceShortDesc: 'serviceShortDesc'}, render: function (data) {
                        return '<input type="hidden" id="serviceShortDesc" value="' + data.serviceShortDesc + '"/>' + data.serviceName;
                    }
                    },
                    {
                        data: 'submissionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    },
                    {
                        data: 'statusShortDesc', render: function (data) {
                        return '<input type="hidden" id="statusShortDes" value="' + data + '"/><span class="status-icon bg-success"></span> ' + data;
                    }
                    },
                    {
                        data: 'actionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    }
                ];
            } else {
                columnDef = [
                    {
                        data: 'applicationNumber', render: function (data) {
                        return ' <input type="hidden" id="applicationNumber" value="' + data + '"/><a href="javascript:void(0)" id="applicationNumberLink">' + data + '</a>';
                    }
                    },
                    {
                        data: {serviceName: 'serviceName', serviceShortDesc: 'serviceShortDesc'}, render: function (data) {
                        return '<input type="hidden" id="serviceShortDesc" value="' + data.serviceShortDesc + '"/>' + data.serviceName;
                    }
                    },
                    {
                        data: 'submissionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    },
                    {
                        data: 'statusShortDesc', render: function (data) {
                        return '<input type="hidden" id="statusShortDes" value="' + data + '"/><span class="status-icon bg-success"></span> ' + data;
                    }
                    },
                    {
                        data: 'actionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    }
                ];
            }
        } else {
            if(roleCode != "CC Operator" || roleCode != "DCRCO_OPERATOR" || roleCode !="DCRC_HQ_OP") {
                columnDef = [
                    {
                        data: 'applicationNumber', render: function (data) {
                        return ' <button class="btn btn-sm btn-danger" id="releaseTask" type="button">&nbsp;&nbsp;<i class="fa fa-times"></i></button>' +
                            '<input type="hidden" id="applicationNumber" value="' + data + '"/><a href="javascript:void(0)" id="applicationNumberLink">' + data + '</a>';
                    }
                    },
                    {
                        data: {serviceName: 'serviceName', serviceShortDesc: 'serviceShortDesc'},
                        render: function (data) {
                            return '<input type="hidden" id="serviceShortDesc" value="' + data.serviceShortDesc + '"/>' + data.serviceName;
                        }
                    },
                    {
                        data: 'submissionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    },
                    {
                        data: 'statusShortDesc', render: function (data) {
                        return '<input type="hidden" id="statusShortDes" value="' + data + '"/><span class="status-icon bg-success"></span> ' + data;
                    }
                    },
                    {
                        data: 'actionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    },
                    {data: 'locationName'}
                ];
            } else {
                columnDef = [
                    {
                        data: 'applicationNumber', render: function (data) {
                        return '<input type="hidden" id="applicationNumber" value="' + data + '"/><a href="javascript:void(0)" id="applicationNumberLink">' + data + '</a>';
                    }
                    },
                    {
                        data: {serviceName: 'serviceName', serviceShortDesc: 'serviceShortDesc'},
                        render: function (data) {
                            return '<input type="hidden" id="serviceShortDesc" value="' + data.serviceShortDesc + '"/>' + data.serviceName;
                        }
                    },
                    {
                        data: 'submissionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    },
                    {
                        data: 'statusShortDesc', render: function (data) {
                        return '<input type="hidden" id="statusShortDes" value="' + data + '"/><span class="status-icon bg-success"></span> ' + data;
                    }
                    },
                    {
                        data: 'actionDate', render: function (data) {
                        return dateFormatAS(data);
                    }
                    },
                    {data: 'locationName'}
                ];
            }
        }
        if (dto.length > 0) {
            var groupCount = dto.length;
            $('#myTaskListCount').html('(Showing '+groupCount+' rows)');
            myTaskListGrid.dataTable().fnDestroy();
            myTaskListGrid.find('tbody').empty();
            myTaskListGrid.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            var groupCount = dto.length;
            $('#myTaskListCount').html('(Showing '+groupCount+' rows)');
            myTaskListGrid.dataTable().fnDestroy();
            myTaskListGrid.find('tbody').empty();
            myTaskListGrid.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }

    function _loadRejectedList(dto) {
        var columnDef = [
            {
                data: 'applicationNumber', render: function (data) {
                return '<input type="hidden" id="applicationNumber" value="' + data + '"/> \
                            <a href="javascript:void(0)" id="applicationNumberLink">' + data + '</a>';
            }
            },
            {
                data: {serviceName: 'serviceName', serviceShortDesc: 'serviceShortDesc'}, render: function (data) {
                return '<input type="hidden" id="serviceShortDesc" value="' + data.serviceShortDesc + '"/>' + data.serviceName;
            }
            },
            {
                data: 'actorName'
            },
            {
                data: 'actionDate', render: function (data) {
                return dateFormatAS(data);
            }
            },
            {data: 'remarks'}
        ];
        if (dto.length > 0) {
            var rejectCount = dto.length;
            $('#rejectedListCount').html('(Showing '+rejectCount+' rows)');
            rejectedListGrid.dataTable().fnDestroy();
            rejectedListGrid.find('tbody').empty();
            rejectedListGrid.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            var rejectCount = dto.length;
            $('#rejectedListCount').html('(Showing '+rejectCount+' rows)');
            rejectedListGrid.dataTable().fnDestroy();
            rejectedListGrid.find('tbody').empty();
            rejectedListGrid.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }

    /*Ndi table lists*/
    function _loadNDITaskList(dto) {
        var columnDef = [
            {
                data: 'applicationNumber', render: function (data) {
                return '<input type="hidden" id="applicationNumber" value="' + data + '"/> \
                             <a href="javascript:void(0)" id="CIDNumberLink">' + data + '</a>';
            }
            },
            {
                data: 'locationName'
            },
            {
                data: 'actorName'
            },
            {
                data: 'submissionDate', render: function (data) {
                return dateFormatAS(data);
            }
            }
        ];
        if (dto.length > 0) {
            var ndiCount = dto.length;
            $('#ndiListCount').html('(Showing '+ndiCount+' rows)');
            ndiListGrid.dataTable().fnDestroy();
            ndiListGrid.find('tbody').empty();
            ndiListGrid.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            var ndiCount = dto.length;
            $('#ndiListCount').html('(Showing '+ndiCount+' rows)');
            ndiListGrid.dataTable().fnDestroy();
            ndiListGrid.find('tbody').empty();
            ndiListGrid.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }

    function _getServiceStatusDropdownList(res) {
        dcrc_lib.loadDropDown($('#serviceTypeID'), res, 'string');
    }

    /**
     * To claim the task from the task list
     */
    function claimTaskFromList() {
        $('#groupTaskListGrid').on('click', 'tbody tr #applicationNumberLink', function () {
            var applicationNumber = $(this).closest('tr').find('#applicationNumber').val();
            var statusCode = $(this).closest('tr').find('#statusShortDes').val();

            if (isSubmitted) {
                warningMsg(taskListMsg.processingFormData);
                return;
            }
            isSubmitted = true;

            $.ajax({
                url: _baseURL() + 'claimTask',
                type: 'POST',
                data: {applicationNumber: applicationNumber, statusCode: statusCode},
                success: function (res) {
                    if (res.status == 1) {
                        getGroupTaskList('', '', 0, false);
                        // successMsg(res.text);
                        $('#claimedMsgId').html(res.text);
                        $('#claimedMsgId').show();
                        setTimeout(function() {
                            $('#claimedMsgId').html('');
                        }, 3000);
                    } else if (res.status == 5) {
                        //warningMsg(res.text);
                    } else {
                        //errorMsg(res.text);
                    }
                }, complete: function () {
                    isSubmitted = false;
                }
            });
        });
    }

    /**
     * To release task from the task list
     */
    function releaseTaskFromList() {
        $('#myTaskListGrid').on('click', 'tbody tr #releaseTask', function () {
            var applicationNumber = $(this).closest('tr').find('#applicationNumber').val();
            var statusCode = $(this).closest('tr').find('#statusShortDes').val();

            if (isSubmitted) {
                warningMsg(taskListMsg.processingFormData);
                return;
            }

            isSubmitted = true;

            $.ajax({
                url: _baseURL() + 'releaseTask',
                type: 'POST',
                data: {applicationNumber: applicationNumber, statusCode: statusCode},
                success: function (res) {
                    if (res.status == 1) {
                        getGroupTaskList('', '', 0, false);
                        successMsg(res.text);
                    } else if (res.status == 5) {
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }, complete: function () {
                    isSubmitted = false;
                }
            });
        });
    }

    /**
     * To redirect to
     */
    function redirectToSubmittedApplication() {
        $('#myTaskListGrid').on('click', 'tbody tr #applicationNumberLink', function () {
            var applicationNumber = $(this).closest('tr').find('#applicationNumber').val();
            var serviceCode = $(this).closest('tr').find('#serviceShortDesc').val();
            var statusCode = $(this).closest('tr').find('#statusShortDes').val();
            var redirect = 'redirect?applicationNumber=' + applicationNumber + '&serviceCode=' + serviceCode + '&statusCode=' + statusCode;
            window.location.href = _baseURL() + redirect
        });
    }
    function showNDIDetails() {
        $('#ndiListGrid').on('click', 'tbody tr #CIDNumberLink', function () {
            var applicationNumber = $(this).closest('tr').find('#applicationNumber').val();
            var redirect = '?cid='+ applicationNumber;
            window.location.href = _diffbaseURL() + redirect
        });
    }



    /**
     * To redirect to rejected application
     */
    function redirectToRejectedApplication() {
        $('#rejectedListGrid').on('click', 'tbody tr #applicationNumberLink', function () {
            var applicationNumber = $(this).closest('tr').find('#applicationNumber').val();
            var serviceCode = $(this).closest('tr').find('#serviceShortDesc').val();
            var statusCode = $(this).closest('tr').find('#statusShortDes').val();
            var redirect = 'redirect?applicationNumber=' + applicationNumber + '&serviceCode=' + serviceCode + '&statusCode=' + statusCode;
            window.location.href = _baseURL() + redirect
        });
    }

    return {
        filterApplicationList: filterApplicationList,
        getGroupTaskList: getGroupTaskList,
        getNDITaskList: getNDITaskList,
        claimTaskFromList: claimTaskFromList,
        releaseTaskFromList: releaseTaskFromList,
        redirectToSubmittedApplication: redirectToSubmittedApplication,
        redirectToRejectedApplication: redirectToRejectedApplication,
        showNDIDetails:showNDIDetails
    }
})();

$(document).ready(function () {
    taskList.filterApplicationList();
    if($('#roleId').val()=="26079") {
        taskList.getNDITaskList();
    }else if($('#roleId').val()=="26053"){

    }else{
        taskList.getGroupTaskList('', '', 0, true);
    }
    taskList.claimTaskFromList();
    taskList.releaseTaskFromList();
    taskList.redirectToSubmittedApplication();
    taskList.redirectToRejectedApplication();
    taskList.showNDIDetails();
});