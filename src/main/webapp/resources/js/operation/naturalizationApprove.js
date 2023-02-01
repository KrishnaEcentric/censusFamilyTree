/**
 * Created by TsheringDorjiNGN on 10/13/2021.
 */

var naturalizationApproveMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    selectChanges: 'Please choose DOB or Name to change.'
};

var naturalizationApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var viewListGrid=$('#viewListGrid');
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
        return dcrc_lib.baseUrl() + 'naturalizationApprove/';
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
    function getIndividualInformation() {
        var appNo = $('#appNo').val();
        $.ajax({
            url: _baseURL() + 'getIndividualInformation',
            type: 'GET',
            data: {appNo: appNo},
            success: function (res) {
                if (res.status === 1) {
                    debugger;
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.fatherInformationDTO);
                    $('#fatherCountryID').val(res.dto.fatherInformationDTO.countryId).prop("disabled",true);
                    $('#submissionFatherCountryID').val(res.dto.fatherInformationDTO.countryId);
                    $('#resubmissionFatherDzongkhagID').val(res.dto.fatherInformationDTO.fatherDzongkhagID);
                    var resubmissionFatherGewogID=$('#resubmissionFatherGewogID');
                    $('#resubmissionFatherGewogValue').val(res.dto.fatherInformationDTO.fatherGewogID);
                    $('#resubmissionFatherVillageValue').val(res.dto.fatherInformationDTO.fatherVillageID);
                    var value=$('#resubmissionFatherGewogValue').val();
                    _getGewogDropdownList(resubmissionFatherGewogID,res.dto.fatherInformationDTO.fatherDzongkhagID,value);
                    var resubmissionFatherVillageID=$('#resubmissionFatherVillageID');
                    var villageId=$('#resubmissionFatherVillageValue').val();
                    _getVillageDropdownList(resubmissionFatherVillageID,res.dto.fatherInformationDTO.fatherGewogID,villageId);
                    populate(res.dto.motherInformationDTO);
                    $('#motherCountryID').val(res.dto.motherInformationDTO.countryId).prop("disabled",true);
                    $('#resubmissionMotherCountryID').val(res.dto.motherInformationDTO.countryId);
                    var resubmissionMotherGewogID=$('#resubmissionMotherGewogID');
                    $('#motherGewogValue').val(res.dto.motherInformationDTO.motherGewogID);
                    var motherGewogID=$('#motherGewogValue').val();
                    _getGewogDropdownList(resubmissionMotherGewogID,res.dto.motherInformationDTO.motherDzongkhagID,motherGewogID);
                    $('#motherVillageValue').val(res.dto.motherInformationDTO.motherVillageID);
                    var resubmissionMotherVillageID=$('#resubmissionMotherVillageID');
                    var motherVillageId=$('#motherVillageValue').val();
                    _getVillageDropdownList(resubmissionMotherVillageID,res.dto.motherInformationDTO.motherGewogID,motherVillageId);
                    populate(res.dto.placeOfBirthInformationDTO);
                    if(res.dto.spouseDetailsDTOList!=null) {
                        _loadSpouseDetails(res.dto.spouseDetailsDTOList);
                    }
                    populate(res.dto.householdDTO);
                }
            }
        });
    }



    /**
     * To get spouse information
     */

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
                        <input type="text" id="spouseReason" value="' + _isNullValue(data.spouseReason) + '" \
                        class="form-control" disabled></div> \
                    <div class="col-sm-4"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseFirstName" readonly \
                        id="spouseFirstName" class="form-control" value="' + (data.spouseFirstName) + '"> \
                        <input type="hidden" id="spouseSerialNo" name="spouseDetailsDTOList[' + (length) + '].spouseSerialNo" \
                        value="' + data.spouseSerialNo + '"> \
                    </div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseMiddleName" id="spouseMiddleName" \
                        readonly class="form-control" value="' + (data.spouseMiddleName) + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseLastName" id="spouseLastName" \
                        readonly class="form-control" value="' + (data.spouseLastName) + '"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" id="dateOfMarriage" name="spouseDetailsDTOList[' + (length) + '].dateOfMarriage" \
                        class="form-control" readonly value="' + formatAsDate(data.dateOfMarriage) + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="hidden" value="' + _isNullValue(data.spouseCountryID) + '" \
                            name="spouseDetailsDTOList[' + (length) + '].spouseCountryID"> \
                        <input type="text" value="' + _isNullValue(data.spouseCountryName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4 hidden" id="spouseAddressDiv"> \
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

    function removeErrorClass() {
        $('.form-control').on('keypress', function () {
            $(this).removeClass('error');
        })
    }

    function getApplicationDetails() {


        var applicationNumberID = $('#applicationNumber');
        debugger
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
    function resubmit(){
        $('#resubBtn').on('click', function () {
            $('#userList').empty();
            var app = $('#appNo').val();
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
            var applicationNumber = $('#appNo').val();
            var roleId=$('#userList').val().split("-");
            if (applicationNumber === '') {
                warningMsg(naturalizationApproveMsg.applicationNumberReq);
                return;
            }
            if($('#remarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#remarks').val(),roleId:roleId[0],roleName:roleId[1]},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'taskList');
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

    function save() {
        $('#btnSave').on('click', function () {
            var applicationNumber = $('#appNo').val();
            if (applicationNumber === '') {
                warningMsg(naturalizationApproveMsg.applicationNumberReq);
                return;
            }
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'approve',
                        type: 'POST',
                        data: {applicationNumber: applicationNumber, remarks: $('#remarks').val()},
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'taskList');
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
        });
    }


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
            } else if (elementID == 'resubmissionFatherDzongkhagID') {
                gewogElementID = $('#resubmissionFatherGewogID');
            } else if (elementID == 'resubmissionMotherDzongkhagID') {
                gewogElementID = $('#resubmissionMotherGewogID');
            }
            _getGewogDropdownList(gewogElementID, dzongkhagID, '');
        });
    }

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
            } else if (elementID == 'resubmissionFatherGewogID') {
                villageElementID = $('#resubmissionFatherVillageID');
            } else if (elementID == 'resubmissionMotherGewogID') {
                villageElementID = $('#resubmissionMotherVillageID');
            }

            _getVillageDropdownList(villageElementID, gewogID);
        });
    }



    function getResubmissionGewogDropdownList() {
        var dzongkhagID=$('#presentDzongkhagID').val();
        var gewogElementID = $('#presentGewogID');
        $.ajax({
            url: _baseURL() + 'getGewogDropdownList',
            type: 'GET',
            data: {dzongkhagID: dzongkhagID},
            success: function (res) {
                dcrc_lib.loadDropDown(gewogElementID, res, 'integer');
                gewogElementID.val($('#presentGewogValue').val());
            }
        });
    }

    function getResubmissionVillageDropdownList() {
        var gewogID=$('#presentGewogValue').val();
        var ElementID = $('#presentVillageID');
        $.ajax({
            url: _baseURL() + 'getVillageDropdownList',
            type: 'GET',
            data: {gewogID: gewogID},
            success: function (res) {
                dcrc_lib.loadDropDown(ElementID, res, 'integer');
                ElementID.val($('#presentVillageValue').val());
            }
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

    function getBirthGewogDropdownList() {
        var dzongkhagID=$('#birthDzongkhagValue').val();
        var gewogElementID = $('#placeOfBirthGewogID');
        $.ajax({
            url: _baseURL() + 'getGewogDropdownList',
            type: 'GET',
            data: {dzongkhagID: dzongkhagID},
            success: function (res) {
                dcrc_lib.loadDropDown(gewogElementID, res, 'integer');
                gewogElementID.val($('#birthGewogValue').val());
            }
        });
    }

    function getBirthVillageDropdownList() {
        var gewogID=$('#birthGewogValue').val();
        var ElementID = $('#placeOfBirthVillageID');
        $.ajax({
            url: _baseURL() + 'getVillageDropdownList',
            type: 'GET',
            data: {gewogID: gewogID},
            success: function (res) {
                dcrc_lib.loadDropDown(ElementID, res, 'integer');
                ElementID.val($('#birthVillageValue').val());
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


    function getHoHIndividualInformation() {
        $('#hohCIDNo').on('change', function () {
            var cidSrpNoID = $(this);
            $.ajax({
                url: _baseURL() + 'getIndividualInformationByCid',
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
                        $('#hohDzongkhagName').val(res.dto.citizenDetails.birthDzongkhagName);
                        $('#hohGewogName').val(res.dto.citizenDetails.birthGewogName);
                        $('#hohVillageName').val(res.dto.citizenDetails.birthVillageName);
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

    function btnResubmitSave() {
        $('#btnResubmission').on('click', function () {
            $('#naturalizationDetailsResubmissionForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(birthRegistrationMsg.processingFormData);
                        return;
                    }
                    $('#btnResubmission').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'saveResubmission?firstNameBh='+$('#firstNameBh').val(),
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
                            $('#btnResubmission').attr('disabled', false);
                            isSubmitted = false;
                        }
                    });
                }
            });
        });
    }


    function reject() {
        $('#btnRejectId').on('click', function () {
            var applicationNumber = $('#appNo').val();
            if (applicationNumber === '') {
                warningMsg(birthRegistrationMsg.applicationNumberReq);
                return;
            }
            if($('#remarks').val() != ''){
                $.ajax({
                    url: _baseURL() + 'reject',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#remarks').val()},
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
                $('#remarks').focus();
            }

        });
    }

    return {
        nextTab: nextTab,
        previousTab: previousTab,
        save: save,
        removeErrorClass: removeErrorClass,
        getIndividualInformation:getIndividualInformation,
        getApplicationDetails:getApplicationDetails,
        resubmit:resubmit,
        sendBack:sendBack,
        reject:reject,
        validateMaritalStatus:validateMaritalStatus,
        getResubmissionGewogDropdownList:getResubmissionGewogDropdownList,
        getResubmissionVillageDropdownList:getResubmissionVillageDropdownList,
        getBirthGewogDropdownList:getBirthGewogDropdownList,
        getBirthVillageDropdownList:getBirthVillageDropdownList,
        getHoHIndividualInformation:getHoHIndividualInformation,
        getGewogDropdownList:getGewogDropdownList,
        getVillageDropdownList:getVillageDropdownList,
        btnResubmitSave:btnResubmitSave
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

    naturalizationApprove.nextTab();
    naturalizationApprove.previousTab();
    naturalizationApprove.save();
    naturalizationApprove.removeErrorClass();
    naturalizationApprove.getIndividualInformation();
    naturalizationApprove.getApplicationDetails();
    naturalizationApprove.resubmit();
    naturalizationApprove.sendBack();
    naturalizationApprove.reject();
    naturalizationApprove.validateMaritalStatus();
    naturalizationApprove.getResubmissionGewogDropdownList();
    naturalizationApprove.getResubmissionVillageDropdownList();
    naturalizationApprove.getBirthGewogDropdownList();
    naturalizationApprove.getBirthVillageDropdownList();
    naturalizationApprove.getHoHIndividualInformation();
    naturalizationApprove.getGewogDropdownList();
    naturalizationApprove.getVillageDropdownList();
    naturalizationApprove.btnResubmitSave();
});


