/**
 * Created by Hidhen on 26-Jul-19.
 */
var nameDateOfBirthChangeMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    selectChanges: 'Please choose DOB or Name to change.'
};

var nameDateOfBirthChangeApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');
    var changeSpouseInfoHeader = $('#changeSpouseInfoHeader');
    var changeSpouseInfoDetails = $('#changeSpouseInfoDetails');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'nameDateOfBirthChangeApprove/';
    }

    /**
     * To get the individual information
     */
    function getIndividualInformationByAppNo() {
        var applicationNumber = $('#applicationNumber').val();
        $.ajax({
            url: _baseURL() + 'getIndividualInformationByAppNo',
            type: 'GET',
            data: {applicationNumber: applicationNumber},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    populate(res.dto.nameDateOfBirthChangeDTO);
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);

                   $('#dob').val(dateFormatAS(res.dto.dob));
                    if(res.dto.oldNameDateOfBirthChangeDTO !=null) {
                        $('#oldFirstNameBh').val(res.dto.oldNameDateOfBirthChangeDTO.oldFirstNameBh);
                        $('#oldFirstName').val(res.dto.oldNameDateOfBirthChangeDTO.oldFirstName);
                        $('#oldMiddleName').val(res.dto.oldNameDateOfBirthChangeDTO.oldMiddleName);
                        $('#oldLastName').val(res.dto.oldNameDateOfBirthChangeDTO.oldLastName);
                        $('#oldDoB').val(res.dto.oldNameDateOfBirthChangeDTO.oldDoB);
                    }
                    if($('#changeRequestID').val()=='Others'){
                        $('#otherReasonDiv').removeClass('hidden');
                    }
                    var date = res.dto.nameDateOfBirthChangeDTO.requestedDoB;
                    if(date != null ){
                        var newdate = date.split("-").reverse().join("/");
                        $('#newDoB').val(date);
                    }

                    $('.reset').val('');
                    $('.fatherDetails').val('');
                    $('.motherDetails').val('');
                    $('.hohDetails').val('');

                    changedData(res.dto.nameDateOfBirthChangeDTO.newFirstName,newdate);
                }
            }
        });
    }

    function _populateFatherDetails(dto) {
        var fatherName = _isNull(dto.fatherFirstName) + ' ' + _isNull(dto.fatherMiddleName) + ' ' + _isNull(dto.fatherLastName);
        $('#fatherCidNo').val(dto.fatherCidNo);
        $('#fatherName').val(fatherName);
    }

    function _populateMotherDetails(dto) {
        var name = _isNull(dto.motherFirstName) + ' ' + _isNull(dto.motherMiddleName) + ' ' + _isNull(dto.motherLastName);
        $('#motherCidNo').val(dto.motherCidNo);
        $('#motherName').val(name);
    }

    function _isNull(data) {
        return data === null ? '' : data;
    }

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton) {
                case 'btnPersonalDetailsNext':
                    $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                    $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#placeOfBirthId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    break;
                case 'btnPlaceOfBirthNext':
                    $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active').removeAttr('style');
                    $("#placeOfBirthId").css({"color": "white", "background-color": "#120f65"});
                    $('#placeOfBirthCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#presentAddressId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    break;
                case 'btnPresentAddressNext':
                    $('#presentAddressHead, #presentAddressContent').removeClass('active').removeAttr('style');
                    $("#presentAddressId").css({"color": "white", "background-color": "#120f65"});
                    $('#presentAddressCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#parentsDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#parentsDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnParentsDetailsNext':
                    $('#parentsDetailsHead, #parentsDetailsContent').removeClass('active').removeAttr('style');
                    $("#parentsDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#parentsDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#requestApplicationId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#requestApplicationContent').prop('class', 'tab-pane active');
                    break;
                case 'btnRequestApplicationNext':
                    $('#requestApplicationHead, #requestApplicationContent').removeClass('active').removeAttr('style');
                    $("#requestApplicationId").css({"color": "white", "background-color": "#120f65"});
                    $('#requestApplicationCheck').html('<i class="fa fa-check text-white"></i>');

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
                case 'btnPlaceOfBirthPrev':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

                    $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active');
                    $("#placeOfBirthId").css("background-color", "#120f65");
                    break;
                case 'btnPresentAddressPrev':
                    $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    $("#placeOfBirthId").css("background-color", "rgb(18, 18, 19)");
                    $('#placeOfBirthCheck').empty();

                    $('#presentAddressHead, #presentAddressContent').removeClass('active');
                    $("#presentAddressId").css("background-color", "#120f65");
                    break;
                case 'btnParentsDetailsPrev':
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    $("#presentAddressId").css("background-color", "rgb(18, 18, 19)");
                    $('#presentAddressCheck').empty();

                    $('#parentsDetailsHead, #parentsDetailsContent').removeClass('active');
                    $("#parentsDetailsId").css("background-color", "#120f65");
                    break;
                case 'btnRequestApplicationPrev':
                    $('#parentsDetailsContent').prop('class', 'tab-pane active');
                    $("#parentsDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#parentsDetailsCheck').empty();

                    $('#requestApplicationHead, #requestApplicationContent').removeClass('active');
                    $("#requestApplicationId").css("background-color", "#120f65");
                    break;
                case 'attachmentPrevious':
                    $('#requestApplicationContent').prop('class', 'tab-pane active');
                    $("#requestApplicationId").css("background-color", "rgb(18, 18, 19)");
                    $('#requestApplicationCheck').empty();

                    $('#attachmentHead, #attachmentContent').removeClass('active');
                    $("#attachmentId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }

    function changedData(newFirstName,requestedDoB) {
        if(newFirstName != null && (requestedDoB != undefined)){
            $('#changedDoB').prop('checked',true);
            $('#changedName').prop('checked',true);
            $('#dzoEngFirstName').removeClass('hidden');
            $('#midLastName').removeClass('hidden');
            $('#newdobId').removeClass('hidden');
        }else if (newFirstName != null){
                $('#changedName').prop('checked',true);
                $('#dzoEngFirstName').removeClass('hidden');
                $('#midLastName').removeClass('hidden');
            } else if(requestedDoB !=undefined){
                $('#changedDoB').prop('checked',true);
                $('#newdobId').removeClass('hidden');
            }
    }

    function approveChangeNameDoB() {
        $('#approveBtnId').on('click', function (e) {
            $.ajax({
                url: _baseURL() + '/approve',
                type: 'POST',
                data: {applicationNumber: $('#applicationNumber').val()},
                success: function (res) {
                    if (res.status == '1') {
                        successMsgRedirect(res.text, 'taskList');
                    } else {
                        warningMsg('Not able to approve this application, please try again.');
                    }
                }
            });
        })
    }

    function sendBack() {
        $('#btnResubmit').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            var userList=$('#userList').val();
            if($('#vRemarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#vRemarks').val(),userList:userList},
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
                $('#vRemarks').focus();
            }
        });
    }
/*
    function resubmit(){
        $('#resubBtn').on('click', function (e) {
            $('#UserDIv').show();
        })
    }
*/

    function reject() {
        $('#btnReject').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            if($('#vRemarks').val() != ''){
                $.ajax({
                    url: _baseURL() + 'reject',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#vRemarks').val()},
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
                $('#vRemarks').focus();
            }

        });
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
        getIndividualInformationByAppNo: getIndividualInformationByAppNo,
        nextTab: nextTab,
        previousTab: previousTab,
        sendBack: sendBack,
        reject: reject,
        getApplicationDetails: getApplicationDetails,
        approveChangeNameDoB: approveChangeNameDoB
    };

})();

$(document).ready(function () {
    $('#personalDetailsHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#personalDetailsContent').prop('class', 'tab-pane active');
    $("#personalDetailsId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#placeOfBirthHead').not('.active').addClass('disabled');
    $('#placeOfBirthHead').not('.active').find('a').removeAttr("data-toggle");

    $('#presentAddressHead').not('.active').addClass('disabled');
    $('#presentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#parentsDetailsHead').not('.active').addClass('disabled');
    $('#parentsDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#requestApplicationHead').not('.active').addClass('disabled');
    $('#requestApplicationHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    nameDateOfBirthChangeApprove.getIndividualInformationByAppNo();
    nameDateOfBirthChangeApprove.nextTab();
    nameDateOfBirthChangeApprove.previousTab();
    nameDateOfBirthChangeApprove.approveChangeNameDoB();
    nameDateOfBirthChangeApprove.sendBack();
    nameDateOfBirthChangeApprove.getApplicationDetails();
    nameDateOfBirthChangeApprove.reject();
});