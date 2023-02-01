/**
 * Created by Hidhen on 26-Jul-19.
 */
var deathRegistrationMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var deathRegistration = (function () {
    "use strict";
    var isSubmitted = false;
    var viewListGrid=$('#viewListGrid');
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');
    var changeSpouseInfoHeader = $('#changeSpouseInfoHeader');
    var changeSpouseInfoDetails = $('#changeSpouseInfoDetails');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'deathRegistration/';
    }

    /**
     * To validate the cid or srp number
     */
    function validateCidSrpNoOnly() {
        $('#btnSearch').on('click', function () {
            $('#deathRegistrationForm').validate({
                submitHandler: function (form) {
                    var cidSrpNoID = $('#cidSrpNo');
                    $.ajax({
                        url: _baseURL() + 'validateCidSrpNoOnly',
                        type: 'GET',
                        data: {cidSrpNo: cidSrpNoID.val()},
                        success: function (res) {
                            if (res.status == 1) {
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
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    populate(res.dto.fatherInformationDTO);
                    populate(res.dto.motherInformationDTO);
                    //$('#dob').val(formatAsDate(res.dto.dob));
                    //$('#dob').val(res.dto.dateOfBirth);
                    $('#deathDzoSerialNo').val(res.dto.permanentInformationDTO.permanentDzongkhagSerialNo);
                    $('#deathGewogSerialNo').val(res.dto.permanentInformationDTO.permanentGewogSerialNo);
                }
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
                case 'btnMotherDetailsNext':
                    $('#motherDetailsHead, #motherDetailsContent').removeClass('active').removeAttr('style');
                    $("#motherDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#motherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#personAttendedId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#personAttendedContent').prop('class', 'tab-pane active');
                    break;
                case 'btnPersonAttendedNext':
                    $('#personAttendedHead, #personAttendedContent').removeClass('active').removeAttr('style');
                    $("#personAttendedId").css({"color": "white", "background-color": "#120f65"});
                    $('#personAttendedCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#requestorDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#requestorDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnRequestorDetailsNext':
                    $('#requestorDetailsHead, #requestorDetailsContent').removeClass('active').removeAttr('style');
                    $("#requestorDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#requestorDetailsCheck').html('<i class="fa fa-check text-white"></i>');

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
                case 'btnPersonAttendedPrev':
                    $('#motherDetailsContent').prop('class', 'tab-pane active');
                    $("#motherDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#motherDetailsCheck').empty();

                    $('#personAttendedHead, #personAttendedContent').removeClass('active');
                    $("#personAttendedId").css("background-color", "#120f65");
                    break;
                case 'btnRequestorDetailsPrev':
                    $('#personAttendedContent').prop('class', 'tab-pane active');
                    $("#personAttendedId").css("background-color", "rgb(18, 18, 19)");
                    $('#personAttendedCheck').empty();

                    $('#requestorDetailsHead, #requestorDetailsContent').removeClass('active');
                    $("#requestorDetailsId").css("background-color", "#120f65");
                    break;
                case 'btnAttachmentPrev':
                    $('#requestorDetailsContent').prop('class', 'tab-pane active');
                    $("#requestorDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#requestorDetailsCheck').empty();

                    $('#attachmentHead, #attachmentContent').removeClass('active');
                    $("#attachmentId").css("background-color", "#120f65");
                    break;
                default :
                    break;
            }
        });
    }

    function validateCauseOfDeath() {
        $('#causeOfDeath').on('change', function () {
            if ($(this).val() == 'O') {
                $('#causeOfDeathOtherDiv').removeClass('hidden');
            } else {
                $('#causeOfDeathOtherDiv').addClass('hidden');
            }
        });
    }

    function validateCountryOfDeath() {
        $('#countryOfDeath').on('change', function () {
            var countryOfDeath = $(this).val();
            if (countryOfDeath == bhutanCountryCode) {
                $('#otherDeathDetailsDiv').removeClass('hidden');
                $('.otherDeathDetails').val('').attr('required', 'required');
                $('#OtherCountryAddress').hide();
                $('#gewogOfDeath, #villageOfDeath').empty();
            } else {
                $('#otherDeathDetailsDiv').addClass('hidden');
                $('#OtherCountryAddress').show();
                $('.otherDeathDetails').val('').removeAttr('required');
                $('#gewogOfDeath, #villageOfDeath').empty();
            }
        });
    }

    function validatePlaceOfDeath() {
        $('.placeOfDeath').on('click', function () {
            var placeOfDeath = $('.placeOfDeath:checked').val();
            if (placeOfDeath == 'O') {
                $('#placeOfDeathOtherDiv').removeClass('hidden');
                $('#placeOfDeathOther').val('').attr('required', 'required');
            } else {
                $('#placeOfDeathOtherDiv').addClass('hidden');
                $('#placeOfDeathOther').val('').removeAttr('required');
            }
        });
    }

    function getIndividualInformation() {
        var appNo=$('#appNo').val();
        $.ajax({
            url: _baseURL() + 'getIndividualInformationResubmission',
            type: 'GET',
            data: {appNo: appNo},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.fatherInformationDTO);
                    populate(res.dto.motherInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.deathRegistrationDTO);
                    populate(res.dto.attendDTO);


                    /* $('#hhMemberCIDNo').val(res.dto.cidNo);
                     $('#hhMemberName').val(isNull(res.dto.firstName) + isNull(res.dto.middleName) + isNull(res.dto.lastName));
                     $('#hhMemberGender').val(res.dto.gender);*/
                }
            }
        });
    }
    function getMainCidDetails() {
        $('#cidNo').on('change', function () {
            var ownerCid = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenInformation',
                type: 'GET',
                data: {cidSrpNo: ownerCid.val()},
                success: function (res) {
                    if (res.status == 1) {
                        $('#firstNameBh').val(res.dto.spouseFirstNameBh);
                        $('#permanentHouseholdNo').val(res.dto.spouseHouseholdNo);
                        $('#fatherCitizenshipBy').val(res.dto.spouseCitizenBy);
                        $('#firstName').val(res.dto.spouseFirstName);
                        $('#middleName').val(res.dto.spouseMiddleName);
                        $('#lastName').val(res.dto.spouseLastName);
                        if(res.spouseGender=="F") {
                            $('#gender').val('Female');
                        }else{
                            $('#gender').val('Male');
                        }
                        var today = new Date(res.dto.dateOfMarriage);
                        var dob=today.toISOString().substring(0, 10);
                        $('#dob').val(dob);
                        $('#nationalityDesc').val(res.dto.spouseCountryName);
                        $('#maritalDesc').val(res.dto.spouseCitizenBy);
                        $('#occupationDesc').val(res.dto.spouseLastName);
                        $('#permanentHouseNo').val(res.dto.spouseHouseNo);
                        $('#permanentDzongkhagName').val(res.dto.spouseDzongkhagName);
                        $('#permanentGewogName').val(res.dto.spouseGewogName);
                        $('#permanentVillageName').val(res.dto.spouseVillageName);
                        $('#villageOfDeathID').val(res.spouseVillageSerialNo);
                        $('#deathGewogSerialNo').val(res.spouseGewogSerialNo);
                        $('#deathDzoSerialNo').val(res.spouseDzongkhagSerialNo);
                    } else {
                        ownerCid.val('');
                        $('.fatherDetails').val('');
                        warningMsg(res.text);
                    }
                }
            });
        });
    }

    function saveResubmission() {
        $('#saveResubmit').on('click', function () {
            $('#deathRegistrationDetailsResubmitForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(birthRegistrationMsg.processingFormData);
                        return;
                    }
                    $('#saveResubmit').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'saveResubmission',
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
                            $('#saveResubmit').attr('disabled', false);
                            isSubmitted = false;
                        }
                    });
                }
            });
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

    function validateAttendedType() {
        $('.attendedType').on('click', function () {
            var attendedType = $('.attendedType:checked').val();
            if (attendedType == 'O') {
                $('#attendedTypePersonOtherDiv').removeClass('hidden');
            } else {
                $('#attendedTypePersonOtherDiv').addClass('hidden');
            }
        });
    }

    function validateRelationOther() {
        $('#relationToDeceased').on('change', function () {
            var relationToDeceased = $(this).val();
            if (relationToDeceased == '9000') {
                $('#relationToDeceasedOtherDiv').removeClass('hidden');
            } else {
                $('#relationToDeceasedOtherDiv').addClass('hidden');
            }
        });
    }

    /**
     * To get gewog dropdown list
     */
    function getGewogDropdownList() {
        $('#dzongkhagOfDeath').on('change', function () {
            var dzongkhagOfDeath = $(this).val();
            $.ajax({
                url: _baseURL() + 'getGewogDropdownList',
                type: 'GET',
                data: {dzongkhagID: dzongkhagOfDeath},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#gewogOfDeath'), res, 'integer');
                    $('#villageOfDeath').empty();
                }
            });
        });
    }
    function deleteDocument(){
        $('#del_row').on('click',function(e) {
            var hrId = $(this).closest('tr').find('.documentId').val();
            $.ajax({
                url:  _baseURL() +'/deleteThisDoc?applicationNumber='+$('#appNo').val() + '&documentId='+$('#documentId').val(),
                type: 'GET',
                data: {hrId:hrId}
            });
            $(this).closest('tr').remove();
        });
    }
    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#gewogOfDeath').on('change', function () {
            var gewogOfDeath = $(this).val();
            $.ajax({
                url: _baseURL() + 'getVillageDropdownList',
                type: 'GET',
                data: {gewogID: gewogOfDeath},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#villageOfDeath'), res, 'integer');
                }
            });
        });
    }

    /**
     * To get details
     */
    function getPersonAttendedDetails() {
        $('#attendedCIDNo').on('change', function () {
            var attendedCIDNo = $(this);
            if(attendedCIDNo.val()==$('#cidNo').val()){
                warningMsg("Cannot enter same cid as death registration cid");
            }else {
                $.ajax({
                    url: _baseURL() + 'getCitizenInformation',
                    type: 'GET',
                    data: {cidSrpNo: attendedCIDNo.val()},
                    success: function (res) {
                        if (res.status == 1) {
                            $('#attendedFirstNameBh').val(res.dto.spouseFirstNameBh);
                            $('#attendedFirstName').val(res.dto.spouseFirstName);
                            $('#attendedMiddleName').val(res.dto.spouseMiddleName);
                            $('#attendedLastName').val(res.dto.spouseLastName);
                            $('.attendedDetails').attr('readonly', true);
                        } else {
                            $('.attendedDetails').val('').attr('readonly', false);
                        }
                    }
                });
            }
        });
    }

    /**
     * To get details
     */
    function getRequestorDetails() {
        $('#requestorCIDNo').on('change', function () {
            var requestorCIDNo = $(this);
            if(requestorCIDNo.val()==$('#cidNo').val()){
                warningMsg("Cannot enter same cid as death registration cid");
            }else {
                $.ajax({
                    url: _baseURL() + 'getCitizenInformation',
                    type: 'GET',
                    data: {cidSrpNo: requestorCIDNo.val()},
                    success: function (res) {
                        if (res.status == 1) {
                            $('#requestorFirstNameBh').val(res.dto.spouseFirstNameBh);
                            $('#requestorFirstName').val(res.dto.spouseFirstName);
                            $('#requestorMiddleName').val(res.dto.spouseMiddleName);
                            $('#requestorLastName').val(res.dto.spouseLastName);
                            $('.requestorDetails').attr('readonly', true);
                        } else {
                            $('.requestorDetails').val('').attr('readonly', false);
                            warningMsg(res.text);
                        }
                    }
                });
            }
        });
    }
    function getFatherDetails() {
        $('#fatherCidNo').on('change', function () {
            var fatherCidNo = $(this);
            if(fatherCidNo.val()==$('#cidNo').val()) {
                warningMsg("Cannot enter same cid as death registration cid");
            }else {
                $.ajax({
                    url: _baseURL() + 'getCitizenInformation',
                    type: 'GET',
                    data: {cidSrpNo: fatherCidNo.val()},
                    success: function (res) {
                        if (res.status == 1) {
                            $('#fatherFirstNameBh').val(res.dto.spouseFirstNameBh);
                            $('#fatherFirstName').val(res.dto.spouseFirstName);
                            $('#fatherMiddleName').val(res.dto.spouseMiddleName);
                            $('#fatherLastName').val(res.dto.spouseLastName);
                            $('.fatherDetails').attr('readonly', true);
                        } else {
                            $('.requestorDetails').val('').attr('readonly', false);
                            warningMsg(res.text);
                        }
                    }
                });
            }
        });
    }
    function getMotherDetails() {
        $('#motherCidNo').on('change', function () {
            var motherCidNo = $(this);
            if(motherCidNo.val()==$('#cidNo').val()) {
                warningMsg("Cannot enter same cid as death registration cid");
            }else {
                $.ajax({
                    url: _baseURL() + 'getCitizenInformation',
                    type: 'GET',
                    data: {cidSrpNo: motherCidNo.val()},
                    success: function (res) {
                        if (res.status == 1) {
                            $('#motherFirstNameBh').val(res.dto.spouseFirstNameBh);
                            $('#motherFirstName').val(res.dto.spouseFirstName);
                            $('#motherMiddleName').val(res.dto.spouseMiddleName);
                            $('#motherLastName').val(res.dto.spouseLastName);
                            $('.motherDetails').attr('readonly', true);
                        } else {
                            $('.motherDetails').val('').attr('readonly', false);
                            warningMsg(res.text);
                        }
                    }
                });
            }
        });
    }

    /**
     * To add more document
     */
    //function addMoreDocuments() {
    //    $('#addMoreDocuments').on('click', function () {
    //        if (validateDocument(false)) {
    //            return;
    //        }
    //        var row = '<tr><td> \
    //            <input type="file" id="multipartFile" name="applicationDocumentDTOList[0].multipartFile" \
    //            required="required"></td> \
    //            <td><div class="col-sm-6"></div></td><td><div class="col-sm-6"> \
    //                <button type="button" class="btn btn-danger btn-sm" id="btnRemove"> \
    //            <i class="fa fa-remove"></i> Remove</button></div></td></td></tr>';
    //
    //        nameChangeAttachmentGrid.find('tbody').append(row);
    //        dcrc_lib.formIndexing(nameChangeAttachmentGrid.find('tbody'), nameChangeAttachmentGrid.find('tbody tr'));
    //
    //    });
    //}

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
    //function validateDocument(condition) {
    //    $('#nameChangeAttachmentGrid').find('tbody tr').each(function () {
    //        var selected = $(this).closest('tr');
    //
    //        if (selected.find('#multipartFile')[0].files.length <= 0) {
    //            selected.find('#multipartFile').addClass('error');
    //            condition = true;
    //        } else {
    //            selected.find('#multipartFile').removeClass('error');
    //        }
    //    });
    //    return condition;
    //}

    /**
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            $('#deathRegistrationDetailsForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(deathRegistrationMsg.processingFormData);
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
                                successMsgRedirect(res.text, 'deathRegistrationApply');
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

        validateCidSrpNoOnly: validateCidSrpNoOnly,
        nextTab: nextTab,
        previousTab: previousTab,
        validateCauseOfDeath: validateCauseOfDeath,
        validateCountryOfDeath: validateCountryOfDeath,
        validatePlaceOfDeath: validatePlaceOfDeath,
        validateAttendedType: validateAttendedType,
        validateRelationOther: validateRelationOther,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        getPersonAttendedDetails: getPersonAttendedDetails,
        getRequestorDetails: getRequestorDetails,
        getMotherDetails: getMotherDetails,
        getFatherDetails: getFatherDetails,
        //addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        save: save,
        removeErrorClass: removeErrorClass,
        getIndividualInformation: getIndividualInformation,
        getMainCidDetails:getMainCidDetails,
        saveResubmission:saveResubmission,
        deleteDocument:deleteDocument,
        getApplicationDetails:getApplicationDetails
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

    $('#fatherDetailsHead').not('.active').addClass('disabled');
    $('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#motherDetailsHead').not('.active').addClass('disabled');
    $('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#personAttendedHead').not('.active').addClass('disabled');
    $('#personAttendedHead').not('.active').find('a').removeAttr("data-toggle");

    $('#requestorDetailsHead').not('.active').addClass('disabled');
    $('#requestorDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#attachmentHead').not('.active').addClass('disabled');
    $('#attachmentHead').not('.active').find('a').removeAttr("data-toggle");

    deathRegistration.validateCidSrpNoOnly();
    deathRegistration.nextTab();
    deathRegistration.previousTab();
    deathRegistration.validateCauseOfDeath();
    deathRegistration.validateCountryOfDeath();
    deathRegistration.validatePlaceOfDeath();
    deathRegistration.validateAttendedType();
    deathRegistration.validateRelationOther();
    deathRegistration.getGewogDropdownList();
    deathRegistration.getVillageDropdownList();
    deathRegistration.getPersonAttendedDetails();
    deathRegistration.getRequestorDetails();
    deathRegistration.getFatherDetails();
    deathRegistration.getMotherDetails();
    //deathRegistration.addMoreDocuments();
    deathRegistration.removeFileRow();
    deathRegistration.save();
    deathRegistration.removeErrorClass();
    deathRegistration.getIndividualInformation();
    deathRegistration.getMainCidDetails();
    deathRegistration.saveResubmission();
    deathRegistration.deleteDocument();
    deathRegistration.getApplicationDetails();
});
