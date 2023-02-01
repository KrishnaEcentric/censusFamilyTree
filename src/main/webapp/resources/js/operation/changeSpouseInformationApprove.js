/**
 * Created by Hidhen on 26-Jul-19.
 */
var changeSpouseInformationApproveMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var changeSpouseInformationApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var rejectResubmitUrl = 'reject';
    var applicationNumber = $('#applicationNumber').val();
    var bhutanCountryCode = $('#bhutanCountryCode').val();
    var spouseDetailsGridID = $('#spouseDetailsGrid');
    var spouseDetailsGridIDResubmission = $('#spouseDetailsGridResubmission');
    var nameChangeAttachmentGrid = $('#nameChangeAttachmentGrid');
    var viewListGrid=$('#viewListGrid');
    var spouseReasonDropdownList = [];
    var countryDropdownList = [];
    var dzongkhagDropdownList = [];

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'changeSpouseInformationApprove/';
    }
    function getSpouseReasonDropdownList() {
        $.ajax({
            url: _baseURL() + 'getSpouseReasonDropdownList',
            type: 'GET',
            success: function (res) {
                spouseReasonDropdownList = res;
            }
        });
    }

    /**
     * To get dzongkhag dropdown list
     */
    function getCountryDropdownList() {
        $.ajax({
            url: _baseURL() + 'getCountryDropdownList',
            type: 'GET',
            success: function (res) {
                countryDropdownList = res;
            }
        });
    }

    /**
     * To get dzongkhag dropdown list
     */
    function getDzongkhagDropdownList() {
        $.ajax({
            url: _baseURL() + 'getDzongkhagDropdownList',
            type: 'GET',
            success: function (res) {
                dzongkhagDropdownList = res;
            }
        });
    }

    function getGewogDropdownList() {
        $('#spouseDetailsGrid').find('tbody').on('change', 'tr #spouseDzongkhagSerialNo', function () {
            var spouseDzongkhagSerialNo = $(this).closest('tr').find('#spouseDzongkhagSerialNo').val();
            var spouseGewogSerialNo = $(this).closest('tr').find('#spouseGewogSerialNo');
            _getGewogDropdownList(spouseGewogSerialNo, spouseDzongkhagSerialNo, '');
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#spouseDetailsGrid').find('tbody').on('change', 'tr #spouseGewogSerialNo', function () {
            var spouseGewogSerialNo = $(this).closest('tr').find('#spouseGewogSerialNo').val();
            var spouseVillageSerialNo = $(this).closest('tr').find('#spouseVillageSerialNo');
            _getVillageDropdownList(spouseVillageSerialNo, spouseGewogSerialNo, '');
        });
    }



    /**
     * To get gewog dropdown list
     */
    //function _getGewogDropdownList(elementID, spouseDzongkhagID, spouseGewogID) {
    //    $.ajax({
    //        url: _baseURL() + 'getGewogDropdownList',
    //        type: 'GET',
    //        data: {dzongkhagID: spouseDzongkhagID},
    //        success: function (res) {
    //            dcrc_lib.loadDropDown(elementID, res, 'integer');
    //            elementID.val(spouseGewogID);
    //        }
    //    });
    //}
    //
    ///**
    // * To get village dropdown list
    // */
    //function _getVillageDropdownList(elementID, spouseGewogID, spouseVillageID) {
    //    $.ajax({
    //        url: _baseURL() + 'getVillageDropdownList',
    //        type: 'GET',
    //        data: {gewogID: spouseGewogID},
    //        success: function (res) {
    //            dcrc_lib.loadDropDown(elementID, res, 'integer');
    //            elementID.val(spouseVillageID);
    //        }
    //    });
    //}

    /**
     * To get the individual information
     */
    function getIndividualInformation() {
        $.ajax({
            url: _baseURL() + 'getIndividualInformationForApprove',
            type: 'GET',
            data: {applicationNumber: applicationNumber},
            success: function (res) {
                if (res.status === 1) {
                    populate(res.dto);
                    populate(res.dto.citizenDetails);
                    populate(res.dto.permanentInformationDTO);
                    populate(res.dto.presentInformationDTO);
                    populate(res.dto.fatherInformationDTO);
                    populate(res.dto.motherInformationDTO);
                    populate(res.dto.placeOfBirthInformationDTO);
                    _loadSpouseDetails(res.dto.spouseDetailsDTOList);
                    $('#dob').val(formatAsDate(res.dto.dob));
                    $('#emailID').val(res.dto.emailID);
                }
            }
        });
    }

    function _loadSpouseDetails(dtoList) {
        var row = '';
        spouseDetailsGridID.find('tbody').empty();
        spouseDetailsGridIDResubmission.find('tbody').empty();
        var length = spouseDetailsGridID.find('tbody tr').length;
        var length_one = spouseDetailsGridIDResubmission.find('tbody tr').length;
        $.each(dtoList, function (index, data) {
            row = '<tr><td style="border-top: 0 !important;"> \
                <div class="form-group"> \
                    <div class="col-sm-12 text-center">Spouse ' + (length + 1) + '</div><br/> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseCidNo" value="' + _isNullValue(data.spouseCidNo) + '" \
                        class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseReason" value="' + _isNullValue(data.spouseReason) + '" \
                        class="form-control" disabled></div> \
                    <div class="col-sm-4"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text"  disabled id="spouseFirstName" class="form-control" \
                        value="' + _isNullValue(data.spouseFirstName) + '"> \
                    </div> \
                    <div class="col-sm-4"> \
                        <input type="text"  id="spouseMiddleName" readonly class="form-control" \
                        value="' + _isNullValue(data.spouseMiddleName) + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseLastName" \ readonly class="form-control" \
                        value="' + _isNullValue(data.spouseLastName) + '"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" id="dateOfMarriage" class="form-control" readonly \
                        value="' + formatAsDate(data.dateOfMarriage) + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" value="' + _isNullValue(data.spouseCountryName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4 hidden" id="spouseAddressDiv"> \
                        <input type="text" id="spouseAddress" class="form-control" value="' + _isNullValue(data.spouseAddress) + '"></div> \
                </div> \
                <div class="form-group" id="spousePresentDetails"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Dzongkhag:</label> \
                        <input type="text" value="' + _isNullValue(data.spouseDzongkhagName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Gewog:</label> \
                        <input type="text" value="' + _isNullValue(data.spouseGewogName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Village:</label> \
                        <input type="text" value="' + _isNullValue(data.spouseVillageName) + '" class="form-control" disabled></div> \
                </div></td></tr>';
            spouseDetailsGridID.find('tbody').append(row);

            if (data.spouseCountryID == bhutanCountryCode) {
                spouseDetailsGridID.find('tbody tr:last').find('#spouseAddressDiv').addClass('hidden');
            } else {
                spouseDetailsGridID.find('tbody tr:last').find('#spouseAddressDiv').removeClass('hidden');
                spouseDetailsGridID.find('tbody tr:last').find('#spousePresentDetails').addClass('hidden');
            }
        });

        $.each(dtoList, function (index, data) {
            row = '<tr><td style="border-top: 0 !important;"> \
                <div class="form-group"> \
                    <div class="col-sm-12 text-center">Spouse ' + (length_one + 1) + '</div><br/> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseCidNo" value="' + _isNullValue(data.spouseCidNo) + '" \
                        class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseReason" value="' + _isNullValue(data.spouseReason) + '" \
                        class="form-control" disabled></div> \
                    <div class="col-sm-4"></div> \
                     <div class="col-sm-4"> \
                        <input type="button" value="Remove" class="btn btn-danger" id="btnRemoveSpouse"/> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text"  disabled id="spouseFirstName" class="form-control" \
                        value="' + _isNullValue(data.spouseFirstName) + '"> \
                    </div> \
                    <div class="col-sm-4"> \
                        <input type="text"  id="spouseMiddleName" readonly class="form-control" \
                        value="' + _isNullValue(data.spouseMiddleName) + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseLastName" \ readonly class="form-control" \
                        value="' + _isNullValue(data.spouseLastName) + '"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" id="dateOfMarriage" class="form-control" readonly \
                        value="' + formatAsDate(data.dateOfMarriage) + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" value="' + _isNullValue(data.spouseCountryName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4 hidden" id="spouseAddressDiv"> \
                        <input type="text" id="spouseAddress" class="form-control" value="' + _isNullValue(data.spouseAddress) + '"></div> \
                </div> \
                <div class="form-group" id="spousePresentDetails"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Dzongkhag:</label> \
                        <input type="text" value="' + _isNullValue(data.spouseDzongkhagName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Gewog:</label> \
                        <input type="text" value="' + _isNullValue(data.spouseGewogName) + '" class="form-control" disabled></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Village:</label> \
                        <input type="text" value="' + _isNullValue(data.spouseVillageName) + '" class="form-control" disabled></div> \
                </div></td></tr>';
            spouseDetailsGridIDResubmission.find('tbody').append(row);

            if (data.spouseCountryID == bhutanCountryCode) {
                spouseDetailsGridIDResubmission.find('tbody tr:last').find('#spouseAddressDiv').addClass('hidden');
            } else {
                spouseDetailsGridIDResubmission.find('tbody tr:last').find('#spouseAddressDiv').removeClass('hidden');
                spouseDetailsGridIDResubmission.find('tbody tr:last').find('#spousePresentDetails').addClass('hidden');
            }
        });
    }

    function _isNullValue(data) {
        return data === null ? '' : data;
    }

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton) {
                case 'btnHouseholdInfoNext':
                    $('#householdInfoHead, #householdInfoContent').removeClass('active');
                    $("#householdInfoId").css({"color": "white", "background-color": "#120f65"});
                    $('#householdInfoCheck').html('<i class="fa fa-check text-white"></i>');

                    $("#personalDetailsId").css({"color": "white", "background-color": "rgb(18, 18, 19)"});
                    $('#personalDetailsContent').prop('class', 'tab-pane active');
                    break;
                case 'btnIndividualInfoNext':
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
                case 'btnMothersDetailsNext':
                    $('#motherDetailsHead, #motherDetailsContent').removeClass('active').removeAttr('style');
                    $("#motherDetailsId").css({"color": "white", "background-color": "#120f65"});
                    $('#motherDetailsCheck').html('<i class="fa fa-check text-white"></i>');

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
                case 'btnIndividualInfoPrev':
                    $('#householdInfoContent').prop('class', 'tab-pane active');
                    $("#householdInfoId").css("background-color", "rgb(18, 18, 19)");
                    $('#householdInfoCheck').empty();

                    $('#personalDetailsHead, #personalDetailsContent').removeClass('active');
                    $("#personalDetailsId").css("background-color", "#120f65");
                    break;
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

    function validateRejectResubmit() {
        $('.btnRejectResubmit').on('click', function () {
            var btnName = $(this).prop('id');
            $('#rejectionReasonDiv').removeClass('hidden');
            $('#reasonRemarks').attr('disabled', false);

            if (btnName == 'btnReject') {
                rejectResubmitUrl = 'reject';
                $('#reasonLabel').text('Reason For Rejection:');
                $('#newHoHDetailsHead').removeClass("active");
            } else {
                rejectResubmitUrl = 'resubmit';
                $('#reasonLabel').text('Reason For Resubmission:');
            }
        });
    }

    function cancelRejectResubmit() {
        $('#btnCancel').on('click', function () {
            $('#rejectionReasonDiv').addClass('hidden');
            $('#reasonRemarks').attr('disabled', true).val('');
            $('#reasonLabel').text('Reason For Rejection:');
        });
    }

    /**
     * To save the form data.
     */
    function save() {
        $('#btnSave').on('click', function () {
            $('#changeSpouseInformationApproveForm').validate({
                submitHandler: function (form) {
                    if (isSubmitted) {
                        warningMsg(changeSpouseInformationApproveMsg.processingFormData);
                        return;
                    }

                    $('#btnSave').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + rejectResubmitUrl,
                        type: 'POST',
                        data: $(form).serializeArray(),
                        success: function (res) {
                            if (res.status === 1) {
                                successMsgRedirect(res.text, 'changeSpouseInformationApprove');
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
        $('#btnApprove').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }

            $('#btnApprove').attr('disabled', true);
            $.ajax({
                url: _baseURL() + 'approve',
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
                    $('#btnApprove').attr('disabled', false);
                }
            });
        });
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
                        alert("name is "+res[i].roleName.trim());
                        var roleName = $.trim(res[i].roleName);
                        $('#userList').append('<option value='+res[i].roleID+'-'+roleName+'>'+res[i].roleName+'</option>').trigger('chosen:updated');
                    }
                    $('#resubBtn').prop('disabled',true);
                    $('#UserDIv').show();
                }

            });

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
            $('#resubBtn').attr('disabled', true);
            if($('#remarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
                    type: 'POST',
                    data: {applicationNumber: applicationNumber, remarks: $('#remarks').val(),roleId:roleId[0],roleName:roleId[1]},
                    success: function (res) {
                        if (res.status === 1) {
                            successMsgRedirect(res.text, 'taskList');
                        } else if (res.status == 5) {
                            warningMsg(res.text);
                        } else {
                            errorMsg(res.text)
                        }
                    }, complete: function () {
                        $('#resubBtn').attr('disabled', false);
                    }
                });
            }else{
                $('#remarks_err').focus();
            }
        });
    }

    function addSpouseInformation() {
        $('#btnAddSpouse').on('click', function () {
            if (!_validateSpouseInfoEntered(true, '', '', false)) {
                warningMsg('Spouse information is required.');
                return;
            }

            var length = spouseDetailsGridID.find('tbody tr').length;
            var length_one = spouseDetailsGridIDResubmission.find('tbody tr').length;
            var spouseDetailClass = 'spouseDetail' + length;
            var spouseDetailClassResumission = 'spouseDetail' + length_one;
            var row = '<tr><td style="border-top: 0 !important;"> \
                <div class="form-group"> \
                    <div class="col-sm-12 text-center">Spouse ' + (length + 1) + '</div><br/> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseCidNo" placeholder="CID/SRP Number" \
                        name="spouseDetailsDTOList[' + (length) + '].spouseCidNo" \
                        class="form-control ' + spouseDetailClass + '"></div> \
                    <div class="col-sm-4"> \
                        <select  id="spouseReasonID" name="spouseDetailsDTOList[' + (length) + '].spouseReasonID" \
                            required="required" class="form-control ' + spouseDetailClass + '"> \
                        </select></div> \
                    <div class="col-sm-4"> \
                        <button class="btn btn-primary" id="btnRefresh" type="button"> \
                        <i class="fa fa-refresh"></i> Refresh</button> \
                        <input type="button" value="Remove" class="btn btn-danger" id="btnRemoveSpouse"/> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseFirstName" required="required" \
                        id="spouseFirstName" placeholder="First Name" class="form-control ' + spouseDetailClass + '"> \
                        <input type="hidden" id="isNewSpouse" class="form-control ' + spouseDetailClass + '" \
                        name="spouseDetailsDTOList[' + (length) + '].isNewSpouse" value="true"> \
                    </div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseMiddleName" id="spouseMiddleName" \
                        placeholder="Middle Name" class="form-control ' + spouseDetailClass + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseLastName" id="spouseLastName" \
                        placeholder="Last Name" class="form-control ' + spouseDetailClass + '"></div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" placeholder="Date of Marriage" id="dateOfMarriage' + length + '" required \
                          name="spouseDetailsDTOList[' + (length) + '].dateOfMarriage" \
                         class="form-control' + spouseDetailClass + '"></div> \
                    <div class="col-sm-4"> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseCountryID" id="spouseCountryID" \
                        class="form-control ' + spouseDetailClass + '"></select></div> \
                    <div class="col-sm-4 hidden" id="spouseAddressDiv"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length) + '].spouseAddress" id="spouseAddress" \
                        placeholder="Address" class="form-control ' + spouseDetailClass + '"></div> \
                </div> \
                <div class="form-group" id="spousePresentDetails"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Dzongkhag:</label> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseDzongkhagSerialNo" id="spouseDzongkhagSerialNo" \
                        placeholder="Dzongkhag" class="form-control ' + spouseDetailClass + '"></select></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Gewog:</label> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseGewogSerialNo" id="spouseGewogSerialNo" \
                        placeholder="Gewog" class="form-control ' + spouseDetailClass + '"></select></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Village:</label> \
                        <select name="spouseDetailsDTOList[' + (length) + '].spouseVillageSerialNo" id="spouseVillageSerialNo" \
                        placeholder="Village" class="form-control ' + spouseDetailClass + '"></select></div> \
                </div></td></tr>';
            spouseDetailsGridID.find('tbody').append(row);
            dcrc_lib.formIndexing(spouseDetailsGridID.find('tbody'), spouseDetailsGridID.find('tbody tr'));

            var spouseReasonID = spouseDetailsGridID.find('tbody tr:last').find('#spouseReasonID');
            var spouseCountryID = spouseDetailsGridID.find('tbody tr:last').find('#spouseCountryID');
            var spouseDzongkhagSerialNo = spouseDetailsGridID.find('tbody tr:last').find('#spouseDzongkhagSerialNo');


            var row1 = '<tr><td style="border-top: 0 !important;"> \
                <div class="form-group"> \
                    <div class="col-sm-12 text-center">Spouse ' + (length_one + 1) + '</div><br/> \
                    <div class="col-sm-4"> \
                        <input type="text" id="spouseCidNo" placeholder="CID/SRP Number" \
                        name="spouseDetailsDTOList[' + (length_one) + '].spouseCidNo" \
                        class="form-control ' + spouseDetailClassResumission + '"></div> \
                    <div class="col-sm-4"> \
                        <select  id="spouseReasonID" name="spouseDetailsDTOList[' + (length_one) + '].spouseReasonID" \
                            required="required" class="form-control ' + spouseDetailClassResumission + '"> \
                        </select></div> \
                    <div class="col-sm-4"> \
                        <button class="btn btn-primary" id="btnRefresh" type="button"> \
                        <i class="fa fa-refresh"></i> Refresh</button> \
                        <input type="button" value="Remove" class="btn btn-danger" id="btnRemoveSpouse"/> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length_one) + '].spouseFirstName" required="required" \
                        id="spouseFirstName" placeholder="First Name" class="form-control ' + spouseDetailClassResumission + '"> \
                        <input type="hidden" id="isNewSpouse" class="form-control ' + spouseDetailClassResumission + '" \
                        name="spouseDetailsDTOList[' + (length_one) + '].isNewSpouse" value="true"> \
                    </div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length_one) + '].spouseMiddleName" id="spouseMiddleName" \
                        placeholder="Middle Name" class="form-control ' + spouseDetailClassResumission + '"></div> \
                    <div class="col-sm-4"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length_one) + '].spouseLastName" id="spouseLastName" \
                        placeholder="Last Name" class="form-control ' + spouseDetailClassResumission + '"></div> \
                </div> \
                 <div class="form-group"> \
                    <div class="col-sm-4"> \
                        <input type="text" placeholder="Date of Marriage" id="dateOfMarriage' + length + '" required \
                          name="spouseDetailsDTOList[' + (length) + '].dateOfMarriage" \
                         class="form-control ' + spouseDetailClassResumission + '"></div> \
                    <div class="col-sm-4"> \
                        <select name="spouseDetailsDTOList[' + (length_one) + '].spouseCountryID" id="spouseCountryID" \
                        class="form-control    '+ spouseDetailClassResumission +'"></select></div> \
                    <div class="col-sm-4 hidden" id="spouseAddressDiv"> \
                        <input type="text" name="spouseDetailsDTOList[' + (length_one) + '].spouseAddress" id="spouseAddress" \
                        placeholder="Address" class="form-control ' + spouseDetailClassResumission + '"></div> \
                </div> \
                <div class="form-group" id="spousePresentDetails"> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Dzongkhag:</label> \
                        <select name="spouseDetailsDTOList[' + (length_one) + '].spouseDzongkhagSerialNo" id="spouseDzongkhagSerialNo" \
                        placeholder="Dzongkhag" class="form-control ' + spouseDetailClassResumission + '"></select></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Gewog:</label> \
                        <select name="spouseDetailsDTOList[' + (length_one) + '].spouseGewogSerialNo" id="spouseGewogSerialNo" \
                        placeholder="Gewog" class="form-control ' + spouseDetailClassResumission + '"></select></div> \
                    <div class="col-sm-4"> \
                        <label class="form-label">Village:</label> \
                        <select name="spouseDetailsDTOList[' + (length_one) + '].spouseVillageSerialNo" id="spouseVillageSerialNo" \
                        placeholder="Village" class="form-control ' + spouseDetailClassResumission + '"></select></div> \
                </div></td></tr>';
            spouseDetailsGridIDResubmission.find('tbody').append(row1);
            dcrc_lib.formIndexing(spouseDetailsGridIDResubmission.find('tbody'), spouseDetailsGridIDResubmission.find('tbody tr'));

            var spouseReasonID = spouseDetailsGridIDResubmission.find('tbody tr:last').find('#spouseReasonID');
            var spouseCountryID = spouseDetailsGridIDResubmission.find('tbody tr:last').find('#spouseCountryID');
            var spouseDzongkhagSerialNo = spouseDetailsGridIDResubmission.find('tbody tr:last').find('#spouseDzongkhagSerialNo');

            dcrc_lib.loadDropDown(spouseReasonID, spouseReasonDropdownList, 'integer');
            dcrc_lib.loadDropDown(spouseCountryID, countryDropdownList, 'integer');
            dcrc_lib.loadDropDown(spouseDzongkhagSerialNo, dzongkhagDropdownList, 'integer');

            var datePickerOptions = {
                dateFormat: globalConfDate.dateFormat(),
                changeMonth: true,
                changeYear: true,
                yearRange: 'c-65:c+10',
                beforeShow: function (input, inst) {
                    if ($(input).prop("readonly")) {
                        return false;
                    }
                }
            };
            spouseDetailsGridID.find('tbody tr:last').find('#dateOfMarriage' + length).datepicker(datePickerOptions);
            spouseDetailsGridIDResubmission.find('tbody tr:last').find('#dateOfMarriage' + length_one).datepicker(datePickerOptions);
        });
    }

    function _validateSpouseInfoEntered(condition, index, cidNumber, isForGetInfo) {
        spouseDetailsGridID.find('tbody tr').each(function () {
            var selected = $(this).closest('tr');
            var spouseCidNo = selected.find('#spouseCidNo').val();
            var spouseFirstName = selected.find('#spouseFirstName').val();
            if (isForGetInfo) {
                if (selected.index() != index && spouseCidNo == cidNumber) {
                    condition = false;
                }
            } else {
                if (spouseFirstName === '') {
                    selected.find('#spouseFirstName').addClass('error');
                    condition = false;
                }
            }
        });

        spouseDetailsGridIDResubmission.find('tbody tr').each(function () {
            var selected = $(this).closest('tr');
            var spouseCidNo = selected.find('#spouseCidNo').val();
            var spouseFirstName = selected.find('#spouseFirstName').val();
            if (isForGetInfo) {
                if (selected.index() != index && spouseCidNo == cidNumber) {
                    condition = false;
                }
            } else {
                if (spouseFirstName === '') {
                    selected.find('#spouseFirstName').addClass('error');
                    condition = false;
                }
            }
        });
        return condition;
    }

    function removeSpouseInformation() {
        $('#spouseDetailsGrid').find('tbody').on('click', 'tr #btnRemoveSpouse', function () {
            $(this).closest('tr').remove();
        });
        $('#spouseDetailsGridResubmission').find('tbody').on('click', 'tr #btnRemoveSpouse', function () {
            $(this).closest('tr').remove();
        });


    }

    function getSpouseInformation() {
        $('#spouseDetailsGrid').find('tbody').on('change', 'tr #spouseCidNo', function () {
            var selected = $(this).closest('tr');
            var cidNo = $('#cidNo').val();
            var cidSrpNo = selected.find('#spouseCidNo').val();
            var villageID = selected.find('#spouseVillageSerialNo');
            var gewogID = selected.find('#spouseGewogSerialNo');

            if (cidSrpNo === '') {
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                return;
            }

            if (cidNo === cidSrpNo) {
                selected.find('#spouseCidNo').focus();
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                warningMsg('Spouse CID/SRP No. should not be same with Application CID/SRP No.');
                return;
            }

            if (!_validateSpouseInfoEntered(true, selected.index(), cidSrpNo, true)) {
                selected.find('#spouseCidNo').focus();
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                warningMsg('Same spouse should not be added more than one!');
                return;
            }

            $.ajax({
                url: _baseURL() + 'getSpouseInformation',
                type: 'GET',
                data: {cidSrpNo: cidSrpNo},
                success: function (res) {
                    if (res.status == 1) {
                        if (res.dto.spouseCountryName == 'Bhutan') {
                            selected.find('#spouseAddressDiv').addClass('hidden');
                            selected.find('#spouseAddress').val('');
                            selected.find('#spousePresentDetails').removeClass('hidden');
                            selected.find('#spouseFirstName').val(res.dto.spouseFirstName).attr('readonly', true);
                            selected.find('#spouseMiddleName').val(res.dto.spouseMiddleName).attr('readonly', true);
                            selected.find('#spouseLastName').val(res.dto.spouseLastName).attr('readonly', true);
                            selected.find('#spouseCountryID').val(res.dto.spouseCountryID).css({'pointer-events': 'none'});
                            selected.find('#spouseDzongkhagSerialNo').val(res.dto.spouseDzongkhagSerialNo).css({'pointer-events': 'none'});
                            _getGewogDropdownList(gewogID, res.dto.spouseDzongkhagSerialNo, res.dto.spouseGewogSerialNo);
                            _getVillageDropdownList(villageID, res.dto.spouseGewogSerialNo, res.dto.spouseVillageSerialNo);
                            gewogID.css({'pointer-events': 'none'});
                            villageID.css({'pointer-events': 'none'});
                        } else {
                            _resetSpouseDetails(selected);
                            // warningMsg(res.text);
                        }
                    } else if (res.status == 5) {
                        _resetSpouseDetails(selected);
                        selected.find('.spouseDetail' + selected.index()).val('');
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });



        $('#spouseDetailsGridResubmission').find('tbody').on('change', 'tr #spouseCidNo', function () {
            var selected = $(this).closest('tr');
            var cidNo = $('#cidNo').val();
            var cidSrpNo = selected.find('#spouseCidNo').val();
            var villageID = selected.find('#spouseVillageSerialNo');
            var gewogID = selected.find('#spouseGewogSerialNo');

            if (cidSrpNo === '') {
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                return;
            }

            if (cidNo === cidSrpNo) {
                selected.find('#spouseCidNo').focus();
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                warningMsg('Spouse CID/SRP No. should not be same with Application CID/SRP No.');
                return;
            }

            if (!_validateSpouseInfoEntered(true, selected.index(), cidSrpNo, true)) {
                selected.find('#spouseCidNo').focus();
                _resetSpouseDetails(selected);
                selected.find('.spouseDetail' + selected.index()).val('');
                warningMsg('Same spouse should not be added more than one!');
                return;
            }

            $.ajax({
                url: _baseURL() + 'getSpouseInformation',
                type: 'GET',
                data: {cidSrpNo: cidSrpNo},
                success: function (res) {
                    if (res.status == 1) {
                        if (res.dto.spouseCountryName == 'Bhutan') {
                            selected.find('#spouseAddressDiv').addClass('hidden');
                            selected.find('#spouseAddress').val('');
                            selected.find('#spousePresentDetails').removeClass('hidden');
                            selected.find('#spouseFirstName').val(res.dto.spouseFirstName).attr('readonly', true);
                            selected.find('#spouseMiddleName').val(res.dto.spouseMiddleName).attr('readonly', true);
                            selected.find('#spouseLastName').val(res.dto.spouseLastName).attr('readonly', true);
                            selected.find('#spouseCountryID').val(res.dto.spouseCountryID).css({'pointer-events': 'none'});
                            selected.find('#spouseDzongkhagSerialNo').val(res.dto.spouseDzongkhagSerialNo).css({'pointer-events': 'none'});
                            _getGewogDropdownList(gewogID, res.dto.spouseDzongkhagSerialNo, res.dto.spouseGewogSerialNo);
                            _getVillageDropdownList(villageID, res.dto.spouseGewogSerialNo, res.dto.spouseVillageSerialNo);
                            gewogID.css({'pointer-events': 'none'});
                            villageID.css({'pointer-events': 'none'});
                        } else {
                            _resetSpouseDetails(selected);
                            // warningMsg(res.text);
                        }
                    } else if (res.status == 5) {
                        _resetSpouseDetails(selected);
                        selected.find('.spouseDetail' + selected.index()).val('');
                    } else {
                        errorMsg(res.text);
                    }
                }
            });
        });
    }




    function _resetSpouseDetails(selected) {
        selected.find('#spouseAddressDiv').removeClass('hidden');
        selected.find('#spouseAddress').val('');
        selected.find('#spousePresentDetails').removeClass('hidden');
        selected.find('#spouseFirstName').val('').attr('readonly', false);
        selected.find('#spouseMiddleName').val('').attr('readonly', false);
        selected.find('#spouseLastName').val('').attr('readonly', false);
        selected.find('#spouseCountryID').val('').css({'pointer-events': 'all'});
        selected.find('#spouseDzongkhagSerialNo').val('').css({'pointer-events': 'all'});
        selected.find('#spouseGewogSerialNo').empty().css({'pointer-events': 'all'});
        selected.find('#spouseVillageSerialNo').empty().css({'pointer-events': 'all'});
    }

    function _getVillageDropdownList(elementID, spouseGewogID, spouseVillageID) {
        $.ajax({
            url: _baseURL() + 'getVillageDropdownList',
            type: 'GET',
            data: {gewogID: spouseGewogID},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(spouseVillageID);
            }
        });
    }

    function _getGewogDropdownList(elementID, spouseDzongkhagID, spouseGewogID) {
        $.ajax({
            url: _baseURL() + 'getGewogDropdownList',
            type: 'GET',
            data: {dzongkhagID: spouseDzongkhagID},
            success: function (res) {
                dcrc_lib.loadDropDown(elementID, res, 'integer');
                elementID.val(spouseGewogID);
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

    function saveResubmission() {
        $('#saveResubmit').on('click', function () {
            $('#changeSpouseInformationResubmissionForm').validate({
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

    return {
        getIndividualInformation: getIndividualInformation,
        nextTab: nextTab,
        previousTab: previousTab,
        validateRejectResubmit: validateRejectResubmit,
        cancelRejectResubmit: cancelRejectResubmit,
        save: save,
        approve: approve,
        resubmit:resubmit,
        sendBack:sendBack,
        addSpouseInformation:addSpouseInformation,
        removeSpouseInformation:removeSpouseInformation,
        getSpouseInformation:getSpouseInformation,
        getSpouseReasonDropdownList: getSpouseReasonDropdownList,
        getCountryDropdownList: getCountryDropdownList,
        getDzongkhagDropdownList: getDzongkhagDropdownList,
        getApplicationDetails:getApplicationDetails,
        addMoreDocuments:addMoreDocuments,
        removeFileRow:removeFileRow,
        saveResubmission:saveResubmission

    };

})();

$(document).ready(function () {
    $('#householdInfoHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#householdInfoContent').prop('class', 'tab-pane active');
    $("#householdInfoId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});

    $('#personalDetailsHead').not('.active').addClass('disabled');
    $('#personalDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#placeOfBirthHead').not('.active').addClass('disabled');
    $('#placeOfBirthHead').not('.active').find('a').removeAttr("data-toggle");

    $('#permanentAddressHead').not('.active').addClass('disabled');
    $('#permanentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#presentAddressHead').not('.active').addClass('disabled');
    $('#presentAddressHead').not('.active').find('a').removeAttr("data-toggle");

    $('#fatherDetailsHead').not('.active').addClass('disabled');
    $('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    $('#motherDetailsHead').not('.active').addClass('disabled');
    $('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    changeSpouseInformationApprove.getIndividualInformation();
    changeSpouseInformationApprove.nextTab();
    changeSpouseInformationApprove.previousTab();
    changeSpouseInformationApprove.validateRejectResubmit();
    changeSpouseInformationApprove.cancelRejectResubmit();
    changeSpouseInformationApprove.save();
    changeSpouseInformationApprove.approve();
    changeSpouseInformationApprove.resubmit();
    changeSpouseInformationApprove.sendBack();
    changeSpouseInformationApprove.addSpouseInformation();
    changeSpouseInformationApprove.removeSpouseInformation();
    changeSpouseInformationApprove.getSpouseInformation();
    changeSpouseInformationApprove.getSpouseReasonDropdownList();
    changeSpouseInformationApprove.getCountryDropdownList();
    changeSpouseInformationApprove.getDzongkhagDropdownList();
    changeSpouseInformationApprove.getApplicationDetails();
    changeSpouseInformationApprove.addMoreDocuments();
    changeSpouseInformationApprove.removeFileRow();
    changeSpouseInformationApprove.saveResubmission();
});
