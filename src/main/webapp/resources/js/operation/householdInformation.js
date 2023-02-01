/**
 * Created by Hidhen on 26-Jul-19.
 */
var householdInformationMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    requestorCidValidation: 'The Applicant and Requestor CID/SRP Number cannot be same.'
};

var householdInformation = (function () {
    "use strict";
    var isSubmitted = false;
    var changeSpouseInfoHeader = $('#changeSpouseInfoHeader');
    var changeSpouseInfoDetails = $('#changeSpouseInfoDetails');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'householdInformation/';
    }

    /**
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#btnSearch').on('click', function () {
            $('#householdInformationForm').validate({
                submitHandler: function (form) {
                    var cidSrpNoID = $('#cidSrpNo');
                    $.ajax({
                        url: _baseURL() + 'validateCidSrpNoOnly',
                        type: 'GET',
                        data: {cidSrpNo: cidSrpNoID.val()},
                        success: function (res) {
                            if (res.status === 1) {
                                changeSpouseInfoHeader.addClass('hidden');
                                changeSpouseInfoDetails.removeClass('hidden');
                                _getIndividualInformation(cidSrpNoID.val());
                            } else if (res.status == 5) {
                                cidSrpNoID.val('');
                                changeSpouseInfoHeader.removeClass('hidden');
                                changeSpouseInfoDetails.addClass('hidden');
                                warningMsg(res.text);
                            } else {
                                errorMsg(res.text)
                            }
                        }
                    });
                }
            });
        });
    }

    /**
     * To get the individual information
     */
    function _getIndividualInformation(cidSrpNo) {
        $.ajax({
            url: _baseURL() + 'getIndividualInformation',
            type: 'GET',
            data: {cidSrpNo: cidSrpNo},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    //$('#dob').val(formatAsDate(res.dto.dob));
                    $('.reset').val('');
                    $('.fatherDetails').val('');
                    $('.motherDetails').val('');
                    $('.hohDetails').val('');
                }
            }
        });
    }

    /**
     * To validate the application for self or others
     */
    function validateApplicantOthers() {
        $('.requestFor').on('click', function () {
            var requestFor = $(this).val();
            $('#selfIDError').text('');
            if (requestFor == 1) {
                $('#requestForOtherDiv').addClass('hidden');
                $('#requestorCidNo').attr('disabled', true);
            } else {
                $('#requestForOtherDiv').removeClass('hidden');
                $('#requestorCidNo').attr('disabled', false).removeClass('error');
            }
        });
    }

    /**
     * To application for self or others details
     */
    function getCitizenInformation() {
        $('#requestorCidNo').on('change', function () {
            var requestorCidNo = $(this);
            var cidNo = $('#cidNo').val();
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: requestorCidNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        if (requestorCidNo.val() == cidNo) {
                            _resetData(requestorCidNo);
                            warningMsg(householdInformationMsg.requestorCidValidation);
                        } else {
                            $('#requestorFirstName').val(res.dto.spouseFirstName);
                            $('#requestorMiddleName').val(res.dto.spouseMiddleName);
                            $('#requestorLastName').val(res.dto.spouseLastName);
                        }
                    } else if (res.status == 5) {
                        _resetData(requestorCidNo);
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    function _resetData(requestorCidNo) {
        requestorCidNo.val('').focus();
        $('#requestorFirstName').val('');
        $('#requestorMiddleName').val('');
        $('#requestorLastName').val('');
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
                case 'btnRequestApplicationPrev':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

                    $('#requestApplicationHead, #requestApplicationContent').removeClass('active');
                    $("#requestApplicationId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }

    /**
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            $('#householdInformationDetailsForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(householdInformationMsg.processingFormData);
                        return;
                    }

                    $('#btnSave').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'save',
                        type: 'POST',
                        data: $(form).serializeArray(),
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text,'householdInformation/generatePage?applicationNumber='+res.value);
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

    function generateHouseHoldInfoPDF() {
        $('#generateHouseHoldInfoId').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            var choosenLanguage ='';
            debugger;
            if($("#reportDzongkha:checked").val()=='D'){
                 choosenLanguage = 'D';
            }else{
                 choosenLanguage = 'E';
            }
          //  var choosenLanguage = 'E';
            if(choosenLanguage=='E'){
                window.open('/dcrc/householdInformation/generatePDF?applicationNumber=' + applicationNumber + '&choosenLanguage='+choosenLanguage);
            }else{
                window.open(dcrc_lib.baseUrl()+'bilingualController?applicationNumber=' + applicationNumber + '&choosenLanguage='+choosenLanguage);
            }
          //  window.open('/dcrc/householdInformation/generatePDF?applicationNumber=' + applicationNumber + '&choosenLanguage='+choosenLanguage);
           // window.open(dcrc_lib.baseUrl()+'bilingualController?applicationNumber=' + applicationNumber + '&choosenLanguage='+choosenLanguage);
        });
    }

    return {
        validateCidSrpNoOnly: validateCidSrpNoOnly,
        validateApplicantOthers: validateApplicantOthers,
        getCitizenInformation: getCitizenInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        generateHouseHoldInfoPDF: generateHouseHoldInfoPDF,
        save: save
    };

})
();

$(document).ready(function () {
    $('#personalDetailsHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#personalDetailsContent').prop('class', 'tab-pane active');
    $("#personalDetailsId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#requestApplicationHead').not('.active').addClass('disabled');
    $('#requestApplicationHead').not('.active').find('a').removeAttr("data-toggle");

    householdInformation.validateCidSrpNoOnly();
    householdInformation.validateApplicantOthers();
    householdInformation.getCitizenInformation();
    householdInformation.nextTab();
    householdInformation.previousTab();
    householdInformation.generateHouseHoldInfoPDF();
    householdInformation.save();
});
