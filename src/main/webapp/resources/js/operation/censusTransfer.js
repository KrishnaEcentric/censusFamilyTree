/**
 * Created by Hidhen on 26-Jul-19.
 */
var censusTransferMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var censusTransfer = (function () {
    "use strict";
    var isSubmitted = false;
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var censusTransferType = $('#censusTransferType').val();
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');
    var householdMemberDetailsGrid = $('#householdMemberDetailsGrid');
    var relationDropdownList = [];

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'censusTransfer/';
    }

    /**
     * To get relation dropdown list
     */
    function getRelationDropdownList() {
        $.ajax({
            url: _baseURL() + 'getRelationDropdownList',
            type: 'GET',
            success: function (res) {
                relationDropdownList = res;
            }
        });
    }

    /**
     * To get the individual information
     */
    function getIndividualInformation() {
        var cidSrpNo = $('#cidNumber').val();
        $.ajax({
            url: _baseURL() + 'getIndividualInformation',
            type: 'GET',
            data: {cidSrpNo: cidSrpNo},
            success: function (res) {
                debugger;
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.permanentInformationDTO);
                    _validateCensusTransferType(res.dto.permanentInformationDTO);
                    $('#hhMemberName').val(isNull(res.dto.firstName) + isNull(res.dto.middleName) + isNull(res.dto.lastName));
                    $('#hhMemberGender').val(res.dto.gender);
                }
            }
        });
    }

    function _validateCensusTransferType(data) {
        var newDzongkhagID = $('#newDzongkhagID');;
        switch (parseInt(censusTransferType)) {
            case  2:
                newDzongkhagID.attr('disabled', true).val(data.permanentDzongkhagSerialNo);
                _getGewogDropdownList(data.permanentDzongkhagSerialNo, '');
                break;
            case  3:
                newDzongkhagID.attr('disabled', true).val(data.permanentDzongkhagSerialNo);
                $('#newGewogID').attr('disabled', true);
                _getGewogDropdownList(data.permanentDzongkhagSerialNo, data.permanentGewogSerialNo);
                _getVillageDropdownList(data.permanentGewogSerialNo, '');
                break;
        }
    }

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('#newDzongkhagID').on('change', function () {
            var newDzongkhagID = $(this).val();
            _getGewogDropdownList(newDzongkhagID, '');
        });
    }

    function _getGewogDropdownList(dzongkhagID, gewogID) {
        var elementID = $('#newGewogID');
        $.ajax({
            url: _baseURL() + 'getGewogDropdownList',
            type: 'GET',
            data: {dzongkhagID: dzongkhagID},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(gewogID);
                $('#newVillageID').empty();
            }
        });
    }
    function _getGewogDropdownListExist(dzongkhagID, gewogID) {
        var elementID = $('#newGewogID');
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
        $('#newGewogID').on('change', function () {
            var newGewogID = $(this).val();
            _getVillageDropdownList(newGewogID, '');
        });
    }

    function _getVillageDropdownList(gewog, villageID) {
        var elementID = $('#newVillageID');
        $.ajax({
            url: _baseURL() + 'getVillageDropdownList',
            type: 'GET',
            data: {gewogID: gewog},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(villageID);
            }
        });
    }

    function _getVillageDropdownListExist(gewog, villageID) {
        var elementID = $('#newVillageID');
        $.ajax({
            url: _baseURL() + 'getVillageDropdownList',
            type: 'GET',
            data: {gewogID: gewog},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(villageID);
            }
        });
    }

    /**
     * To get village dropdown list
     */
    function getHouseholdInformation() {
        $('#newHouseholdNo').on('change', function () {
            $('#newGewogID').empty();
            $('#newVillageID').empty();
            var newHouseholdNo = $(this);
            $.ajax({
                url: _baseURL() + 'getHouseholdInformation',
                type: 'GET',
                data: {householdNo: newHouseholdNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#newHouseNo').val(res.dto.houseNo);
                        $('#newThramNo').val(res.dto.thramNo);
                        $('#newDzongkhagID').val(res.dto.dzongkhagSerialNo);
                        _getGewogDropdownListExist(res.dto.dzongkhagSerialNo,res.dto.gewogSerialNo);
                       // alert(res.dto.gewogSerialNo);
                        _getVillageDropdownListExist(res.dto.gewogSerialNo,res.dto.villageSerialNo);
                        $('#newGewogID').val(res.dto.gewogSerialNo);
                        $('#newVillageID').val(res.dto.villageSerialNo);
                    } else {
                        newHouseholdNo.val('');
                        $('#newHouseNo, #newThramNo').val('');
                        warningMsg(res.text);
                    }
                }
            });
        });
    }

    /**
     * To validate for new household
     */
    function validateIsNewHousehold() {
        $('#isNewHousehold').on('click', function () {
            var isNewHousehold = $(this).is(':checked');
            var newHouseholdNo = $('#newHouseholdNo');
            var newHouseNo = $('#newHouseNo');
            var newThramNo=$('#newThramNo');
            var isMemberHoHCheck = $('#isMemberHoHCheck');
            var isMemberHoHCheckTd = $('.isMemberHoHCheck');
            if (isNewHousehold) {
                isMemberHoHCheck.removeClass('hidden');
                isMemberHoHCheckTd.removeClass('hidden');
                newThramNo.attr('readonly', false);
                newHouseNo.attr('readonly', false);
                newHouseholdNo.attr('readonly', true).removeAttr('required').val('NEW');
            } else {
                isMemberHoHCheck.addClass('hidden');
                isMemberHoHCheckTd.addClass('hidden');
                newHouseholdNo.attr('readonly', false).attr('required', 'required').val('');
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
                case 'btnIndividualInfoNext':
                    var mobileNumber = $('#mobileNumber');
                    if (mobileNumber.val() !== '') {
                        $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                        $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#householdInfoId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#householdInfoContent').prop('class', 'tab-pane active');
                    } else {
                        mobileNumber.focus();
                    }
                    break;
                case 'btnHouseholdInfoNext':
                    $('#householdInfoHead, #householdInfoContent').removeClass('active');
                    $("#householdInfoId").css({"color": "white", "background-color": "#120f65"});
                    $('#householdInfoCheck').html('<i class="fa fa-check text-white"></i>');

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
                case 'btnHouseholdInfoPrev':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

                    $('#householdInfoHead, #householdInfoContent').removeClass('active');
                    $("#householdInfoId").css("background-color", "#120f65");
                    break;
                case 'btnAttachmentPrev':
                    $('#householdInfoContent').prop('class', 'tab-pane active');
                    $("#householdInfoId").css("background-color", "rgb(18, 18, 19)");
                    $('#householdInfoCheck').empty();

                    $('#attachmentHead, #attachmentContent').removeClass('active');
                    $("#attachmentId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }

    /**
     * To add more document
     */
    function addHouseholdMember() {
        $('#addHouseholdMember').on('click', function () {
            if (validateHouseholdMember(false)) {
                return;
            }
                var isHidden = $('#isNewHousehold').is(':checked') ? '' : ' hidden';
                var length = householdMemberDetailsGrid.find('tbody tr').length + 1;

                var row = '<tr><td>' + (length) + '</td> \
                <td><input type="text" name="householdMemberDTOList[0].hhMemberCIDNo" id="hhMemberCIDNo" class="form-control" required></td> \
                <td><input type="text" name="householdMemberDTOList[0].hhMemberName" id="hhMemberName" class="form-control" readonly></td> \
                <td><input type="text" name="householdMemberDTOList[0].hhMemberGender" id="hhMemberGender" class="form-control" readonly></td> \
                <td><select name="householdMemberDTOList[0].relation" id="hhMemberRelation" class="form-control" \
                    required="required"></select></td> \
                <td><input type="text" name="householdMemberDTOList[0].remark" id="hhMemberRemarks" class="form-control"></td> \
                <td class="isMemberHoHCheck ' + isHidden + '"> \
                    <input type="radio" name="isMemberHoHChecked" id="isMemberHoHChecked"> \
                    <input type="hidden" name="householdMemberDTOList[0].isMemberHoH" id="isMemberHoH"></td> \
                <td><div class="col-sm-6"> \
                    <button type="button" class="btn btn-danger btn-sm" id="btnRemove"> \
                <i class="fa fa-trash"></i> Remove</button></div></td></tr>';

                householdMemberDetailsGrid.find('tbody').append(row);
                dcrc_lib.formIndexing(householdMemberDetailsGrid.find('tbody'), householdMemberDetailsGrid.find('tbody tr'));
                $('#householdMemberCount').val(length);

                var spouseReasonID = householdMemberDetailsGrid.find('tbody tr:last').find('#hhMemberRelation');
                dcrc_lib.loadDropDown(spouseReasonID, relationDropdownList, 'integer');

        });
    }

    /**
     * To remove the file
     * @returns {*}
     */
    function isMemberHoHChecked() {
        $('#householdMemberDetailsGrid').on('click', 'tbody tr #isMemberHoHChecked', function () {
            householdMemberDetailsGrid.find('tbody tr').each(function () {
                var selected = $(this).closest('tr');

                if (selected.find('#isMemberHoHChecked').is(':checked')) {
                    selected.find('#isMemberHoH').val(true);
                } else {
                    selected.find('#isMemberHoH').val(false);
                }
            });
        });
    }

    /**
     * To application for self or others details
     */
    function getCitizenInformation() {
        $('#householdMemberDetailsGrid').on('change', 'tbody tr #hhMemberCIDNo', function () {
            var selected = $(this).closest('tr');
            var hhMemberCIDNo = selected.find('#hhMemberCIDNo');
            var hhMemberCIDNoVal = hhMemberCIDNo.val();

            if (isCidNoAddedInList(false, hhMemberCIDNo.val(), selected.index())) {
                hhMemberCIDNo.val('').focus();
                warningMsg('Duplicate entry for CID number ' + hhMemberCIDNoVal);
                return;
            }

            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: hhMemberCIDNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        if($('#permanentHouseholdNo').val()==res.dto.spousePresentHouseholdNo) {
                            selected.find('#hhMemberName').val(isNull(res.dto.spouseFirstName) +
                            isNull(res.dto.spouseMiddleName) + isNull(res.dto.spouseLastName));
                            selected.find('#hhMemberGender').val(res.dto.spouseMiddleName);
                            if(res.dto.spouseGender=="F") {
                                selected.find('#hhMemberGender').val("Female");
                            }else{
                                selected.find('#hhMemberGender').val("Male");
                            }
                        }else{
                            warningMsg("Please enter the cid of same household");
                        }
                    } else if (res.status == 5) {
                        hhMemberCIDNo.val('').focus();
                        selected.find('#hhMemberName').val('');
                        selected.find('#hhMemberGender').val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    function isCidNoAddedInList(condition, cidNumber, index) {
        householdMemberDetailsGrid.find('tbody tr').each(function () {
            var selected = $(this).closest('tr');
            if (selected.find('#hhMemberCIDNo').val() == cidNumber && selected.index() !== index) {
                condition = true;
            }
        });
        return condition;
    }

    function isNull(data) {
        return data === null ? '' : data + ' ';
    }


    /**
     * To remove the file
     * @returns {*}
     */
    function removeHouseholdMemberRow() {
        $('#householdMemberDetailsGrid').on('click', 'tbody tr #btnRemove', function () {
            var householdMemberCount = $('#householdMemberCount');
            $(this).closest('tr').remove();
            dcrc_lib.formIndexing(householdMemberDetailsGrid.find('tbody'), householdMemberDetailsGrid.find('tbody tr'));
            householdMemberCount.val(householdMemberCount.val() - 1);
        });
    }

    /**
     * To check if the document is selected
     * @param condition
     * @returns {*}
     */
    function validateHouseholdMember(condition) {
        householdMemberDetailsGrid.find('tbody tr').each(function () {
            var selected = $(this).closest('tr');

            if (selected.find('#hhMemberCIDNo').val() === '') {
                selected.find('#hhMemberCIDNo').addClass('error');
                condition = true;
            } else {
                selected.find('#hhMemberCIDNo').removeClass('error');
            }
        });
        return condition;
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

    /**
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            $('#censusTransferDetailsForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(censusTransferMsg.processingFormData);
                        return;
                    }
                    $('#newDzongkhagID, #newGewogID').attr('disabled', true);
                    $('#btnSave, #newDzongkhagID, #newGewogID').attr('disabled', true);
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
                                successMsgRedirect(res.text, 'censusTransferApply');
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



    return {
        getRelationDropdownList: getRelationDropdownList,
        getIndividualInformation: getIndividualInformation,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        getHouseholdInformation: getHouseholdInformation,
        validateIsNewHousehold: validateIsNewHousehold,
        getCitizenInformation: getCitizenInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        addHouseholdMember: addHouseholdMember,
        isMemberHoHChecked: isMemberHoHChecked,
        removeHouseholdMemberRow: removeHouseholdMemberRow,
        addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        save: save
    };

})
();

$(document).ready(function () {
    $('#personalDetailsHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#personalDetailsContent').prop('class', 'tab-pane active');
    $("#personalDetailsId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#householdInfoHead').not('.active').addClass('disabled');
    $('#householdInfoHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    censusTransfer.getRelationDropdownList();
    censusTransfer.getIndividualInformation();
    censusTransfer.getGewogDropdownList();
    censusTransfer.getVillageDropdownList();
    censusTransfer.getHouseholdInformation();
    censusTransfer.validateIsNewHousehold();
    censusTransfer.getCitizenInformation();
    censusTransfer.nextTab();
    censusTransfer.previousTab();
    censusTransfer.addHouseholdMember();
    censusTransfer.isMemberHoHChecked();
    censusTransfer.removeHouseholdMemberRow();
    censusTransfer.addMoreDocuments();
    censusTransfer.removeFileRow();
    censusTransfer.save();
});
