package com.census.mvc.dto;

import java.util.Date;

public class FamilyTreeDto {

    private String cidNo;
    private String applicationNo;
    private Integer requestServiceID;
    private Integer cidUpdateCount;
    private String cidSerialNo;
    private Integer censusStatusID;
    private Integer newCensusStatusID;
    private String oldCidNo;
    private String citizenType;
    private String citizenBy;
    private String personStatus;
    private String activeTag;
    private Integer titleID;
    private String firstName;
    private String firstNameBh;
    private String middleName;
    private String middleNameBh;
    private String lastName;
    private String lastNameBh;
    private String gender;
    private String genderBh;
    private Date dob;
    private String mobileNumber;
    private String dateOfBirth;
    private String emailID;
    private String mailingAddress;
    private String identificationMark;
    private String fatherCidNo;
    private String motherCidNo;
    private Date firstIssuedDate;
    private Date expiryDate;
    private String hohRelation;
    private Integer maritalStatusID;
    private String maritaStatus;
    private String maritaStatusBh;
    private Integer disabilityID;
    private Integer presentVillageSerialNo;
    private String presentHouseHoldNo;
    private String presentHouseNo;
    private String presentThramNo;
    private Date geogRegDate;
    private Date recordDate;
    private String birthTime;
    private String birthRegistrationNo;
    private String deathRegistrationNo;
    private String presentOtherPlace;
    private String disabilityName;
    private String hohRelationDesc;
    private String maritalDesc;
    private String censusStatusDesc;
    private String juriTypeID;
    private Integer applicationFee;
    private Integer serviceFee;
    private Integer spouseCount;
    private String personStatusDesc;
    private Integer age;
    private Integer nationalityID;
    private String nationalityDesc;
    private String date_of_birth;
    private String relation;
    private String birthWeight;
    private String bloodGroup;
    private String placeOfBirth;
    private Integer dzongkhagOfBirth;
    private Integer gewogOfBirth;
    private Integer villageOfBirth;
    private Integer countryOfBirth;
    private String countryOfBirthName;
    private String villageOfBirthName;
    private String gewogOfBirthName;
    private String dzongkhagOfBirthName;
    private String occupationDesc;
    private String religionDesc;
    private String educationDesc;
    private String motherTongueDesc;
    private String zodiacName;
    private String lastCIDissueDate;
    private String lastCIDexpiryDate;
    private String adverseRecord;
    private Integer villageOfBirthId;
    private Integer permanentVillageSerialNo;
    private String fatherCIDNO;
    private String motherCIDNo;
    private String remarks;
    private String dzongkhag;
    private String gewog;
    private String village;


    private String fatherApplicationNo;
    private String fatherFirstName;
    private String fatherFirstNameBh;
    private String fatherMiddleName;
    private String fatherMiddleNameBh;
    private String fatherLastName;
    private String fatherLastNameBh;
    private String fatherPresentHouseholdNo;
    private String fatherThramNo;
    private String fatherHouseholdNo;
    private String fatherHouseNo;
    private String fatherVillageName;
    private String fatherGewogName;
    private String fatherDzongkhagName;
    private Integer fatherVillageSerialNo;
    private String fatherNationalityDesc;
    private Integer fatherNationalityID;
    private String fatherCitizenBy;

    private String motherFirstName;
    private String motherFirstNameBh;
    private String motherMiddleName;
    private String motherMiddleNameBh;
    private String motherLastName;
    private String motherLastNameBh;
    private String motherPresentHouseholdNo;
    private String motherThramNo;
    private String motherHouseholdNo;
    private String motherHouseNo;
    private String motherVillageName;
    private String motherGewogName;
    private String motherDzongkhagName;
    private Integer motherVillageSerialNo;
    private String motherNationalityDesc;
    private Integer motherNationalityID;
    private String motherCitizenBy;
    private String presentCountryName;
    private String processedFrom;

    public String getCidNo() {
        return cidNo;
    }

    public void setCidNo(String cidNo) {
        this.cidNo = cidNo;
    }

    public String getApplicationNo() {
        return applicationNo;
    }

