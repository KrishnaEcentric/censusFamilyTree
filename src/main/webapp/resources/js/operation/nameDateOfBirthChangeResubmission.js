/**
 * Created by Hidhen on 26-Jul-19.
 */
var nameDateOfBirthChangeMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    selectChanges: 'Please choose DOB or Name to change.'
};

var nameDateOfBirthChangeResubmission = (function () {
    "use strict";
    var isSubmitted = false;
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'nameDateOfBirthChangeResubmission/';
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
                                _getIndividualInformation(cidSrpNoID.val());
                            } else if (res.status == 2) {
                                confirmMsg(res.text, function () {
                                    _getIndividualInformation(cidSrpNoID.val());
                                });
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
                    populate(res.dto.placeOfBirthInformationDTO);
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);
                    $('#dob').val(formatAsDate(res.dto.dob));
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
                case 'btnPersonalDetailsNextND':
                    $('#personalDetailsHead, #personalDetailsContent').removeClass('active').removeAttr('style');
                    $("#personalDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#personalDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#placeOfBirthId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    break;
                case 'btnPlaceOfBirthNextND':
                    $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active').removeAttr('style');
                    $("#placeOfBirthId").css({"color": "white", "background-color": "#120f65"});
                    $('#placeOfBirthCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#presentAddressId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    break;
                case 'btnPresentAddressNextND':
                    $('#presentAddressHead, #presentAddressContent').removeClass('active').removeAttr('style');
                    $("#presentAddressId").css({"color": "white", "background-color": "#120f65"});
                    $('#presentAddressCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#parentsDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#parentsDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnParentsDetailsNextND':
                    $('#parentsDetailsHead, #parentsDetailsContent').removeClass('active').removeAttr('style');
                    $("#parentsDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#parentsDetailsCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#requestApplicationId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#requestApplicationContent').prop('class', 'tab-pane active');
                    break;
                case 'btnRequestApplicationNextND':
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
                case 'btnPlaceOfBirthPrevND':
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    $("#personalDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#personalDetailsCheck').empty();

                    $('#placeOfBirthHead, #placeOfBirthContent').removeClass('active');
                    $("#placeOfBirthId").css("background-color", "#120f65");
                    break;
                case 'btnPresentAddressPrevND':
                    $('#placeOfBirthContent').prop('class', 'tab-pane active');
                    $("#placeOfBirthId").css("background-color", "rgb(18, 18, 19)");
                    $('#placeOfBirthCheck').empty();

                    $('#presentAddressHead, #presentAddressContent').removeClass('active');
                    $("#presentAddressId").css("background-color", "#120f65");
                    break;
                case 'btnParentsDetailsPrevND':
                    $('#presentAddressContent').prop('class', 'tab-pane active');
                    $("#presentAddressId").css("background-color", "rgb(18, 18, 19)");
                    $('#presentAddressCheck').empty();

                    $('#parentsDetailsHead, #parentsDetailsContent').removeClass('active');
                    $("#parentsDetailsId").css("background-color", "#120f65");
                    break;
                case 'btnRequestApplicationPrevND':
                    $('#parentsDetailsContent').prop('class', 'tab-pane active');
                    $("#parentsDetailsId").css("background-color", "rgb(18, 18, 19)");
                    $('#parentsDetailsCheck').empty();

                    $('#requestApplicationHead, #requestApplicationContent').removeClass('active');
                    $("#requestApplicationId").css("background-color", "#120f65");
                    break;
                case 'btnAttachmentPrevND':
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
    /**
     * To get the individual information
     */
    function getIndividualInformationNDByAppNo() {
        var applicationNumber = $('#applicationNumber').val();
        $.ajax({
            url: _baseURL() + 'getIndividualInformationNDByAppNo',
            type: 'GET',
            data: {applicationNumber: applicationNumber},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    populate(res.dto.nameDateOfBirthChangeDTO);
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);
                    $('#dob').val(formatAsDate(res.dto.dob));
                    $('#mailingAddress').val(res.dto.nameDateOfBirthChangeDTO.mailingAddress);
                    if($('#changeRequestID').val()=='Others'){
                        $('#otherReasonDiv').removeClass('hidden');
                    }

                    var date = res.dto.nameDateOfBirthChangeDTO.requestedDoB;

                    if(date != null){
                        var newdate = date.split("-").join("/");
                        $('#newDoB').val(newdate);
                    }
                    $('#newDoB').val(newdate);
                   /* const months=["01","02","03","04","05","06","07","08","09","10","11","12"];
                    var formatted_date=new months[new Date(date).getMonth()] + "" + Date(date).getDate() + "/" + new Date(date).getFullYear();
                    $('#newDoB').val(formatted_date);*/

                    $('#presentVillageSerialNo').val(res.dto.nameDateOfBirthChangeDTO.changePresentVillageID);
                    $('.reset').val('');
                    $('.fatherDetails').val('');
                    $('.motherDetails').val('');
                    $('.hohDetails').val('');
                    $('#newFirstNameBh').val(res.dto.nameDateOfBirthChangeDTO.newFirstNameBh);
                    changedData(res.dto.nameDateOfBirthChangeDTO.newFirstName,res.dto.nameDateOfBirthChangeDTO.requestedDoB);

                    var documentDto = res.dto.applicationDocumentDTOList;
                    var indUpdateAttachment = '';
                    var m=0;
                    for(var i in documentDto){
                        var deleteHr = "";
                        deleteHr = deleteHr + "<td><input type='hidden' class='documentId' id='documentId' value='" + documentDto[i].documentUUID + "'/><a class='p-2 del_row'><i class='fa fa-trash text-danger'></i></a></td>";
                        m++;
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

    function changedData(newFirstName,requestedDoB) {
        if(newFirstName != null &&  (requestedDoB != undefined || requestedDoB !=null)){
            $('#changedDoB').prop('checked',true);
            $('#changedName').prop('checked',true);
            $('#newNameChangeDiv').removeClass('hidden');
            $('#newDoBDiv').removeClass('hidden');
        }else if (newFirstName != null){
            $('#changedName').prop('checked',true);
            $('#newNameChangeDiv').removeClass('hidden');
            $('#newDoB').addClass('hidden');
            $('#changedDoB').prop('checked',false);
            $('#newDoBDiv').addClass('hidden');
            $('#newDoB').attr('disabled', true).val('');
        } else if(requestedDoB !=undefined || requestedDoB !=null || requestedDoB !=""){
            $('#changedDoB').prop('checked',true);
            $('#newDoBDiv').removeClass('hidden');
            $('#newDoB').removeClass('hidden');
        }
    }

    function changeDoB() {
        $('#changedDoB').on('click', function () {
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
        $('#changedName').on('click', function () {
            var isChecked = $(this).is(':checked');
            if (isChecked) {
                $('#newNameChangeDiv').removeClass('hidden');
                $('#newFirstName').attr('disabled', false).prop('required',true);
                $('#newMiddleName').attr('disabled', false);
                $('#newLastName').attr('disabled', false);
                $('#newFirstNameBh').attr('disabled', false).prop('required',true);
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
           /* if (validateDocument(false)) {
                return;
            }*/
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
    function saveResubmission() {
        $('#btnSaveND').on('click', function () {
            $('#nameDateOfBirthChangeDetailsResubmissionForm').validate({
                submitHandler: function (form) {
                    if (!_validateIfChecked(false)) {
                        warningMsg(nameDateOfBirthChangeMsg.selectChanges);
                        return;
                    }

                    if (isSubmitted) {
                        warningMsg(nameDateOfBirthChangeMsg.processingFormData);
                        return;
                    }
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'saveResubmission?applicationNumber='+$('#applicationNumber').val()+'&newFirstNameBh='+$('#newFirstNameBh').val(),
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
                            $('#btnSaveND').attr('disabled', false);
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
        getIndividualInformationNDByAppNo: getIndividualInformationNDByAppNo,
        saveResubmission: saveResubmission,
        validateCountryOfBirth: validateCountryOfBirth,
        deleteThisDoc: deleteThisDoc,
        getApplicationDetails: getApplicationDetails,
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

    nameDateOfBirthChangeResubmission.validateCidSrpNoOnly();
    nameDateOfBirthChangeResubmission.nextTab();
    nameDateOfBirthChangeResubmission.previousTab();
    nameDateOfBirthChangeResubmission.changeDoB();
    nameDateOfBirthChangeResubmission.changeName();
    nameDateOfBirthChangeResubmission.changeRequest();
    nameDateOfBirthChangeResubmission.getGewogDropdownList();
    nameDateOfBirthChangeResubmission.getVillageDropdownList();
    nameDateOfBirthChangeResubmission.changePresentAddressChange();
    nameDateOfBirthChangeResubmission.cancelPresentAddressChange();
    nameDateOfBirthChangeResubmission.addMoreDocuments();
    nameDateOfBirthChangeResubmission.removeFileRow();
    nameDateOfBirthChangeResubmission.getIndividualInformationNDByAppNo();
    nameDateOfBirthChangeResubmission.saveResubmission();
    nameDateOfBirthChangeResubmission.validateCountryOfBirth();
    nameDateOfBirthChangeResubmission.isOriginalCidCopySubmitted();
    nameDateOfBirthChangeResubmission.getApplicationDetails();
    nameDateOfBirthChangeResubmission.deleteThisDoc();
});
