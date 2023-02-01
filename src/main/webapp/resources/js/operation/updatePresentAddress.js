/**
 * Created by Hidhen on 26-Jul-19.
 */
var updatePresentAddressMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var updatePresentAddress = (function () {
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
        return dcrc_lib.baseUrl() + 'updatePresentAddress/';
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

    function removeErrorClass() {
        $('.form-control').on('keypress', function () {
            $(this).removeClass('error');
        })
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
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#cidSrpNo').on('change', function () {
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
                    populate(res.dto.fatherInformationDTO);
                    populate(res.dto.motherInformationDTO);

                    if(res.dto.presentCountryName != "Bhutan"){
                        $('#dzongID').hide();
                        $('#gewogAndVillageId').hide();
                    }
                    $('#dob').val(dateFormatAS(res.dto.dob));
                    $('#firstNameBh').val(res.dto.firstNameBh);
                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                    $('#fillNameId').val(fulName);
                }
            }
        });
    }

    function _isNull(data) {
        return data === null ? '' : data;
    }

    /**
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            var changePresentVillageID="";
            var cidSrpNo=$('#cidSrpNo').val();
            var presentCountryId=$('#countryOfBirth').val();
            debugger;
            if($('#changePresentVillageID').val()==null){
                changePresentVillageID="-1";
            }else{
                changePresentVillageID=$('#changePresentVillageID').val();
            }
            var mobileNumber=$('#mobileNumber').val();
            var presentAddress=$('#presentAddress').val();
            $.ajax({
                url: _baseURL() + 'save?cidSrpNo='+cidSrpNo+'&presentCountryId='+presentCountryId+'&changePresentVillageID='+changePresentVillageID+ '&mobileNumber='+mobileNumber+
                '&presentAddress='+presentAddress,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status === 1) {
                        successMsgRedirect(res.text, 'updatePresentAddress');
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

    function removeErrorClass() {
        $('.form-control').on('keypress', function () {
            $(this).removeClass('error');
        })
    }
    return {
        validateCidSrpNoOnly: validateCidSrpNoOnly,
        validateCountryOfBirth: validateCountryOfBirth,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        save: save,
        removeErrorClass: removeErrorClass
    };

})();

$(document).ready(function () {
    updatePresentAddress.validateCidSrpNoOnly();
    updatePresentAddress.validateCountryOfBirth();
    updatePresentAddress.getGewogDropdownList();
    updatePresentAddress.getVillageDropdownList();
    updatePresentAddress.save();
    updatePresentAddress.removeErrorClass();

});