    public void setApplicationNo(String applicationNo) {
        this.applicationNo = applicationNo;
    }

    public Integer getRequestServiceID() {
        return requestServiceID;
    }

    public void setRequestServiceID(Integer requestServiceID) {
        this.requestServiceID = requestServiceID;
    }

    public Integer getCidUpdateCount() {
        return cidUpdateCount;
    }

    public void setCidUpdateCount(Integer cidUpdateCount) {
        this.cidUpdateCount = cidUpdateCount;
    }

    public String getCidSerialNo() {
        return cidSerialNo;
    }

    public void setCidSerialNo(String cidSerialNo) {
        this.cidSerialNo = cidSerialNo;
    }

    public Integer getCensusStatusID() {
        return censusStatusID;
    }

    public void setCensusStatusID(Integer censusStatusID) {
        this.censusStatusID = censusStatusID;
    }

    public Integer getNewCensusStatusID() {
        return newCensusStatusID;
    }

    public void setNewCensusStatusID(Integer newCensusStatusID) {
        this.newCensusStatusID = newCensusStatusID;
    }

    public String getOldCidNo() {
        return oldCidNo;
    }

    public void setOldCidNo(String oldCidNo) {
        this.oldCidNo = oldCidNo;
    }

    public String getCitizenType() {
        return citizenType;
    }

    public void setCitizenType(String citizenType) {
        this.citizenType = citizenType;
    }

    public String getPersonStatus() {
        return personStatus;
    }

    public void setPersonStatus(String personStatus) {
        this.personStatus = personStatus;
    }

    public String getActiveTag() {
        return activeTag;
    }

    public void setActiveTag(String activeTag) {
        this.activeTag = activeTag;
    }

    public Integer getTitleID() {
        return titleID;
    }

