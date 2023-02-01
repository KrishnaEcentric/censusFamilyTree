/**
 * Created by USER on 9/24/2019.
 */

var managementActionMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var managementAction = (function () {
    "use strict";
    var isSubmitted = false;
    var searchListGrid = $('#searchListGrid');
    var searchCitizenHeader = $('#searchCitizenHeader');
    var searchCitizenHeaderDetail = $('#searchCitizenHeaderDetail');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */

    function _baseURL() {
        return dcrc_lib.baseUrl() + 'managementAction/';
    }

    /**
     * To get gewog dropdown list
     */

    function getGewogDropdownList() {
        $('#permanentDzongkhagSerialNo').on('change', function () {
            var dzongkhagOfBirth = $(this).val();
            $.ajax({
                url: _baseURL() + 'getGewogDropdownList',
                type: 'GET',
                data: {dzongkhagID: dzongkhagOfBirth},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#permanentGewogSerialNo'), res, 'integer');
                    $('#villageOfBirth').empty();
                }
            });
        });
    }

    /**
     * To get village dropdown list
     */
    function getVillageDropdownList() {
        $('#permanentGewogSerialNo').on('change', function () {
            var gewogOfBirth = $(this).val();
            $.ajax({
                url: _baseURL() + 'getVillageDropdownList',
                type: 'GET',
                data: {gewogID: gewogOfBirth},
                success: function (res) {
                    dcrc_lib.loadDropDown($('#permanentVillageSerialNo'), res, 'integer');
                }
            });
        });
    }

    /**
     * To validate the cid or srp number
     */

    function validateSimpleCidSrpNo() {
        $('#btnSearchByGup').on('click', function () {
            $('#searchChildrenForm').validate({ //where is the name of the form bro and form validation is done here mai
                submitHandler: function (form) {
                    var cidSrpNoID = $('#cidSrpNo');
                    $.ajax({
                        url: _baseURL() + 'validateCidSrpNoOnly',
                        type: 'GET',
                        data: {cidSrpNo: cidSrpNoID.val()},
                        success: function (res) {
                            if (res == 1) {
                                searchCitizenHeader.addClass('hidden');
                                searchCitizenHeaderDetail.removeClass('hidden');
                                getChidrenForThisMother(cidSrpNoID.val());
                                disable();
                            } else if (res.status == 5) {
                                cidSrpNoID.val('');
                                searchCitizenHeader.removeClass('hidden');
                                searchCitizenHeaderDetail.addClass('hidden');
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
    function disable() {
        document.addEventListener('keyup', function(e) {
            if (e.key == 'PrintScreen'){
                navigator.clipboard.writeText('');
                alert('Screenshots disabled!');
            }
        });
        document.addEventListener('keydown', function(e){
            if (e.ctrlKey && e.key == 'p') {
                alert('This section is not allowed to print or export to PDF');
                e.cancelBubble = true;
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }

    function getChidrenForThisMother(cidNo) {
        if (cidNo) {
            $.ajax({
                url: _baseURL() + '/getChidrenForThisMother',
                type: 'GET',
                data: {cidNo: cidNo},
                success: function (res) {
                    if (res.status == '1') {
                        var applicationDTO = res.dto;
                        var citizenMasterDTOs = applicationDTO.citizenMasterDTOs;
                        debugger;
                        $('#cidNo').html(cidNo);
                        var ccTr = "";
                        var m = 0;
                        var currentDate= new Date();
                        var years = '';
                        var birthDate='';
                        for (var j in citizenMasterDTOs) {
                            m++;
                            ccTr = ccTr+ "<tr>" +
                            "<td>" + m + "</td>" +
                            "<td>" + citizenMasterDTOs[j].cidNo + "</td>" +
                            "<td>" + citizenMasterDTOs[j].firstName + ' ' + isnull(citizenMasterDTOs[j].middleName)  + ' ' +isnull(citizenMasterDTOs[j].lastName) +"</td>" +
                            "<td>"+ citizenMasterDTOs[j].firstNameBh+"</td>" +
                            "<td>"+ citizenMasterDTOs[j].gender+"</td>" +
                            "<td>"+ citizenMasterDTOs[j].date_of_birth+"</td>" +
                            "<td>"+ citizenMasterDTOs[j].presentHouseHoldNo+"</td>" +
                            "</tr>";
                        }
                        $('#familyMemberList').find('tbody').html(ccTr);
                    } else {
                        warningMsg('This CID does not have children');
                    }
                }
            });
        }
    }

    function isnull(str){
        return str == null?'':str;
    }

    return {
        validateSimpleCidSrpNo: validateSimpleCidSrpNo,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList
    };

})();

$(document).ready(function () {
    $('#searchListGrid').dataTable();
    managementAction.validateSimpleCidSrpNo();
    managementAction.getGewogDropdownList();
    managementAction.getVillageDropdownList();
});