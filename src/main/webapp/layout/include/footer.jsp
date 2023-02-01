
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>

<footer class="footer mt-auto" style=" background: #120f65;">
    <div class="container">
        <div class="row align-items-center flex-row-reverse">
            <sec:authorize access="isAnonymous()">
                <div class="col-auto ml-lg-auto">
                    <div class="row align-items-center">
                    </div>
                </div>
            </sec:authorize>
            <div class="col-12 col-lg-auto mt-3 mt-lg-0 text-center" style="color: white">
                Copyright &copy;  <%= new java.text.SimpleDateFormat("yyyy").format(new java.util.Date()) %> G2C Project Office | OFFICE OF THE PRIME MINISTER.
            </div>
        </div>
    </div>
</footer>



