/**
 * Created by Hidhen on 26-Jul-19.
 */
var searchCitizenMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var searchCitizenApply= (function () {
    "use strict";
    var isSubmitted = false;
    var searchListGrid = $('#searchListGrid');
    var simpleSearchDtlsTable=$('#simpleSearchDtlsTable');
    var searchCitizenHeader = $('#searchCitizenHeader');
    var searchCitizenHeaderDetail = $('#searchCitizenHeaderDetail');

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'searchCitizenApply/';
    }

    /**
     * To go to next tab using next button
     */
    function nextTab() {
        $('.btnNext').on('click', function () {
            var nextButton = $(this).prop('id');
            switch (nextButton) {
                case 'btnHouseholdInfoNext':
                        $('#householdInfoHead, #householdInfoContent').removeClass('active').removeAttr('style');
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
                default :
                    break;
            }
        });
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
        $('#btnSearch').on('click', function () {
            var cidSrpNoID = $('#cidSrpNo');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val()},
                success: function (res) {
                    if (res.status == 1) {
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

   /* *//**
     * To validate the cid or srp number
     *//*
    function searchNDI() {
        $('#btnSearchNDI').on('click', function () {
            var cidSrpNoID = $('#cidSrpNo');
            $.ajax({
                url: _baseURL() + 'validateCidSrpNoOnly',
                type: 'GET',
                data: {cidSrpNo: cidSrpNoID.val()},
                success: function (res) {
                    if (res.status == 1) {
                        _getSimpleSearch(cidSrpNoID.val());
                    } else {
                        errorMsg(res.text)
                    }
                }
            });
        });
    }*/

    function validateAdvancedCidSrpNoOnly() {
        $('#btnSearchAdvancedQQ').on('click', function () {
            var cidSrpNoID = $('#cidNo');
             $.ajax({
                 url: _baseURL() + 'validateCidSrpNoOnly',
                 type: 'GET',
                 data: {cidSrpNo: cidSrpNoID.val()},
                 success: function (res) {
                     if (res = true) {
                         _getAdvancedSearch()
                     } else if (res.status == 5) {
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

    function _getSimpleSearch(cidNo) {
            $.ajax({
                url: _baseURL() + '_getSimpleSearch',
                type: 'GET',
                data: {cidNo: cidNo,type:'simpleSearch'},
                success: function (res) {
                    $('#simpleSearchSection').removeClass('hidden');
                    searchCitizenHeader.addClass('hidden');
                        var hrTr = "";
                        var status = '';
                        var CID = "<a href='"+_baseURL() + "individualDtlsForThisCid?cidNo="+res.cidNo +"'>"+res.cidNo + "</a>";
                        if(res.personStatusDesc=='A'){
                            status= "<td  class='label-success text-white center-block'>" + res.personStatusDesc + "</td>"
                        }else if(res.personStatusDesc=='D'){
                            status= "<td  class='label-danger text-white center-block'>" + res.personStatusDesc + "</td>"
                        }else if(res.personStatusDesc=='T'){
                            status= "<td  class='label-warning text-white center-block'>" + res.personStatusDesc + "</td>"
                        }else if(res.personStatusDesc=='R'){
                            status= "<td  class='label-warning text-white center-block'>" + res.personStatusDesc + "</td>"
                        }
                        hrTr = hrTr +
                        "<tr>"+
                        "<td>" + CID +"</td>" +
                        "<td>" + res.firstName+ "</td>" +
                        "<td>" + res.middleName+ "</td>" +
                        "<td>" + res.lastName+ "</td>" +
                        "<td>" + res.dateOfBirth + "</td>" +
                        "<td>" + res.fatherCidNo + "</td>" +
                        "<td>" + res.motherCidNo + "</td>" +
                        "<td>" + res.presentHouseHoldNo + "</td>" +
                        "<td>" + res.dzongkhagOfBirthName + "</td>" +
                        "<td>" + res.gewogOfBirthName + "</td>" +
                        "<td>" + res.villageOfBirthName + "</td>" +
                        status+
                        "<td>" + res.hohRelation + "</td>" +
                        "</tr>";
                        $('#simpleSearchDtlsTable').find('tbody').html(hrTr);


                }
            });
    }

    function _getAdvancedSearch() {
        $('#btnSearchAdvanced').on('click', function () {
            var cidSrpNoID = $('#cidNo').val();
            var firstName = $('#firstName').val();
            var middleName = $('#middleName').val();
            var lastName = $('#lastName').val();
            var dob=$("#dob").val();
            if(dob==""){
               dob="09/09/9999"
            }
            var gender = $('#gender').val();
            var occupationID = $('#occupationID').val();
            var permanentDzongkhagSerialNo = $('#permanentDzongkhagSerialNo').val();
            var permanentGewogSerialNo = $('#permanentGewogSerialNo').val();
            var permanentVillageSerialNo = $('#permanentVillageSerialNo').val();
            var permanentHouseholdNo = $('#permanentHouseholdNo').val();
            var permanentHouseNo = $('#permanentHouseNo').val();
            var permanentThramNo = $('#permanentThramNo').val();

            $.ajax({
                url: _baseURL() + '_AdvanceSearch',
                type: 'GET',
                data: {cidNo: cidSrpNoID, type: 'advanceSearch',firstName:firstName,middleName:middleName,lastName:lastName,dob:dob,gender:gender,occupationID:occupationID,
                    permanentDzongkhagSerialNo:permanentDzongkhagSerialNo,permanentGewogSerialNo:permanentGewogSerialNo,permanentVillageSerialNo:permanentVillageSerialNo,
                    permanentHouseholdNo:permanentHouseholdNo,permanentHouseNo:permanentHouseNo,permanentThramNo:permanentThramNo},
                success: function (res) {
                    debugger;
                    searchCitizenHeader.addClass('hidden');
                    $('#searchCitizenHeaderDetail').removeClass('hidden');
                    _searchList(res);
                }

            });
        })
    }
    function _searchList(dto) {
        var columnDef = [
            {
                data: 'cidNo', render: function (data) {
                return '<input type="hidden" id="cidSrpNo" value="' + data + '"/> \
                            <a href="' + _baseURL() +'individualDtlsForThisCid?cidNo='+data+'" id="cidSrpNoLink">' + data + '</a>';}
            },
            {data: 'firstName'},
            {data: 'middleName'},
            {data: 'lastName'},
            {data: 'dob', render: function (data) {
                return dateFormatAS(data);}
            },
            {data: 'fatherCIDNO'},
            {data: 'motherCIDNo'},
            {data: 'presentHouseHoldNo'},
            {data: 'dzongkhagOfBirthName'},
            {data: 'gewogOfBirthName'},
            {data: 'villageOfBirthName'},
            {data: 'personStatusDesc', render: function (data) {
                var color='green';
                if(data=="T" || data=="R" || data=="M"){
                    color='red';
                }
                if(data=="A"){
                    color='green';
                }
                if(data=="D"){
                    color='blue';
                }
                return '<span style="color:' + color + '">'+'<b>' + data + '</b>'+'</span>';
                    }

              },
            {data: 'relation'}
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

    function _SimplesearchList(dto) {
        var columnDef = [
            {
                data: 'cidNo', render: function (data) {
                return '<input type="hidden" id="cidSrpNo" value="' + data + '"/> \
                            <a href="' + _baseURL() +'individualDtlsForThisCid?cidNo="' + data + '" id="cidSrpNoLink">' + data + '</a>';}
            },
            {data: 'firstName'},
            {data: 'middleName'},
            {data: 'lastName'},
            {data: 'dateOfBirth', render: function (data) {
                return formatAsDate(data);}
            },
            {data: 'fatherCidNo'},
            {data: 'motherCidNo'},
            {data: 'presentHouseHoldNo'},
            {data: 'dzongkhagOfBirthName'},
            {data: 'gewogOfBirthName'},
            {data: 'villageOfBirthName'},
            {data: 'personStatusDesc', render: function (data) {
                var color='green';
                if(data=="T" || data=="R" || data=="M"){
                    color='red';
                }
                if(data=="A"){
                    color='green';
                }
                if(data=="D"){
                    color='blue';
                }
                return '<span style="color:' + color + '">'+'<b>' + data + '</b>'+'</span>';
            }

            },
            {data: 'hohRelation'}
        ];

        if (dto.length > 0) {
            simpleSearchDtlsTable.dataTable().fnDestroy();
            simpleSearchDtlsTable.find('tbody').empty();
            simpleSearchDtlsTable.dataTable({
                data: dto,
                columns: columnDef
            });
        } else {
            simpleSearchDtlsTable.dataTable().fnDestroy();
            simpleSearchDtlsTable.find('tbody').empty();
            simpleSearchDtlsTable.dataTable({
                data: null,
                columns: columnDef
            });
        }
    }

    return {
        nextTab: nextTab,
        previousTab: previousTab,
        validateSimpleCidSrpNoOnly: validateSimpleCidSrpNoOnly,
        validateAdvancedCidSrpNoOnly: validateAdvancedCidSrpNoOnly,
        getGewogDropdownList: getGewogDropdownList,
        getVillageDropdownList: getVillageDropdownList,
        _getAdvancedSearch: _getAdvancedSearch
       // getCitizenInformationDetails: getCitizenInformationDetails
    };

})();

$(document).ready(function () {
    //$('#householdInfoHead').prop('class', 'active').not('.active').addClass('disabled');
    $('#householdInfoContent').prop('class', 'tab-pane active');
    $("#householdInfoId").css({"background-color": "rgb(18, 18, 19)", "color": "white"});
    //
    //$('#personalDetailsHead').not('.active').addClass('disabled');
    //$('#personalDetailsHead').not('.active').find('a').removeAttr("data-toggle");
    //
    //$('#placeOfBirthHead').not('.active').addClass('disabled');
    //$('#placeOfBirthHead').not('.active').find('a').removeAttr("data-toggle");
    //
    //$('#presentAddressHead').not('.active').addClass('disabled');
    //$('#presentAddressHead').not('.active').find('a').removeAttr("data-toggle");
    //
    //$('#fatherDetailsHead').not('.active').addClass('disabled');
    //$('#fatherDetailsHead').not('.active').find('a').removeAttr("data-toggle");
    //
    //$('#motherDetailsHead').not('.active').addClass('disabled');
    //$('#motherDetailsHead').not('.active').find('a').removeAttr("data-toggle");

    searchCitizenApply.validateSimpleCidSrpNoOnly();
    searchCitizenApply.validateAdvancedCidSrpNoOnly();
    searchCitizenApply.getGewogDropdownList();
    searchCitizenApply.getVillageDropdownList();
    searchCitizenApply.nextTab();
    searchCitizenApply.previousTab();
    searchCitizenApply._getAdvancedSearch();
   // searchCitizen.getCitizenInformationDetails();
});
