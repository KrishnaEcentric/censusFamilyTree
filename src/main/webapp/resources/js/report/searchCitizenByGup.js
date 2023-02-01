var searchCitizenMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var searchCitizenByGup = (function () {
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
        return dcrc_lib.baseUrl() + 'searchCitizenByGup/';
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
            $('#searchSimpleCitizenByGupForm').validate({ //where is the name of the form bro and form validation is done here mai
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
                                _getcidInfo(cidSrpNoID.val());
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

    function _getcidInfo(cidNo) {
        var roleName=$('#roleName').val();
        var locationId=$('#locationId').val();
        var jurisdictionType=$('#jurisdictionType').val();
        if (cidNo) {
            $.ajax({
                url: _baseURL() + '/_getcidInfo',
                type: 'GET',
                data: {cidNo: cidNo,roleName:roleName,locationId:locationId,jurisdictionType:jurisdictionType},
                success: function (res) {
                    if (res.status == '1') {
                        var applicationDTO = res.dto;
                        $('#pDzongkhag').text(applicationDTO.dzongkhagName);
                        $('#pGewog').text(applicationDTO.gewogName);
                        $('#pVillage').text(applicationDTO.villageName);
                        $('#hohId').text(applicationDTO.presentHouseHoldNo);
                        $('#houseNoId').text(applicationDTO.presentHouseNo);
                        $('#thramId').text(applicationDTO.presentThramNo);

                        var citizenMasterDTOs = applicationDTO.citizenMasterDTOs;
                        debugger;
                        var ccTr = "";
                        var m = 0;
                        var currentDate= new Date();
                        var years = '';
                        var birthDate='';
                        for (var j in citizenMasterDTOs) {
                             birthDate= new Date(citizenMasterDTOs[j].date_of_birth);
                             years = (currentDate.getFullYear() - birthDate.getFullYear());
                            m++;
                            ccTr = ccTr+ "<tr>" +
                            "<td>" + m + "</td>" +
                            "<td>" + citizenMasterDTOs[j].cidNo + "</td>" +
                            "<td>" + citizenMasterDTOs[j].firstName + ' ' + isnull(citizenMasterDTOs[j].middleName)  + ' ' +isnull(citizenMasterDTOs[j].lastName) +"</td>" +
                            "<td>"+ citizenMasterDTOs[j].firstNameBh+"</td>" +
                            "<td>"+ citizenMasterDTOs[j].gender+"</td>" +
                            "<td>"+ citizenMasterDTOs[j].age+"</td>" +
                            "<td>"+ citizenMasterDTOs[j].personStatus+"</td>" +
                            "<td>"+ citizenMasterDTOs[j].relation+"</td>" +
                            "</tr>";
                        }
                        $('#familyMemberList').find('tbody').html(ccTr);
                    } else {
                        warningMsg('This CID/Special Resident number is not registered under your jurisdiction. You can view details of citizens under your jurisdiction only!');
                    }
                }
            });
        }
    }

    function isnull(str){
        return str == null?'':str;
    }

    function validateAdvancedCidSrpNoOnly() {
        $('#btnSearchAdvanced').on('click', function () {
            $('#searchSimpleCitizenApplyForm').validate({
                submitHandler: function (form) {
                    $.ajax({
                        url: _baseURL() + 'validateCidSrpNoOnly',
                        type: 'GET',
                        data: new FormData(form),
                        success: function (res) {
                            if (res.status === 1) {
                                searchCitizenHeader.addClass('hidden');
                                searchCitizenHeaderDetail.removeClass('hidden');
                                _getAdvancedSearch(form);
                            } else if (res.status == 5) {
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

    function _getAdvancedSearch(form) {
            $.ajax({
                url: _baseURL() + 'getCitizenInformationDetails?type='+"advanceSearch",
                type: 'GET',
                data: new FormData(form),
                success: function (res) {
                    _searchList(res.dto.searchList);
                }
            });
    }
/*
    function _searchList(dto) {
        var columnDef = [
            {
                data: 'cidSrpNo', render: function (data) {
                return '<input type="hidden" id="cidSrpNo" value="' + data + '"/> \
                            <a href="javascript:void(0)" id="cidSrpNoLink">' + data + '</a>';}
            },
            {data: 'firstName'},
            {data: 'middleName'},
            {data: 'lastName'},
            {data: 'dob', render: function (data) {
                return formatAsDate(data);}
            },
            {data: 'fatherCidNo'},
            {data: 'motherCidNo'},
            {data: 'householdNo'},
            {data: 'dzongkhagName'},
            {data: 'gewogName'},
            {data: 'villageName'},
            {data: 'personStatus'},
            {data: 'hohRelation'},
        ];

        if (dto.length > 0) {
            searchListGrid.dataTable().fnDestroy();
            searchListGrid.find('tbody').empty();
            searchListGrid.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            searchListGrid.dataTable().fnDestroy();
            searchListGrid.find('tbody').empty();
            searchListGrid.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }*/

    return {
        validateSimpleCidSrpNo: validateSimpleCidSrpNo,
        validateAdvancedCidSrpNoOnly: validateAdvancedCidSrpNoOnly,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList
    };

})();

$(document).ready(function () {
    $('#searchListGrid').dataTable();
    searchCitizenByGup.validateSimpleCidSrpNo();
    searchCitizenByGup.validateAdvancedCidSrpNoOnly();
    searchCitizenByGup.getGewogDropdownList();
    searchCitizenByGup.getVillageDropdownList();
});
