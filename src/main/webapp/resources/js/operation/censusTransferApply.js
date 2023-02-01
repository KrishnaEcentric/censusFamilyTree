/**
 * Created by Hidhen on 26-Jul-19.
 */
var censusTransferApply = (function () {
    "use strict";

    /**
     * To get base URL
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'censusTransferApply/';
    }

    /**
     * To validate the cid or srp number
     */
    function validateCidNumberOnly() {
        $('#cidNumber').on('change', function () {
            var cidNumber = $(this);
            $.ajax({
                url: _baseURL() + 'validateCidNumberOnly',
                type: 'GET',
                data: {cidNumber: cidNumber.val()},
                success: function (res) {
                    if (res.status == 5) {
                        cidNumber.val('');
                        warningMsg(res.text);
                    } else if (res.status == 0) {
                        errorMsg(res.text)
                    }
                }
            });
        });
    }

    /**
     * To search
     */
    function search() {
        $('#btnSearch').on('click', function () {
            $('#censusTransferApplyForm').validate({
                submitHandler: function (form) {
                    var censusTransferType = $('#censusTransferType').val();
                    var cidNumber = $('#cidNumber').val();
                    window.location.href = _baseURL() + 'redirect?censusTransferType=' + censusTransferType + '&cidNumber=' + cidNumber;
                }
            });
        });
    }

    return {
        validateCidNumberOnly: validateCidNumberOnly,
        search: search
    };

})();

$(document).ready(function () {
    censusTransferApply.validateCidNumberOnly();
    censusTransferApply.search();
});
