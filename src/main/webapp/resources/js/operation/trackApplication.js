/**
 * Created by USER on 8/1/2019.
 */

var trackApplicationMsg = {
    processingFormData: 'Your form request is processing. Please wait...'
};

var trackApplication = (function () {
    "use strict";
    var isSubmitted = false;

    /**
     * To get base url
     * @returns {string}
     * @private
     */
    function _baseURL() {
        return dcrc_lib.baseUrl() + 'trackApplication/'
    }

    /**
     * To get application details by application number.
     */
    function getApplicationDetails() {
        $('#btnViewDetails').on('click', function () {
            $('#trackApplicationForm').validate({
                submitHandler: function () {
                    var applicationNumberID = $('#applicationNumber');

                    if (isSubmitted) {
                        warningMsg(trackApplicationMsg.processingFormData);
                        return;
                    }

                    $('#btnViewDetails').attr('disabled', true);
                    isSubmitted = true;
                    $.ajax({
                        url: _baseURL() + 'getApplicationDetails',
                        type: 'GET',
                        data: {applicationNumber: applicationNumberID.val()},
                        success: function (res) {
                            if (res.status === 1) {
                                $('#applicationDate').text(formatAsDate(res.dto.applicationDate));
                                $('#serviceName').text(res.dto.serviceName);
                                $('#statusName').text(res.dto.statusName);
                            } else if (res.status == 5) {
                                applicationNumberID.val('');
                                $('#applicationDate').text('');
                                $('#serviceName').text('');
                                $('#statusName').text('');
                                warningMsg(res.text);
                            } else {
                                errorMsg(res.text)
                            }
                        }, complete: function () {
                            $('#btnViewDetails').attr('disabled', false);
                            isSubmitted = false;
                        }
                    });
                }
            });
        });
    }

    return {
        getApplicationDetails: getApplicationDetails
    };

})();

$(document).ready(function () {
    trackApplication.getApplicationDetails();
});