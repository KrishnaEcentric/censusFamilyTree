/**
 * Created by Hidhen on 26-Jul-19.
 */
var birthRegistrationApply = (function () {
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
        return dcrc_lib.baseUrl() + 'birthRegistrationApply/';
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
            $('#birthRegistrationApplyForm').validate({
                submitHandler: function (form) {
                    var birthRegistrationType = $('#birthRegistrationType').val();
                    var nationality = $('#nationality').val();
                    window.location.href = _baseURL() + 'redirect?birthRegistrationType=' + birthRegistrationType + '&nationality=' + nationality;
                }
            });
        });
    }

    return {
        search: search
    };

})();

$(document).ready(function () {
    birthRegistrationApply.search();
});
