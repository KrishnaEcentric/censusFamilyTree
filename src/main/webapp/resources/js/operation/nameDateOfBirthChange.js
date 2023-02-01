/**
 * Created by Hidhen on 26-Jul-19.
 */
var nameDateOfBirthChangeMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    selectChanges: 'Please choose DOB or Name to change.'
};

var nameDateOfBirthChange = (function () {
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
        return dcrc_lib.baseUrl() + 'nameDateOfBirthChange/';
    }

    /**
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#btnSearch').on('click', function () {
            $('#nameDateOfBirthChangeForm').validate({
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
                            } else if (res.status == 2) {
                                confirmMsg(res.text, function () {
                                    changeSpouseInfoHeader.addClass('hidden');
                                    changeSpouseInfoDetails.removeClass('hidden');
                                    _getIndividualInformation(cidSrpNoID.val());
                                });
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
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);
                    $('#dob').val(dateFormatAS(res.dto.dob));
                    $('.reset').val('');
                    $('.fatherDetails').val('');
                    $('.motherDetails').val('');
                    $('.hohDetails').val('');
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
                case 'btnAttachmentPrev':
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

    function changeDoB() {
        $('#changeDoB').on('click', function () {
            var isChecked = $(this).is(':checked');
            if (isChecked) {
                $('#newDoBDiv').removeClass('hidden');
                $('#newDoB').attr('disabled', false);
            } else {
                $('#newDoBDiv').addClass('hidden');
                $('#newDoB').attr('disabled', true).val('');
            }
        });
    }

    function changeName() {
        $('#changeName').on('click', function () {
            var isChecked = $(this).is(':checked');
            if (isChecked) {
                $('#newNameChangeDiv').removeClass('hidden');
                $('#newFirstName').attr('disabled', false);
                $('#newMiddleName').attr('disabled', false);
                $('#newLastName').attr('disabled', false);
                $('#newFirstNameBh').attr('disabled', false);
            } else {
                $('#newNameChangeDiv').addClass('hidden');
                $('#newFirstName').attr('disabled', true).val('');
                $('#newMiddleName').attr('disabled', true).val('');
                $('#newLastName').attr('disabled', true).val('');
                $('#newFirstNameBh').attr('disabled', true).val('');
            }
        });
    }

    function changeRequest() {
        $('#changeRequestID').on('change', function () {
            var changeRequestID = $(this).val();
            if (changeRequestID == 'others') {
                $('#otherReasonDiv').removeClass('hidden');
                $('#otherReason').attr('disabled', false);
            } else {
                $('#otherReasonDiv').addClass('hidden');
                $('#otherReason').attr('disabled', true).val('');
            }
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('#changePresentDzongkhagID').on('change', function () {
            var changePresentDzongkhagID = $(this).val();
            if (changePresentDzongkhagID == 99) {
                changePresentDzongkhagID = '';
                $('#otherDzongkhagDiv').removeClass('hidden');
                $('#changePresentGewogDiv').addClass('hidden');
                $('#changePresentVillageDiv').addClass('hidden');
                $('#changePresentAddress').val('');
            } else {
                $('#otherDzongkhagDiv').addClass('hidden');
                $('#changePresentGewogDiv').removeClass('hidden');
                $('#changePresentVillageDiv').removeClass('hidden');
                $('#changePresentAddress').val('');
            }
            $.ajax({
                url: _baseURL() + 'getGewogDropdownList',
                type: 'GET',
                data: {dzongkhagID: changePresentDzongkhagID},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#changePresentGewogID'), res, 'integer');
                    $('#changePresentVillageID').empty();
                }
            });
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#changePresentGewogID').on('change', function () {
            var changePresentGewogID = $(this).val();
            $.ajax({
                url: _baseURL() + 'getVillageDropdownList',
                type: 'GET',
                data: {gewogID: changePresentGewogID},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#changePresentVillageID'), res, 'integer');
                }
            });
        });
    }

    /**
     * To add more document
     */
    function changePresentAddressChange() {
        $('#changePresentDetails').on('click', function () {
            $('#presentAddressChangeDiv').removeClass('hidden');
            $('#changePresentDzongkhagID').val('');
            $('#changePresentGewogID').empty();
            $('#changePresentVillageID').empty();
            $('#changePresentAddress').val('');
        });
    }

    /**
     * To add more document
     */
    function cancelPresentAddressChange() {
        $('#btnCancel').on('click', function () {
            $('#presentAddressChangeDiv').addClass('hidden');
            $('#otherDzongkhagDiv').addClass('hidden');
            $('#changePresentDzongkhagID').val('');
            $('#changePresentGewogID').empty();
            $('#changePresentVillageID').empty();
            $('#changePresentAddress').val('');
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
            $('#nameDateOfBirthChangeDetailsForm').validate({
                submitHandler: function (form) {
                    if (!_validateIfChecked(false)) {
                        warningMsg(nameDateOfBirthChangeMsg.selectChanges);
                        return;
                    }
                    if (isSubmitted) {
                        warningMsg(nameDateOfBirthChangeMsg.processingFormData);
                        return;
                    }
                    $('#btnSave').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'save?newFirstNameBh='+$('#newFirstNameBh').val(),
                        type: 'POST',
                        data: new FormData(form),
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'nameDateOfBirthChange');
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

    function _validateIfChecked(condition) {
        $('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                condition = true;
            }
        });
        return condition;
    }

    function isOriginalCidCopySubmitted() {
        $('.cidCopySub').on('change', function () {
            var cidCopySub = $(this).val();
            if (cidCopySub=='Y'){
                $('#cidCopyNotSubmittedReason').addClass('hidden');
            } else {
                $('#cidCopyNotSubmittedReason').removeClass('hidden');
            }
        });
    }

    function validateCountryOfBirth() {
        $('#countryOfBirth').on('change', function () {
            var countryOfBirth = $(this).val();
            if (countryOfBirth == 1) { // check if country is Bhutan
                $('#dzongkhagId').removeClass('hidden');
                $('#gewodId').removeClass('hidden');
                $('#villageId').removeClass('hidden');
                $('#presentAddresId').addClass('hidden');
                $('#gewogOfBirth, #villageOfBirth').empty();
            } else {
                $('#dzongkhagId').addClass('hidden');
                $('#gewodId').addClass('hidden');
                $('#villageId').addClass('hidden');
                $('#presentAddresId').removeClass('hidden');

                $('#gewogOfBirth, #villageOfBirth').empty();
            }
        });
    }

    return {
        validateCidSrpNoOnly: validateCidSrpNoOnly,
        nextTab: nextTab,
        previousTab: previousTab,
        changeDoB: changeDoB,
        changeName: changeName,
        changeRequest: changeRequest,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        changePresentAddressChange: changePresentAddressChange,
        cancelPresentAddressChange: cancelPresentAddressChange,
        addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        save: save,
        validateCountryOfBirth: validateCountryOfBirth,
        isOriginalCidCopySubmitted: isOriginalCidCopySubmitted
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

    nameDateOfBirthChange.validateCidSrpNoOnly();
    nameDateOfBirthChange.nextTab();
    nameDateOfBirthChange.previousTab();
    nameDateOfBirthChange.changeDoB();
    nameDateOfBirthChange.changeName();
    nameDateOfBirthChange.changeRequest();
    nameDateOfBirthChange.getGewogDropdownList();
    nameDateOfBirthChange.getVillageDropdownList();
    nameDateOfBirthChange.changePresentAddressChange();
    nameDateOfBirthChange.cancelPresentAddressChange();
    nameDateOfBirthChange.addMoreDocuments();
    nameDateOfBirthChange.removeFileRow();
    nameDateOfBirthChange.save();
    nameDateOfBirthChange.validateCountryOfBirth();
    nameDateOfBirthChange.isOriginalCidCopySubmitted();
});
