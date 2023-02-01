/**
 * Created by Hidhen on 26-Jul-19.
 */
var naturalizationMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    selectChanges: 'Please choose DOB or Name to change.'
};

var naturalization = (function () {
    "use strict";
    var isSubmitted = false;
    var spouseDetailsGridID = $('#spouseDetailsGrid');
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');
    var spouseReasonDropdownList = [];
    var countryDropdownList = [];
    var dzongkhagDropdownList = [];

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'naturalization/';
    }

    /**
     * To get dzongkhag dropdown list
     */
    function getSpouseReasonDropdownList() {
        $.ajax({
            url: _baseURL() + 'getSpouseReasonDropdownList',
            type: 'GET',
            success: function (res) {
                spouseReasonDropdownList = res;
            }
        });
    }

    /**
     * To get dzongkhag dropdown list
     */
    function getCountryDropdownList() {
        $.ajax({
            url: _baseURL() + 'getCountryDropdownList',
            type: 'GET',
            success: function (res) {
                countryDropdownList = res;
            }
        });
    }

    /**
     * To get dzongkhag dropdown list
     */
    function getDzongkhagDropdownList() {
        $.ajax({
            url: _baseURL() + 'getDzongkhagDropdownList',
            type: 'GET',
            success: function (res) {
                dzongkhagDropdownList = res;
            }
        });
    }

    function getFatherIndividualInformation() {
        $('#fatherCidNo').on('change', function () {
            var cidSrpNoID = $(this);
            $.ajax({
                url: _baseURL() + 'getIndividualInformation',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(), type: 'F'},
                success: function (res) {
                    if (res.status == 1) {
                        var spouseCountryID = res.dto.spouseDetailsDTO.spouseCountryID;
                    alert(res.dto.firstName);
                        $('#fatherFirstName').val(res.dto.firstName);
                        $('#fatherMiddleName').val(res.dto.middleName);
                        $('#fatherLastName').val(res.dto.lastName);
                        $('#fatherHouseholdNo').val(res.dto.presentHouseHoldNo);
                        $('#fatherCountryID').val(res.dto.spouseDetailsDTO.spouseCountryID);
                        $('#fatherCitizenshipBy').val(res.dto.citizenDetails.citizenBy);
                        $('#fatherDzongkhagName').val(res.dto.citizenDetails.birthDzongkhagName);
                        $('#fatherGewogName').val(res.dto.citizenDetails.birthGewogName);
                        $('#fatherVillageName').val(res.dto.citizenDetails.birthVillageName);

                        if (spouseCountryID == bhutanCountryCode || spouseCountryID === null) {
                            $('#fatherDetailsDiv, #fatherHouseholdNoDiv').removeClass('hidden');
                            $('#fatherDzongkhagID').val(res.dto.spouseDetailsDTO.spouseDzongkhagSerialNo);
                            _getGewogDropdownList($('#fatherGewogID'), res.dto.spouseDetailsDTO.spouseDzongkhagSerialNo,
                                res.dto.spouseDetailsDTO.spouseGewogSerialNo);
                            _getVillageDropdownList($('#fatherVillageID'), res.dto.spouseDetailsDTO.spouseGewogSerialNo,
                                res.dto.spouseDetailsDTO.spouseVillageSerialNo);
                        } else {
                            $('#fatherDetailsDiv, #fatherHouseholdNoDiv').addClass('hidden');
                        }
                        $('.fatherDetails').attr('readonly', true);
                        $('.fatherDetailsSelect').css({'pointer-events': 'none'});
                    } else if (res.status == 5) {
                        $('.fatherDetails').val('').attr('readonly', false);
                        $('.fatherDetailsSelect').val('').css({'pointer-events': 'all'});
                        $('#fatherGewogID').empty();
                        $('#fatherVillageID').empty();
                        $('#fatherDetailsDiv, #fatherHouseholdNoDiv').removeClass('hidden');
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });
    }

    function getMotherIndividualInformation() {
        $('#motherCidNo').on('change', function () {
            var cidSrpNoID = $(this);
            $.ajax({
                url: _baseURL() + 'getIndividualInformation',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(), type: 'M'},
                success: function (res) {
                    if (res.status == 1) {
                        var spouseCountryID = res.dto.spouseDetailsDTO.spouseCountryID;
                        $('#motherFirstName').val(res.dto.firstName);
                        $('#motherMiddleName').val(res.dto.middleName);
                        $('#motherLastName').val(res.dto.lastName);
                        $('#motherCountryID').val(res.dto.spouseDetailsDTO.spouseCountryID);
                        $('#motherHouseholdNo').val(res.dto.presentHouseHoldNo);
                        $('#motherCitizenshipBy').val(res.dto.citizenDetails.citizenBy);

                        if (spouseCountryID == bhutanCountryCode || spouseCountryID === null) {
                            $('#motherDetailsDiv, #motherHouseholdNoDiv').removeClass('hidden');
                            $('#motherDzongkhagID').val(res.dto.spouseDetailsDTO.spouseDzongkhagSerialNo);
                            _getGewogDropdownList($('#motherGewogID'), res.dto.spouseDetailsDTO.spouseDzongkhagSerialNo,
                                res.dto.spouseDetailsDTO.spouseGewogSerialNo);
                            _getVillageDropdownList($('#motherVillageID'), res.dto.spouseDetailsDTO.spouseGewogSerialNo,
                                res.dto.spouseDetailsDTO.spouseVillageSerialNo);
                        } else {
                            $('#motherDetailsDiv, #motherHouseholdNoDiv').addClass('hidden');
                        }

                        $('.motherDetails').attr('readonly', true);
                        $('.motherDetailsSelect').css({'pointer-events': 'none'});
                    } else if (res.status == 5) {
                        $('.motherDetails').val('').attr('readonly', false);
                        $('.motherDetailsSelect').val('').css({'pointer-events': 'all'});
                        $('#motherGewogID').empty();
                        $('#motherVillageID').empty();
                        $('#motherDetailsDiv, #motherHouseholdNoDiv').removeClass('hidden');
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });
    }

    function getHoHIndividualInformation() {
        $('#hohCIDNumber').on('change', function () {
            var cidSrpNoID = $(this);
            $.ajax({
                url: _baseURL() + 'getIndividualInformation',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(), type: 'H'},
                success: function (res) {
                    if (res.status == 1) {
                        $('#hohFirstName').val(res.dto.firstName);
                        $('#hohMiddleName').val(res.dto.middleName);
                        $('#hohLastName').val(res.dto.lastName);
                        $('#hohHouseholdNo').val(res.dto.presentHouseHoldNo);
                        $('#hohHouseNo').val(res.dto.citizenDetails.permanentHouseNo);
                        $('#hohThramNo').val(res.dto.citizenDetails.permanentThramNo);
                        $('#hohDzongkhagName').val(res.dto.citizenDetails.hohDzongkhagName);
                        $('#hohGewogName').val(res.dto.citizenDetails.hohGewogName);
                        $('#hohVillageName').val(res.dto.citizenDetails.hohVillageName);
                        $('#hohVillageID').val(res.dto.citizenDetails.permanentVillageSerialNo)
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        $('.hohDetails').val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
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
                case 'btnPersonalDetailsNext':
                    var mobileNumberID = $('#mobileNumber');
                    var firstName = $('#firstName');
                    if (mobileNumberID.val() !== '' && firstName.val() !== '') {
                        $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                        $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#presentAddressId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#presentAddressContent').prop('class', 'tab-pane active');
                    } else {
                        if (mobileNumberID.val() === '') {
                            mobileNumberID.addClass('error').focus();
                        } else if (firstName.val() === '') {
                            firstName.addClass('error').focus();
                        }
                    }
                    break;
                case 'btnPresentAddressNext':
                    var presentDzongkhagID = $('#presentDzongkhagID');
                    if (presentDzongkhagID.val() !== '') {
                        $('#presentAddressHead, #presentAddressContent').removeClass('active').removeAttr('style');
                        $("#presentAddressId").css({"color": "white", "background-color": "#120f65"});
                        $('#presentAddressCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#placeOfBirthId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    } else {
                        presentDzongkhagID.addClass('error').focus();
                    }
                    break;
                case 'btnPlaceOfBirthNext':
                    var countryOfBirthID = $('#countryOfBirthID');
                    if (countryOfBirthID.val() !== '') {
                        $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active').removeAttr('style');
                        $("#placeOfBirthId").css({"color": "white", "background-color": "#120f65"});
                        $('#placeOfBirthCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#permanentAddressId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#permanentAddressContent').prop('class', 'tab-pane active');
                    } else {
                        countryOfBirthID.addClass('error').focus();
                    }
                    break;
                case 'btnPermanentAddressNext':
                    $('#presentAddressHead, #permanentAddressContent').removeClass('active').removeAttr('style');
                    $("#permanentAddressId").css({"color": "white", "background-color": "#120f65"});
                    $('#permanentAddressCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#fatherDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#fatherDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnFathersDetailsNext':
                    //var fatherCidNo = $('#fatherCidNo');
                    //if (fatherCidNo.val() !== '') {
                        $('#fatherDetailsHead, #fatherDetailsContent').removeClass('active').removeAttr('style');
                        $("#fatherDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#fatherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#motherDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#motherDetailsContent').prop('class', 'tab-pane active');
                    //} else {
                    //    fatherCidNo.addClass('error').focus();
                    //}
                    break;
                case 'btnMotherDetailsNext':
                    //var motherCidNo = $('#motherCidNo');
                    //if (motherCidNo.val() !== '') {
                        $('#motherDetailsHead, #motherDetailsContent').removeClass('active').removeAttr('style');
                        $("#motherDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#motherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#attachmentId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#attachmentContent').prop('class', 'tab-pane active');
                    //} else {
                    //    motherCidNo.addClass('error').focus();
                    //}
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
                case 'btnPlaceOfBirthPrev':
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    $("#presentAddressId").css("background-color", "rgb(18, 18, 19)");
                    $('#presentAddressCheck').empty();

                    $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active');
                    $("#placeOfBirthId").css("background-color", "#120f65");
                    break;
                case 'btnPermanentAddressPrev':
                    $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    $("#placeOfBirthId").css("background-color", "rgb(18, 18, 19)");
                    $('#placeOfBirthCheck').empty();

                    $('#permanentAddressHead, #permanentAddressContent').removeClass('active');
                    $("#permanentAddressId").css("background-color", "#120f65");
                    break;
                case 'btnFathersDetailsPrev':
                    $('#permanentAddressContent').prop('class', 'tab-pane active');
                    $("#permanentAddressId").css("background-color", "rgb(18, 18, 19)");
                    $('#permanentAddressCheck').empty();

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
                case 'btnAttachmentPrev':
                    $('#motherDetailsContent').prop('class', 'tab-pane active');
                    $("#motherDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#motherDetailsCheck').empty();

                    $('#attachmentHead, #attachmentContent').removeClass('active');
                    $("#attachmentId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('.dzongkhag').on('change', function () {
            var dzongkhagID = $(this).val();
            var elementID = $(this).attr('id');
            var gewogElementID = '';
            if (elementID == 'presentDzongkhagID') {
                gewogElementID = $('#presentGewogID');
            } else if (elementID == 'placeOfBirthDzongkhagID') {
                gewogElementID = $('#placeOfBirthGewogID');
            } else if (elementID == 'proposedDzongkhagID') {
                gewogElementID = $('#proposedGewogID');
            } else if (elementID == 'fatherDzongkhagID') {
                gewogElementID = $('#fatherGewogID');
            } else if (elementID == 'motherDzongkhagID') {
                gewogElementID = $('#motherGewogID');
            }
            _getGewogDropdownList(gewogElementID, dzongkhagID, '');
        });
    }

    function _getGewogDropdownList(elementID, dzongkhagID, gewogID) {
        $.ajax({
            url: _baseURL() + 'getGewogDropdownList',
            type: 'GET',
            data: {dzongkhagID: dzongkhagID},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(gewogID);
            }
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('.gewog').on('change', function () {
            var gewogID = $(this).val();
            var elementID = $(this).attr('id');
            var villageElementID = '';
            if (elementID == 'presentGewogID') {
                villageElementID = $('#presentVillageID');
            } else if (elementID == 'placeOfBirthGewogID') {
                villageElementID = $('#placeOfBirthVillageID');
            } else if (elementID == 'proposedGewogID') {
                villageElementID = $('#proposedVillageID');
            } else if (elementID == 'fatherGewogID') {
                villageElementID = $('#fatherVillageID');
            } else if (elementID == 'motherGewogID') {
                villageElementID = $('#motherVillageID');
            }

            _getVillageDropdownList(villageElementID, gewogID);
        });
    }

    function _getVillageDropdownList(elementID, gewogID, villageID) {
        $.ajax({
            url: _baseURL() + 'getVillageDropdownList',
            type: 'GET',
            data: {gewogID: gewogID},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(villageID);
            }
        });
    }

    /**
     * To add more document
     */
    function validateExistingHousehold() {
        $('.isHoHExist').on('click', function () {
            var isSelected = $('#isHoHExistYes').is(':checked');
            $('#isHoHYes').prop('checked', false);
            //$('#isHoHNo').prop('checked', false);
            $('.hohDetails, .hohInfo, #proposedDzongkhagID').val('');
            $('#proposedGewogID').empty();
            $('#proposedVillageID').empty('');

            if (isSelected) {
                $('#hohInfoDivId').removeClass('hidden');
                $('#secondQuestionHOH, #houseNoThramNoDiv, #warningMessageDiv, #dzongkhagDetailsDiv').addClass('hidden');
                $('#hohCIDNumber').attr('disabled', false).attr('required', 'required');
            } else {
                $('#hohInfoDivId').addClass('hidden');
                $('#secondQuestionHOH, #houseNoThramNoDiv').removeClass('hidden');
                $('#hohCIDNumber').attr('disabled', true).removeAttr('required');

            }
        });
    }

    function validateNewHousehold() {
        $('.isHoH').on('click', function () {
            var isSelected = $('#isHoHYes').is(':checked');
            $('#proposedDzongkhagID').val('');
            $('#proposedGewogID').empty();
            $('#proposedVillageID').empty('');
            if (isSelected) {
                $('#warningMessageDiv').addClass('hidden');
                $('#dzongkhagDetailsDiv').removeClass('hidden');
            } else {
                $('#warningMessageDiv').removeClass('hidden');
                $('#dzongkhagDetailsDiv').addClass('hidden');
            }
        });
    }

    function validateBirthOfCountry() {
        $('#countryOfBirthID').on('change', function () {
            var countryOfBirthID = $(this).val();

            if (countryOfBirthID == bhutanCountryCode) {
                $('#placeOfBirthDiv').removeClass('hidden');
                $('#placeOfBirthDzongkhagID').val('');
                $('#placeOfBirthGewogID').empty('');
                $('#placeOfBirthVillageID').empty('');
            } else {
                $('#placeOfBirthDiv').addClass('hidden');
                $('#placeOfBirthDzongkhagID').val('');
                $('#placeOfBirthGewogID').empty('');
                $('#placeOfBirthVillageID').empty('');
            }
        });
    }

    /**
     * To add more document
     */
    function refreshFatherDetails() {
        $('#btnRefreshFatherDetails').on('click', function () {
            $('#fatherCidNo').val('');
            $('.fatherDetails').val('');
            $('.fatherDetailsSelect').val('');
        });
    }

    /**
     * To add more document
     */
    function refreshMotherDetails() {
        $('#btnRefreshMotherDetails').on('click', function () {
            $('#motherCidNo').val('');
            $('motherDetails').val('');
            $('.motherDetailsSelect').val('');
        });
    }

    function validateMotherTongueOther() {
        $('#motherTongueID').on('change', function () {
            if ($(this).val() == 11) {
                $('#motherTongueOtherDiv').removeClass('hidden');
                $('#motherTongueOther').val('');
            } else {
                $('#motherTongueOtherDiv').addClass('hidden');
                $('#motherTongueOther').val('');
            }
        });
    }

    function validateReligionOther() {
        $('#religionID').on('change', function () {
            if ($(this).val() == 6) {
                $('#religionOtherDiv').removeClass('hidden');
                $('#religionOther').val('');
            } else {
                $('#religionOtherDiv').addClass('hidden');
                $('#religionOther').val('');
            }
        });
    }

    function highestEducationAttained() {
        $('#literacyStatusID').on('change', function () {
            if ($(this).val() == 'L' || $(this).val() === '') {
                $('#highestEducationAttainedDiv').removeClass('hidden');
                $('#educationLevelID').val('');
            } else {
                $('#highestEducationAttainedDiv').addClass('hidden');
                $('#educationLevelID').val('');
            }
        });
    }

    function validateMaritalStatus() {
        $('#maritalStatusID').on('change', function () {
            if ($(this).val() == 2) {
                $('#spouseDetailsHeader').removeClass('hidden');
                spouseDetailsGridID.find('tbody').empty();
            } else {
                $('#spouseDetailsHeader').addClass('hidden');
                spouseDetailsGridID.find('tbody').empty();
            }
        });
    }

    function validatePlaceOfBirthOther() {
        $('#placeOfBirthID').on('change', function () {
            if ($(this).val() == 4) {
                $('#placeOfBirthOtherDiv').removeClass('hidden');
                $('#placeOfBirthOther').val('');
            } else {
                $('#placeOfBirthOtherDiv').addClass('hidden');
                $('#placeOfBirthOther').val('');
            }
        });
    }

    function validateFatherCountryID() {
        $('#fatherCountryID').on('change', function () {
            if ($(this).val() == bhutanCountryCode) {
                $('#fatherDetailsDiv, #fatherHouseholdNoDiv').removeClass('hidden');
            } else {
                $('#fatherDetailsDiv, #fatherHouseholdNoDiv').addClass('hidden');
            }
        });
    }

    function validateMotherCountryID() {
        $('#motherCountryID').on('change', function () {
            if ($(this).val() == bhutanCountryCode) {
                $('#motherDetailsDiv, #motherHouseholdNoDiv').removeClass('hidden');
            } else {
                $('#motherDetailsDiv, #motherHouseholdNoDiv').addClass('hidden');
            }
        });
    }

    /**
     * To get spouse information
     */
    function getSpouseInformation() {
        $('#spouseDetailsGrid').find('tbody').on('change', 'tr #spouseCidNo', function () {
            var selected = $(this).closest('tr');
            var cidNo = $('#cidNo').val();
            var cidSrpNo = selected.find('#spouseCidNo').val();
            var villageID = selected.find('#spouseVillageSerialNo');
            var gewogID = selected.find('#spouseGewogSerialNo');

            if (cidSrpNo === '') {
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                return;
            }

            if (!_validateSpouseInfoEntered(true, selected.index(), cidSrpNo, true)) {
                selected.find('#spouseCidNo').focus();
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                warningMsg('Same spouse should not be added more than one!');
                return;
            }

            $.ajax({
                url: _baseURL() + 'getSpouseInformation',
                type: 'GET',
                data: {cidSrpNo: cidSrpNo},
                success: function (res) {
                    if (res.status == 1) {
                        if (res.dto.spouseCountryID == bhutanCountryCode) {
                            selected.find('#spouseAddressDiv').addClass('hidden');
                            selected.find('#spouseAddress').val('');
                            selected.find('#spousePresentDetails').removeClass('hidden');
                            selected.find('#spouseFirstName').val(res.dto.spouseFirstName).attr('readonly', true);
                            selected.find('#spouseMiddleName').val(res.dto.spouseMiddleName).attr('readonly', true);
                            selected.find('#spouseLastName').val(res.dto.spouseLastName).attr('readonly', true);
                            selected.find('#spouseCountryID').val(res.dto.spouseCountryID).css({'pointer-events': 'none'});
                            selected.find('#spouseDzongkhagSerialNo').val(res.dto.spouseDzongkhagSerialNo).css({'pointer-events': 'none'});
                            _getGewogDropdownList(gewogID, res.dto.spouseDzongkhagSerialNo, res.dto.spouseGewogSerialNo);
                            _getVillageDropdownList(villageID, res.dto.spouseGewogSerialNo, res.dto.spouseVillageSerialNo);
                            gewogID.css({'pointer-events': 'none'});
                            villageID.css({'pointer-events': 'none'});
                        } else {
                            _resetSpouseDetails(selected);
                            warningMsg(res.text);
                        }
                    } else if (res.status == 5) {
                        _resetSpouseDetails(selected);
                        selected.find('.spouseDetail' + selected.index()).val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    function _resetSpouseDetails(selected) {
        selected.find('#spouseAddressDiv').addClass('hidden');
        selected.find('#spouseAddress').val('');
        selected.find('#spousePresentDetails').removeClass('hidden');
        selected.find('#spouseFirstName').val('').attr('readonly', false);
        selected.find('#spouseMiddleName').val('').attr('readonly', false);
        selected.find('#spouseLastName').val('').attr('readonly', false);
        selected.find('#spouseCountryID').val('').css({'pointer-events': 'all'});
        selected.find('#spouseDzongkhagSerialNo').val('').css({'pointer-events': 'all'});
        selected.find('#spouseGewogSerialNo').empty().css({'pointer-events': 'all'});
        selected.find('#spouseVillageSerialNo').empty().css({'pointer-events': 'all'});
    }

    function validateSpouseCountry() {
        $('#spouseDetailsGrid').find('tbody').on('change', 'tr #spouseCountryID', function () {
            var selected = $(this).closest('tr');
            var spouseCountryID = selected.find('#spouseCountryID').val();

            if (spouseCountryID == bhutanCountryCode) {
                selected.find('#spouseAddressDiv').addClass('hidden');
                selected.find('#spouseAddress').val('');
                selected.find('#spousePresentDetails').removeClass('hidden');
                selected.find('#spouseDzongkhagSerialNo').val('');
                selected.find('#spouseVillageSerialNo').empty('');
                selected.find('#spouseGewogSerialNo').empty('');
            } else {
                selected.find('#spouseAddressDiv').removeClass('hidden');
                selected.find('#spouseAddress').val('');
                selected.find('#spousePresentDetails').addClass('hidden');
                selected.find('#spouseDzongkhagSerialNo').val('');
                selected.find('#spouseVillageSerialNo').empty('');
                selected.find('#spouseGewogSerialNo').empty('');
            }
        });
    }

    /**
     * To add spouse information
     */
    function addSpouseInformation() {
        $('#btnAddSpouse').on('click', function () {
            if (!_validateSpouseInfoEntered(true, '', '', false)) {
                warningMsg('Spouse information is required.');
                return;
            }

            var length = spouseDetailsGridID.find('tbody tr').length;
            var spouseDetailClass = 'spouseDetail' + length;
            var row = '<tr><td style="border-top: 0 !important;"> \
                <div class="form-group"> \
                    <div class="col-sm-12 text-center">Spouse ' + (length + 1) + '</div><br/> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseCidNo" placeholder="CID/SRP Number" \
                        name="spouseDetailsDTOList[' + (length) + '].spouseCidNo" \
                        class="form-control ' + spouseDetailClass + '"></div> \
                    <div class="col-sm-4"> \
                        <select  id="spouseReasonID" name="spouseDetailsDTOList[' + (length) + '].spouseReasonID" \
                            required="required" class="form-control ' + spouseDetailClass + '"> \
                        </select></div> \
                    <div class="col-sm-4"> \
                        <button class="btn btn-primary" id="btnRefresh" type="button"> \
                        <i class="fa fa-refresh"></i> Refresh</button> \
                        <input type="button" value="Remove" class="btn btn-danger" id="btnRemoveSpouse"/> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseFirstName" required="required" \
                        id="spouseFirstName" placeholder="First Name" class="form-control ' + spouseDetailClass + '"> \
                        <input type="hidden" id="isNewSpouse" class="form-control ' + spouseDetailClass + '" \
                        name="spouseDetailsDTOList[' + (length) + '].isNewSpouse" value="true"> \
                    </div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseMiddleName" id="spouseMiddleName" \
                        placeholder="Middle Name" class="form-control ' + spouseDetailClass + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseLastName" id="spouseLastName" \
                        placeholder="Last Name" class="form-control ' + spouseDetailClass + '"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" placeholder="Date of Marriage" id="dateOfMarriage' + length + '" required \
                        name="spouseDetailsDTOList[' + (length) + '].dateOfMarriage" \
                        class="form-control ' + spouseDetailClass + '"></div> \
                    <div class="col-sm-4"> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseCountryID" id="spouseCountryID" \
                        class="form-control ' + spouseDetailClass + '"></select></div> \
                    <div class="col-sm-4 hidden" id="spouseAddressDiv"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseAddress" id="spouseAddress" \
                        placeholder="Address" class="form-control ' + spouseDetailClass + '"></div> \
                </div> \
                <div class="form-group" id="spousePresentDetails"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Dzongkhag:</label> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseDzongkhagSerialNo" id="spouseDzongkhagSerialNo" \
                        placeholder="Dzongkhag" class="form-control ' + spouseDetailClass + '"></select></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Gewog:</label> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseGewogSerialNo" id="spouseGewogSerialNo" \
                        placeholder="Gewog" class="form-control ' + spouseDetailClass + '"></select></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Village:</label> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseVillageSerialNo" id="spouseVillageSerialNo" \
                        placeholder="Village" class="form-control ' + spouseDetailClass + '"></select></div> \
                </div></td></tr>';
            spouseDetailsGridID.find('tbody').append(row);
            dcrc_lib.formIndexing(spouseDetailsGridID.find('tbody'), spouseDetailsGridID.find('tbody tr'));

            var spouseReasonID = spouseDetailsGridID.find('tbody tr:last').find('#spouseReasonID');
            var spouseCountryID = spouseDetailsGridID.find('tbody tr:last').find('#spouseCountryID');
            var spouseDzongkhagSerialNo = spouseDetailsGridID.find('tbody tr:last').find('#spouseDzongkhagSerialNo');
            dcrc_lib.loadDropDown(spouseReasonID, spouseReasonDropdownList, 'integer');
            dcrc_lib.loadDropDown(spouseCountryID, countryDropdownList, 'integer');
            dcrc_lib.loadDropDown(spouseDzongkhagSerialNo, dzongkhagDropdownList, 'integer');

            var datePickerOptions = {
                dateFormat: globalConf.dateFormat(),
                changeMonth: true,
                changeYear: true,
                yearRange: 'c-65:c+10',
                beforeShow: function (input, inst) {
                    if ($(input).prop("readonly")) {
                        return false;
                    }
                }
            };

            spouseDetailsGridID.find('tbody tr:last').find('#dateOfMarriage' + length).datepicker(datePickerOptions);
        });
    }

    /**
     * To refresh spouse information
     */
    function refreshSpouseInformation() {
        $('#spouseDetailsGrid').find('tbody').on('click', 'tr #btnRefresh', function () {
            var selected = $(this).closest('tr');
            var spouseDetailClass = '.spouseDetail' + selected.index();
            selected.find(spouseDetailClass).val('');
        });
    }

    /**
     * To remove spouse information
     */
    function removeSpouseInformation() {
        $('#spouseDetailsGrid').find('tbody').on('click', 'tr #btnRemoveSpouse', function () {
            $(this).closest('tr').remove();
        });
    }

    /**
     * To validate the spouse info is entered
     * @private
     */
    function _validateSpouseInfoEntered(condition, index, cidNumber, isForGetInfo) {
        spouseDetailsGridID.find('tbody tr').each(function () {
            var selected = $(this).closest('tr');
            var spouseCidNo = selected.find('#spouseCidNo').val();
            var spouseFirstName = selected.find('#spouseFirstName').val();
            if (isForGetInfo) {
                if (selected.index() != index && spouseCidNo == cidNumber) {
                    condition = false;
                }
            } else {
                if (spouseFirstName === '') {
                    selected.find('#spouseFirstName').addClass('error');
                    condition = false;
                }
            }
        });
        return condition;
    }

    /**
     * To remove error
     */
    function removeSpouseInformationError() {
        $('#spouseDetailsGrid').find('tbody').on('blur', 'tr #spouseCidNo', function () {
            var selected = $(this).closest('tr');
            if (selected.find('#spouseCidNo').val() !== '') {
                selected.find('#spouseCidNo').removeClass('error');
            }
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
            $('#naturalizationDetailsForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(naturalizationMsg.processingFormData);
                        return;
                    }
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'save?firstNameBh='+$('#firstNameBh').val(),
                        type: 'POST',
                        data: new FormData(form),
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'naturalization');
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
        getSpouseReasonDropdownList: getSpouseReasonDropdownList,
        getCountryDropdownList: getCountryDropdownList,
        getDzongkhagDropdownList: getDzongkhagDropdownList,
        getFatherIndividualInformation: getFatherIndividualInformation,
        getMotherIndividualInformation: getMotherIndividualInformation,
        getHoHIndividualInformation: getHoHIndividualInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        validateExistingHousehold: validateExistingHousehold,
        validateNewHousehold: validateNewHousehold,
        validateBirthOfCountry: validateBirthOfCountry,
        refreshFatherDetails: refreshFatherDetails,
        refreshMotherDetails: refreshMotherDetails,
        highestEducationAttained: highestEducationAttained,
        validateMotherTongueOther: validateMotherTongueOther,
        validateReligionOther: validateReligionOther,
        validateMaritalStatus: validateMaritalStatus,
        validatePlaceOfBirthOther: validatePlaceOfBirthOther,
        validateFatherCountryID: validateFatherCountryID,
        validateMotherCountryID: validateMotherCountryID,
        getSpouseInformation: getSpouseInformation,
        validateSpouseCountry: validateSpouseCountry,
        addSpouseInformation: addSpouseInformation,
        refreshSpouseInformation: refreshSpouseInformation,
        removeSpouseInformation: removeSpouseInformation,
        removeSpouseInformationError: removeSpouseInformationError,
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

    $('#permanentAddressHead').not('.active').addClass('disabled');
    $('#permanentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#presentAddressHead').not('.active').addClass('disabled');
    $('#presentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#fatherDetailsHead').not('.active').addClass('disabled');
    $('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#motherDetailsHead').not('.active').addClass('disabled');
    $('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    naturalization.getSpouseReasonDropdownList();
    naturalization.getCountryDropdownList();
    naturalization.getDzongkhagDropdownList();
    naturalization.getFatherIndividualInformation();
    naturalization.getMotherIndividualInformation();
    naturalization.getHoHIndividualInformation();
    naturalization.nextTab();
    naturalization.previousTab();
    naturalization.getGewogDropdownList();
    naturalization.getVillageDropdownList();
    naturalization.validateBirthOfCountry();
    naturalization.validateExistingHousehold();
    naturalization.validateNewHousehold();
    naturalization.refreshFatherDetails();
    naturalization.refreshMotherDetails();
    naturalization.highestEducationAttained();
    naturalization.validateMotherTongueOther();
    naturalization.validateReligionOther();
    naturalization.validateMaritalStatus();
    naturalization.validatePlaceOfBirthOther();
    naturalization.validateFatherCountryID();
    naturalization.validateMotherCountryID();
    naturalization.getSpouseInformation();
    naturalization.validateSpouseCountry();
    naturalization.addSpouseInformation();
    naturalization.refreshSpouseInformation();
    naturalization.removeSpouseInformation();
    naturalization.removeSpouseInformationError();
    naturalization.addMoreDocuments();
    naturalization.removeFileRow();
    naturalization.save();
    naturalization.removeErrorClass();
});
