/**
 * Created by Hidhen on 26-Jul-19.
 */
var changeHeadOfHouseholdApproveMsg = {
    processingFormData: 'Your form request is processing. Please wait...',
    applicationNumberReq: 'Application number is required.'
};

var changeHeadOfHouseholdApprove = (function () {
    "use strict";
    var isSubmitted = false;
    var rejectResubmitUrl = 'reject';
    var applicationNumber = $('#applicationNumber').val();
    var householdMembersGridID = $('#householdMembersGrid');
    var aAttachmentGridID = $('#changeHoHAttachmentGrid');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'changeHeadOfHouseholdApprove/';
    }

    /**
     * To get the current head of household information
     */
    function getChangeHeadOfHouseholdDetails() {
        $.ajax({
            url: _baseURL() + 'getChangeHeadOfHouseholdDetails',
            type: 'GET',
            data: {applicationNumber: applicationNumber},
            success: function (res) {
                if (res.status == 1) {
                    $('#householdNo').val(res.dto.householdNo);
                    $('#presentHoHCIDNo').val(res.dto.presentHoHCIDNo);
                    $('#presentHoHFName').val(res.dto.presentHoHFName);
                    $('#presentHoHMName').val(res.dto.presentHoHMName);
                    $('#presentHoHLName').val(res.dto.presentHoHLName);
                    $('#newHoHCIDNo').val(res.dto.newHoHCIDNo);
                    $('#newHoHFName').val(res.dto.newHoHFName);
                    $('#newHoHMName').val(res.dto.newHoHMName);
                    $('#newHoHLName').val(res.dto.newHoHLName);

                    _loadHouseholdMemberList(res.dto.householdMemberDTOList, newHoHCIDNo);

                    var documentDto = res.dto.applicationDocumentDTOList;
                    var hohDoctbl = '';
                    var m=0;
                    for(var i in documentDto){
                        m++;
                        hohDoctbl = hohDoctbl +"<tr>" +
                        "<td>"+m+"</td>" +
                        "<td>"+documentDto[i].documentName+"</td>" +
                        "<td><a href='" + _baseURL() + "/viewDownload?documentPath=" + documentDto[i].uploadURL + "' target='_blank'> View </a></td>" +
                        "</tr>"
                    }
                    $('#hohAttachmentId').find('tbody').html(hohDoctbl);

                } else if (res.status == 5) {
                    warningMsg(res.text);
                } else {
                    errorMsg(res.text);
                }
            }
        });
    }

    /**
     * To load the household member list
     * @param dto
     * @param newHoHCIDNo
     * @private
     */
    function _loadHouseholdMemberList(dto) {
        var row = '';
        householdMembersGridID.find('tbody').empty();
        $.each(dto, function (index, data) {
            var fullName = data.memberFName + ' ' + data.memberMName + ' ' + data.memberLName;
            var dateOfBirth = formatAsDate(data.dob) + ' (' + data.age + ')';
            row = '<tr> \
                <td>' + (index + 1) + '</td> \
                <td>' + (data.cidNo) + '</td> \
                <td>' + (fullName) + '</td> \
                <td>' + (data.gender) + '</td> \
                <td>' + (dateOfBirth) + '</td> \
                <td>' + (data.actorName) + '</td> \
                <td>' + (data.relationID) + '</td></tr>';

            householdMembersGridID.find('tbody').append(row);
        });
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
            } else if (nextButton == 'newHoH') {
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
     * To save the data.
     */
    function approve() {
        $('#btnApprove').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            $('#btnReject').attr('disabled', true);
            $('#btnResubmit').attr('disabled', true);
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

    function sendBack() {
        $('#btnResubmit').on('click', function () {
            var applicationNumber = $('#applicationNumber').val();
            if (applicationNumber === '') {
                warningMsg(changeHeadOfHouseholdApproveMsg.applicationNumberReq);
                return;
            }
            if($('#reasonRemarks').val() != '') {
                $.ajax({
                    url: _baseURL() + 'sendBack',
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
        getChangeHeadOfHouseholdDetails: getChangeHeadOfHouseholdDetails,
        nextTab: nextTab,
        previousTab: previousTab,
        sendBack: sendBack,
        reject: reject,
        getApplicationDetails: getApplicationDetails,
        approve: approve
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

    changeHeadOfHouseholdApprove.getChangeHeadOfHouseholdDetails();
    changeHeadOfHouseholdApprove.nextTab();
    changeHeadOfHouseholdApprove.previousTab();
    changeHeadOfHouseholdApprove.sendBack();
    changeHeadOfHouseholdApprove.reject();
    changeHeadOfHouseholdApprove.approve();
    changeHeadOfHouseholdApprove.getApplicationDetails();
});
