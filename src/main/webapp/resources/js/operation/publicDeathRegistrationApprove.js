/**
 * Created by Hidhen on 26-Jul-19.
 */
var deathRegistrationApproveMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

function showConfirmation(){
    $('#confirmationModel').modal('show');
    $('#targetId').val('acknowledgementmessage');
    $('#messages').html('Are you sure to approve this Application?');
}

function closemodel(modelId){
    $('#'+modelId).modal('hide');
}

var publicDeathRegistrationApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var viewListGrid=$('#viewListGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'publicDeathRegistrationApprove/';
    }

    /**
     * To get the individual information
     */
    function getIndividualInformation() {
        var appNo=$('#applicationNumber').val();
        debugger
        $.ajax({
            url: _baseURL() + 'getIndividualInformation',
            type: 'GET',
            data: {appNo: appNo},
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
    }

    //
    //function viewAttachment(uuid,type,path,name){
    //    //var url= '${pageContext.request.contextPath}/FileDownloadServlet?uuid='+uuid+'&type='+type;
    //    var url= _baseURL+'donwloadFiles?uuid='+uuid+'&type='+type;
    //    window.open(url,'_blank');
    //}


    function updateReject(applicationNo){
        if(validateReject()){
            var url= '/publicDeathRegistrationApprove/updatereject?applicationNo='+applicationNo;
            window.open(url,'_blank');
        }
    }
    function approveApplication(applicationNo){
        var url = _baseURL+'publicDeathRegistrationApprove?applicationNo='+applicationNo;
        var options = {target:'#content_main_div',url:url,type:'GET', data: $('#publicDeathRegistrationDetailsApproveForm').serialize()};
        $("#publicDeathRegistrationDetailsApproveForm").ajaxSubmit(options);
//        var url= '/deathRegistrationApprove/approveDeathRegistration?applicationNo='+applicationNo;
//        window.open(url,'_blank');
    }

    function validateReject(){
        var return_type=true;
        if($('#remarks').val()==""){
            $('#remarks_err').html('Please Give reason/remarks');
            return_type=false;
        }
        return return_type;
    }
    function remove_err(errId){
        $('#'+errId).html('');
    }

    /**
     * To get village dropdown list
     */


    /**
     * To validate for new household


    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton) {
                case 'btnIndividualInfoNext':
                    var mobileNumber = $('#mobileNumber');
                    if (mobileNumber.val() !== '') {
                        $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                        $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#householdInfoId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#householdInfoContent').prop('class', 'tab-pane active');
                    } else {
                        mobileNumber.focus();
                    }
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
     * To add more document
     */

    /**
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            $('#censusTransferDetailsForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(censusTransferMsg.processingFormData);
                        return;
                    }
                    $('#newDzongkhagID, #newGewogID').attr('disabled', true);
                    $('#btnSave, #newDzongkhagID, #newGewogID').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'save',
                        type: 'POST',
                        data: $(form).serializeArray(),
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'censusTransferApply');
                            } else if (res.status == 5) {
                                warningMsg(res.text);
                            } else {
                                errorMsg(res.text)
                            }
                        }, complete: function () {
                            $('#btnSave').attr('disabled', false);
                            isSubmitted = false;
                        }
                    });
                }
            });
        });
    }

    function verify(){
        var applicationNo = $('#applicationNumber').val();
        var statusName=$('#statusName').val();
        $('#verifyId').on('click', function (e) {
            var remarks = $('#remarks').val();
            var url= _baseURL()+'publicApproveDeathRegistration?applicationNo='+applicationNo+'&remarks='+remarks+'&statusName='+statusName;
            window.location=url;
        })
    }

    function approve(){
        var applicationNo = $('#applicationNumber').val();
        var statusName=$('#statusName').val();
        $('#approveId').on('click', function (e) {
            var remarks = $('#remarks').val();
            var url= _baseURL()+'publicApproveDeathRegistration?applicationNo='+applicationNo+'&remarks='+remarks+'&statusName='+statusName;
            window.location=url;
            //$('#confirmationModel').modal('hide');
        })
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


    //function resubmit(){
    //    $('#resubBtn').on('click', function (e) {
    //   $('#UserDIv').show();
    //    })
    //}



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
                         var roleName = $.trim(res[i].roleName);
                         $('#userList').append('<option value='+res[i].roleID+'-'+roleName+'>'+res[i].roleName+'</option>').trigger('chosen:updated');
                     }
                    $('#resubBtn').prop('disabled',true);
                    $('#UserDIv').show();
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
            if($('#remarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#remarks').val(),roleId:roleId[0],roleName:roleId[1]},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'publicTaskList');
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text)
                        }
                    }, complete: function () {
                        $('#resubBtn').attr('disabled', false);
                    }
                });
            }else{
                $('#remarks').focus();
            }
        });
    }


    function reject() {
        $('#btnReject').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            if($('#remarks').val() != ''){
                $.ajax({
                    url: _baseURL() + 'updatereject',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#remarks').val()},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'publicTaskList');
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
        approve: approve,
        verify: verify,
        save: save,
        sendBack:sendBack,
        resubmit:resubmit,
        reject:reject,
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

    publicDeathRegistrationApprove.getIndividualInformation();
    publicDeathRegistrationApprove.nextTab();
    publicDeathRegistrationApprove.previousTab();
    publicDeathRegistrationApprove.save();
    publicDeathRegistrationApprove.approve();
    publicDeathRegistrationApprove.verify();
    publicDeathRegistrationApprove.sendBack();
    publicDeathRegistrationApprove.resubmit();
    publicDeathRegistrationApprove.reject();
    publicDeathRegistrationApprove.getApplicationDetails();



});