    public void setTitleID(Integer titleID) {
        this.titleID = titleID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstNameBh() {
        return firstNameBh;
    }

    public void setFirstNameBh(String firstNameBh) {
        this.firstNameBh = firstNameBh;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getMiddleNameBh() {
        return middleNameBh;
    }

    public void setMiddleNameBh(String middleNameBh) {
        this.middleNameBh = middleNameBh;
    }

    public String getAdverseRecord() {
        return adverseRecord;
    }

    public void setAdverseRecord(String adverseRecord) {
        this.adverseRecord = adverseRecord;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastNameBh() {
        return lastNameBh;
    }

    public void setLastNameBh(String lastNameBh) {
        this.lastNameBh = lastNameBh;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGenderBh() {
        return genderBh;
    }

    public void setGenderBh(String genderBh) {
        this.genderBh = genderBh;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmailID() {
        return emailID;
    }

    public void setEmailID(String emailID) {
        this.emailID = emailID;
    }

    public String getMailingAddress() {
        return mailingAddress;
    }

    public void setMailingAddress(String mailingAddress) {
        this.mailingAddress = mailingAddress;
    }

    public String getIdentificationMark() {
        return identificationMark;
    }

    public void setIdentificationMark(String identificationMark) {
        this.identificationMark = identificationMark;
    }

    public String getFatherCidNo() {
        return fatherCidNo;
    }

    public void setFatherCidNo(String fatherCidNo) {
        this.fatherCidNo = fatherCidNo;
    }

    public String getMotherCidNo() {
        return motherCidNo;
    }

    public void setMotherCidNo(String motherCidNo) {
        this.motherCidNo = motherCidNo;
    }

    public Date getFirstIssuedDate() {
        return firstIssuedDate;
    }

    public void setFirstIssuedDate(Date firstIssuedDate) {
        this.firstIssuedDate = firstIssuedDate;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getHohRelation() {
        return hohRelation;
    }

    public void setHohRelation(String hohRelation) {
        this.hohRelation = hohRelation;
    }

    public Integer getMaritalStatusID() {
        return maritalStatusID;
    }

    public void setMaritalStatusID(Integer maritalStatusID) {
        this.maritalStatusID = maritalStatusID;
    }

    public String getMaritaStatus() {
        return maritaStatus;
    }

    public void setMaritaStatus(String maritaStatus) {
        this.maritaStatus = maritaStatus;
    }

    public String getMaritaStatusBh() {
        return maritaStatusBh;
    }

    public void setMaritaStatusBh(String maritaStatusBh) {
        this.maritaStatusBh = maritaStatusBh;
    }

    public Integer getDisabilityID() {
        return disabilityID;
    }

    public void setDisabilityID(Integer disabilityID) {
        this.disabilityID = disabilityID;
    }

    public Integer getPresentVillageSerialNo() {
        return presentVillageSerialNo;
    }

    public void setPresentVillageSerialNo(Integer presentVillageSerialNo) {
        this.presentVillageSerialNo = presentVillageSerialNo;
    }

    public String getPresentHouseHoldNo() {
        return presentHouseHoldNo;
    }

    public void setPresentHouseHoldNo(String presentHouseHoldNo) {
        this.presentHouseHoldNo = presentHouseHoldNo;
    }

    public String getPresentHouseNo() {
        return presentHouseNo;
    }

    public void setPresentHouseNo(String presentHouseNo) {
        this.presentHouseNo = presentHouseNo;
    }

    public String getPresentThramNo() {
        return presentThramNo;
    }

    public void setPresentThramNo(String presentThramNo) {
        this.presentThramNo = presentThramNo;
    }

    public Date getGeogRegDate() {
        return geogRegDate;
    }

    public void setGeogRegDate(Date geogRegDate) {
        this.geogRegDate = geogRegDate;
    }

    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }

    public String getBirthTime() {
        return birthTime;
    }

    public void setBirthTime(String birthTime) {
        this.birthTime = birthTime;
    }

    public String getBirthRegistrationNo() {
        return birthRegistrationNo;
    }

    public void setBirthRegistrationNo(String birthRegistrationNo) {
        this.birthRegistrationNo = birthRegistrationNo;
    }

    public String getDeathRegistrationNo() {
        return deathRegistrationNo;
    }

    public void setDeathRegistrationNo(String deathRegistrationNo) {
        this.deathRegistrationNo = deathRegistrationNo;
    }

    public String getPresentOtherPlace() {
        return presentOtherPlace;
    }

    public void setPresentOtherPlace(String presentOtherPlace) {
        this.presentOtherPlace = presentOtherPlace;
    }

    public String getDisabilityName() {
        return disabilityName;
    }

    public void setDisabilityName(String disabilityName) {
        this.disabilityName = disabilityName;
    }

    public String getHohRelationDesc() {
        return hohRelationDesc;
    }

    public void setHohRelationDesc(String hohRelationDesc) {
        this.hohRelationDesc = hohRelationDesc;
    }

    public String getMaritalDesc() {
        return maritalDesc;
    }

    public void setMaritalDesc(String maritalDesc) {
        this.maritalDesc = maritalDesc;
    }

    public String getCensusStatusDesc() {
        return censusStatusDesc;
    }

    public void setCensusStatusDesc(String censusStatusDesc) {
        this.censusStatusDesc = censusStatusDesc;
    }

    public String getJuriTypeID() {
        return juriTypeID;
    }

    public void setJuriTypeID(String juriTypeID) {
        this.juriTypeID = juriTypeID;
    }

    public String getPersonStatusDesc() {
        return personStatusDesc;
    }

    public void setPersonStatusDesc(String personStatusDesc) {
        this.personStatusDesc = personStatusDesc;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getNationalityID() {
        return nationalityID;
    }

    public void setNationalityID(Integer nationalityID) {
        this.nationalityID = nationalityID;
    }

    public String getNationalityDesc() {
        return nationalityDesc;
    }

    public void setNationalityDesc(String nationalityDesc) {
        this.nationalityDesc = nationalityDesc;
    }



    public Integer getApplicationFee() {
        return applicationFee;
    }

    public void setApplicationFee(Integer applicationFee) {
        this.applicationFee = applicationFee;
    }

    public Integer getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(Integer serviceFee) {
        this.serviceFee = serviceFee;
    }

    public Integer getSpouseCount() {
        return spouseCount;
    }

    public void setSpouseCount(Integer spouseCount) {
        this.spouseCount = spouseCount;
    }


    public String getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getBirthWeight() {
        return birthWeight;
    }

    public void setBirthWeight(String birthWeight) {
        this.birthWeight = birthWeight;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getCountryOfBirthName() {
        return countryOfBirthName;
    }

    public void setCountryOfBirthName(String countryOfBirthName) {
        this.countryOfBirthName = countryOfBirthName;
    }


    public void setVillageOfBirthName(String villageOfBirthName) {
        this.villageOfBirthName = villageOfBirthName;
    }

    public String getGewogOfBirthName() {
        return gewogOfBirthName;
    }

    public void setGewogOfBirthName(String gewogOfBirthName) {
        this.gewogOfBirthName = gewogOfBirthName;
    }

    public String getDzongkhagOfBirthName() {
        return dzongkhagOfBirthName;
    }

    public void setDzongkhagOfBirthName(String dzongkhagOfBirthName) {
        this.dzongkhagOfBirthName = dzongkhagOfBirthName;
    }

    public String getOccupationDesc() {
        return occupationDesc;
    }

    public void setOccupationDesc(String occupationDesc) {
        this.occupationDesc = occupationDesc;
    }

    public String getReligionDesc() {
        return religionDesc;
    }

    public void setReligionDesc(String religionDesc) {
        this.religionDesc = religionDesc;
    }

    public String getEducationDesc() {
        return educationDesc;
    }

    public void setEducationDesc(String educationDesc) {
        this.educationDesc = educationDesc;
    }

    public String getMotherTongueDesc() {
        return motherTongueDesc;
    }

    public void setMotherTongueDesc(String motherTongueDesc) {
        this.motherTongueDesc = motherTongueDesc;
    }

    public String getZodiacName() {
        return zodiacName;
    }

    public void setZodiacName(String zodiacName) {
        this.zodiacName = zodiacName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getVillageOfBirthId() {
        return villageOfBirthId;
    }

    public void setVillageOfBirthId(Integer villageOfBirthId) {
        this.villageOfBirthId = villageOfBirthId;
    }

    public Integer getPermanentVillageSerialNo() {
        return permanentVillageSerialNo;
    }

    public void setPermanentVillageSerialNo(Integer permanentVillageSerialNo) {
        this.permanentVillageSerialNo = permanentVillageSerialNo;
    }

    public String getLastCIDissueDate() {
        return lastCIDissueDate;
    }

    public void setLastCIDissueDate(String lastCIDissueDate) {
        this.lastCIDissueDate = lastCIDissueDate;
    }

    public String getLastCIDexpiryDate() {
        return lastCIDexpiryDate;
    }

    public void setLastCIDexpiryDate(String lastCIDexpiryDate) {
        this.lastCIDexpiryDate = lastCIDexpiryDate;
    }

    public String getCitizenBy() {
        return citizenBy;
    }

    public void setCitizenBy(String citizenBy) {
        this.citizenBy = citizenBy;
    }


    public Integer getDzongkhagOfBirth() {
        return dzongkhagOfBirth;
    }

    public void setDzongkhagOfBirth(Integer dzongkhagOfBirth) {
        this.dzongkhagOfBirth = dzongkhagOfBirth;
    }

    public Integer getGewogOfBirth() {
        return gewogOfBirth;
    }

    public void setGewogOfBirth(Integer gewogOfBirth) {
        this.gewogOfBirth = gewogOfBirth;
    }

    public Integer getVillageOfBirth() {
        return villageOfBirth;
    }

    public void setVillageOfBirth(Integer villageOfBirth) {
        this.villageOfBirth = villageOfBirth;
    }

    public Integer getCountryOfBirth() {
        return countryOfBirth;
    }

    public void setCountryOfBirth(Integer countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public String getFatherCIDNO() {
        return fatherCIDNO;
    }

    public void setFatherCIDNO(String fatherCIDNO) {
        this.fatherCIDNO = fatherCIDNO;
    }

    public String getMotherCIDNo() {
        return motherCIDNo;
    }

    public void setMotherCIDNo(String motherCIDNo) {
        this.motherCIDNo = motherCIDNo;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getFatherApplicationNo() {
        return fatherApplicationNo;
    }

    public void setFatherApplicationNo(String fatherApplicationNo) {
        this.fatherApplicationNo = fatherApplicationNo;
    }

    public String getFatherFirstName() {
        return fatherFirstName;
    }

    public void setFatherFirstName(String fatherFirstName) {
        this.fatherFirstName = fatherFirstName;
    }

    public String getFatherFirstNameBh() {
        return fatherFirstNameBh;
    }

    public void setFatherFirstNameBh(String fatherFirstNameBh) {
        this.fatherFirstNameBh = fatherFirstNameBh;
    }

    public String getFatherMiddleName() {
        return fatherMiddleName;
    }

    public void setFatherMiddleName(String fatherMiddleName) {
        this.fatherMiddleName = fatherMiddleName;
    }

    public String getFatherMiddleNameBh() {
        return fatherMiddleNameBh;
    }

    public void setFatherMiddleNameBh(String fatherMiddleNameBh) {
        this.fatherMiddleNameBh = fatherMiddleNameBh;
    }

    public String getFatherLastName() {
        return fatherLastName;
    }

    public void setFatherLastName(String fatherLastName) {
        this.fatherLastName = fatherLastName;
    }

    public String getFatherLastNameBh() {
        return fatherLastNameBh;
    }

    public void setFatherLastNameBh(String fatherLastNameBh) {
        this.fatherLastNameBh = fatherLastNameBh;
    }

    public String getFatherPresentHouseholdNo() {
        return fatherPresentHouseholdNo;
    }

    public void setFatherPresentHouseholdNo(String fatherPresentHouseholdNo) {
        this.fatherPresentHouseholdNo = fatherPresentHouseholdNo;
    }

    public String getFatherThramNo() {
        return fatherThramNo;
    }

    public void setFatherThramNo(String fatherThramNo) {
        this.fatherThramNo = fatherThramNo;
    }

    public String getFatherHouseholdNo() {
        return fatherHouseholdNo;
    }

    public void setFatherHouseholdNo(String fatherHouseholdNo) {
        this.fatherHouseholdNo = fatherHouseholdNo;
    }

    public String getFatherHouseNo() {
        return fatherHouseNo;
    }

    public void setFatherHouseNo(String fatherHouseNo) {
        this.fatherHouseNo = fatherHouseNo;
    }

    public String getFatherVillageName() {
        return fatherVillageName;
    }

    public void setFatherVillageName(String fatherVillageName) {
        this.fatherVillageName = fatherVillageName;
    }

    public String getFatherGewogName() {
        return fatherGewogName;
    }

    public void setFatherGewogName(String fatherGewogName) {
        this.fatherGewogName = fatherGewogName;
    }

    public String getFatherDzongkhagName() {
        return fatherDzongkhagName;
    }

    public void setFatherDzongkhagName(String fatherDzongkhagName) {
        this.fatherDzongkhagName = fatherDzongkhagName;
    }

    public Integer getFatherVillageSerialNo() {
        return fatherVillageSerialNo;
    }

    public void setFatherVillageSerialNo(Integer fatherVillageSerialNo) {
        this.fatherVillageSerialNo = fatherVillageSerialNo;
    }

    public String getFatherNationalityDesc() {
        return fatherNationalityDesc;
    }

    public void setFatherNationalityDesc(String fatherNationalityDesc) {
        this.fatherNationalityDesc = fatherNationalityDesc;
    }

    public Integer getFatherNationalityID() {
        return fatherNationalityID;
    }

    public void setFatherNationalityID(Integer fatherNationalityID) {
        this.fatherNationalityID = fatherNationalityID;
    }

    public String getFatherCitizenBy() {
        return fatherCitizenBy;
    }

    public void setFatherCitizenBy(String fatherCitizenBy) {
        this.fatherCitizenBy = fatherCitizenBy;
    }

    public String getMotherFirstName() {
        return motherFirstName;
    }

    public void setMotherFirstName(String motherFirstName) {
        this.motherFirstName = motherFirstName;
    }

    public String getMotherFirstNameBh() {
        return motherFirstNameBh;
    }

    public void setMotherFirstNameBh(String motherFirstNameBh) {
        this.motherFirstNameBh = motherFirstNameBh;
    }

    public String getMotherMiddleName() {
        return motherMiddleName;
    }

    public void setMotherMiddleName(String motherMiddleName) {
        this.motherMiddleName = motherMiddleName;
    }

    public String getMotherMiddleNameBh() {
        return motherMiddleNameBh;
    }

    public void setMotherMiddleNameBh(String motherMiddleNameBh) {
        this.motherMiddleNameBh = motherMiddleNameBh;
    }

    public String getMotherLastName() {
        return motherLastName;
    }

    public void setMotherLastName(String motherLastName) {
        this.motherLastName = motherLastName;
    }

    public String getMotherLastNameBh() {
        return motherLastNameBh;
    }

    public void setMotherLastNameBh(String motherLastNameBh) {
        this.motherLastNameBh = motherLastNameBh;
    }

    public String getMotherPresentHouseholdNo() {
        return motherPresentHouseholdNo;
    }

    public void setMotherPresentHouseholdNo(String motherPresentHouseholdNo) {
        this.motherPresentHouseholdNo = motherPresentHouseholdNo;
    }

    public String getMotherThramNo() {
        return motherThramNo;
    }

    public void setMotherThramNo(String motherThramNo) {
        this.motherThramNo = motherThramNo;
    }

    public String getMotherHouseholdNo() {
        return motherHouseholdNo;
    }

    public void setMotherHouseholdNo(String motherHouseholdNo) {
        this.motherHouseholdNo = motherHouseholdNo;
    }

    public String getMotherHouseNo() {
        return motherHouseNo;
    }

    public void setMotherHouseNo(String motherHouseNo) {
        this.motherHouseNo = motherHouseNo;
    }

    public String getMotherVillageName() {
        return motherVillageName;
    }

    public void setMotherVillageName(String motherVillageName) {
        this.motherVillageName = motherVillageName;
    }

    public String getMotherGewogName() {
        return motherGewogName;
    }

    public void setMotherGewogName(String motherGewogName) {
        this.motherGewogName = motherGewogName;
    }

    public String getMotherDzongkhagName() {
        return motherDzongkhagName;
    }

    public void setMotherDzongkhagName(String motherDzongkhagName) {
        this.motherDzongkhagName = motherDzongkhagName;
    }

    public Integer getMotherVillageSerialNo() {
        return motherVillageSerialNo;
    }

    public void setMotherVillageSerialNo(Integer motherVillageSerialNo) {
        this.motherVillageSerialNo = motherVillageSerialNo;
    }

    public String getMotherNationalityDesc() {
        return motherNationalityDesc;
    }

    public void setMotherNationalityDesc(String motherNationalityDesc) {
        this.motherNationalityDesc = motherNationalityDesc;
    }

    public Integer getMotherNationalityID() {
        return motherNationalityID;
    }

    public void setMotherNationalityID(Integer motherNationalityID) {
        this.motherNationalityID = motherNationalityID;
    }

    public String getMotherCitizenBy() {
        return motherCitizenBy;
    }

    public void setMotherCitizenBy(String motherCitizenBy) {
        this.motherCitizenBy = motherCitizenBy;
    }

    public String getPresentCountryName() {
        return presentCountryName;
    }

    public void setPresentCountryName(String presentCountryName) {
        this.presentCountryName = presentCountryName;
    }

    public String getProcessedFrom() {
        return processedFrom;
    }

    public void setProcessedFrom(String processedFrom) {
        this.processedFrom = processedFrom;
    }

    public String getVillageOfBirthName() {
        return villageOfBirthName;
    }

    public String getDzongkhag() {
        return dzongkhag;
    }

    public void setDzongkhag(String dzongkhag) {
        this.dzongkhag = dzongkhag;
    }

    public String getGewog() {
        return gewog;
    }

    public void setGewog(String gewog) {
        this.gewog = gewog;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }
}
