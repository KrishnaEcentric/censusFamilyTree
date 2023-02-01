var globalConf = (function () {
    "use strict";

    function dateFormatAS() {
        return 'dd/mm/yy';
    }

    function dateFormat() {
        return 'mm/dd/yy';
    }

    return {
        dateFormat: dateFormat,
        dateFormatAS:dateFormatAS
    };
})();

var globalConfDate = (function () {
    "use strict";

    function dateFormat() {
        return 'mm/dd/yy';
    }

    function dateFormatAS() {
        return 'dd/mm/yy';
    }

    return {
        dateFormat: dateFormat,
        dateFormatAS:dateFormatAS
    };
})();

$(document).ready(function () {
    globalConf.dateFormat();
    globalConfDate.dateFormat();

    globalConf.dateFormatAS();
    globalConfDate.dateFormatAS();
});