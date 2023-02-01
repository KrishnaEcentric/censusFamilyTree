/**
 * Created by Hidhen on 26-Jul-19.
 */
var relationshipCertificateMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var relationshipCertificate = (function () {
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
        return dcrc_lib.baseUrl() + 'relationshipCertificate/';
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
     * To display form based on relationship
     */
    function relationship() {
        $('#relationshipTypeId').on('change', function () {
            var relationshipTypeId = $(this).val();
            if(relationshipTypeId=="oneToOne"){
                $('#oneToOneInfo').show();
                $('#oneToTwoInfo').hide();
                $('#twoToOneInfo').hide();
            }
            if(relationshipTypeId=="oneToTwo"){
                $('#oneToTwoInfo').show();
                $('#oneToOneInfo').hide();
                $('#twoToOneInfo').hide();
            }
            if(relationshipTypeId=="twoToOne"){
                $('#twoToOneInfo').show();
                $('#oneToTwoInfo').hide();
                $('#oneToOneInfo').hide();
            }
        });
    }

    /**
     * To display form based on relationship
     */
    function relation() {
        $('#relationship').on('change', function () {
            var relationship = $(this).val();
            if(relationship=="9000"){
                $('#otherRelationId').show();
            }else{
                $('#otherRelationId').hide();
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
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#oneToOneApplicantCidSrpNo').on('change', function () {
            var cidSrpNoID = $('#oneToOneApplicantCidSrpNo');
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:''},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                   // populate(res.dto);
                                    $('#oneToOneApplicantCidSrpNo').val(res.dto.cidNo);
                                    $('#oneToOneApplicantgender').val(res.dto.gender);
                                    $('#oneToOneApplicantdob').val(dateFormatAS(res.dto.dob));
                                    $('#oneToOneApplicantfirstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#oneToOneApplicantfillNameId').val(fulName);
                                }
                            }
                        });
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });

        $('#oneToOneParentCidSrpNo').on('change', function () {
            var cidSrpNoID = $('#oneToOneParentCidSrpNo');
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:purposeId.val()},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                    // populate(res.dto);
                                    $('#oneToOneParentCidSrpNo').val(res.dto.cidNo);
                                    $('#oneToOneParentgender').val(res.dto.gender);
                                    $('#oneToOneParentdob').val(dateFormatAS(res.dto.dob));
                                    $('#oneToOneParentfirstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#oneToOneParentfillNameId').val(fulName);
                                }
                            }
                        });
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });

        $('#oneToTwoApplicantCidSrpNo').on('change', function () {
            var cidSrpNoID = $('#oneToTwoApplicantCidSrpNo');
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:''},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                    // populate(res.dto);
                                    $('#oneToTwoApplicantCidSrpNo').val(res.dto.cidNo);
                                    $('#oneToTwoApplicantgender').val(res.dto.gender);
                                    $('#oneToTwoApplicantdob').val(dateFormatAS(res.dto.dob));
                                    $('#oneToTwoApplicantfirstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#oneToTwoApplicantfillNameId').val(fulName);
                                }
                            }
                        });
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });

        $('#oneToTwoParent1cidSrpNo').on('change', function () {
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:purposeId.val()},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                    // populate(res.dto);
                                    $('#oneToTwoParent1cidSrpNo').val(res.dto.cidNo);
                                    $('#oneToTwoParent1gender').val(res.dto.gender);
                                    $('#oneToTwoParent1dob').val(dateFormatAS(res.dto.dob));
                                    $('#oneToTwoParent1firstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#oneToTwoParent1fillNameId').val(fulName);
                                }
                            }
                        });
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });

        $('#oneToTwoParent2cidSrpNo').on('change', function () {
            var cidSrpNoID = $('#oneToTwoParent2cidSrpNo');
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:purposeId.val()},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                    // populate(res.dto);
                                    $('#oneToTwoParent2cidSrpNo').val(res.dto.cidNo);
                                    $('#oneToTwoParent2gender').val(res.dto.gender);
                                    $('#oneToTwoParent2dob').val(dateFormatAS(res.dto.dob));
                                    $('#oneToTwoParent2firstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#oneToTwoParent2fillNameId').val(fulName);
                                }
                            }
                        });
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });

        $('#twoToOneApplicant1cidSrpNo').on('change', function () {
            var cidSrpNoID = $('#twoToOneApplicant1cidSrpNo');
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:''},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                    // populate(res.dto);
                                    $('#twoToOneApplicant1cidSrpNo').val(res.dto.cidNo);
                                    $('#twoToOneApplicant1gender').val(res.dto.gender);
                                    $('#twoToOneApplicant1dob').val(dateFormatAS(res.dto.dob));
                                    $('#twoToOneApplicant1firstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#twoToOneApplicant1fillNameId').val(fulName);
                                }
                            }
                        });
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });

        $('#twoToOneApplicant2cidSrpNo').on('change', function () {
            var cidSrpNoID = $('#twoToOneApplicant2cidSrpNo');
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:''},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                    // populate(res.dto);
                                    $('#twoToOneApplicant2cidSrpNo').val(res.dto.cidNo);
                                    $('#twoToOneApplicant2gender').val(res.dto.gender);
                                    $('#twoToOneApplicant2dob').val(dateFormatAS(res.dto.dob));
                                    $('#twoToOneApplicant2firstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#twoToOneApplicant2fillNameId').val(fulName);
                                }
                            }
                        });
                    } else if (res.status == 5) {
                        cidSrpNoID.val('');
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });

        $('#twoToOneParentcidSrpNo').on('change', function () {
            var cidSrpNoID = $('#twoToOneParentcidSrpNo');
            var purposeId = $('#purposeId');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val(),purposeId:purposeId.val()},
                success: function (res) {
                    if (res.status === 1) {
                        $.ajax({
                            url: _baseURL() + 'getIndividualInformation',
                            type: 'GET',
                            data: {cidSrpNo: cidSrpNoID.val()},
                            success: function (res) {
                                if (res.status == 1) {
                                    // populate(res.dto);
                                    $('#twoToOneParentcidSrpNo').val(res.dto.cidNo);
                                    $('#twoToOneParentgender').val(res.dto.gender);
                                    $('#twoToOneParentdob').val(dateFormatAS(res.dto.dob));
                                    $('#twoToOneParentfirstNameBh').val(res.dto.firstNameBh);
                                    var fulName = res.dto.firstName + ' ' + _isNull(res.dto.middleName) + ' ' + _isNull(res.dto.lastName);
                                    $('#twoToOneParentfillNameId').val(fulName);
                                }
                            }
                        });
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
        $('#btnSaveOneToOne').on('click', function () {
            var relationshipTypeId=$('#relationshipTypeId').val();
            var relationship=$('#relationship').val();
            var otherRelation=$('#otherRelation').val();
            var certificateTypeId=$('#certificateTypeId').val();
            var purposeId=$('#purposeId').val();
            var mobileNumber=$('#mobileNumber').val();

            var oneToOneApplicantCidSrpNo=$('#oneToOneApplicantCidSrpNo').val();
            var oneToOneParentCidSrpNo=$('#oneToOneParentCidSrpNo').val();


            $.ajax({
                url: _baseURL() + 'save?relationshipTypeId='+relationshipTypeId+'&relationship='+relationship+'&otherRelation='+otherRelation+
                '&oneToOneApplicantCidSrpNo='+oneToOneApplicantCidSrpNo+
                '&oneToOneParentCidSrpNo='+oneToOneParentCidSrpNo + '&certificateTypeId='+certificateTypeId + '&purposeId='+purposeId + '&mobileNumber='+mobileNumber,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status === 1) {
                        successMsgRedirect(res.text, 'relationshipCertificate');
                        window.open(dcrc_lib.baseUrl()+'relationshipCertificate/generatePDF?applicationNumber='+res.value);
                    } else if (res.status == 5) {
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }, complete: function () {
                    $('#btnSaveOneToOne').attr('disabled', false);
                    isSubmitted = false;
                }
            });
        });

        $('#btnSaveOneToTwo').on('click', function () {
            var relationshipTypeId=$('#relationshipTypeId').val();
            var relationship=$('#relationship').val();
            var otherRelation=$('#otherRelation').val();
            var certificateTypeId=$('#certificateTypeId').val();
            var purposeId=$('#purposeId').val();
            var mobileNumber=$('#mobileNumber').val();

            var oneToTwoApplicantCidSrpNo=$('#oneToTwoApplicantCidSrpNo').val();
            var oneToTwoParent1cidSrpNo=$('#oneToTwoParent1cidSrpNo').val();
            var oneToTwoParent2cidSrpNo=$('#oneToTwoParent2cidSrpNo').val();
            $.ajax({
                url: _baseURL() + 'save?relationshipTypeId='+relationshipTypeId+'&relationship='+relationship+'&otherRelation='+otherRelation+
                '&oneToTwoApplicantCidSrpNo='+oneToTwoApplicantCidSrpNo+ '&oneToTwoParent1cidSrpNo='+oneToTwoParent1cidSrpNo+
                '&oneToTwoParent2cidSrpNo='+oneToTwoParent2cidSrpNo+ '&certificateTypeId='+certificateTypeId + '&purposeId='+purposeId + '&mobileNumber='+mobileNumber,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status === 1) {
                        window.open(dcrc_lib.baseUrl()+'relationshipCertificate/generatePDF?applicationNumber='+res.value);
                        successMsgRedirect(res.text, 'relationshipCertificate');
                    } else if (res.status == 5) {
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }, complete: function () {
                    $('#btnSaveOneToTwo').attr('disabled', false);
                    isSubmitted = false;
                }
            });
        });

        $('#btnSaveTwoToOne').on('click', function () {
            var relationshipTypeId=$('#relationshipTypeId').val();
            var relationship=$('#relationship').val();
            var otherRelation=$('#otherRelation').val();
            var certificateTypeId=$('#certificateTypeId').val();
            var purposeId=$('#purposeId').val();
            var mobileNumber=$('#mobileNumber').val();

            var twoToOneApplicant1cidSrpNo=$('#twoToOneApplicant1cidSrpNo').val();
            var twoToOneApplicant2cidSrpNo=$('#twoToOneApplicant2cidSrpNo').val();
            var twoToOneParentcidSrpNo=$('#twoToOneParentcidSrpNo').val();
            $.ajax({
                url: _baseURL() + 'save?relationshipTypeId='+relationshipTypeId+'&relationship='+relationship+'&otherRelation='+otherRelation+
                '&twoToOneApplicant1cidSrpNo='+twoToOneApplicant1cidSrpNo+ '&twoToOneApplicant2cidSrpNo='+twoToOneApplicant2cidSrpNo+
                '&twoToOneParentcidSrpNo='+twoToOneParentcidSrpNo+ '&certificateTypeId='+certificateTypeId + '&purposeId='+purposeId + '&mobileNumber='+mobileNumber,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (res) {
                    debugger;
                    if (res.status === 1) {
                        window.open(dcrc_lib.baseUrl()+'relationshipCertificate/generatePDF?applicationNumber='+res.value);
                        successMsgRedirect(res.text, 'relationshipCertificate');
                    } else if (res.status == 5) {
                        warningMsg(res.text);
                    } else {
                        errorMsg(res.text)
                    }
                }, complete: function () {
                    $('#btnSaveOneToOne').attr('disabled', false);
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
        relationship: relationship,
        relation: relation,
        validateCountryOfBirth: validateCountryOfBirth,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        save: save,
        removeErrorClass: removeErrorClass
    };

})();

$(document).ready(function () {
    relationshipCertificate.validateCidSrpNoOnly();
    relationshipCertificate.relationship();
    relationshipCertificate.relation();
    relationshipCertificate.validateCountryOfBirth();
    relationshipCertificate.getGewogDropdownList();
    relationshipCertificate.getVillageDropdownList();
    relationshipCertificate.save();
    relationshipCertificate.removeErrorClass();

});

