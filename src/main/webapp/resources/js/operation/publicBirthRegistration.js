/**
 * Created by User on 8/19/2022.
 */
var birthRegistrationMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var publicBirthRegistration = (function () {
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
        return dcrc_lib.baseUrl() + 'publicBirthRegistration/';
    }

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton) {
                case 'btnPersonalDetailsNext':
                    var mobileNumber = $('#mobileNumber');
                    var firstName = $('#firstName');
                    if (validatePersonalDtls() == true) {
                        $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                        $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#placeOfBirthId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    }
                    break;
                case 'btnPlaceOfBirthNext':
                    if (validateBirthDtls()==true) {
                        $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active').removeAttr('style');
                        $("#placeOfBirthId").css({"color": "white", "background-color": "#120f65"});
                        $('#placeOfBirthCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#marriageId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#marriageIdContent').prop('class', 'tab-pane active');
                    }
                    break;
                case 'btnMarriageIdNext':
                    var marCIDNo = $('#marCIDNo');
                    if (marCIDNo.val() !== '') {
                        $('#marriageIdHead, #marriageIdContent').removeClass('active').removeAttr('style');
                        $("#marriageId").css({"color": "white", "background-color": "#120f65"});
                        $('#marriageIdCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#fatherDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#fatherDetailsContent').prop('class', 'tab-pane active');
                    } else {
                        hohCIDNo.focus();
                    }
                    break;
                case 'btnFathersDetailsNext':
                    var fatherCidNo = $('#fatherCidNo');
                    if (fatherCidNo.val() !== '') {
                        $('#fatherDetailsHead, #fatherDetailsContent').removeClass('active').removeAttr('style');
                        $("#fatherDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#fatherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#motherDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#motherDetailsContent').prop('class', 'tab-pane active');
                    } else {
                        fatherCidNo.focus();
                    }
                    break;
                case 'btnMotherDetailsNext':
                    var motherCidNo = $('#motherCidNo');
                    if (motherCidNo.val() !== '') {
                        $('#motherDetailsHead, #motherDetailsContent').removeClass('active').removeAttr('style');
                        $("#motherDetailsId").css({"color": "white", "background-color": "#120f65"});
                        $('#motherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                        $("#attachmentId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                        $('#attachmentContent').prop('class', 'tab-pane active');
                    } else {
                        motherCidNo.focus();
                    }
                    break;
                //case 'btnPersonAttendedNext':
                //    var hohCIDNo = $('#hohCIDNo');
                //    if (hohCIDNo.val() !== '') {
                //        $('#personAttendedHead, #personAttendedContent').removeClass('active').removeAttr('style');
                //        $("#personAttendedId").css({"color": "white", "background-color": "#120f65"});
                //        $('#personAttendedCheck').html('<i class="fa fa-check text-white"></i>');
                //
                //        $("#attachmentId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                //        $('#attachmentContent').prop('class', 'tab-pane active');
                //    } else {
                //        hohCIDNo.focus();
                //    }
                //    break;
                    break;
                default :
                    break;
            }
        });
    }
    function validatePersonalDtls(){
        var isValid = true;
        if($('#mobileNumber').val() == ''){
            $('#mobileNumber').focus();
            warningMsg('Phone number is required !');
            return isValid=false;
        }
        /*if($('#mobileNumber').length < 8){
         warningMsg('Phone number should not be less than 8 digits!');
         $('#mobileNumber').focus;
         return isValid=false;
         }
         if($('#mobileNumber').length > 8) {
         warningMsg('Phone number should not be more than 8 digits!');
         $('#mobileNumber').focus;
         return isValid = false;
         }*/
        if($('#firstName').val()==''){
            $('#firstName').focus();
            warningMsg('Child must atleast hv first name!');
            return isValid=false;
        }
        if($('#dob').val() ==''){
            $('#dob').focus();
            warningMsg("Please enter child's DOB!");
            return isValid=false;
        }
        if($('#timeOfBirth').val()==''){
            $('#timeOfBirth').focus();
            warningMsg("Please enter child's Time of Birth!");
            return isValid=false;
        }
        /* if($('#birthWeight').val() ==''){
         $('#birthWeight').focus();
         warningMsg("Please enter child's Weight!");
         return isValid=false;
         }*/
        return isValid;
    }

    function validateBirthDtls(){
        var isValid = true;
        if($('#countryOfBirth').val() == ''){
            $('#countryOfBirth').focus();
            warningMsg('---Select country of birth ----!');
            return isValid=false;
        }
        return isValid;
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

                case 'btnMarriageIdPrev':
                    $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    $("#placeOfBirthId").css("background-color", "rgb(18, 18, 19)");
                    $('#placeOfBirthCheck').empty();

                    $('#marriageIdHead, #marriageIdContent').removeClass('active');
                    $("#marriageId").css("background-color", "#120f65");
                    break;

                case 'btnFathersDetailsPrev':
                    $('#marriageIdContent').prop('class', 'tab-pane active');
                    $("#marriageId").css("background-color", "rgb(18, 18, 19)");
                    $('#marriageIdCheck').empty();

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

                //case 'btnPersonAttendedPrev':
                //    $('#marriageIdContent').prop('class', 'tab-pane active');
                //    $("#marriageId").css("background-color", "rgb(18, 18, 19)");
                //    $('#marriageIdCheck').empty();
                //
                //    $('#personAttendedHead, #personAttendedContent').removeClass('active');
                //    $("#personAttendedId").css("background-color", "#120f65");
                //    break;
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

    function validateCountryOfBirth() {
        $('#countryOfBirth').on('change', function () {
            var countryOfBirth = $(this).val();
            if (countryOfBirth == bhutanCountryCode) {
                $('#otherBirthDetailsDiv').removeClass('hidden');
                $('#presentAddresId').addClass('hidden');
                $('.otherBirthDetails').val('').attr('required', 'required');
                $('#gewogOfBirth, #villageOfBirth').empty();
            } else {
                $('#otherBirthDetailsDiv').addClass('hidden');
                $('#presentAddresId').removeClass('hidden');
                $('.otherBirthDetails').val('').removeAttr('required');
                $('#gewogOfBirth, #villageOfBirth').empty();
            }
        });
    }

    function validatePlaceOfBirth() {
        $('.placeOfBirth').on('click', function () {
            var placeOfBirth = $('.placeOfBirth:checked').val();
            if (placeOfBirth == 'O') {
                $('#placeOfBirthOtherDiv').removeClass('hidden');
                $('#placeOfBirthOther').val('').attr('required', 'required');
            } else {
                $('#placeOfBirthOtherDiv').addClass('hidden');
                $('#placeOfBirthOther').val('').removeAttr('required');
            }
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('#dzongkhagOfBirth').on('change', function () {
            var dzongkhagOfBirth = $(this).val();
            $.ajax({
                url: _baseURL() + 'getGewogDropdownList',
                type: 'GET',
                data: {dzongkhagID: dzongkhagOfBirth},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#gewogOfBirth'), res, 'integer');
                    $('#villageOfBirth').empty();
                }
            });
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#gewogOfBirth').on('change', function () {
            var gewogOfBirth = $(this).val();
            $.ajax({
                url: _baseURL() + 'getVillageDropdownList',
                type: 'GET',
                data: {gewogID: gewogOfBirth},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#villageOfBirth'), res, 'integer');
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
                data: {cidSrpNo: fatherCidNo.val(), type: 'F'},
                success: function (res) {
                    if (res.status == 1) {
                        $('#fatherFirstNameBh').val(res.dto.spouseFirstNameBh);
                        $('#fatherHouseholdNo').val(res.dto.spouseHouseholdNo);
                        $('#fatherCitizenshipBy').val(res.dto.spouseCitizenBy);
                        $('#fatherFirstName').val(res.dto.spouseFirstName);
                        $('#fatherMiddleName').val(res.dto.spouseMiddleName);
                        $('#fatherLastName').val(res.dto.spouseLastName);
                        $('#fatherDzongkhagName').val(res.dto.spouseDzongkhagName);
                        $('#fatherGewogName').val(res.dto.spouseGewogName);
                        $('#fatherVillageName').val(res.dto.spouseVillageName);
                    } else {
                        fatherCidNo.val('');
                        $('.fatherDetails').val('');
                        warningMsg(res.text);
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
                data: {cidSrpNo: motherCidNo.val(), type: 'M'},
                success: function (res) {
                    if (res.status == 1) {
                        $('#motherFirstNameBh').val(res.dto.spouseFirstNameBh);
                        $('#motherHouseholdNo').val(res.dto.spouseHouseholdNo);
                        $('#motherCitizenshipBy').val(res.dto.spouseCitizenBy);
                        $('#motherFirstName').val(res.dto.spouseFirstName);
                        $('#motherMiddleName').val(res.dto.spouseMiddleName);
                        $('#motherLastName').val(res.dto.spouseLastName);
                        $('#motherDzongkhagName').val(res.dto.spouseDzongkhagName);
                        $('#motherGewogName').val(res.dto.spouseGewogName);
                        $('#motherVillageName').val(res.dto.spouseVillageName);
                    } else {
                        motherCidNo.val('');
                        $('.motherDetails').val('');
                        warningMsg(res.text);
                    }
                }
            });
        });
    }

    /**
     * To get details
     */
    function getHouseholdDetails() {
        $('#hohCIDNo').on('change', function () {
            var hohCIDNo = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: hohCIDNo.val(), type: 'H'},
                success: function (res) {
                    if (res.status == 1) {
                        $('#hohFirstName').val(res.dto.spouseFirstName);
                        $('#hohMiddleName').val(res.dto.spouseMiddleName);
                        $('#hohLastName').val(res.dto.spouseLastName);
                        $('#hohHouseholdNo').val(res.dto.spouseHouseholdNo);
                        $('#hohHouseNo').val(res.dto.spouseHouseNo);
                        $('#hohThramNo').val(res.dto.spouseThramNo);
                        $('#hohDzongkhagName').val(res.dto.spouseDzongkhagName);
                        $('#hohGewogName').val(res.dto.spouseGewogName);
                        $('#hohVillageName').val(res.dto.spouseVillageName);
                        $('#hohDzongkhagSerialNo').val(res.dto.spouseDzongkhagSerialNo);
                        $('#hohGewogSerialNo').val(res.dto.spouseGewogSerialNo);
                        $('#hohVillageSerialNo').val(res.dto.spouseVillageSerialNo);
                    } else {
                        hohCIDNo.val('');
                        $('.hohDetails').val('');
                        warningMsg(res.text);
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
                <input type="file" id="multipartFile" class="uploadMultiFile" name="applicationDocumentDTOList[0].multipartFile" \
                required="required"></td> \
                <td><div class="col-sm-6"></div></td><td><div class="col-sm-6"> \
                    <button type="button" class="btn btn-danger btn-sm" id="btnRemove"> \
                <i class="fa fa-trash"></i> Remove</button></div></td></td></tr>';

            nameChangeAttachmentGrid.find('tbody').append(row);
            dcrc_lib.formIndexing(nameChangeAttachmentGrid.find('tbody'), nameChangeAttachmentGrid.find('tbody tr'));

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
            $('#publicBirthRegistrationDetailsForm').validate({

                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(birthRegistrationMsg.processingFormData);
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
                                successMsgRedirect(res.text, 'publicBirthRegistrationApply');
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
        validateCountryOfBirth: validateCountryOfBirth,
        validatePlaceOfBirth: validatePlaceOfBirth,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        getFatherDetails: getFatherDetails,
        getMotherDetails: getMotherDetails,
        getHouseholdDetails: getHouseholdDetails,
        addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        save: save,
        addMultipleFile: addMultipleFile,
        removeErrorClass: removeErrorClass
    };

})();

$(document).ready(function () {

    /* $(".datepicker").datepicker({
     endDate:'today'
     });*/

    $('#personalDetailsHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#personalDetailsContent').prop('class', 'tab-pane active');
    $("#personalDetailsId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#placeOfBirthHead').not('.active').addClass('disabled');
    $('#placeOfBirthHead').not('.active').find('a').removeAttr("data-toggle");

    $('#marriageIdHead').not('.active').addClass('disabled');
    $('#marriageIdHead').not('.active').find('a').removeAttr("data-toggle");

    $('#fatherDetailsHead').not('.active').addClass('disabled');
    $('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#motherDetailsHead').not('.active').addClass('disabled');
    $('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    //$('#personAttendedHead').not('.active').addClass('disabled');
    //$('#personAttendedHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    publicBirthRegistration.nextTab();
    publicBirthRegistration.previousTab();
    publicBirthRegistration.validateCountryOfBirth();
    publicBirthRegistration.validatePlaceOfBirth();
    publicBirthRegistration.getGewogDropdownList();
    publicBirthRegistration.getVillageDropdownList();
    publicBirthRegistration.getFatherDetails();
    publicBirthRegistration.getMotherDetails();
    publicBirthRegistration.getHouseholdDetails();
    publicBirthRegistration.addMoreDocuments();
    publicBirthRegistration.removeFileRow();
    publicBirthRegistration.save();
    publicBirthRegistration.addMultipleFile();
    publicBirthRegistration.removeErrorClass();
});
