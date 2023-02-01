<%@page import="bt.gov.ditt.sso.client.SSOClientConstants"%>
<%@page import="bt.gov.ditt.sso.client.dto.UserSessionDetailDTO"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>OpenID Connect Session Management RP IFrame</title>
    <%
        UserSessionDetailDTO userSessionDetailDTO=null;
        String iframeURL =null;
        if((UserSessionDetailDTO)request.getSession().getAttribute(SSOClientConstants.SSO_SESSION_OBJ_KEY)!=null){
            userSessionDetailDTO = (UserSessionDetailDTO)request.getSession().getAttribute(SSOClientConstants.SSO_SESSION_OBJ_KEY);
            iframeURL = userSessionDetailDTO.getOAuth2Client().getCheckSessionEndpoint() +
                    "?client_id=" + userSessionDetailDTO.getOAuth2Client().getConsumerKey()+"&redirect_uri="
                    +userSessionDetailDTO.getOAuth2Client().getAuthorizationCallback();
            System.out.println("key:"+ iframeURL);
        }
    %>

    <script type="text/javascript">+
    var stat = "unchanged";
    var client_id="";
    var session_state ="";
    var clientId ="";
    var scope ="";
    <% if((UserSessionDetailDTO)request.getSession().getAttribute(SSOClientConstants.SSO_SESSION_OBJ_KEY)!=null){%>
    client_id = '<%=userSessionDetailDTO.getOAuth2Client().getConsumerKey()%>';
    session_state = '<%=userSessionDetailDTO.getSessionState()%>';
    clientId = '<%=userSessionDetailDTO.getOAuth2Client().getConsumerKey()%>';
    scope = '<%=userSessionDetailDTO.getOAuth2Client().getScope()%>';
    <%}%>

    var mes = client_id + " " + session_state;
    var targetOrigin = '<%=iframeURL%>';
    var authorizationEndpoint = '<%=request.getContextPath()%>/sso/reauthenticate?redirect_to=';

    function check_session() {
        if (client_id !== null && client_id.length != 0 && client_id !== 'null' && session_state !== null && session_state.length != 0 && session_state != 'null') {
            var win = document.getElementById("opIFrame").contentWindow;
            win.postMessage(mes, targetOrigin);
        }
    }

    function setTimer() {
        check_session();
        setInterval("check_session()", 30 * 1000);
    }

    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(e) {
        if (targetOrigin.indexOf(e.origin) < 0) {
            return;
        } if (e.data == "changed") {
            console.log("[RP] session state has changed. sending passive request");
            if (authorizationEndpoint !== null && authorizationEndpoint.length != 0 && authorizationEndpoint != 'null') {
                var redirect_to = window.top.location.href;
                window.top.location.href = authorizationEndpoint+redirect_to;
            }
        } else if (e.data == "unchanged") {
            //console.log("[RP] session state has not changed");
        } else {
            //console.log("[RP] error while checking session status");
        }
    }
    </script>

</head>
<body onload="setTimer()">
<iframe id="opIFrame" src="<%=iframeURL%>" frameborder="0" width="0" height="0"></iframe>
</body>
</html>