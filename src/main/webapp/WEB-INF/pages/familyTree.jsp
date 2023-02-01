<%@ page import="bt.gov.ditt.sso.client.dto.UserSessionDetailDTO" %>
<%@ page import="bt.gov.ditt.sso.client.SSOClientConstants" %>
<%--Family tree list display page--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<head>
    <jsp:include page="/layout/publicLayout.jsp"/>
    <jsp:include page="/layout/include/css.jsp"/>
    <jsp:include page="/WEB-INF/pages/rpIFrame.jsp"/>
</head>
<body>
<span class=" fa-pull-right text-white" ><a class="btn btn-primary-sm my-2 my-sm-0 pull-right" href="/census">Home</a></span>
<div class="card-body col-12 table-responsive">
    <table style="text-align: center; width: 92%" class="table table-bordered" id="getFamilyTree">
        <thead class="thead-light">
        <tr class="alert alert-primary">
            <td colspan="1.8"><label>Household No: <span style="font-weight: normal">${getCommonDetails.presentHouseHoldNo}</span></label></td>
            <td colspan="1.8"><label>House No: <span style="font-weight: normal">${getCommonDetails.presentHouseNo}</span></label></td>
            <td colspan="1.8"><label>Dzongkhag: <span style="font-weight: normal">${getCommonDetails.dzongkhag}</span></label></td>
            <td colspan="1.8"><label>Gewog: <span style="font-weight: normal">${getCommonDetails.gewog}</span></label></td>
            <td colspan="1.8"><label>Village: <span style="font-weight: normal">${getCommonDetails.village}</span></label></td>
        </tr>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>CID No</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Father's CID</th>
            <th>Mother's CID</th>
            <th>Person Status</th>
            <th>Marital Status</th>
            <th>HOH relationship</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="report" items="${getFamilyTree}" varStatus="counter">
            <tr>
                <td>${counter.index+1}</td>
                <td style="text-align: left">${report.firstName}</td>
                <td>${report.cidNo}</td>
                <td>${report.gender}</td>
                <td>${report.age}</td>
                <td>${report.fatherCidNo}</td>
                <td>${report.motherCidNo}</td>
                <td>${report.personStatus}</td>
                <td>${report.maritalDesc}</td>
                <td>${report.hohRelation}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>

<script type="text/javascript" src="<c:url value='/resources/js/vendors/jquery-3.2.1.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/jquery.validate.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/vendors/bootstrap.bundle.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/datepicker.min.js' />"></script>

<script type="text/javascript" src="<c:url value='/resources/js/dialog.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/alertify.new.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/nprogress.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/vendors/jqueryblockUI/jquery.blockUI.js' />"></script>

<script type="text/javascript" src="<c:url value='/resources/js/chosen.jquery.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/chosen.jquery.min.js'/>"></script>

<script type="text/javascript" src="<c:url value='/resources/js/dataTable/jquery.dataTables.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/dataTable/jquery.dataTables.editable.js' />"></script>

<script type="text/javascript" src="<c:url value='/resources/js/script.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/script_loader.js' />"></script>

<script type="text/javascript" src="<c:url value='/resources/js/lib/dcrc_lib.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/globalConf.js' />"></script>

<script type="text/javascript" src="<c:url value='/resources/dataTable/jquery.base64.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/dataTable/tableExport.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/dataTable/tableExport.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/dataTableJar/FileSaver/FileSaver.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/dataTableJar/js-xlsx/xlsx.core.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/dataTableJar/jsPDF/jspdf.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/dataTableJar/jsPDF-AutoTable/jspdf.plugin.autotable.js'/>"></script>


<script>

    $(document).ready(function() {
        $('#getFamilyTree').DataTable({
            "aLengthMenu": [[25, 50, 75, -1], [25, 50, 75, "All"]],
            "iDisplayLength": 25
        });

    });

    function searchApplication() {
        var cidNo=$('#cidNo').val();
        var url='${pageContext.request.contextPath}/getFamilyTree?cidNo='+cidNo;
        window.location.href = url;
    }


</script>

<style>
    .dataTables_length{
        margin-left: 4%;
        font-size: 13px;
    }
    .dataTables_filter{
        margin-right: 4%;
        font-size: 13px;
    }
    .dataTables_info{
        margin-left: 4%;
        font-weight: bold;
        font-size: 13px;
    }
    .dataTables_paginate{
        margin-right: 4%;
        font-size: 13px;
        font-weight: bold;
    }
    input{
        border-radius: 14px;
        width: 151px;
    }
    .cidSearch{
        border-radius: 14px;
    }
</style>

<jsp:include page="/layout/include/footer.jsp"/>
</body>
