/**
 * Created by Hidhen on 26-Jul-19.
 */
var updateCensusStatusApproveMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    updateStatus: 'Please select the updated census status.'
};

var updateCensusStatusApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var viewListGrid=$('#viewListGrid');
    var rejectResubmitUrl = 'reject';
    var applicationNumber = $('#applicationNumber').val();
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');
    var spouseDetailsGridID = $('#spouseDetailsGrid');
    var changeSpouseInfoHeader = $('#changeSpouseInfoHeader');
    var changeSpouseInfoDetails = $('#changeSpouseInfoDetails');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'updateCensusStatusApprove/';
    }

    /**
     * To get the individual information
     */
    function getIndividualInformation() {
        $.ajax({
            url: _baseURL() + 'getIndividualInformation',
            type: 'GET',
            data: {applicationNumber: applicationNumber},
            success: function (res) {
                if (res.status == 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    _populateFatherDetails(res.dto.fatherInformationDTO);
                    _populateMotherDetails(res.dto.motherInformationDTO);
                    _loadSpouseDetails(res.dto.spouseDetailsDTOList);
                    $('#dob').val(formatAsDate(res.dto.dob));

                    if (res.dto.censusStatusID == 1) {
                        $('#presentCensusStatus').text('Present Census Status : Genuine Bhutanese (F1).');
                        $('#censusStatusF1, #f1Label').addClass('hidden');
                    } else if (res.dto.censusStatusID == 2) {
                        $('#presentCensusStatus').text('Present Census Status : Off-springs of Bhutanese Father (F4).');
                        $('#censusStatusF4, #f4Label').addClass('hidden');
                    } else if (res.dto.censusStatusID == 3) {
                        $('#presentCensusStatus').text('Present Census Status : Offsprings of Bhutanese Mother (F5).');
                        $('#censusStatusF5, #f5Label').addClass('hidden');
                    }

                    if (res.dto.newCensusStatusID == 1) {
                        $('#censusStatusF1').attr('checked', true);
                    } else if (res.dto.newCensusStatusID == 2) {
                        $('#censusStatusF4').attr('checked', true);
                    } else if (res.dto.newCensusStatusID == 3) {
                        $('#censusStatusF5').attr('checked', true);
                    }
                }
            }
        });
    }

    function getCitizenIndividualInformation() {
        $('#cidNo').on('change', function () {
            var ownerCid = $(this);
            $.ajax({
                url: _baseURL() + 'getCitizenIndividualInformation',
                type: 'GET',
                data: {cidSrpNo: ownerCid.val()},
                success: function (res) {
                    if (res.status == 1) {
                        populate(res.dto);
                        populate(res.dto.citizenDetails);
                        populate(res.dto.presentInformationDTO);
                        populate(res.dto.permanentInformationDTO);
                        populate(res.dto.placeOfBirthInformationDTO);
                        _populateFatherDetails(res.dto.fatherInformationDTO);
                        _populateMotherDetails(res.dto.motherInformationDTO);
                        _loadSpouseDetails(res.dto.spouseDetailsDTOList);
                        $('#dob').val(formatAsDate(res.dto.dob));

                        if (res.dto.censusStatusID == 1) {
                            $('#presentCensusStatus').text('Present Census Status : Genuine Bhutanese (F1).');
                            $('#censusStatusF1, #f1Label').addClass('hidden');
                        } else if (res.dto.censusStatusID == 2) {
                            $('#presentCensusStatus').text('Present Census Status : Off-springs of Bhutanese Father (F4).');
                            $('#censusStatusF4, #f4Label').addClass('hidden');
                        } else if (res.dto.censusStatusID == 3) {
                            $('#presentCensusStatus').text('Present Census Status : Offsprings of Bhutanese Mother (F5).');
                            $('#censusStatusF5, #f5Label').addClass('hidden');
                        }

                        if (res.dto.newCensusStatusID == 1) {
                            $('#censusStatusF1').attr('checked', true);
                        } else if (res.dto.newCensusStatusID == 2) {
                            $('#censusStatusF4').attr('checked', true);
                        } else if (res.dto.newCensusStatusID == 3) {
                            $('#censusStatusF5').attr('checked', true);
                        }
                    }
                }
            });
        });
    }

    function _populateFatherDetails(dto) {
        var fatherName = _isNull(dto.fatherFirstName) + ' ' + _isNull(dto.fatherMiddleName) + ' ' + _isNull(dto.fatherLastName);
        $('#fatherCidNo').val(dto.fatherCidNo);
        $('#fatherName').val(fatherName);
        $('#fatherNationalityDesc').val(dto.fatherNationalityDesc);
    }

    function _populateMotherDetails(dto) {
        var name = _isNull(dto.motherFirstName) + ' ' + _isNull(dto.motherMiddleName) + ' ' + _isNull(dto.motherLastName);
        $('#motherCidNo').val(dto.motherCidNo);
        $('#motherName').val(name);
        $('#motherNationalityDesc').val(dto.motherNationalityDesc);
    }

    function _loadSpouseDetails(dtoList) {
        var row = '';
        spouseDetailsGridID.find('tbody').empty();

        $.each(dtoList, function (index, data) {
            row = '<tr><td style="border-top: 0 !important;"> \
                <div class="form-group"> \
                    <div class="col-sm-12 text-center">Spouse ' + (index + 1) + '</div><br/><br/> \
                    <div class="col-sm-4"> \
                        <label class="form-label">CID/SRP No:</label> \
                        <input type="text" id="spouseCidNo" disabled value="' + _isNull(data.spouseCidNo) + '" \
                        class="form-control"></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Nationality:</label> \
                       <input type="text" id="spouseCountryName" value="' + _isNull(data.spouseCountryName) + '" \
                       class="form-control" disabled></div> \
                    <div class="col-sm-4"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">First Name:</label> \
                        <input type="text"  readonly id="spouseFirstName" value="' + _isNull(data.spouseFirstName) + '" \
                        class="form-control"></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Middle Name:</label> \
                        <input type="text" id="spouseMiddleName" readonly value="' + _isNull(data.spouseMiddleName) + '" \
                        class="form-control"></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Last Name:</label> \
                        <input type="text"  id="spouseLastName" readonly value="' + _isNull(data.spouseLastName) + '" \
                        class="form-control"></div> \
                </div> \
                <div class="form-group" id="spousePresentDetails"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Dzongkhag:</label> \
                        <input type="text" class="form-control" disabled value="' + _isNull(data.spouseDzongkhagName) + '"></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Gewog:</label> \
                        <input type="text" class="form-control" disabled value="' + _isNull(data.spouseGewogName) + '"></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Village:</label> \
                        <input type="text" class="form-control" disabled value="' + _isNull(data.spouseVillageName) + '"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Household No:</label> \
                        <input type="text" readonly id="spouseHouseholdNo" value="' + _isNull(data.spouseHouseholdNo) + '" \
                        class="form-control"></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">House No:</label> \
                        <input type="text" id="spouseHouseNo" readonly value="' + _isNull(data.spouseHouseNo) + '" \
                        class="form-control"></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Thram No:</label> \
                        <input type="text"  id="spouseThramNo" readonly value="' + _isNull(data.spouseThramNo) + '" \
                        class="form-control"></div> \
                </div></td></tr>';
            spouseDetailsGridID.find('tbody').append(row);
        });
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

                default :
                    break;
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
            $('#updateCensusStatusApproveForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(updateCensusStatusMsg.processingFormData);
                        return;
                    }

                    $('#btnSave').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + rejectResubmitUrl,
                        type: 'POST',
                        data: {applicationNumber: applicationNumber, remarks : $('#reasonRemarks').val()},
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
                }
            });
        });
    }

    /**
     * To save the data.
     */

    function approve() {
        $('#btnApprove').on('click', function (e) {
            $.ajax({
                url: _baseURL() + 'approve',
                type: 'POST',
                data: {applicationNumber: $('#applicationNumber').val()},
                success: function (res) {
                    if (res.status == '1') {
                        successMsgRedirect(res.text, 'taskList');
                    } else {
                        warningMsg('Not able to approve this application, please try again.');
                    }
                }
            });
        })
    }

    function resubmit(){
        $('#resubBtn').on('click', function () {
            $('#userList').empty();
            var app = $('#applicationNumber').val();
            $.ajax({
                url: _baseURL() + 'getUserList',
                type: 'GET',
                data: {appNo: app},
                success: function (res) {
                    $('#userList').append("<option value=''>Select User</option>");
                    for(var i=0;i<res.length;i++){
                        $('#userList').append("<option value="+res[i].roleID+"-"+res[i].roleName+">"+res[i].roleName+"</option>").trigger('chosen:updated');
                    }
                    $('#resubBtn').prop('disabled',true);
                    $('#UserDIv').show();
                }

            });

        });

    }
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

    function sendBack() {
        $('#mainResubmit').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            var roleId=$('#userList').val().split("-");
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            $('#btnApprove').attr('disabled', true);
            $('#btnReject').attr('disabled', true);
            if($('#reasonRemarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#reasonRemarks').val(),roleId:roleId[0],roleName:roleId[1]},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'taskList');
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text)
                        }
                    }, complete: function () {
                        $('#btnResubmit').attr('disabled', false);
                    }
                });
            }else{
                $('#reasonRemarks').focus();
            }
        });
    }

    function reject() {
        $('#btnReject').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            $('#btnApprove').attr('disabled', true);
            $('#btnResubmit').attr('disabled', true);
            if($('#reasonRemarks').val() != ''){
                $.ajax({
                    url: _baseURL() + 'reject',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#reasonRemarks').val()},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'taskList');
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text)
                        }
                    }, complete: function () {
                        $('#btnReject').attr('disabled', false);
                    }
                });
            }else{
                $('#reasonRemarks').focus();
            }

        });
    }


    function saveResubmission() {
        $('#saveResubmit').on('click', function () {
            $('#updateCensusStatusResubmitForm').validate({
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

    return {
        getIndividualInformation: getIndividualInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        addMoreDocuments: addMoreDocuments,
        removeFileRow: removeFileRow,
        sendBack: sendBack,
        reject: reject,
        save: save,
        approve: approve,
        resubmit:resubmit,
        getCitizenIndividualInformation:getCitizenIndividualInformation,
        saveResubmission:saveResubmission,
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

    $('#parentsDetailsHead').not('.active').addClass('disabled');
    $('#parentsDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#requestApplicationHead').not('.active').addClass('disabled');
    $('#requestApplicationHead').not('.active').find('a').removeAttr("data-toggle");

    updateCensusStatusApprove.getIndividualInformation();
    updateCensusStatusApprove.nextTab();
    updateCensusStatusApprove.previousTab();
    updateCensusStatusApprove.addMoreDocuments();
    updateCensusStatusApprove.removeFileRow();
    updateCensusStatusApprove.reject();
    updateCensusStatusApprove.sendBack();
    updateCensusStatusApprove.save();
    updateCensusStatusApprove.approve();
    updateCensusStatusApprove.resubmit();
    updateCensusStatusApprove.getCitizenIndividualInformation();
    updateCensusStatusApprove.saveResubmission();
    updateCensusStatusApprove.getApplicationDetails();
});
