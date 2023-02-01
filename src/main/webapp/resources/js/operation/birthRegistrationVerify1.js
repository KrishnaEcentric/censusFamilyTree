/**
 * Created by Hidhen on 26-Jul-19.
 */
var birthRegistrationVerify1Msg = {
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

var birthRegistrationVerify1 = (function () {
    "use strict";
    var isSubmitted = false;
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');
    var applicationNumber = $('#applicationNumber').val();

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'birthRegistrationVerify1/';
    }

    function getIndividualInformation1() {
        $.ajax({
            url: _baseURL() + 'getIndividualInformation1',
            type: 'GET',
            data: {applicationNumber: applicationNumber},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    populate(res.dto.fatherInformationDTO);
                    populate(res.dto.motherInformationDTO);
                    populate(res.dto.householdDTO);
                   /* const months=["01","02","03","04","05","06","07","08","09","10","11","12"];
                    var formatted_date=new Date(res.dto.dob).getDate() + "/" + months[new Date(res.dto.dob).getMonth()] + "/" + new Date(res.dto.dob).getFullYear();
                    $('#dob').val(formatted_date);*/
                    var date = res.dto.date_of_birth;
                    //var newdate = date.split("-").reverse().join("/");
                    $('#dob').val(date);
                    var fullName = res.dto.firstName.concat(" ").concat(res.dto.middleName).concat(" ").concat(res.dto.lastName);
                    $('#fullName').val(fullName);
                    $('#genderM').val(res.dto.gender);
                    if(res.dto.countryOfBirthName == "Bhutan"){
                        $('#dzoGewogId').removeClass("hidden");
                        $('#villageId').removeClass("hidden");
                    }else{
                        $('#presentAddresId').removeClass("hidden");
                    }
                    var documentDto = res.dto.applicationDocumentDTOList;
                    var birthDoctbl = '';
                    var m=0;
                    for(var i in documentDto){
                        m++;
                        birthDoctbl = birthDoctbl +"<tr>" +
                        "<td>"+m+"</td>" +
                        "<td>"+documentDto[i].documentName+"</td>" +
                        "<td><a href='" + _baseURL() + "/viewDownload?documentPath=" + documentDto[i].uploadURL + "' target='_blank'> View </a></td>" +
                        "</tr>"
                    }
                    $('#birthRegAttachmentId').find('tbody').html(birthDoctbl);
                }
            }
        });
    }

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton){
                case 'btnPersonalDetailsNextV':
                    if(validateNewBornDtls()==true){
                       $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                       $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                       $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                       $("#placeOfBirthId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                       $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    }
                    break;
                case 'btnPlaceOfBirthNextV':
                        $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active').removeAttr('style');
                        $("#placeOfBirthId").css({"color": "white", "background-color": "#120f65"});
                        $('#placeOfBirthCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#fatherDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#fatherDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnFathersDetailsNext':
                        $('#fatherDetailsHead, #fatherDetailsContent').removeClass('active').removeAttr('style');
                        $("#fatherDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#fatherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#motherDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#motherDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnMotherDetailsNext':
                        $('#motherDetailsHead, #motherDetailsContent').removeClass('active').removeAttr('style');
                        $("#motherDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#motherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#personAttendedId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#personAttendedContent').prop('class', 'tab-pane active');
                    break;
                case 'btnPersonAttendedNext':
                    if(validate_cc()==true) {
                        $('#personAttendedHead, #personAttendedContent').removeClass('active').removeAttr('style');
                        $("#personAttendedId").css({"color": "white", "background-color": "#120f65"});
                        $('#personAttendedCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#attachmentId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#attachmentContent').prop('class', 'tab-pane active');

                    }else{
                        $('#personAttendedHead, #personAttendedContent').removeClass('active').removeAttr('style');
                        $("#personAttendedId").css({"color": "white", "background-color": "#120f65"});
                        $('#personAttendedCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#personAttendedId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#personAttendedContent').prop('class', 'tab-pane active');
                    }
                    break;
                default :
                    break;
            }
        });
    }

    function validateNewBornDtls(){
        var isValid = true;
        if($('#firstnamebh').val() == ''){
            $('#firstnamebh').focus();
            warningMsg("Enter dzongkha name for child");
             isValid=false;
        }
        return isValid;
    }

    function validate_cc() {
        var isValid = true;
        debugger;
        if($('#motherTongue').val() == ''){
            isValid=false;
            warningMsg("Please update Mother Tongue");
            return isValid;
        }else if($('#religionId').val() == ''){
            alert($('#religionId').val());
            isValid=false;
            warningMsg("Please update Religion");
            return isValid;
        }else if($('#zodicSign').val() == ''){
            isValid=false;
            warningMsg("Please update Zodiac Sign");
            return isValid;
        }else if($('#censusStatus').val() == ''){
            isValid=false;
            warningMsg("Please update Census Status");
            return isValid;
        }
    }
    /**
     * To go to previous tab using previous button
     */
    function previousTab() {
        $('.btnPrevious').on('click', function () {
            var previousButton = $(this).prop('id');
            switch (previousButton) {
                case 'btnPlaceOfBirthPrev':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

                    $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active');
                    $("#placeOfBirthId").css("background-color", "#120f65");
                    break;
                case 'btnFathersDetailsPrev':
                    $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    $("#placeOfBirthId").css("background-color", "rgb(18, 18, 19)");
                    $('#placeOfBirthCheck').empty();

                    $('#fatherDetailsHead, #fatherDetailsContent').removeClass('active');
                    $("#fatherDetailsId").css("background-color", "#120f65");
                    break;
                case 'btnMotherDetailsPrev':
                    $('#fatherDetailsContent').prop('class', 'tab-pane active');
                    $("#fatherDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#fatherDetailsCheck').empty();

                    $('#motherDetailsHead, #motherDetailsContent').removeClass('active');
                    $("#motherDetailsId").css("background-color", "#120f65");
                    break;
                case 'btnPersonAttendedPrev':
                    $('#motherDetailsContent').prop('class', 'tab-pane active');
                    $("#motherDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#motherDetailsCheck').empty();

                    $('#personAttendedHead, #personAttendedContent').removeClass('active');
                    $("#personAttendedId").css("background-color", "#120f65");
                    break;
                case 'btnAttachmentPrev':
                    $('#personAttendedContent').prop('class', 'tab-pane active');
                    $("#personAttendedId").css("background-color", "rgb(18, 18, 19)");
                    $('#personAttendedCheck').empty();

                    $('#attachmentHead, #attachmentContent').removeClass('active');
                    $("#attachmentId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }
    /**
     * To verify by level I.
     */
    function verify() {
        $('#btnVerify').on('click', function (e) {
            $.ajax({
                url: _baseURL() + '/verifyLevel1',
                type: 'POST',
                data: {applicationNumber:$('#applicationNumber').val(),firstnamebh:$('#firstnamebh').val(),applicationStatusType:$('#applicationStatusType').val()},
                success: function (res) {
                    if (res.status == '1') {
                        successMsgRedirect(res.text, 'taskList');
                    } else {
                        warningMsg('Not able to verify this application, please try again.');
                    }
                }
            });
        })
    }

    /**
     * To verify by level II.
     */
    function verifyII() {
        $('#btnVerifyII').on('click', function (e) {
            $.ajax({
                url: _baseURL() + '/verifyLevel2',
                type: 'POST',
                data: {applicationNumber:$('#applicationNumber').val(),motherTongue:$('#motherTongue').val(),religionId:$('#religionId').val(),zodicSign:$('#zodicSign').val(),censusStatus:$('#censusStatus').val(),applicationStatusType:$('#applicationStatusType').val()},
                success: function (res) {
                    if (res.status == '1') {
                        successMsgRedirect(res.text, 'taskList');
                    } else {
                        warningMsg('Not able to verify this application, please try again.');
                    }
                }
            });
        })
    }
    /**
     * To approve.
     */
    function approve() {
        $('#btnApprove').on('click', function (e) {
            $.ajax({
                url: _baseURL() + '/approve',
                type: 'POST',
                data: {applicationNumber:$('#applicationNumber').val(),censusStatus:$('#censusStatusDesc').val(),firstnamebh:$('#firstnamebh').val()},
                success: function (res) {
                    if (res.status == '1') {
                        successMsg(res.text);
                        $('#confirmationModel').modal('hide');
                        $('#mainDiv').addClass('hidden');
                        $('#certDiv').removeClass('hidden');
                    } else {
                        warningMsg('Not able to approve this application, please try again.');
                    }
                }
            });
        })
    }

    function sendBack() {
        $('#mainResubmitV1').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            var roleId=$('#userList').val().split("-");
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            $('#resubBtnV1').attr('disabled', true);
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
                        $('#resubBtnV1').attr('disabled', false);
                    }
                });
            }else{
                $('#reasonRemarks').focus();
            }
        });
    }

    function resubmit(){
        $('#resubBtnV1').on('click', function () {
            $('#userList').empty();
            var app = $('#applicationNumber').val();
            $.ajax({
                url: _baseURL() + 'getUserList',
                type: 'GET',
                data: {appNo: app},
                success: function (res) {
                    for(var i=0;i<res.length;i++){
                        $('#userList').append("<option value="+res[i].roleID+"-"+res[i].roleName+">"+res[i].roleName+"</option>").trigger('chosen:updated');
                    }
                    $('#resubBtnV1').prop('disabled',true);
                    $('#UserDIv').show();
                }
            });
        });
    }

    function resubmitV2(){
        $('#resubBtnV2').on('click', function () {
            $('#userList').empty();
            var app = $('#applicationNumber').val();
            $.ajax({
                url: _baseURL() + 'getUserList',
                type: 'GET',
                data: {appNo: app},
                success: function (res) {
                    for(var i=0;i<res.length;i++){
                        $('#userList').append("<option value="+res[i].roleID+"-"+res[i].roleName+">"+res[i].roleName+"</option>").trigger('chosen:updated');
                    }
                    $('#resubBtnV2').prop('disabled',true);
                    $('#UserDIv').show();
                }
            });
        });
    }


    function resubmitV3(){
        $('#resubBtnV3').on('click', function () {
            $('#userList').empty();
            var app = $('#applicationNumber').val();
            $.ajax({
                url: _baseURL() + 'getUserList',
                type: 'GET',
                data: {appNo: app},
                success: function (res) {
                    for(var i=0;i<res.length;i++){
                        $('#userList').append("<option value="+res[i].roleID+"-"+res[i].roleName+">"+res[i].roleName+"</option>").trigger('chosen:updated');
                    }
                    $('#resubBtnV3').prop('disabled',true);
                    $('#UserDIv').show();
                }
            });
        });
    }

    function reject() {
        $('#btnReject').on('click', function () {
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

    function generate(){
        $('#generateId').on('click', function (e) {
            window.open('/dcrc/birthRegistrationVerify1/printCertificateBirthReg?applicationNumber=' + $('#applicationNumber').val());
        })
    }

    function removeErrorClass() {
        $('.form-control').on('keypress', function () {
            $(this).removeClass('error');
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
                for(var i=0;i<res.dto.length;i++){
                    tr+='<tr>'
                    +'<td>'+res.dto[i].statusName+'</td>'
                    +'<td>'+res.dto[i].actorName+'</td>'
                    +'<td>'+res.dto[i].timeOfDeath+'</td>'
                    +'<td>'+res.dto[i].remarks+'</td>'
                    +'</tr>';
                }
                $('#tbody').append(tr);
                $('#messageHide').hide();

            }, complete: function () {
                $('#btnViewDetails').attr('disabled', false);
                $('#viewStatusDetailDiv').show();
                isSubmitted = false;
            }
        });
    }
    return {
        getIndividualInformation1: getIndividualInformation1,
        nextTab: nextTab,
        previousTab: previousTab,
        verify: verify,
        verifyII: verifyII,
        approve: approve,
        sendBack: sendBack,
        reject: reject,
        generate: generate,
        resubmit: resubmit,
        resubmitV2: resubmitV2,
        resubmitV3: resubmitV3,
        getApplicationDetails: getApplicationDetails,
        removeErrorClass: removeErrorClass
    };
})();

$(document).ready(function () {
    $('#personalDetailsHead').prop('class', 'active').not('.active').addClass('enabled');
    $('#personalDetailsContent').prop('class', 'tab-pane active');
    $("#personalDetailsId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#placeOfBirthHead').not('.active').addClass('disabled');
    $('#placeOfBirthHead').not('.active').find('a').removeAttr("data-toggle");

    $('#fatherDetailsHead').not('.active').addClass('disabled');
    $('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#motherDetailsHead').not('.active').addClass('disabled');
    $('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#personAttendedHead').not('.active').addClass('disabled');
    $('#personAttendedHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    birthRegistrationVerify1.getIndividualInformation1();
    birthRegistrationVerify1.nextTab();
    birthRegistrationVerify1.previousTab();
   // birthRegistrationVerify1.addMoreDocuments();
    birthRegistrationVerify1.verify();
    birthRegistrationVerify1.verifyII();
    birthRegistrationVerify1.approve();
    birthRegistrationVerify1.sendBack();
    birthRegistrationVerify1.reject();
    birthRegistrationVerify1.generate();
    birthRegistrationVerify1.resubmit();
    birthRegistrationVerify1.resubmitV2();
    birthRegistrationVerify1.resubmitV3();
    birthRegistrationVerify1.getApplicationDetails();
    birthRegistrationVerify1.removeErrorClass();

});
