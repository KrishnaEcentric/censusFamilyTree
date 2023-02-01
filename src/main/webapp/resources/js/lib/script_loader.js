$(document).ready(function () {
    //region Operation screen

    /* Change Head of Household.*/
    if (document.URL.search('changeHeadOfHousehold') > 1 && document.URL.search('changeHeadOfHouseholdApprove') < 0)
        scriptLoader('operation/changeHeadOfHousehold');

    if (document.URL.search('changeHeadOfHouseholdApprove') > 1)
        scriptLoader('operation/changeHeadOfHouseholdApprove');

    /*Resubmission Change of HoH*/
    if (document.URL.search('changeHeadOfHouseholdResubmission') > 1)
        scriptLoader('operation/changeHeadOfHouseholdResubmission');

    /* Change Spouse Information */
    if (document.URL.search('changeSpouseInformation') > 1 && document.URL.search('changeSpouseInformationApprove') < 0)
        scriptLoader('operation/changeSpouseInformation');

    if (document.URL.search('changeSpouseInformationApprove') > 1)
        scriptLoader('operation/changeSpouseInformationApprove');

    /**/
    if (document.URL.search('nationalCertificateIssuance') > 1)
        scriptLoader('operation/nationalCertificateIssuance');

    // Update individual information.
    if (document.URL.search('updateIndividualInformation') > 1 && document.URL.search('updateIndividualInformationApprove') < 0)
        scriptLoader('operation/updateIndividualInformation');

    if (document.URL.search('updateIndividualInformationApprove') > 1)
        scriptLoader('operation/updateIndividualInformationApprove');

    // updateIndividualResubmission
    if (document.URL.search('updateIndividualInformationResubmission') > 1)
        scriptLoader('operation/updateIndividualInformationResubmission');

    // updatePresentAddress
    if (document.URL.search('updatePresentAddress') > 1)
        scriptLoader('operation/updatePresentAddress');

    // relationship certificate
    if (document.URL.search('relationshipCertificate') > 1)
        scriptLoader('operation/relationshipCertificate');

    if (document.URL.search('householdInformation') > 1)
        scriptLoader('operation/householdInformation');

    if (document.URL.search('nameDateOfBirthChange') > 1)
        scriptLoader('operation/nameDateOfBirthChange');

    if (document.URL.search('nameDateOfBirthChangeApprove') > 1)
        scriptLoader('operation/nameDateOfBirthChangeApprove');

    //Resubmission updatenameDOB
    if (document.URL.search('nameDateOfBirthChangeResubmission') > 1)
        scriptLoader('operation/nameDateOfBirthChangeResubmission');

    // Update Census Status
    if (document.URL.search('updateCensusStatus') > 1 && document.URL.search('updateCensusStatusApprove') < 0)
        scriptLoader('operation/updateCensusStatus');

    if (document.URL.search('updateCensusStatusApprove') > 1)
        scriptLoader('operation/updateCensusStatusApprove');

    if (document.URL.search('individualInformationIssuance') > 1)
        scriptLoader('operation/individualInformationIssuance');

    if (document.URL.search('newCIDIssuance') > 1)
        scriptLoader('operation/newCIDIssuance');

    if (document.URL.search('newCIDIssuanceApprove') > 1)
        scriptLoader('operation/newCIDIssuanceApprove');


    if (document.URL.search('newCIDIssuanceResubmission') > 1)
        scriptLoader('operation/newCIDIssuanceResubmission');

    if (document.URL.search('naturalization') > 1)
        scriptLoader('operation/naturalization');

    if (document.URL.search('naturalizationApprove') > 1)
        scriptLoader('operation/naturalizationApprove');

    if (document.URL.search('deathRegistrationApply') > 1)
        scriptLoader('operation/deathRegistrationApply');

    if (document.URL.search('deathRegistrationApprove') > 1)
        scriptLoader('operation/deathRegistrationApprove');

    if (document.URL.search('deathRegistration') > 1 && document.URL.search('deathRegistrationNonBhutanese') < 0)
        scriptLoader('operation/deathRegistration');

//new death registrationstart from here

    if (document.URL.search('publicDeathRegistration') > 1)
        scriptLoader('operation/publicDeathRegistration');

    if (document.URL.search('publicDeathRegistrationApprove') > 1)
        scriptLoader('operation/publicDeathRegistrationApprove');

    if (document.URL.search('publicTaskList') > 1)
        scriptLoader('operation/publicTaskList');

    //if (document.URL.search('publicDeathRegistration') > 1)
    //    scriptLoader('operation/deathRegistration');

    if (document.URL.search('deathRegistrationNonBhutanese') > 1)
        scriptLoader('operation/deathRegistrationNonBhutanese');

    // Birth Registration
    if (document.URL.search('birthRegistrationApply') > 1)
        scriptLoader('operation/birthRegistrationApply');

    if (document.URL.search('birthRegistration') > 1)
        scriptLoader('operation/birthRegistration');

    if (document.URL.search('birthRegistrationVerify1') > 1)
        scriptLoader('operation/birthRegistrationVerify1');

    // Public Birth Registration
    if (document.URL.search('publicBirthRegistrationApply') > 1)
        scriptLoader('operation/publicBirthRegistrationApply');

    if (document.URL.search('publicBirthRegistration') > 1)
        scriptLoader('operation/publicBirthRegistration');

    //BR Resubmission
    if (document.URL.search('birthRegistrationResubmission') > 1)
        scriptLoader('operation/resubmissionBR/birthRegistrationResubmission');

    // Census Transfer
    if (document.URL.search('censusTransferApply') > 1)
        scriptLoader('operation/censusTransferApply');

    if (document.URL.search('censusTransfer') > 1 && document.URL.search('censusTransferApply') < 0)
        scriptLoader('operation/censusTransfer');

    if (document.URL.search('censusTransferApprove') > 1)
        scriptLoader('operation/censusTransferApprove');

    /*replacement of CID card*/
    if (document.URL.search('replacementOfCIDCard') > 1)
        scriptLoader('operation/replacementOfCIDCard');

    if (document.URL.search('replacementOfCIDcardApprove') > 1)
        scriptLoader('operation/replacementOfCIDcardApprove');


    if (document.URL.search('replacementOfCIDCardResubmission') > 1)
        scriptLoader('operation/replacementOfCIDCardResubmission');
    /*endregion*/

    /*taskList*/
    if (document.URL.search('taskList') > 1)
        scriptLoader('operation/taskList');
    //endregion

    //region Report screen

    /*if (document.URL.search('searchCitizen') > 1)
        scriptLoader('report/searchCitizen');
*/
    if (document.URL.search('searchCitizenApply') > 1)
        scriptLoader('report/searchCitizenApply');

    //if (document.URL.search('ndiCitizenImage') > 1)
    //    scriptLoader('operation/ndiCitizenImage');

    if (document.URL.search('searchCitizenByGup') > 1)
        scriptLoader('report/searchCitizenByGup');

    if (document.URL.search('viewStatus') > 1)
        scriptLoader('report/viewStatus');

    if (document.URL.search('searchApplicationHistory') > 1)
        scriptLoader('report/searchApplicationHistory');

    if (document.URL.search('managementAction') > 1)
        scriptLoader('report/managementAction');

    if (document.URL.search('showReports') > 1)
        scriptLoader('report/showReports');
    //endregion
});

var scriptLoader = function (url) {
   //url = '/dcrc/resources/js/' + url + '.js';
     url = '/resources/js/' + url + '.js';
    $.ajax({
        type: "GET",
        url: url,
        dataType: "script",
        cache: false
    });
};
