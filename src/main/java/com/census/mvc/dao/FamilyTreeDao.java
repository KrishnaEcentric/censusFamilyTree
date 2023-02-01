package com.census.mvc.dao;

import com.census.mvc.baseDao.CommonBaseDao;
import com.census.mvc.dto.FamilyTreeDto;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by User on 11/14/2022.
 */
@Repository
public class FamilyTreeDao extends CommonBaseDao {

    /**
     * Gets household number from Database based on Cid entered
     * @param cidNo
     * @return household number
     */
    @Transactional
    public String getHousehold(String cidNo) {
        String houseHold = "";
        String sqlQuery ="SELECT \n" +
                "  a.Present_HouseHold_No \n" +
                "FROM\n" +
                "  t_citizen_master a \n" +
                "WHERE a.CID_Number = ?";
        org.hibernate.Query hQuery = hibernateQuery(sqlQuery)
                .setParameter(1, cidNo);
        houseHold=(String) hQuery.uniqueResult();
        return houseHold;
    }

    /**
     * Get common details like houseNo, village, gewog and dzongkhag
     * @param cidNo
     * @return details
     */
    @Transactional
    public FamilyTreeDto getCommonDetails(String cidNo) {
        FamilyTreeDto commonDetails = new FamilyTreeDto();

        String sql ="SELECT \n" +
                "  a.Present_HouseHold_No presentHouseHoldNo,\n" +
                "  b.House_No presentHouseNo,\n" +
                "  vill.Village_Name village,\n" +
                "  gew.Gewog_Name gewog,\n" +
                "  dzo.Dzongkhag_Name dzongkhag \n" +
                "FROM\n" +
                "  t_citizen_master a \n" +
                "  LEFT JOIN t_household b \n" +
                "    ON a.Present_HouseHold_No = b.HH_No \n" +
                "  LEFT JOIN t_application c \n" +
                "    ON a.CID_Number = c.CID_Number \n" +
                "  LEFT JOIN t_village_lookup vill \n" +
                "    ON b.Village_Serial_No = vill.Village_Serial_No \n" +
                "  LEFT JOIN t_gewog_lookup gew \n" +
                "    ON vill.Gewog_Serial_No = gew.Gewog_Serial_No \n" +
                "  LEFT JOIN t_dzongkhag_lookup dzo \n" +
                "    ON gew.Dzongkhag_Serial_No = dzo.Dzongkhag_Serial_No \n" +
                "WHERE a.CID_Number = ? \n" +
                "  AND vill.Village_Serial_No IS NOT NULL \n" +
                "LIMIT 1";
        Query query = sqlQuery(sql, FamilyTreeDto.class)
                .setParameter(1, cidNo);
        commonDetails = (FamilyTreeDto) query.list().get(0);

        return commonDetails;
    }

    /**
     * Gets family tree list based on household number
     * @param permanentHouseholdNo
     * @return family tree list
     */
    @Transactional
    public List<FamilyTreeDto> getFamilyTree(String permanentHouseholdNo) {
        List<FamilyTreeDto> familyTree = new ArrayList<FamilyTreeDto>();
        String sql = "SELECT \n" +
                "  CONCAT(\n" +
                "    a.First_Name,\n" +
                "    ' ',\n" +
                "    CASE\n" +
                "      WHEN a.Middle_Name IS NULL \n" +
                "      THEN '' \n" +
                "      ELSE a.Middle_Name \n" +
                "    END,\n" +
                "    ' ',\n" +
                "    CASE\n" +
                "      WHEN a.Last_Name IS NULL \n" +
                "      THEN '' \n" +
                "      ELSE a.Last_Name \n" +
                "    END\n" +
                "  ) firstName,\n" +
                "  a.CID_Number cidNo,\n" +
                "  CASE\n" +
                "    WHEN a.Gender = 'M' \n" +
                "    THEN 'Male' \n" +
                "    ELSE 'Female' \n" +
                "  END AS gender,\n" +
                "  a.Father_CID_No fatherCidNo,\n" +
                "  a.Mother_CID_No motherCidNo,\n" +
                "  relation.Relation hohRelation,\n" +
                "  CASE\n" +
                "    WHEN a.Person_Status = 'A' \n" +
                "    THEN 'Active' \n" +
                "    WHEN a.Person_Status = 'D' \n" +
                "    THEN 'Deceased' \n" +
                "  END AS personStatus,\n" +
                "  m.Marital_Desc maritalDesc,\n" +
                "  CASE\n" +
                "    WHEN a.Person_Status = 'D' \n" +
                "    THEN NULL \n" +
                "    ELSE CAST(\n" +
                "      TRUNCATE(\n" +
                "        DATEDIFF(CURRENT_TIMESTAMP, a.DOB) / 365.25,\n" +
                "        0\n" +
                "      ) AS INT\n" +
                "    ) \n" +
                "  END AS age \n" +
                "FROM\n" +
                "  t_citizen_master a \n" +
                "  LEFT JOIN t_household b \n" +
                "    ON a.Present_HouseHold_No = b.HH_No \n" +
                "  LEFT JOIN t_relation relation \n" +
                "    ON a.HoH_Relation = relation.Relation_Id \n" +
                "  LEFT JOIN t_marital_status_master m \n" +
                "    ON a.Marital_Status_Id = m.Marital_Status_Id \n" +
                "WHERE a.Present_HouseHold_No = ? \n" +
                "  AND a.Person_Status NOT IN ('T', 'M', 'R') \n" +
                "GROUP BY a.CID_number ";

        Query query = sqlQuery(sql, FamilyTreeDto.class)
                .setParameter(1, permanentHouseholdNo);

        familyTree = query.list();

        return familyTree;
    }



}
