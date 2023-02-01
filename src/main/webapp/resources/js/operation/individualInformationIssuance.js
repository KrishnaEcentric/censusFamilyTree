/**
 * Created by Hidhen on 26-Jul-19.
 */
var individualInformationIssuanceMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var individualInformationIssuance = (function () {
    "use strict";
    var isSubmitted = false;
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var changeSpouseInfoHeader = $('#changeSpouseInfoHeader');
    var changeSpouseInfoDetails = $('#changeSpouseInfoDetails');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'individualInformationIssuance/';
    }

    /**
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#btnSearch').on('click', function () {
            $('#individualInformationIssuanceForm').validate({
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
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.fatherInformationDTO);
                    populate(res.dto.motherInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    $('#dob').val(formatAsDate(res.dto.dob));
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
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: requestorCidNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#requestorFirstName').val(res.dto.spouseFirstName);
                        $('#requestorMiddleName').val(res.dto.spouseMiddleName);
                        $('#requestorLastName').val(res.dto.spouseLastName);
                    } else if (res.status == 5) {
                        requestorCidNo.val('').focus();
                        $('#requestorFirstName').val('');
                        $('#requestorMiddleName').val('');
                        $('#requestorLastName').val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton) {
                case 'btnHouseholdInfoNext':
                    $('#householdInfoHead, #householdInfoContent').removeClass('active');
                    $("#householdInfoId").css({"color": "white", "background-color": "#120f65"});
                    $('#householdInfoCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#personalDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnIndividualInfoNext':
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
                case 'btnIndividualInfoPrev':
                    $('#householdInfoContent').prop('class', 'tab-pane active');
                    $("#householdInfoId").css("background-color", "rgb(18, 18, 19)");
                    $('#householdInfoCheck').empty();

                    $('#personalDetailsHead, #personalDetailsContent').removeClass('active');
                    $("#personalDetailsId").css("background-color", "#120f65");
                    break;
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
                case 'btnFathersDetailsPrev':
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    $("#presentAddressId").css("background-color", "rgb(18, 18, 19)");
                    $('#presentAddressCheck').empty();

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
                case 'btnRequestApplicationPrev':
                    $('#motherDetailsContent').prop('class', 'tab-pane active');
                    $("#motherDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#motherDetailsCheck').empty();

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
            debugger;
            var form = $('#individualInformationIssuanceDetailsForm')[0];
            //$('#individualInformationIssuanceDetailsForm').validate({
               // submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(individualInformationIssuanceMsg.processingFormData);
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
                                successMsgRedirect(res.text,'individualInformationIssuance/generatePage?applicationNumber='+res.value);
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
               // }
            //});
        });
    }

    return {
        validateCidSrpNoOnly: validateCidSrpNoOnly,
        validateApplicantOthers: validateApplicantOthers,
        getCitizenInformation: getCitizenInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        save: save
    };
})
();

$(document).ready(function () {
    $('#householdInfoHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#householdInfoContent').prop('class', 'tab-pane active');
    $("#householdInfoId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#personalDetailsHead').not('.active').addClass('disabled');
    $('#personalDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#placeOfBirthHead').not('.active').addClass('disabled');
    $('#placeOfBirthHead').not('.active').find('a').removeAttr("data-toggle");

    $('#permanentAddressHead').not('.active').addClass('disabled');
    $('#permanentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#presentAddressHead').not('.active').addClass('disabled');
    $('#presentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#fatherDetailsHead').not('.active').addClass('disabled');
    $('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#motherDetailsHead').not('.active').addClass('disabled');
    $('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#requestApplicationHead').not('.active').addClass('disabled');
    $('#requestApplicationHead').not('.active').find('a').removeAttr("data-toggle");

    individualInformationIssuance.validateCidSrpNoOnly();
    individualInformationIssuance.validateApplicantOthers();
    individualInformationIssuance.getCitizenInformation();
    individualInformationIssuance.nextTab();
    individualInformationIssuance.previousTab();
    individualInformationIssuance.save();
});
