/**
 * Created by USER on 8/1/2019.
 */

var viewStatusMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var viewStatus = (function () {
    "use strict";
    var isSubmitted = false;
    $('#viewStatusDetailDiv').hide();
    var viewListGrid = $('#viewListGrid');

    /**
     * To get base url
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'viewStatus/'
    }

    /**
     * To get application details by application number.
     */
    function getApplicationDetails() {
        $('#btnViewDetails').on('click', function () {
           var applicationNumberID = $('#applicationNumber');
            if(applicationNumberID.val().includes("_")) {
                $.ajax({
                    url: _baseURL() + 'getApplicationPDetails',
                    type: 'GET',
                    data: {applicationNumber: applicationNumberID.val()},
                    success: function (res) {
                        $('#applicationLink').html('<a href="' + _baseURL() + 'viewStatusRedirect?appNo=' + applicationNumberID.val() + '">' + applicationNumberID.val() + '</a>');
                        $('#statusName').html(res.text);
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
                        $('#tbody').html(tr);
                            $('#messageHide').hide();
                       // _searchList(res.dto);
                        $('#viewStatusDetailDiv').show();

                    }
                });
            }else{
                $('#applicationNumberError').html('Please enter application number');
            }
        });
    }

    function _searchList(dto) {
        var columnDef = [
            {data: 'statusName'},
            {data: 'actorName'},
            {data: 'timeOfDeath'},
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
        getApplicationDetails: getApplicationDetails
    };

})();

$(document).ready(function () {
    viewStatus.getApplicationDetails();
});