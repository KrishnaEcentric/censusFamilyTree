///**
// * Created by Hidhen on 26-Jul-19.
// */
//var ndiCitizenMsg = {
//    processingFormData: 'Your form request is processing. Please wait...'
//};
//
//var ndiCitizen = (function () {
//    "use strict";
//    var isSubmitted = false;
//
//    /**
//     * To get base URL
//     * @returns {string}
//     * @private
//     */
//    function _baseURL() {
//        return dcrc_lib.baseUrl() + 'ndiCitizenMsg/';
//    }
//
//    /**
//     * To get the individual information
//     */
//
//    /**
//     * To add more document
//     */
//
//    /**
//     * To save the form data.
//     */
//
//    function verifyDetails(){
//        $('#ndiVerifyNdi').on('click', function () {
//            var cidNo = $('#cidNo').val();
//            $('#ndiVerify').attr('disabled', true);
//                $.ajax({
//                    url: _baseURL() + 'approve',
//                    type: 'POST',
//                    data: {cidNumber: cidNo, remarks: $('#reasonRemarks').val()},
//                    success: function (res) {
//                        if (res.status === 1) {
//                            successMsgRedirect(res.text, 'taskList');
//                        } else if (res.status == 5) {
//                            warningMsg(res.text);
//                        } else {
//                            errorMsg(res.text)
//                        }
//                    }, complete: function () {
//                        $('#ndiVerify').attr('disabled', false);
//                    }
//                });
//        });
//    }
//    //function resubmit(){
//    //    $('#resubBtn').on('click', function (e) {
//    //   $('#UserDIv').show();
//    //    })
//    //}
//
//    return {
//        verifyDetails:verifyDetails
//    };
//
//})
//();
//
//$(document).ready(function () {
//    ndiCitizen.verifyDetails();
//
//});
