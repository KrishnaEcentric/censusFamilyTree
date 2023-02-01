/**
 * Created by Hidhen on 26-Jul-19.
 */
var changeSpouseInformationMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var changeSpouseInformation = (function () {
    "use strict";
    var isSubmitted = false;
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var spouseDetailsGridID = $('#spouseDetailsGrid');
    var changeSpouseInfoHeader = $('#changeSpouseInfoHeader');
    var changeSpouseInfoDetails = $('#changeSpouseInfoDetails');
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
        return dcrc_lib.baseUrl() + 'changeSpouseInformation/';
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

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('#spouseDetailsGrid').find('tbody').on('change', 'tr #spouseDzongkhagSerialNo', function () {
            var spouseDzongkhagSerialNo = $(this).closest('tr').find('#spouseDzongkhagSerialNo').val();
            var spouseGewogSerialNo = $(this).closest('tr').find('#spouseGewogSerialNo');
            _getGewogDropdownList(spouseGewogSerialNo, spouseDzongkhagSerialNo, '');
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#spouseDetailsGrid').find('tbody').on('change', 'tr #spouseGewogSerialNo', function () {
            var spouseGewogSerialNo = $(this).closest('tr').find('#spouseGewogSerialNo').val();
            var spouseVillageSerialNo = $(this).closest('tr').find('#spouseVillageSerialNo');
            _getVillageDropdownList(spouseVillageSerialNo, spouseGewogSerialNo, '');
        });
    }

    /**
     * To get gewog dropdown list
     */
    function _getGewogDropdownList(elementID, spouseDzongkhagID, spouseGewogID) {
        $.ajax({
            url: _baseURL() + 'getGewogDropdownList',
            type: 'GET',
            data: {dzongkhagID: spouseDzongkhagID},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(spouseGewogID);
            }
        });
    }

    /**
     * To get village dropdown list
     */
    function _getVillageDropdownList(elementID, spouseGewogID, spouseVillageID) {
        $.ajax({
            url: _baseURL() + 'getVillageDropdownList',
            type: 'GET',
            data: {gewogID: spouseGewogID},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(spouseVillageID);
            }
        });
    }

    /**
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#btnSearch').on('click', function () {
            $('#changeSpouseInformationForm').validate({
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
                if (res.status === 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.fatherInformationDTO);
                    populate(res.dto.motherInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    _loadSpouseDetails(res.dto.spouseDetailsDTOList);
                    $('#dob').val(formatAsDate(res.dto.dob));
                }
            }
        });
    }

    function _loadSpouseDetails(dtoList) {
        var row = '';
        spouseDetailsGridID.find('tbody').empty();
        var length = spouseDetailsGridID.find('tbody tr').length;

        $.each(dtoList, function (index, data) {
            row = '<tr><td style="border-top: 0 !important;"> \
                <div class="form-group"> \
                    <div class="col-sm-12 text-center">Spouse ' + (length + 1) + '</div><br/> \
                    <div class="col-sm-4"> \
                        <input type="hidden" value="' + _isNullValue(data.spouseCidNo) + '" \
                        name="spouseDetailsDTOList[' + (length) + '].spouseCidNo"> \
                        <input type="text" id="spouseCidNo" value="' + _isNullValue(data.spouseCidNo) + '" \
                        class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <select id="spouseReasonID" class="form-control" \
                        name="spouseDetailsDTOList[' + (length) + '].spouseReasonID"></select></div> \
                    <div class="col-sm-4"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                     <label class="form-label">First Name</label> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseFirstName" readonly \
                        id="spouseFirstName" class="form-control" value="' + _isNullValue(data.spouseFirstName) + '"> \
                        <input type="hidden" id="spouseSerialNo" name="spouseDetailsDTOList[' + (length) + '].spouseSerialNo" \
                        value="' + data.spouseSerialNo + '"> \
                    </div> \
                    <div class="col-sm-4"> \
                     <label class="form-label">Middle Name</label>\
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseMiddleName" id="spouseMiddleName" \
                        readonly class="form-control" value="' + _isNullValue(data.spouseMiddleName) + '"></div> \
                    <div class="col-sm-4"> \
                      <label class="form-label">Last Name</label> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseLastName" id="spouseLastName" \
                        readonly class="form-control" value="' + _isNullValue(data.spouseLastName) + '"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                     <label class="form-label">Date of Marriage</label> \
                        <input type="text" id="dateOfMarriage" name="spouseDetailsDTOList[' + (length) + '].dateOfMarriage" \
                        class="form-control" readonly value="' + formatAsDate(data.dateOfMarriage) + '"></div> \
                    <div class="col-sm-4">\
                      <label class="form-label">Country</label> \
                        <input type="hidden" value="' + _isNullValue(data.spouseCountryID) + '" \
                            name="spouseDetailsDTOList[' + (length) + '].spouseCountryID"> \
                        <input type="text" value="' + _isNullValue(data.spouseCountryName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4 hidden" id="spouseAddressDiv">\
                      <label class="form-label">Address</label> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseAddress" id="spouseAddress" \
                        class="form-control" value="' + _isNullValue(data.spouseAddress) + '"></div> \
                </div> \
                <div class="form-group" id="spousePresentDetails"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Dzongkhag:</label> \
                        <input type="hidden" value="' + _isNullValue(data.spouseDzongkhagSerialNo) + '" \
                            name="spouseDetailsDTOList[' + (length) + '].spouseDzongkhagSerialNo"> \
                        <input type="text" value="' + _isNullValue(data.spouseDzongkhagName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Gewog:</label> \
                        <input type="hidden" value="' + _isNullValue(data.spouseGewogSerialNo) + '" \
                            name="spouseDetailsDTOList[' + (length) + '].spouseGewogSerialNo"> \
                        <input type="text" value="' + _isNullValue(data.spouseGewogName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Village:</label> \
                        <input type="hidden" value="' + _isNullValue(data.spouseVillageSerialNo) + '" name="spouseDetailsDTOList[' + (length) + '].spouseVillageSerialNo"> \
                        <input type="text" value="' + _isNullValue(data.spouseVillageName) + '" class="form-control" disabled></div> \
                </div></td></tr>';
            spouseDetailsGridID.find('tbody').append(row);
            dcrc_lib.formIndexing(spouseDetailsGridID.find('tbody'), spouseDetailsGridID.find('tbody tr'));

            if (data.spouseCountryID == bhutanCountryCode) {
                spouseDetailsGridID.find('tbody tr:last').find('#spouseAddressDiv').addClass('hidden');
            } else {
                spouseDetailsGridID.find('tbody tr:last').find('#spouseAddressDiv').removeClass('hidden');
                spouseDetailsGridID.find('tbody tr:last').find('#spousePresentDetails').removeClass('hidden');
            }

            var spouseReasonID = spouseDetailsGridID.find('tbody tr:last').find('#spouseReasonID');
            dcrc_lib.loadDropDown(spouseReasonID, spouseReasonDropdownList, 'integer');
            spouseReasonID.val(data.spouseReasonID);
        });
    }

    function _isNullValue(data) {
        return data === null ? '' : data;
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

            if (cidNo === cidSrpNo) {
                selected.find('#spouseCidNo').focus();
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                warningMsg('Spouse CID/SRP No. should not be same with Application CID/SRP No.');
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
                        if (res.dto.spouseCountryName == 'Bhutan') {
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
                           // warningMsg(res.text);
                        }
                    } else if (res.status == 5) {
                        _resetSpouseDetails(selected);
                        selected.find('.spouseDetail' + selected.index()).val('');
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    function _resetSpouseDetails(selected) {
        selected.find('#spouseAddressDiv').removeClass('hidden');
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
                        class="form-control   ' + spouseDetailClass + '"></div> \
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
                case 'btnMothersDetailsNext':
                    $('#motherDetailsHead, #motherDetailsContent').removeClass('active').removeAttr('style');
                    $("#motherDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#motherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

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
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            debugger;
            $('#changeSpouseInformationDetailsForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(changeSpouseInformationMsg.processingFormData);
                        return;
                    }
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'save',
                        type: 'POST',
                        data:  new FormData(form),
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'changeSpouseInformation');
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

    return {
        getSpouseReasonDropdownList: getSpouseReasonDropdownList,
        getCountryDropdownList: getCountryDropdownList,
        getDzongkhagDropdownList: getDzongkhagDropdownList,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        validateCidSrpNoOnly: validateCidSrpNoOnly,
        getSpouseInformation: getSpouseInformation,
        validateSpouseCountry: validateSpouseCountry,
        addSpouseInformation: addSpouseInformation,
        refreshSpouseInformation: refreshSpouseInformation,
        removeSpouseInformation: removeSpouseInformation,
        removeSpouseInformationError: removeSpouseInformationError,
        nextTab: nextTab,
        previousTab: previousTab,
        save: save,
        addMoreDocuments:addMoreDocuments,
        removeFileRow:removeFileRow

    };

})();

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

    changeSpouseInformation.getSpouseReasonDropdownList();
    changeSpouseInformation.getCountryDropdownList();
    changeSpouseInformation.getDzongkhagDropdownList();
    changeSpouseInformation.getGewogDropdownList();
    changeSpouseInformation.getVillageDropdownList();
    changeSpouseInformation.validateCidSrpNoOnly();
    changeSpouseInformation.getSpouseInformation();
    changeSpouseInformation.validateSpouseCountry();
    changeSpouseInformation.addSpouseInformation();
    changeSpouseInformation.refreshSpouseInformation();
    changeSpouseInformation.removeSpouseInformation();
    changeSpouseInformation.removeSpouseInformationError();
    changeSpouseInformation.nextTab();
    changeSpouseInformation.previousTab();
    changeSpouseInformation.save();
    changeSpouseInformation.addMoreDocuments();
    changeSpouseInformation.removeFileRow();
});
