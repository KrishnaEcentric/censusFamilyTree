<%@ page import="bt.gov.ditt.sso.client.dto.UserSessionDetailDTO" %>
<%@ page import="bt.gov.ditt.sso.client.SSOClientConstants" %>
<%--Family tree list display page--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<head>
    <jsp:include page="/layout/publicLayout.jsp"/>
    <jsp:include page="/layout/include/css.jsp"/>
    <jsp:include page="/WEB-INF/pages/rpIFrame.jsp"/>
    <%UserSessionDetailDTO userSessionDetailDTO =(UserSessionDetailDTO)request.getSession().getAttribute(SSOClientConstants.SSO_SESSION_OBJ_KEY);%>
</head>
<body class="d-flex flex-column min-vh-100">
<%  if((UserSessionDetailDTO)request.getSession().getAttribute(SSOClientConstants.SSO_SESSION_OBJ_KEY)!=null){%>
    <span class=" fa-pull-right text-white" ><a class="btn btn-primary-sm my-2 my-sm-0 pull-right" href="<%= userSessionDetailDTO.getOAuth2Client().getLogoutEndpoint()
    +"?post_logout_redirect_uri="+userSessionDetailDTO.getOAuth2Client().getLogoutCallback()
    +"&id_token_hint="+userSessionDetailDTO.getIdToken()%>">Log Out</a></span>
<%}%>
<%if (userSessionDetailDTO!=null){%>
<%if(userSessionDetailDTO.getFirstName()!=null && !userSessionDetailDTO.getFirstName().equalsIgnoreCase("null")){%>
<input type="hidden" id="cidNo" value="<%=userSessionDetailDTO.getCid().replaceAll("null", "")%>">
<% }%>
<%}%>
<div class="card tab2">
    <div style="font-weight: bold" class="alert alert-secondary" role="alert">
        Household Information
    </div>
    <div class="bg-blue card-status card-status-left"></div>
    <div class="card-body">
        <div class="form-group row">
            <div class="col-lg-6 col-md-6">
                <div><strong>This service is to view your Household Information only.</strong></div>
                <br>
                <div class="pull-left">
                    <button class="btn btn-outline-primary" onclick="getHousehold()"
                            style="font-size: 18px;">Click to view<i
                            class="fa fa-arrow-circle-right"
                            style="font-size: 24px;"></i></button>&nbsp;&nbsp;
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ddd"style="width: 100%">
    <form class="card" >
        <div class="card-body">
            <h4><b>Contact Information</b></h4>
            <div class="footer-clean">
                <footer>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-sm-4 col-md-3 item">
                                <h4>Website</h4>
                                <ul>
                                    <li><a href="https://dcrc.mohca.gov.bt/">DCRC</a></li>
                                </ul>
                            </div>
                            <div class="col-sm-3 col-md-4 item">
                                <h4>Contact</h4>
                                <ul>
                                    <li><a href="#">Client Information Desk(#02-330846)</a></li>
                                </ul>
                            </div>
                            <div class="col-sm-3 col-md-4 item">
                                <h4>Email</h4>
                                <ul>
                                    <li><a href="#">dcrc@mohca.gov.bt</a></li>

                                </ul>
                            </div>
                            <div class="col-lg-3 item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
        </div>
    </form>


<footer class="text-center text-lg-start text-white" style="font-size: small; background-color: #467fcf;">
    <!-- Grid container -->
    <div class="container">
        <!--Grid row-->
        <div class="row my-1">
            <!--Grid column-->
            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">

                <div class=" shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto" style="width: 170px; height: 170px;">
                    <img src="<c:url value='/resources/images/bhutan.jpg'/>" height="100"  alt=""
                         loading="lazy" />
                </div>

                <p class="text-center">India-Bhutan Friendship</p>



            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-4 col-md-3 mb-1 mb-md-0">
                <h5 class="text-uppercase mb-2">Useful Link</h5>
                <ul class="list">
                    <li class="mb-1">
                        <a href="https://www.btcirt.bt/" class="text-white" style="text-decoration: none;">Bhutan Computer Incident Response Team</a>
                    </li>
                    <li class="mb-1">
                        <a href="https://www.gov.bt/covid19/" class="text-white" style="text-decoration: none;">Covid-19 information link</a>
                    </li>
                    <li class="mb-1">
                        <a href="https://scs.rbp.gov.bt/" class="text-white" style="text-decoration: none;">Citizen Security Clearance Portal</a>
                    </li>
                    <li class="mb-1">
                        <a href="https://www.citizenservices.gov.bt/" class="text-white" style="text-decoration: none;">Citizen Services Portal</a>
                    </li>

                    <li class="mb-1">
                        <a href="https://www.moh.gov.bt/" class="text-white" style="text-decoration: none;">Ministry of Health</a>
                    </li>
                    <li class="mb-1">
                        <a href="https://www.moic.gov.bt/" class="text-white" style="text-decoration: none;">Ministry of Information and Communications</a>
                    </li>
                    <li class="mb-1">
                        <a href="https://egif.dit.gov.bt/" class="text-white" style="text-decoration: none;">eGIF portal</a>
                    </li>
                </ul>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-2 col-md-3 mb-3 mb-md-0">
                <h5 class="text-uppercase mb-2">Address</h5>
                Department of IT and Telecom<br>
                Ministry of Information and Communication<br>
                Thori Lam, Upper Chubachu<br>
                Thimphu, Bhutan<br>
                Tel: +975 02 323215<br>
                Fax: +975 02 328440<br>
                Post Box: 482
            </div>
        </div>

    </div>
</footer>
</div>

<div class="text-center p-3" style="background-color: rgb(18 15 101); color: white">
    © 2023 Copyright:
    DCRC
</div>

<script>
    function getHousehold() {
        var cidNo = $('#cidNo').val();
        var url = '${pageContext.request.contextPath}/getFamilyTree?cidNo=' + cidNo;
        window.location.href = url;
    }
</script>
</body>
