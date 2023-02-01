/**
 * Created by User on 8/19/2022.
 */
var publicBirthRegistrationApply = (function () {
    "use strict";
    var isValidCID = true;
    var isValidAppID = true;
    var cidFlag=false;
    var apidFlag=false;

    /**
     * To get base URL
     * @returns {string}
     * @private
     */

    function _baseURL() {
        return dcrc_lib.baseUrl() + 'publicBirthRegistrationApply/';
    }
    $('#idType').on('change', function () {
        var type = $('#idType').val();
        if(type=="APP")
        {
            $('#labelId').html('Enter Application Number :');
            apidFlag=true;
            cidFlag=false;
        } if(type=="CID") {
            $('#labelId').html('Enter CID Number :');
            cidFlag=true;
            apidFlag=false;
        }
    });

    /**
     * To search
     */
    function search() {
        $('#btnSearch').on('click', function () {
            debugger;
            $('#publicBirthRegistrationApplyForm').validate({
                submitHandler: function (form) {
                    var bornselection = $('#bornselection').val();
                    var healthselection = $('#healthselection').val();
                    var cid = $('#cid').val();
                    window.location.href = _baseURL() + 'redirect?bornselection=' + bornselection + '&healthselection=' + healthselection +'&cid=' + cid;
                }
            });
        });
    }

    return {
        search: search
    };
})();

$(document).ready(function () {
    publicBirthRegistrationApply.search();
});
