<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%--This layout is being imported by other pages as "Page header"--%>
<!DOCTYPE html>
<%@ page session="false" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Household Information DCRC</title>
    <link rel="shortcut icon" href="<c:url value='/resources/images/logo.png' />"/>
</head>
<body>

<div class="header py-1" style="background: #120f65;">
    <div class="container">
        <div class="d-flex">
            <a class="header-brand">
                <img src="<c:url value='/resources/images/logo.png' />" class="header-brand-img" alt="tabler logo"
                     style="height:60px; width:60px;">
            </a>
            <h5 class="text-white"><br/>Government to Citizen Service Delivery Initiative</h5>
        </div>
    </div>
</div>

</body>
</html>