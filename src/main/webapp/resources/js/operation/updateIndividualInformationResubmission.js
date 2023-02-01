/**
 * Created by Hidhen on 26-Jul-19.
 */
var updateIndividualInformationMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    selectChanges: 'Please select the checkboxes to change.'
};

var updateIndividualInformationResubmission = (function () {
    "use strict";
    var isSubmitted = false;
    var updateIndividualAttachmentGrid = $('#updateIndividualAttachmentGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'updateIndividualInformationResubmission/';
    }

    /**
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#btnSearch').on('click', function () {
            $('#updateIndividualInformationResubmissionForm').validate({
                submitHandler: function (form) {
                    var cidSrpNoID = $('#cidSrpNo');
                    $.ajax({
                        url: _baseURL() + 'validateCidSrpNoOnly',
                        type: 'GET',
                        data: {cidSrpNo: cidSrpNoID.val()},
                        success: function (res) {
                            if (res.status === 1) {
                                _getIndividualInformation(cidSrpNoID.val());
                            } else if (res.status == 5) {
                                cidSrpNoID.val('');
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
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);
                    $('#dob').val(formatAsDate(res.dto.dob));
                    $('.reset').val('');
                    $('.fatherDetails').val('');
                    $('.motherDetails').val('');
                    $('.hohDetails').val('');

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

                } else if (res.status == 5) {
                    warningMsg(res.text);
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
     * To application for self or others details
     */
    function getFatherInformation() {
        $('#changeFatherCidNo').on('change', function () {
            var changeFatherCidNo = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: changeFatherCidNo.val(),type:'M'},
                success: function (res) {
                    if (res.status == 1) {
                        $('#fatherFirstName').val(res.dto.spouseFirstName);
                        $('#fatherMiddleName').val(res.dto.spouseMiddleName);
                        $('#fatherLastName').val(res.dto.spouseLastName);
                        $('#fatherHouseholdNo').val(res.dto.spouseHouseholdNo);
                        $('#fatherHouseNo').val(res.dto.spouseHouseNo);
                        $('#fatherThramNo').val(res.dto.spouseThramNo);
                        $('#fatherDzongkhagID').val(res.dto.spouseDzongkhagSerialNo);
                        $('#fatherNationalityID').val(res.dto.spouseCountryID);
                        $('#fatherCitizenshipBy').val(res.dto.spouseCitizenBy);
                        _getGewogDropdownList($('#fatherGewogID'), res.dto.spouseDzongkhagSerialNo, res.dto.spouseGewogSerialNo);
                        _getVillageDropdownList($('#fatherVillageID'), res.dto.spouseGewogSerialNo, res.dto.spouseVillageSerialNo);
                    } else if (res.status == 5) {
                        changeFatherCidNo.val('').focus();
                        $('.fatherDetails').val('');
                        $('#fatherGewogID').empty();
                        $('#fatherVillageID').empty();
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    /**
     * To application for self or others details
     */
    function getMotherInformation() {
        $('#changeMotherCidNo').on('change', function () {
            var changeMotherCidNo = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: changeMotherCidNo.val(),type:'F'},
                success: function (res) {
                    if (res.status == 1) {
                        $('#motherFirstName').val(res.dto.spouseFirstName);
                        $('#motherMiddleName').val(res.dto.spouseMiddleName);
                        $('#motherLastName').val(res.dto.spouseLastName);
                        $('#motherHouseholdNo').val(res.dto.spouseHouseholdNo);
                        $('#motherHouseNo').val(res.dto.spouseHouseNo);
                        $('#motherThramNo').val(res.dto.spouseThramNo);
                        $('#motherDzongkhagID').val(res.dto.spouseDzongkhagSerialNo);
                        $('#motherNationalityID').val(res.dto.spouseCountryID);
                        $('#motherCitizenshipBy').val(res.dto.spouseCitizenBy);
                        _getGewogDropdownList($('#motherGewogID'), res.dto.spouseDzongkhagSerialNo, res.dto.spouseGewogSerialNo);
                        _getVillageDropdownList($('#motherVillageID'), res.dto.spouseGewogSerialNo, res.dto.spouseVillageSerialNo);
                    } else if (res.status == 5) {
                        changeMotherCidNo.val('').focus();
                        $('.motherDetails').val('');
                        $('#motherGewogID').empty();
                        $('#motherVillageID').empty();
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    /**
     * To application for self or others details
     */
    function getHoHInformation() {
        $('#changeHoHCidNo').on('change', function () {
            var changeHoHCidNo = $(this);
            $.ajax({
                url: _baseURL() + 'getHoHInformation',
                type: 'GET',
                data: {cidSrpNo: changeHoHCidNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#hohFirstName').val(res.dto.spouseFirstName);
                        $('#hohMiddleName').val(res.dto.spouseMiddleName);
                        $('#hohLastName').val(res.dto.spouseLastName);
                        $('#hohHouseholdNo').val(res.dto.spouseHouseholdNo);
                        $('#hohHouseNo').val(res.dto.spouseHouseNo);
                        $('#hohThramNo').val(res.dto.spouseThramNo);
                        $('#hohDzongkhagID').val(res.dto.spouseDzongkhagSerialNo);
                        _getGewogDropdownList($('#hohGewogID'), res.dto.spouseDzongkhagSerialNo, res.dto.spouseGewogSerialNo);
                        _getVillageDropdownList($('#hohVillageID'), res.dto.spouseGewogSerialNo, res.dto.spouseVillageSerialNo);
                    } else if (res.status == 5) {
                        changeHoHCidNo.val('').focus();
                        $('.hohDetails').val('');
                        $('#hohGewogID').empty();
                        $('#hohVillageID').empty();
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
                case 'btnPersonalDetailsNextURS':
                    $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                    $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#presentAddressId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    break;
                case 'btnPresentAddressNextURS':
                    $('#presentAddressHead, #presentAddressContent').removeClass('active').removeAttr('style');
                    $("#presentAddressId").css({"color": "white", "background-color": "#120f65"});
                    $('#presentAddressCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#parentsDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#parentsDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnParentsDetailsNextURS':
                    $('#parentsDetailsHead, #parentsDetailsContent').removeClass('active').removeAttr('style');
                    $("#parentsDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#parentsDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#requestApplicationId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#requestApplicationContent').prop('class', 'tab-pane active');
                    break;
                case 'btnRequestApplicationContentNextURS':
                    isFatherExist()
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


    function isFatherExist(){
        var isExist = true;
        debugger;
        if($('#changeFatherCidNo').val() ==''){
            $('#changeFatherCidNo').prop('required', false);
            $('#fatherMiddleName').prop('required', false);
            $('#fatherLastName').prop('required', false);
            $('#fatherHouseholdNo').prop('required', false);
            $('#fatherHouseNo').prop('required', false);
            $('#fatherThramNo').prop('required', false);
            $('#fatherDzongkhagID').prop('required', false);
            $('#fatherGewogID').prop('required', false);
            $('#fatherVillageID').prop('required', false);
            $('#fatherNationalityID').prop('required', false);
            $('#fatherCitizenshipBy').prop('required', false);
            isExist=false;
        }
        if($('#changeMotherCidNo').val() ==''){
            $('#changeMotherCidNo').prop('required', false);
            $('#motherMiddleName').prop('required', false);
            $('#motherLastName').prop('required', false);
            $('#motherHouseholdNo').prop('required', false);
            $('#motherHouseNo').prop('required', false);
            $('#motherThramNo').prop('required', false);
            $('#motherDzongkhagID').prop('required', false);
            $('#motherGewogID').prop('required', false);
            $('#motherVillageID').prop('required', false);
            $('#motherNationalityID').prop('required', false);
            $('#motherCitizenshipBy').prop('required', false);
            isExist=false;
        }
        return isExist;
    }

    /**
     * To go to previous tab using previous button
     */
    function previousTab() {
        $('.btnPrevious').on('click', function () {
            var previousButton = $(this).prop('id');

            switch (previousButton) {
                case 'btnPresentAddressPrevURS':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

                    $('#presentAddressHead, #presentAddressContent').removeClass('active');
                    $("#presentAddressId").css("background-color", "#120f65");
                    break;
                case 'btnParentsDetailsPrevURS':
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    $("#presentAddressId").css("background-color", "rgb(18, 18, 19)");
                    $('#presentAddressCheck').empty();

                    $('#parentsDetailsHead, #parentsDetailsContent').removeClass('active');
                    $("#parentsDetailsId").css("background-color", "#120f65");
                    break;
                case 'btnRequestApplicationPrevURS':
                    $('#parentsDetailsContent').prop('class', 'tab-pane active');
                    $("#parentsDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#parentsDetailsCheck').empty();

                    $('#requestApplicationHead, #requestApplicationContent').removeClass('active');
                    $("#requestApplicationId").css("background-color", "#120f65");
                    break;
                case 'btnAttachmentPrevURS':
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

    function validateChange() {
        $('.updateDetails').on('click', function () {
            var isChecked = $(this).is(':checked');
            var changeDetailsID = '#' + $(this).prop('id') + 'ID';
            var changeDetailsDivID = '#' + $(this).prop('id') + 'Div';
            if (isChecked) {
                $(changeDetailsDivID).removeClass('hidden');
                $(changeDetailsID).attr('disabled', false);
            } else {
                $(changeDetailsDivID).addClass('hidden');
                $(changeDetailsID).attr('disabled', true);
            }
        });
    }

    function validatePersonStatusChange() {
        $('#personStatus').on('click', function () {
            var isChecked = $(this).is(':checked');
            if (isChecked) {
                $('#personStatusDiv').removeClass('hidden');
                $('#personStatusID').attr('disabled', false);
                $('#personStatusRemarksDiv').removeClass('hidden');
                $('#personStatusRemarks').attr('disabled', false);
            } else {
                $('#personStatusDiv').addClass('hidden');
                $('#personStatusID').attr('disabled', true);
                $('#personStatusRemarksDiv').addClass('hidden');
                $('#personStatusRemarks').attr('disabled', true);
            }
        });
    }

    function validateFatherDetailsChange() {
        $('#fatherDetails').on('click', function () {
            var isChecked = $(this).is(':checked');
            if (isChecked) {
                $('#fatherDetailsDiv').removeClass('hidden');
                $('#changeFatherCidNo').attr('disabled', false);
            } else {
                $('#fatherDetailsDiv').addClass('hidden');
                $('#changeFatherCidNo').attr('disabled', true);
                $('.fatherDetails').attr('disabled', true).val('');
                $('#fatherGewogID').empty();
                $('#fatherVillageID').empty();
            }
        });
    }

    function validateMotherDetailsChange() {
        $('#motherDetails').on('click', function () {
            var isChecked = $(this).is(':checked');
            if (isChecked) {
                $('#motherDetailsDiv').removeClass('hidden');
                $('#changeMotherCidNo').attr('disabled', false);
            } else {
                $('#motherDetailsDiv').addClass('hidden');
                $('#changeMotherCidNo').attr('disabled', true);
                $('.motherDetails').attr('disabled', true).val('');
                $('#motherGewogID').empty();
                $('#motherVillageID').empty();
            }
        });
    }

    function validateHoHDetailsChange() {
        $('#householdInfo').on('click', function () {
            var isChecked = $(this).is(':checked');
            if (isChecked) {
                $('#householdInfoDiv').removeClass('hidden');
                $('#changeHoHCidNo').attr('disabled', false);
            } else {
                $('#householdInfoDiv').addClass('hidden');
                $('#changeHoHCidNo').attr('disabled', true);
                $('.hohDetails').attr('disabled', true).val('');
                $('#hohGewogID').empty();
                $('#hohVillageID').empty();
            }
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getFatherGewogDropdownList() {
        $('#fatherDzongkhagID').on('change', function () {
            var fatherDzongkhagID = $(this).val();
            _getGewogDropdownList($('#fatherGewogID'), fatherDzongkhagID, '');
        });
    }

    /**
     * To get village dropdown list
     */
    function getFatherVillageDropdownList() {
        $('#fatherGewogID').on('change', function () {
            var fatherGewogID = $(this).val();
            _getVillageDropdownList($('#fatherVillageID'), fatherGewogID, '');
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getMotherGewogDropdownList() {
        $('#motherDzongkhagID').on('change', function () {
            var motherDzongkhagID = $(this).val();
            _getGewogDropdownList($('#motherGewogID'), motherDzongkhagID, '');
        });
    }

    /**
     * To get village dropdown list
     */
    function getMotherVillageDropdownList() {
        $('#motherGewogID').on('change', function () {
            var motherGewogID = $(this).val();
            _getVillageDropdownList($('#motherVillageID'), motherGewogID, '');
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getHoHGewogDropdownList() {
        $('#hohDzongkhagID').on('change', function () {
            var hohDzongkhagID = $(this).val();
            _getGewogDropdownList($('#hohGewogID'), hohDzongkhagID, '');
        });
    }

    /**
     * To get village dropdown list
     */
    function getHoHVillageDropdownList() {
        $('#hohGewogID').on('change', function () {
            var hohGewogID = $(this).val();
            _getVillageDropdownList($('#hohVillageID'), hohGewogID, '');
        });
    }

    /**
     * To get gewog dropdown list
     */
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

    function editParentsDetails() {
        $('.btnEdit').on('click', function () {
            var btnEditID = $(this).attr('id');
            switch (btnEditID) {
                case 'btnFatherDetailsEdit':
                   // if ($('#changeFatherCidNo').val() !== '') {
                        $('.fatherDetails').attr('disabled', false);
                        $('#fatherNationalityID').attr('disabled', true);
                        $('#fatherCitizenshipBy').attr('disabled', true);
                   /* } else {
                        $('.fatherDetails').attr('disabled', true);
                    }*/
                    break;
                case 'btnMotherDetailsEdit':
                    //if ($('#changeMotherCidNo').val() !== '') {
                        $('.motherDetails').attr('disabled', false);
                        $('#motherNationalityID').attr('disabled', true);
                        $('#motherCitizenshipBy').attr('disabled', true);
                   /* } else {
                        $('.motherDetails').attr('disabled', true);
                    }*/
                    break;
            }
        });
    }

    function editHoHDetails() {
        $('.btnEditHoH').on('click', function () {
            var btnEditID = $(this).attr('id');
            var changeHoHCidNo = $('#changeHoHCidNo').val();
            switch (btnEditID) {
                case 'hohHouseNoEdit':
                    if (changeHoHCidNo !== '') {
                        $('#hohHouseNo').attr('disabled', false);
                    } else {
                        $('#hohHouseNo').attr('disabled', true);
                    }
                    break;
                case 'hohThramNoEdit':
                    if (changeHoHCidNo !== '') {
                        $('#hohThramNo').attr('disabled', false);
                    } else {
                        $('#hohThramNo').attr('disabled', true);
                    }
                    break;
                case 'hohDzoGewogEdit':
                    if (changeHoHCidNo !== '') {
                        $('#hohDzongkhagID').attr('disabled', false);
                        $('#hohGewogID').attr('disabled', false);
                        $('#hohVillageID').attr('disabled', false);
                    } else {
                        $('#hohDzongkhagID').attr('disabled', true);
                        $('#hohGewogID').attr('disabled', true);
                        $('#hohVillageID').attr('disabled', true);
                    }
                    break;
            }
        });
    }
    /**
     * To add more document
     */
    function addMoreDocuments() {
        $('#addMoreUpdateIndividualDocuments').on('click', function () {
            if (validateDocument(false)) {
                return;
            }
            var row = '<tr><td> \
                <input type="file" id="multipartFile" class="uploadMultiFile" name="applicationDocumentDTOList[0].multipartFile" \
                required="required"></td> \
                <td><div class="col-sm-6"></div></td><td><div class="col-sm-6"> \
                    <button type="button" class="btn btn-danger btn-sm" id="btnRemove"> \
                <i class="fa fa-trash"></i> Remove</button></div></td></td></tr>';

            updateIndividualAttachmentGrid.find('tbody').append(row);
            dcrc_lib.formIndexing(updateIndividualAttachmentGrid.find('tbody'), updateIndividualAttachmentGrid.find('tbody tr'));

        });
    }


    function addMultipleFile() {
        // invoke plugin
        $('#multipartFile').MultiFile({
            max: 3,
            accept: 'gif|jpg|png'
        });
    }

    /**
     * To remove the file
     * @returns {*}
     */
    function removeFileRow() {
        $('#updateIndividualAttachmentGrid').on('click', 'tbody tr #btnRemove', function () {
            $(this).closest('tr').remove();
            dcrc_lib.formIndexing(updateIndividualAttachmentGrid.find('tbody'), updateIndividualAttachmentGrid.find('tbody tr'));
        });
    }

    /**
     * To check if the document is selected
     * @param condition
     * @returns {*}
     */
    function validateDocument(condition) {
        $('#updateIndividualAttachmentGrid').find('tbody tr').each(function () {
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
     * To get the individual information
     */
    function getIndividualInformationUpdateResubmission() {
        $.ajax({
            url: _baseURL() + 'getIndividualInformationUpdateResubmission',
            type: 'GET',
            data: {applicationNumber: $('#applicationNumber').val()},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    _populateUpdateIndividualInformation(res.dto.updateIndividualInformationDTO);
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);
                    $('#dob').val(formatAsDate(res.dto.dob));
                    $('#fatherDzongkhagID').val(res.dto.updateIndividualInformationDTO.fatherDzongkhagID);
                    $('#motherDzongkhagID').val(res.dto.updateIndividualInformationDTO.motherDzongkhagID);
                    $('#mailingAddress').val(res.dto.updateIndividualInformationDTO.mailingAddress);

                    $('#hohGewogID').append("<option value='"+res.dto.updateIndividualInformationDTO.hohGewogID+"'>"+res.dto.updateIndividualInformationDTO.hohGewogName+"</option>");
                    $('#hohVillageID').append("<option value='"+res.dto.updateIndividualInformationDTO.hohVillageID+"'>"+res.dto.updateIndividualInformationDTO.hohVillageName+"</option>");

                    $('#fatherGewogID').append("<option value='"+res.dto.updateIndividualInformationDTO.fatherGewogID+"'>"+res.dto.updateIndividualInformationDTO.fatherGewogName+"</option>");
                    $('#fatherVillageID').append("<option value='"+res.dto.updateIndividualInformationDTO.fatherVillageID+"'>"+res.dto.updateIndividualInformationDTO.fatherVillageName+"</option>");

                    $('#motherGewogID').append("<option value='"+res.dto.updateIndividualInformationDTO.motherGewogID+"'>"+res.dto.updateIndividualInformationDTO.motherGewogName+"</option>");
                    $('#motherVillageID').append("<option value='"+res.dto.updateIndividualInformationDTO.motherVillageID+"'>"+res.dto.updateIndividualInformationDTO.motherVillageName+"</option>");

                    if(res.dto.updateIndividualInformationDTO.changeMotherTongue == true){
                        $('#motherTongue').prop('checked',true);
                        $('#motherTongueDiv').removeClass('hidden');
                        $('#motherTongueID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeReligion == true){
                        $('#religion').prop('checked',true);
                        $('#religionDiv').removeClass('hidden');
                        $('#religionID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeHighestEducationAttained == true){
                        $('#highestEducationAttained').prop('checked',true);
                        $('#highestEducationAttainedDiv').removeClass('hidden');
                        $('#highestEducationAttainedID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeHoHRelation == true){
                        $('#hohRelation').prop('checked',true);
                        $('#hohRelationDiv').removeClass('hidden');
                        $('#hohRelationID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changePersonStatus == true){
                        $('#personStatus').prop('checked',true);
                        $('#personStatusDiv').removeClass('hidden');
                        $('#personStatusRemarksDiv').removeClass('hidden');
                        $('#personStatusID').prop('disabled',false);
                        $('#personStatusRemarks').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeOccupation == true){
                        $('#occupation').prop('checked',true);
                        $('#occupationDiv').removeClass('hidden');
                        $('#occupationID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeSex == true){
                        $('#sex').prop('checked',true);
                        $('#sexDiv').removeClass('hidden');
                        $('#sexID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeAdverseRecord == true){
                        $('#adverseRecord').prop('checked',true);
                        $('#adverseRecordDiv').removeClass('hidden');
                        $('#adverseRecordID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeMaritalStatus == true){
                        $('#maritalStatus').prop('checked',true);
                        $('#maritalStatusDiv').removeClass('hidden');
                        $('#maritalStatusID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeDisability == true){
                        $('#disability').prop('checked',true);
                        $('#disabilityDiv').removeClass('hidden');
                        $('#disabilityID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeRemarks == true){
                        $('#remarks').prop('checked',true);
                        $('#remarksDiv').removeClass('hidden');
                        $('#remarksID').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeFatherDetails == true){
                        $('#fatherDetails').prop('checked',true);
                        $('#fatherDetailsDiv').removeClass('hidden');
                        $('#changeFatherCidNo').prop('disabled',false);
                        $('#fatherFirstName').prop('disabled',false);
                        $('#fatherMiddleName').prop('disabled',false);
                        $('#fatherLastName').prop('disabled',false);
                        $('#fatherHouseholdNo').prop('disabled',false);
                        $('#fatherHouseNo').prop('disabled',false);
                        $('#fatherThramNo').prop('disabled',false);
                        $('#fatherDzongkhagID').prop('disabled',false);
                        $('#fatherGewogID').prop('disabled',false);
                        $('#fatherVillageID').prop('disabled',false);
                        $('#fatherNationalityID').prop('disabled',false);
                        $('#fatherCitizenshipBy').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeMotherDetails == true){
                        $('#motherDetails').prop('checked',true);
                        $('#motherDetailsDiv').removeClass('hidden');
                        $('#changeMotherCidNo').prop('disabled',false);
                        $('#motherFirstName').prop('disabled',false);
                        $('#motherMiddleName').prop('disabled',false);
                        $('#motherLastName').prop('disabled',false);
                        $('#motherHouseholdNo').prop('disabled',false);
                        $('#motherHouseNo').prop('disabled',false);
                        $('#motherThramNo').prop('disabled',false);
                        $('#motherDzongkhagID').prop('disabled',false);
                        $('#motherGewogID').prop('disabled',false);
                        $('#motherVillageID').prop('disabled',false);
                        $('#motherNationalityID').prop('disabled',false);
                        $('#motherCitizenshipBy').prop('disabled',false);
                    }
                    if(res.dto.updateIndividualInformationDTO.changeHouseholdInfo == true){
                        $('#householdInfo').prop('checked',true);
                        $('#householdInfoDiv').removeClass('hidden');
                        $('#changeHoHCidNo').prop('disabled',false);
                        $('#hohFirstName').prop('disabled',false);
                        $('#hohMiddleName').prop('disabled',false);
                        $('#hohLastName').prop('disabled',false);
                        $('#hohHouseholdNo').prop('disabled',false);
                        $('#hohHouseNo').prop('disabled',false);
                        $('#hohThramNo').prop('disabled',false);
                        $('#hohDzongkhagID').prop('disabled',false);
                        $('#hohGewogID').prop('disabled',false);
                        $('#hohVillageID').prop('disabled',false);
                    }

                    var documentDto = res.dto.applicationDocumentDTOList;
                    var indUpdateAttachment = '';
                    var m=0;
                    for(var i in documentDto){
                        m++;
                        var deleteHr = "";
                        deleteHr = deleteHr + "<td><input type='hidden' class='documentId' id='documentId' value='" + documentDto[i].documentUUID + "'/><a class='p-2 del_row'><i class='fa fa-trash text-danger'></i></a></td>";
                        indUpdateAttachment = indUpdateAttachment +"<tr>" +
                        "<td>"+m+"</td>" +
                        "<td>"+documentDto[i].documentName+"</td>" +
                        "<td><a href='" + _baseURL() + "/viewDownload?documentPath=" + documentDto[i].uploadURL + "' target='_blank'> View </a></td>" +
                        deleteHr +
                        "</tr>"
                    }
                    $('#indUpdateAttachmentId').find('tbody').html(indUpdateAttachment);
                }
            }
        });
    }

    /**
     * To save the form data.
     */
    function saveResubmission() {
        $('#btnSaveURS').on('click', function () {
            $('#updateIndividualInformationDetailsResubmissionForm').validate({
                submitHandler: function (form) {
                    if (!_validateIfChecked(false)) {
                        warningMsg(updateIndividualInformationMsg.selectChanges);
                        return;
                    }
                    if (isSubmitted) {
                        warningMsg(updateIndividualInformationMsg.processingFormData);
                        return;
                    }
                    _validateDetailsOnSave();
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'saveResubmission?applicationNumber='+$('#applicationNumber').val(),
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
                            $('#btnSaveUInfo').attr('disabled', false);
                            isSubmitted = false;
                            _validateDetailsAfterSave();
                        }
                    });
                }
            });
        });
    }

    function _validateDetailsOnSave() {
        if ($('#fatherDetails').is(':checked')) {
            $('.fatherDetails').attr('disabled', false);
        }

        if ($('#motherDetails').is(':checked')) {
            $('.motherDetails').attr('disabled', false);
        }

        if ($('#householdInfo').is(':checked')) {
            $('.hohDetails').attr('disabled', false);
        }
    }

    function _validateDetailsAfterSave() {
        if ($('#fatherDetails').is(':checked')) {
            $('.fatherDetails').attr('disabled', true);
        }

        if ($('#motherDetails').is(':checked')) {
            $('.motherDetails').attr('disabled', true);
        }

        if ($('#householdInfo').is(':checked')) {
            $('.hohDetails').attr('disabled', true);
        }
    }

    function _validateIfChecked(condition) {
        $('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                condition = true;
            }
        });
        return condition;
    }

    function _prepareFormData(data) {
        $('input[type="checkbox"]').each(function () {
            var thisID = $(this);
            if (thisID.is(':checked')) {
                data.push({name: thisID.attr('name'), value: true});
            } else {
                data.push({name: thisID.attr('name'), value: false});
            }
        });
        return data;
    }

    function deleteThisDoc(){
        $('body').on('click','.del_row',function(e){
            var hrId = $(this).closest('tr').find('.documentId').val();
            $.ajax({
                url:  _baseURL() +'/deleteThisDoc?applicationNumber='+$('#applicationNumber').val() + '&documentId='+hrId,
                type: 'GET',
                data: {hrId:hrId}
            });
            $(this).closest('tr').remove();
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
        validateCidSrpNoOnly: validateCidSrpNoOnly,
        getFatherInformation: getFatherInformation,
        getMotherInformation: getMotherInformation,
        getHoHInformation: getHoHInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        validateChange: validateChange,
        validatePersonStatusChange: validatePersonStatusChange,
        validateFatherDetailsChange: validateFatherDetailsChange,
        validateMotherDetailsChange: validateMotherDetailsChange,
        validateHoHDetailsChange: validateHoHDetailsChange,
        getFatherGewogDropdownList: getFatherGewogDropdownList,
        getFatherVillageDropdownList: getFatherVillageDropdownList,
        getMotherGewogDropdownList: getMotherGewogDropdownList,
        getMotherVillageDropdownList: getMotherVillageDropdownList,
        getHoHGewogDropdownList: getHoHGewogDropdownList,
        getHoHVillageDropdownList: getHoHVillageDropdownList,
        editParentsDetails: editParentsDetails,
        editHoHDetails: editHoHDetails,
        addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        getIndividualInformationUpdateResubmission: getIndividualInformationUpdateResubmission,
        saveResubmission: saveResubmission,
        deleteThisDoc: deleteThisDoc,
        getApplicationDetails: getApplicationDetails,
        addMultipleFile: addMultipleFile
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

    updateIndividualInformationResubmission.validateCidSrpNoOnly();
    updateIndividualInformationResubmission.getFatherInformation();
    updateIndividualInformationResubmission.getMotherInformation();
    updateIndividualInformationResubmission.getHoHInformation();
    updateIndividualInformationResubmission.nextTab();
    updateIndividualInformationResubmission.previousTab();
    updateIndividualInformationResubmission.validateChange();
    updateIndividualInformationResubmission.validatePersonStatusChange();
    updateIndividualInformationResubmission.validateFatherDetailsChange();
    updateIndividualInformationResubmission.validateMotherDetailsChange();
    updateIndividualInformationResubmission.validateHoHDetailsChange();
    updateIndividualInformationResubmission.getFatherGewogDropdownList();
    updateIndividualInformationResubmission.getFatherVillageDropdownList();
    updateIndividualInformationResubmission.getMotherGewogDropdownList();
    updateIndividualInformationResubmission.getMotherVillageDropdownList();
    updateIndividualInformationResubmission.getHoHGewogDropdownList();
    updateIndividualInformationResubmission.getHoHVillageDropdownList();
    updateIndividualInformationResubmission.editParentsDetails();
    updateIndividualInformationResubmission.editHoHDetails();
    updateIndividualInformationResubmission.addMoreDocuments();
    updateIndividualInformationResubmission.removeFileRow();
    updateIndividualInformationResubmission.getIndividualInformationUpdateResubmission();
    updateIndividualInformationResubmission.saveResubmission();
    updateIndividualInformationResubmission.getApplicationDetails();
    updateIndividualInformationResubmission.deleteThisDoc();
    updateIndividualInformationResubmission.addMultipleFile()

});
