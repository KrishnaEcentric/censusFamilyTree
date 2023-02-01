/**
 * Created by Hidhen on 26-Jul-19.
 */
var deathRegistrationNonBhutaneseMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var deathRegistrationNonBhutanese = (function () {
    "use strict";
    var isSubmitted = false;
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'deathRegistrationNonBhutanese/';
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
                    $('#personAttendedHead, #personAttendedContent').removeClass('active').removeAttr('style');
                    $("#personAttendedId").css({"color": "white", "background-color": "#120f65"});
                    $('#personAttendedCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#requestorDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#requestorDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnRequestorDetailsNext':
                    $('#requestorDetailsHead, #requestorDetailsContent').removeClass('active').removeAttr('style');
                    $("#requestorDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#requestorDetailsCheck').html('<i class="fa fa-check text-white"></i>');

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
                case 'btnPersonAttendedPrev':
                    $('#motherDetailsContent').prop('class', 'tab-pane active');
                    $("#motherDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#motherDetailsCheck').empty();

                    $('#personAttendedHead, #personAttendedContent').removeClass('active');
                    $("#personAttendedId").css("background-color", "#120f65");
                    break;
                case 'btnRequestorDetailsPrev':
                    $('#personAttendedContent').prop('class', 'tab-pane active');
                    $("#personAttendedId").css("background-color", "rgb(18, 18, 19)");
                    $('#personAttendedCheck').empty();

                    $('#requestorDetailsHead, #requestorDetailsContent').removeClass('active');
                    $("#requestorDetailsId").css("background-color", "#120f65");
                    break;
                case 'btnAttachmentPrev':
                    $('#requestorDetailsContent').prop('class', 'tab-pane active');
                    $("#requestorDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#requestorDetailsCheck').empty();

                    $('#attachmentHead, #attachmentContent').removeClass('active');
                    $("#attachmentId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }

    function validateCauseOfDeath() {
        $('#causeOfDeath').on('change', function () {
            if ($(this).val() == 'O') {
                $('#causeOfDeathOtherDiv').removeClass('hidden');
            } else {
                $('#causeOfDeathOtherDiv').addClass('hidden');
            }
        });
    }

    function validateCountryOfDeath() {
        $('#countryOfDeath').on('change', function () {
            var countryOfDeath = $(this).val();
            if (countryOfDeath == bhutanCountryCode) {
                $('#otherDeathDetailsDiv').removeClass('hidden');
                $('.otherDeathDetails').val('').attr('required', 'required');
                $('#gewogOfDeath, #villageOfDeath').empty();
            } else {
                $('#otherDeathDetailsDiv').addClass('hidden');
                $('.otherDeathDetails').val('').removeAttr('required');
                $('#gewogOfDeath, #villageOfDeath').empty();
            }
        });
    }

    function validatePlaceOfDeath() {
        $('.placeOfDeath').on('click', function () {
            var placeOfDeath = $('.placeOfDeath:checked').val();
            if (placeOfDeath == 'O') {
                $('#placeOfDeathOtherDiv').removeClass('hidden');
                $('#placeOfDeathOther').val('').attr('required', 'required');
            } else {
                $('#placeOfDeathOtherDiv').addClass('hidden');
                $('#placeOfDeathOther').val('').removeAttr('required');
            }
        });
    }

    function validateAttendedType() {
        $('.attendedType').on('click', function () {
            var attendedType = $('.attendedType:checked').val();
            if (attendedType == 'O') {
                $('#attendedTypePersonOtherDiv').removeClass('hidden');
            } else {
                $('#attendedTypePersonOtherDiv').addClass('hidden');
            }
        });
    }

    function validateRelationOther() {
        $('#relationToDeceased').on('change', function () {
            var relationToDeceased = $(this).val();
            if (relationToDeceased == 'Other') {
                $('#relationToDeceasedOtherDiv').removeClass('hidden');
            } else {
                $('#relationToDeceasedOtherDiv').addClass('hidden');
            }
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('#dzongkhagOfDeath').on('change', function () {
            var dzongkhagOfDeath = $(this).val();
            $.ajax({
                url: _baseURL() + 'getGewogDropdownList',
                type: 'GET',
                data: {dzongkhagID: dzongkhagOfDeath},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#gewogOfDeath'), res, 'integer');
                    $('#villageOfDeath').empty();
                }
            });
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#gewogOfDeath').on('change', function () {
            var gewogOfDeath = $(this).val();
            $.ajax({
                url: _baseURL() + 'getVillageDropdownList',
                type: 'GET',
                data: {gewogID: gewogOfDeath},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#villageOfDeath'), res, 'integer');
                }
            });
        });
    }

    /**
     * To get details
     */
    function getFatherDetails() {
        $('#fatherCidNo').on('change', function () {
            var fatherCidNo = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: fatherCidNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#fatherFirstNameBh').val(res.dto.spouseFirstNameBh);
                        $('#fatherFirstName').val(res.dto.spouseFirstName);
                        $('#fatherMiddleName').val(res.dto.spouseMiddleName);
                        $('#fatherLastName').val(res.dto.spouseLastName);
                        $('.fatherDetails').attr('readonly', true);
                    } else {
                        $('.fatherDetails').val('').attr('readonly', false);
                    }
                }
            });
        });
    }

    /**
     * To get details
     */
    function getMotherDetails() {
        $('#motherCidNo').on('change', function () {
            var motherCidNo = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: motherCidNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#motherFirstNameBh').val(res.dto.spouseFirstNameBh);
                        $('#motherFirstName').val(res.dto.spouseFirstName);
                        $('#motherMiddleName').val(res.dto.spouseMiddleName);
                        $('#motherLastName').val(res.dto.spouseLastName);
                        $('.motherDetails').attr('readonly', true);
                    } else {
                        $('.motherDetails').val('').attr('readonly', false);
                    }
                }
            });
        });
    }

    /**
     * To get details
     */
    function getPersonAttendedDetails() {
        $('#attendedCIDNo').on('change', function () {
            var attendedCIDNo = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: attendedCIDNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#attendedFirstNameBh').val(res.dto.spouseFirstNameBh);
                        $('#attendedFirstName').val(res.dto.spouseFirstName);
                        $('#attendedMiddleName').val(res.dto.spouseMiddleName);
                        $('#attendedLastName').val(res.dto.spouseLastName);
                        $('.attendedDetails').attr('readonly', true);
                    } else {
                        $('.attendedDetails').val('').attr('readonly', false);
                    }
                }
            });
        });
    }

    /**
     * To get details
     */
    function getRequestorDetails() {
        $('#requestorCIDNo').on('change', function () {
            var requestorCIDNo = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: requestorCIDNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#requestorFirstNameBh').val(res.dto.spouseFirstNameBh);
                        $('#requestorFirstName').val(res.dto.spouseFirstName);
                        $('#requestorMiddleName').val(res.dto.spouseMiddleName);
                        $('#requestorLastName').val(res.dto.spouseLastName);
                        $('.requestorDetails').attr('readonly', true);
                    } else {
                        $('.requestorDetails').val('').attr('readonly', false);
                    }
                }
            });
        });
    }

    /**
     * To add more document
     */
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
                <i class="fa fa-trash"></i> Remove</button></div></td></td></tr>';

            nameChangeAttachmentGrid.find('tbody').append(row);
            dcrc_lib.formIndexing(nameChangeAttachmentGrid.find('tbody'), nameChangeAttachmentGrid.find('tbody tr'));

        });
    }

    /**
     * To remove the file
     * @returns {*}
     */
    function removeFileRow() {
        $('#nameChangeAttachmentGrid').on('click', 'tbody tr #btnRemove', function () {
            $(this).closest('tr').remove();
            dcrc_lib.formIndexing(nameChangeAttachmentGrid.find('tbody'), nameChangeAttachmentGrid.find('tbody tr'));
        });
    }

    /**
     * To check if the document is selected
     * @param condition
     * @returns {*}
     */
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

    /**
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            $('#deathRegistrationNonBhutaneseDetailsForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(deathRegistrationNonBhutaneseMsg.processingFormData);
                        return;
                    }

                    $('#btnSave').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'save',
                        type: 'POST',
                        data: new FormData(form),
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'deathRegistrationApply');
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

    function removeErrorClass() {
        $('.form-control').on('keypress', function () {
            $(this).removeClass('error');
        })
    }

    return {
        nextTab: nextTab,
        previousTab: previousTab,
        validateCauseOfDeath: validateCauseOfDeath,
        validateCountryOfDeath: validateCountryOfDeath,
        validatePlaceOfDeath: validatePlaceOfDeath,
        validateAttendedType: validateAttendedType,
        validateRelationOther: validateRelationOther,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        getFatherDetails: getFatherDetails,
        getMotherDetails: getMotherDetails,
        getPersonAttendedDetails: getPersonAttendedDetails,
        getRequestorDetails: getRequestorDetails,
        addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        save: save,
        removeErrorClass: removeErrorClass
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

    $('#fatherDetailsHead').not('.active').addClass('disabled');
    $('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#motherDetailsHead').not('.active').addClass('disabled');
    $('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#personAttendedHead').not('.active').addClass('disabled');
    $('#personAttendedHead').not('.active').find('a').removeAttr("data-toggle");

    $('#requestorDetailsHead').not('.active').addClass('disabled');
    $('#requestorDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    deathRegistrationNonBhutanese.nextTab();
    deathRegistrationNonBhutanese.previousTab();
    deathRegistrationNonBhutanese.validateCauseOfDeath();
    deathRegistrationNonBhutanese.validateCountryOfDeath();
    deathRegistrationNonBhutanese.validatePlaceOfDeath();
    deathRegistrationNonBhutanese.validateAttendedType();
    deathRegistrationNonBhutanese.validateRelationOther();
    deathRegistrationNonBhutanese.getGewogDropdownList();
    deathRegistrationNonBhutanese.getVillageDropdownList();
    deathRegistrationNonBhutanese.getFatherDetails();
    deathRegistrationNonBhutanese.getMotherDetails();
    deathRegistrationNonBhutanese.getPersonAttendedDetails();
    deathRegistrationNonBhutanese.getRequestorDetails();
    deathRegistrationNonBhutanese.addMoreDocuments();
    deathRegistrationNonBhutanese.removeFileRow();
    deathRegistrationNonBhutanese.save();
    deathRegistrationNonBhutanese.removeErrorClass();
});
