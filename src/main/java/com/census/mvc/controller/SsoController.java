package com.census.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/sso")
public class SsoController {

    /**
     * SSO Service logout service
     * @param request
     * @param session
     * @return LOGOUT from SSO
     */
    @RequestMapping(value = "/oidclogout", method = RequestMethod.GET)
    public String oidcLogout(HttpServletRequest request, HttpSession session){
        session.invalidate();
        String redirectUrl = request.getScheme() + "://www.citizenservices.gov.bt";
        return "redirect:" + redirectUrl;

    }
}