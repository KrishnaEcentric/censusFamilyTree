/**
 * Created by Hidhen on 26-Jul-19.
 */
var censusTransferApproveMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var censusTransferApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var viewListGrid=$('#viewListGrid');
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var censusTransferType = $('#censusTransferType').val();
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'censusTransferApprove/';
    }

    /**
     * To get relation dropdown list
     */

    /**
     * To get the individual information
     */
    function getIndividualInformation() {
        var cidSrpNo = $('#cidNumber').val();
        $.ajax({
            url: _baseURL() + 'getIndividualInformation',
            type: 'GET',
            data: {cidSrpNo: cidSrpNo},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.permanentInformationDTO);
                    //_validateCensusTransferType(res.dto.permanentInformationDTO);
                    $('#hhMemberCIDNo').val(res.dto.cidNo);
                    $('#hhMemberName').val(isNull(res.dto.firstName) + isNull(res.dto.middleName) + isNull(res.dto.lastName));
                    $('#hhMemberGender').val(res.dto.gender);
                }
            }
        });
    }

    function deleteDocument(){
        $('#del_row').on('click',function(e) {
            var hrId = $(this).closest('tr').find('.documentId').val();
            $.ajax({
                url:  _baseURL() +'/deleteThisDoc?applicationNumber='+$('#applicationNumber').val() + '&documentId='+$('#documentId').val(),
                type: 'GET',
                data: {hrId:hrId}
            });
            $(this).closest('tr').remove();
        });
    }
    /**
     * To validate for new household
     */

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton) {
                case 'btnIndividualInfoNext':
                    var mobileNumber = $('#mobileNumber');
                        $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                        $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#householdInfoId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#householdInfoContent').prop('class', 'tab-pane active');

                    break;
                case 'btnHouseholdInfoNext':
                    $('#householdInfoHead, #householdInfoContent').removeClass('active');
                    $("#householdInfoId").css({"color": "white", "background-color": "#120f65"});
                    $('#householdInfoCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#attachmentId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#attachmentContent').prop('class', 'tab-pane active');
                    break;
                default :
                    break;
            }
        });
    }

    /**
     * To go to previous tab using previous button
     */
    function previousTab() {
        $('.btnPrevious').on('click', function () {
            var previousButton = $(this).prop('id');

            switch (previousButton) {
                case 'btnHouseholdInfoPrev':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

                    $('#householdInfoHead, #householdInfoContent').removeClass('active');
                    $("#householdInfoId").css("background-color", "#120f65");
                    break;
                case 'btnAttachmentPrev':
                    $('#householdInfoContent').prop('class', 'tab-pane active');
                    $("#householdInfoId").css("background-color", "rgb(18, 18, 19)");
                    $('#householdInfoCheck').empty();

                    $('#attachmentHead, #attachmentContent').removeClass('active');
                    $("#attachmentId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }

    /**
     * To save the form data.
     */
    function saveDetails() {
        $('#approved').on('click', function () {
            $.ajax({
                url: _baseURL() + 'save',
                type: 'POST',
                data: $('#censusTransferApproveForm').serializeArray(),
                success: function (res) {
                        successMsgRedirect(res.statusName, 'taskList');
                }, complete: function () {
                    $('#approved').attr('disabled', false);
                    isSubmitted = false;
                }
            });
        });
    }

    function resubmit(){
        $('#resubBtn').on('click', function () {
            $('#userList').empty();
            var app = $('#applicationNumber').val();
            $.ajax({
                url: _baseURL() + 'getUserList',
                type: 'GET',
                data: {appNo: app},
                success: function (res) {
                    $('#userList').append("<option value=''>Select User</option>");
                    for(var i=0;i<res.length;i++){
                        $('#userList').append("<option value="+res[i].roleID+"-"+res[i].roleName+">"+res[i].roleName+"</option>").trigger('chosen:updated');
                    }
                    $('#resubBtn').prop('disabled',true);
                    $('#UserDIv').show();
                }
            });
        });
    }

    function getIndividualCitizenInformation() {
        $('#cidNoResubmit').on('change', function () {
            var cidNoResubmit = $(this);
            $.ajax({
                url: _baseURL() + 'getIndividualCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: cidNoResubmit.val()},
                success: function (res) {
                    if (res.status == 1) {
                        populate(res.dto);
                        populate(res.dto.citizenDetails);
                        populate(res.dto.permanentInformationDTO);
                        populate(res.dto.fatherInformationDTO);
                        populate(res.dto.motherInformationDTO);
                        populate(res.dto.permanentInformationDTO);
                        populate(res.dto.presentInformationDTO);
                        populate(res.dto.deathRegistrationDTO);
                        populate(res.dto.attendDTO);

                        /* $('#hhMemberCIDNo').val(res.dto.cidNo);
                         $('#hhMemberName').val(isNull(res.dto.firstName) + isNull(res.dto.middleName) + isNull(res.dto.lastName));
                         $('#hhMemberGender').val(res.dto.gender);*/
                    }
                }
            });
        });
    }

    function btnResubmitSave() {
        $('#btnResubmitSave').on('click', function () {
            $('#censusTransferResubmitForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(birthRegistrationMsg.processingFormData);
                        return;
                    }
                    $('#btnResubmitSave').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'saveResubmission',
                        type: 'POST',
                        data: new FormData(form),
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'taskList');
                            } else if (res.status == 5) {
                                warningMsg(res.text);
                            } else {
                                errorMsg(res.text)
                            }
                        }, complete: function () {
                            $('#btnResubmitSave').attr('disabled', false);
                            isSubmitted = false;
                        }
                    });
                }
            });
        });
    }

    function sendBack() {
        $('#mainResubmit').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            var roleId=$('#userList').val().split("-");
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            $('#resubBtn').attr('disabled', true);
            $('#rejBtn').attr('disabled', true);
            if($('#reasonRemarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#reasonRemarks').val(),roleId:roleId[0],roleName:roleId[1]},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'taskList');
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text)
                        }
                    }, complete: function () {
                        $('#btnResubmit').attr('disabled', false);
                    }
                });
            }else{
                $('#remarks_err').focus();
            }
        });
    }

    function addMoreDocuments() {
        $('#addMoreDocuments').on('click', function () {
            if (validateDocument(false)) {
                return;
            }
            var row = '<tr><td> \
                <input type="file" id="multipartFile" name="applicationDocumentDTOList[0].multipartFile" \
                required="required"></td> \
                <td><div class="col-sm-6"></div></td><td><div class="col-sm-6"> \
                    <button type="button" class="btn btn-danger btn-sm" id="btnRemove"> \
                <i class="fa fa-remove"></i> Remove</button></div></td></td></tr>';

            nameChangeAttachmentGrid.find('tbody').append(row);
            dcrc_lib.formIndexing(nameChangeAttachmentGrid.find('tbody'), nameChangeAttachmentGrid.find('tbody tr'));
        });
    }

    function validateDocument(condition) {
        $('#nameChangeAttachmentGrid').find('tbody tr').each(function () {
            var selected = $(this).closest('tr');

            if (selected.find('#multipartFile')[0].files.length <= 0) {
                selected.find('#multipartFile').addClass('error');
                condition = true;
            } else {
                selected.find('#multipartFile').removeClass('error');
            }
        });
        return condition;
    }

    function getApplicationDetails() {
        var applicationNumberID = $('#applicationNumber');
        $.ajax({
            url: _baseURL() + 'getApplicationDetails',
            type: 'GET',
            data: {applicationNumber: applicationNumberID.val()},
            success: function (res) {
                var tr="";
                //populate(res.dto);
                $('#applicationNo').text(applicationNumberID.val());
                $('#statusName').text(res.dto.statusName);
                _searchList(res.dto);

            }, complete: function () {
                $('#btnViewDetails').attr('disabled', false);
                $('#viewStatusDetailDiv').show();
                isSubmitted = false;
            }
        });
    }

    function _searchList(dto) {
        var columnDef = [
            {data: 'statusName'},
            {data: 'actorName'},
            {data: 'timeOfDeath'},
            //{data: 'timeOfDeath', render: function (data) {
            //    return formatAsDate(data);}
            //},
            {data: 'remarks'}
        ];

        if (dto.length > 0) {
            viewListGrid.dataTable().fnDestroy();
            viewListGrid.find('tbody').empty();
            viewListGrid.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            viewListGrid.dataTable().fnDestroy();
            viewListGrid.find('tbody').empty();
            viewListGrid.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }

    function reject() {
        $('#rejBtn').on('click', function () {
            alert('Inside Move-In and MOve-out');
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            if($('#reasonRemarks').val() != ''){
                $.ajax({
                    url: _baseURL() + 'reject',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#reasonRemarks').val()},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'taskList');
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text)
                        }
                    }, complete: function () {
                        $('#btnReject').attr('disabled', false);
                    }
                });
            }else{
                $('#reasonRemarks').focus();
            }
        });
    }

    return {
        getIndividualInformation: getIndividualInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        saveDetails: saveDetails,
        resubmit:resubmit,
        sendBack:sendBack,
        reject:reject,
        getIndividualCitizenInformation:getIndividualCitizenInformation,
        btnResubmitSave:btnResubmitSave,
        deleteDocument:deleteDocument,
        addMoreDocuments: addMoreDocuments,
        getApplicationDetails:getApplicationDetails
    };
})
();

$(document).ready(function () {
    $('#personalDetailsHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#personalDetailsContent').prop('class', 'tab-pane active');
    $("#personalDetailsId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#householdInfoHead').not('.active').addClass('disabled');
    $('#householdInfoHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    censusTransferApprove.getIndividualInformation();
    censusTransferApprove.nextTab();
    censusTransferApprove.previousTab();
    censusTransferApprove.saveDetails();
    censusTransferApprove.resubmit();
    censusTransferApprove.sendBack();
    censusTransferApprove.reject();
    censusTransferApprove.getIndividualCitizenInformation();
    censusTransferApprove.btnResubmitSave();
    censusTransferApprove.deleteDocument();
    censusTransferApprove.addMoreDocuments();
    censusTransferApprove.getApplicationDetails();
});
