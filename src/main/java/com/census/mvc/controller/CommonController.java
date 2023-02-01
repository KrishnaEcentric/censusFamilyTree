package com.census.mvc.controller;


import com.census.mvc.dto.FamilyTreeDto;
import com.census.mvc.service.FamilyTreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/")
public class CommonController {
    @Autowired
    FamilyTreeService familyTreeService;

    /**
     * Redirects to family tree page after SSO Login
     * @return redirects to /getFamilyTree
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.HEAD})
	public String index() {
		return "login";
	}


    /**
     * Accepts CID No from client and returns his/her family tree
     * @param cidNo
     * @param request
     * @return family tree List
     */
    @RequestMapping(value = "/getFamilyTree", method = RequestMethod.GET)
    public String cidLogin(String cidNo, HttpServletRequest request) {
            String permanentHouseholdNo = familyTreeService.getHousehold(cidNo);
            FamilyTreeDto getCommonDetails = familyTreeService.getCommonDetails(cidNo);
            request.setAttribute("getCommonDetails", getCommonDetails);
            List<FamilyTreeDto> getFamilyTree = familyTreeService.getFamilyTree(permanentHouseholdNo);
            request.setAttribute("getFamilyTree", getFamilyTree);
            return "familyTree";
    }
}
