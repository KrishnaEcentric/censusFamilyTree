/**
 * Created by Hidhen on 26-Jul-19.
 */
var updateIndividualInformationMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    selectChanges: 'Please select the checkboxes to change.',
    applicationNumberReq: 'Application number is required.'
};

var updateIndividualInformationApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var rejectResubmitUrl = 'reject';
    var applicationNumber = $('#applicationNumber').val();
    var changeSpouseInfoHeader = $('#changeSpouseInfoHeader');
    var changeSpouseInfoDetails = $('#changeSpouseInfoDetails');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'updateIndividualInformationApprove/';
    }

    /**
     * To get the individual information
     */
    function getIndividualInformation() {
        $.ajax({
            url: _baseURL() + 'getIndividualInformation',
            type: 'GET',
            data: {applicationNumber: applicationNumber},
            success: function (res) {
                if (res.status == 1) {
                    debugger;
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    if(res.dto.oldUpdateIndividualInformationDTO !=null) {
                        populate(res.dto.oldUpdateIndividualInformationDTO);
                    }

                    _populateUpdateIndividualInformation(res.dto.updateIndividualInformationDTO);

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

                    $('#dob').val(dateFormatAS(res.dto.dob));
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);
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

    function _populateUpdateIndividualInformation(dto) {
        debugger;
        populate(dto);
        if (!dto.changeMotherTongue) {
            $('#changeMotherTongueDiv').addClass('hidden');
        }
        if (!dto.changeReligion) {
            $('#changeReligionDiv').addClass('hidden');
        }
        if (!dto.changeHighestEducationAttained) {
            $('#changeHighestEducationAttainedDiv').addClass('hidden');
        }
        if (!dto.changePersonStatus) {
            $('#changePersonStatusDiv').addClass('hidden');
        }
        if (!dto.changeHoHRelation) {
            $('#changeHoHRelationDiv').addClass('hidden');
        }
        if (!dto.changeOccupation) {
            $('#changeOccupationDiv').addClass('hidden');
        }
        if (!dto.changeSex) {
            $('#changeSexDiv').addClass('hidden');
        }
        if (!dto.changeAdverseRecord) {
            $('#changeAdverseRecordDiv').addClass('hidden');
        }
        if (!dto.changeMaritalStatus) {
            $('#changeMaritalStatusDiv').addClass('hidden');
        }
        if (!dto.changeDisability) {
            $('#changeDisabilityDiv').addClass('hidden');
        }
        if (!dto.changeRemarks) {
            $('#changeRemarksDiv').addClass('hidden');
        }
        if (!dto.changeFatherDetails) {
            $('#changeFatherDetailsDiv').addClass('hidden');
        }
        if (!dto.changeMotherDetails) {
            $('#changeMotherDetailsDiv').addClass('hidden');
        }
        if (!dto.changeHouseholdInfo) {
            $('#changeHouseholdInfoDiv').addClass('hidden');
        }
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
                case 'btnPresentAddressPrev':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

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
                default :
                    break;
            }
        });
    }
    /**
     * To save the data.
     */
    function approve() {
        $('#btnApprove').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(updateIndividualInformationApprove.applicationNumberReq);
                return;
            }

            $('#btnApprove').attr('disabled', true);
            $.ajax({
                url: _baseURL() + 'approve',
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
                    $('#btnApprove').attr('disabled', false);
                }
            });
        });
    }

    function sendBack() {
        $('#btnResubmitId').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            if($('#reasonRemarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
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
                        $('#btnResubmit').attr('disabled', false);
                    }
                });
            }else{
                $('#reasonRemarks').focus();
            }
        });
    }

    function reject() {
        $('#btnRejectId').on('click', function () {
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
                        $('#btnRejectId').attr('disabled', false);
                    }
                });
            }else{
                $('#reasonRemarks').focus();
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
        getIndividualInformation: getIndividualInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        approve: approve,
        sendBack: sendBack,
        getApplicationDetails: getApplicationDetails,
        reject: reject
    };

})
();

$(document).ready(function () {
    $('#personalDetailsHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#personalDetailsContent').prop('class', 'tab-pane active');
    $("#personalDetailsId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#presentAddressHead').not('.active').addClass('disabled');
    $('#presentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#parentsDetailsHead').not('.active').addClass('disabled');
    $('#parentsDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#requestApplicationHead').not('.active').addClass('disabled');
    $('#requestApplicationHead').not('.active').find('a').removeAttr("data-toggle");

    updateIndividualInformationApprove.getIndividualInformation();
    updateIndividualInformationApprove.nextTab();
    updateIndividualInformationApprove.previousTab();
    updateIndividualInformationApprove.approve();
    updateIndividualInformationApprove.getApplicationDetails();
    updateIndividualInformationApprove.sendBack();
    updateIndividualInformationApprove.reject();
});
