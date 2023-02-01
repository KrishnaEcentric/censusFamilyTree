/**
 * Created by Hidhen on 26-Jul-19.
 */
var deathRegistrationApply = (function () {
    "use strict";

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'deathRegistrationApply/';
    }


    /**
     * To search
     */
    function search() {
        $('#btnSearch').on('click', function () {
            $('#deathRegistrationApplyForm').validate({
                submitHandler: function (form) {
                    var deathRegistrationType = $('#deathRegistrationType').val();
                    var nationality = $('#nationality').val();
                    window.location.href = _baseURL() + 'redirect?deathRegistrationType=' + deathRegistrationType + '&nationality=' + nationality;
                }
            });
        });
    }

    return {
        search: search
    };

})();

$(document).ready(function () {
    deathRegistrationApply.search();
});
