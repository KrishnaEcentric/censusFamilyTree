package com.census.mvc.service;

import com.census.mvc.dao.FamilyTreeDao;
import com.census.mvc.dto.FamilyTreeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by User on 11/14/2022.
 */
@Service
public class FamilyTreeService {
    @Autowired
    private FamilyTreeDao familyTreeDao;

    /**
     * Gets Household number from entered CID
     * @param cidNo
     * @return household number
     */
    public String getHousehold(String cidNo) {
        return familyTreeDao.getHousehold(cidNo);
    }

    /**
     * Get common details like houseNo, village, gewog and dzongkhag
     * @param cidNo
     * @return details
     */
    public FamilyTreeDto  getCommonDetails(String cidNo) {
        return familyTreeDao.getCommonDetails(cidNo);
    }

    /**
     * Gets family tree details from household number
     * @param permanentHouseholdNo
     * @return family lists
     */
    public List<FamilyTreeDto> getFamilyTree(String permanentHouseholdNo) {
        return familyTreeDao.getFamilyTree(permanentHouseholdNo);
    }



}
