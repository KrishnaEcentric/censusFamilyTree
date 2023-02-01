/**
 * Created by Hidhen on 26-Jul-19.
 */
var searchCitizenMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var searchCitizen = (function () {
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
        return dcrc_lib.baseUrl() + 'searchCitizen/';
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
    function validateSimpleCidSrpNoOnly() {
        $('#btnSearch1').on('click', function () {
            var cidSrpNoID = $('#cidSrpNo');
            debugger;
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val()},
                success: function (res) {
                    if (res.status == 1) {
                        searchCitizenHeader.addClass('hidden');
                        searchCitizenHeaderDetail.removeClass('hidden');
                        _getSimpleSearch(cidSrpNoID.val());
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
        });
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

    function _getSimpleSearch(cidNo) {
            $.ajax({
                url: _baseURL() + 'getCitizenInformationDetails?type='+"simpleSearch",
                type: 'GET',
                data: {cidNo: cidNo},
                success: function (res) {
                    _searchList(res.dto.searchList);
                }
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
    }

    return {
        validateSimpleCidSrpNoOnly: validateSimpleCidSrpNoOnly,
        validateAdvancedCidSrpNoOnly: validateAdvancedCidSrpNoOnly,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList
       // getCitizenInformationDetails: getCitizenInformationDetails
    };

})();

$(document).ready(function () {
    $('#searchListGrid').dataTable();
    searchCitizen.validateSimpleCidSrpNoOnly();
    searchCitizen.validateAdvancedCidSrpNoOnly();
    searchCitizen.getGewogDropdownList();
    searchCitizen.getVillageDropdownList();
   // searchCitizen.getCitizenInformationDetails();
});
