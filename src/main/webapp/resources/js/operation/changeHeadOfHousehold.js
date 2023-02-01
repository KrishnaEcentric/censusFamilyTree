/**
 * Created by Hidhen on 26-Jul-19.
 */
var changeHeadOfHouseholdMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var changeHeadOfHousehold = (function () {
    "use strict";
    var isSubmitted = false;
    var householdMembersGridID = $('#householdMembersGrid');
    var aAttachmentGridID = $('#changeHoHAttachmentGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'changeHeadOfHousehold/';
    }

    /**
     * To get new HoH details by CID number.
     */
    function validatePresentHeadOfHousehold() {
        $('#householdNo').on('change', function () {
            _resetData();
        });
    }

    /**
     * To get the current head of household information
     */
    function getPresentHeadOfHouseholdDetails() {
        $('#btnSearch').on('click', function () {
            var householdNo = $('#householdNo');
            _resetData();

            if (householdNo.val() === '') {
                warningMsg('Please enter a household number.');
                return;
            }

            $.ajax({
                url: _baseURL() + 'getPresentHeadOfHouseholdDetails',
                type: 'GET',
                data: {householdNo: householdNo.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#presentHoHCIDNo').val(res.dto.presentHoHCIDNo);
                        $('#presentHoHFName').val(res.dto.presentHoHFName);
                        $('#presentHoHMName').val(res.dto.presentHoHMName);
                        $('#presentHoHLName').val(res.dto.presentHoHLName);
                    } else if (res.status == 5) {
                        _resetData();
                       // householdNo.val('');
                      //  warningMsg(res.text);
                        $('#warningMsg').html(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    /**
     * To get new HoH details by CID number.
     */
    function getNewHeadOfHouseholdDetails() {
        $('#newHoHCIDNo').on('change', function () {
            var newHoHCIDNo = $(this).val();
            var householdNo = $('#householdNo').val();
            var presentHoHCIDNo = $('#presentHoHCIDNo').val();
            $.ajax({
                url: _baseURL() + 'getNewHeadOfHouseholdDetails',
                type: 'GET',
                data: {householdNo: householdNo, newHoHCIDNo: newHoHCIDNo, presentHoHCIDNo: presentHoHCIDNo},
                success: function (res) {
                    if (res.status == 1) {
                        $('#newHoHFName').val(res.dto.newHoHFName);
                        $('#newHoHMName').val(res.dto.newHoHMName);
                        $('#newHoHLName').val(res.dto.newHoHLName);
                        _loadHouseholdMemberList(res.dto.householdMemberDTOList, newHoHCIDNo);
                    } else if (res.status == 5) {
                        $('.newHoHDetails').val('');
                        householdMembersGridID.find('tbody').empty();
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }

    /**
     * To load the household member list
     * @param dto
     * @param newHoHCIDNo
     * @private
     */
    function _loadHouseholdMemberList(dto, newHoHCIDNo) {
        var row = '';
        householdMembersGridID.find('tbody').empty();
        $.each(dto, function (index, data) {
            var fullName = data.memberFName + ' ' + data.memberMName + ' ' + data.memberLName;
            var dateOfBirth = formatAsDate(data.dob) + ' (' + data.age + ')';
            row = '<tr> \
                <td>' + (index + 1) + '</td> \
                <td><input type="hidden" name="householdMemberDTOList[0].cidNo" id="cidNo" \
                    value="' + (data.cidNo) + '">' + (data.cidNo) + '</td> \
                <td>' + (fullName) + '</td> \
                <td>' + (data.gender) + '</td> \
                <td>' + (dateOfBirth) + '</td> \
                <td><select name="householdMemberDTOList[0].relationID" id="relationID" required="required" \
                    class="form-control"></select></td></tr>';

            householdMembersGridID.find('tbody').append(row);
        });

        dcrc_lib.formIndexing(householdMembersGridID.find('tbody'), householdMembersGridID.find('tbody tr'));

        _loadRelationDropdownList(newHoHCIDNo);
    }

    /**
     * To load the relation dropdown list
     * @private
     */
    function _loadRelationDropdownList(newHoHCIDNo) {
        $.ajax({
            url: _baseURL() + 'getRelationDropdownList',
            type: 'GET',
            success: function (res) {
                householdMembersGridID.find('tbody tr').each(function () {
                    var selected = $(this).closest('tr');

                    dcrc_lib.loadDropDown(selected.find('#relationID'), res, 'integer');
                    if (newHoHCIDNo == selected.find('#cidNo').val()) {
                        selected.find('#relationID').val('1000').attr('disabled', true);
                    } else {
                        selected.find('#relationID').val('2001');
                    }
                });
            }
        });
    }

    /**
     * To validate member relation
     */
    function validateMemberRelation() {
        householdMembersGridID.find('tbody').on('change', 'tr #relationID', function () {
            var selected = $(this).closest('tr');

            if (selected.find('#relationID').val() == '1000') {
                selected.find('#relationID').val('2001');
                warningMsg('HoH already exists.');
            }
        });
    }

    /**
     * To reset the data
     * @private
     */
    function _resetData() {
        $('.presentHoHDetails').val('');
        $('.newHoHDetails').val('');
        householdMembersGridID.find('tbody').empty();
    }

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');

            if (nextButton == 'presentHoH') {
                $('#newHoHDetailsContent').prop('class', 'tab-pane active');
                $('#presentHoHDetailsHead').removeClass("active");
                $('#presentHoHDetailsContent').removeClass("active");
                $('#presentHoHDetailsCheck').html('<i class="fa fa-check text-white"></i>');
                $("#presentHoHDetailsId").css({"color": "white", "background-color": "#120f65"});
                $("#newHoHDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
            } else if (nextButton == 'newHoH' && _validateNewHoHHouseholdDetails()) {
                $('#attachmentContent').prop('class', 'tab-pane active');
                $('#newHoHDetailsHead').removeClass("active");
                $('#newHoHDetailsContent').removeClass("active");
                $('#newHoHDetailsCheck').html('<i class="fa fa-check text-white"></i>');
                $("#newHoHDetailsId").css({"color": "white", "background-color": "#120f65"});
                $("#attachmentId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
            }
        });
    }

    /**
     * To validate the present HoH household details
     * @returns {boolean}
     * @private
     */
    function _validatePresentHoHHouseholdDetails() {
        var householdNo = $('#householdNo').val();
        var presentHoHFName = $('#presentHoHFName').val();
        if (householdNo === '' || presentHoHFName === '') {
            warningMsg('Present HoH details is mandatory.');
            return false;
        }
        return true;
    }

    /**
     * To validate the new HoH household details
     * @returns {boolean}
     * @private
     */
    function _validateNewHoHHouseholdDetails() {
        var newHoHCIDNo = $('#newHoHCIDNo').val();
        var newHoHFName = $('#newHoHFName').val();
        if (newHoHCIDNo === '' || newHoHFName === '') {
            warningMsg('New HoH details is mandatory.');
            return false;
        }
        return true;
    }

    /**
     * To go to previous tab using previous button
     */
    function previousTab() {
        $('.btnPrevious').on('click', function () {
            var previousButton = $(this).prop('id');

            if (previousButton == 'newHoHPrevious') {
                $('#presentHoHDetailsContent').prop('class', 'tab-pane active');
                $('#newHoHDetailsHead').removeClass("active");
                $('#newHoHDetailsContent').removeClass("active");
                $("#presentHoHDetailsId").css("background-color", "rgb(18, 18, 19)");
                $("#newHoHDetailsId").css("background-color", "#120f65");
                $('#presentHoHDetailsCheck').empty();
            } else if (previousButton == 'attachmentPrevious') {
                $('#newHoHDetailsContent').prop('class', 'tab-pane active');
                $('#attachmentHead').removeClass("active");
                $('#attachmentContent').removeClass("active");
                $("#newHoHDetailsId").css("background-color", "rgb(18, 18, 19)");
                $("#attachmentId").css("background-color", "#120f65");
                $('#newHoHDetailsCheck').empty();
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
                <i class="fa fa-remove"></i> Remove</button></div></td></td></tr>';

            aAttachmentGridID.find('tbody').append(row);
            dcrc_lib.formIndexing(aAttachmentGridID.find('tbody'), aAttachmentGridID.find('tbody tr'));

        });
    }

    /**
     * To remove the file
     * @returns {*}
     */
    function removeFileRow() {
        $('#changeHoHAttachmentGrid').on('click', 'tbody tr #btnRemove', function () {
            $(this).closest('tr').remove();
            dcrc_lib.formIndexing(aAttachmentGridID.find('tbody'), aAttachmentGridID.find('tbody tr'));
        });
    }

    /**
     * To check if the document is selected
     * @param condition
     * @returns {*}
     */
    function validateDocument(condition) {
        $('#changeHoHAttachmentGrid').find('tbody tr').each(function () {
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
     * To save the registration form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            $('#changeHeadOfHouseholdForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(changeHeadOfHouseholdMsg.processingFormData);
                        return;
                    }

                    var formData = new FormData(form);

                    $('#btnSave').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'save',
                        type: 'POST',
                        data: formData,
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'changeHeadOfHousehold');
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
        validatePresentHeadOfHousehold: validatePresentHeadOfHousehold,
        getPresentHeadOfHouseholdDetails: getPresentHeadOfHouseholdDetails,
        getNewHeadOfHouseholdDetails: getNewHeadOfHouseholdDetails,
        validateMemberRelation: validateMemberRelation,
        nextTab: nextTab,
        previousTab: previousTab,
        addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        save: save
    };

})();

$(document).ready(function () {
    $('#presentHoHDetailsHead').prop('class', 'active');
    $('#presentHoHDetailsHead').not('.active').addClass('disabled');
    $('#presentHoHDetailsContent').prop('class', 'tab-pane active');
    $("#presentHoHDetailsId").css("color", "white");
    $("#presentHoHDetailsId").css("background-color", "rgb(18, 18, 19)");

    $('#newHoHDetailsHead').not('.active').addClass('disabled');
    $('#newHoHDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    changeHeadOfHousehold.validatePresentHeadOfHousehold();
    changeHeadOfHousehold.getPresentHeadOfHouseholdDetails();
    changeHeadOfHousehold.getNewHeadOfHouseholdDetails();
    changeHeadOfHousehold.validateMemberRelation();
    changeHeadOfHousehold.nextTab();
    changeHeadOfHousehold.previousTab();
    changeHeadOfHousehold.addMoreDocuments();
    changeHeadOfHousehold.removeFileRow();
    changeHeadOfHousehold.save();
});
