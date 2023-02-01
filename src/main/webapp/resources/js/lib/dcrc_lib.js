function controlInitialize() {
    $('.datepicker').attr('maxlength', '12');
}

function financialValFormat(value) {
    if (value) {
        if (value > 999999999999.9999) {
            errorMsg('Balance Range Exists. Ex: ############.####');
            return '';
        }
        value = value + '';
        var amountFormat = globalConf.financialValueFormat;
        var amount = '';
        var place = globalConf.decimalPlacesForAmount;
        var divisor = '1' + Array(place).join(0);

        if (value.indexOf(',') === -1) {
            amount = value;
        } else {
            amount = value.split(',').join('');
        }

        var roundAmount = Math.floor(Number(amount) * Number(divisor)) / Number(divisor);
        var amountParts = roundAmount.toFixed(place - 1).toString().split('.');
        var formatRegx = RegExp(amountFormat, 'g');
        var formatedAmount = '';

        if (amountFormat.indexOf('(') === -1) {
            formatedAmount = amountParts[0] + (amountParts[1] ? '.' + amountParts[1] : '');
        } else {
            formatedAmount = amountParts[0].replace(formatRegx, "$1,") + (amountParts[1] ? '.' + amountParts[1] : '');
        }
        value = formatedAmount;
    }
    return value;
}

function getParameterByNameFromUrl(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#$"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function allowKeys(e) {
    //Allow: backspace, delete, tab, escape, enter
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            //Allow: Ctr+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
            //Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return true;
    }
    return false;
}

function getDate(dateParam) {
    var d = new Date(dateParam);

    if (d.getTimezoneOffset() > 0) {
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    } else {
        d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
    }

    return d;
}

/**
 * Responsible to populate the entire form
 * @param {json} res
 * @return {void}
 */
function populate(res) {
    $.each(res, function (index, data) {
        if (typeof (data) === 'object') {
        } else {
            $("input[type='text'][name='" + index + "']," +
            " input[type='hidden'][name='" + index + "'], " +
            "input[type='checkbox'][name='" + index + "'], " +
            "select[name='" + index + "'], textarea[name='" + index + "']").val(data);

            $("input[type='radio'][name='" + index + "'][value='" + data + "']").prop('checked', true);
            if ($("input[name='" + index + "']").hasClass('datepicker')) {
                $("input[name='" + index + "']").val($.datepicker.formatDate(globalConf.dateFormat(), getDate(data)));
            }

            if ($("input[name='" + index + "']").hasClass('financialValueFormat')) {
                $("input[name='" + index + "']").val(financialValFormat(data));
            }
        }
    });

    $('form').find('input[type="checkbox"]').each(function () {
        if ($(this).siblings('input[type="hidden"]').val() == "true" ||
            $(this).siblings('input[type="hidden"]').val() == 1) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    });
}


function formatAsDate(date) {
    return date ? $.datepicker.formatDate(globalConf.dateFormat(), new Date(date)) : ''
}

function dateFormatAS(date) {
    return date ? $.datepicker.formatDate(globalConf.dateFormatAS(), new Date(date)) : ''
}

function parseAsDate(val) {
    if (val) {
        var dateRegex = /((3[01])|([012]\d)|[1-9])((1[012])|(0?[1-9]))?((19|20)?\d\d?)?/;
        var dateMatch = val.match(dateRegex);
        if (!dateMatch || !dateMatch[1]) {
            return;
        }
        var day = dateMatch[1];
        var date = new Date();

        var month = date.getMonth();
        var year = date.getFullYear();
        if (dateMatch[4]) {
            month = dateMatch[4];
        }
        if (dateMatch[7]) {
            year = dateMatch[7];
            year = parseInt(year);
            if (dateMatch[7].length < 3) {
                if (year > 70)
                    year = 1900 + year;
                else
                    year = 2000 + year;
            }
        }
        date = new Date(year, month - 1, day);
        return date;
    }
}

function parseEntryAsDate(id) {
    id = '#' + id;
    var val = $(id).val();
    val = val.trim();
    if (val) {
        var date = null;
        if (val.length > 8) {
            date = $.datepicker.parseDate(globalConf.dateFormat(), val);
            if (date.getTime()) {
                val = $.datepicker.formatDate(globalConf.dateFormat(), new Date(date));
                $(id).val(val);
                return true;
            }
        }
        date = parseAsDate(val);
        if (!date) {
            $(id).val('');
            return;
        }
        $(id).datepicker("setDate", date);
        val = $.datepicker.formatDate(globalConf.dateFormat(), date);
        $(id).val(val);
        return true;
    }
}

function errorMsg(msg) {
    alertify.errorAlert(msg).set({
        transition: 'zoom',
        onok: function () {
            $("body").removeClass("ajs-no-overflow");
        }
    });
}

function successMsg(msg) {
    alertify.successAlert(msg).set({
        transition: 'zoom',
        onok: function () {
            $("body").removeClass("ajs-no-overflow");
        }
    });
}

function successMsgRedirect(msg, url) {
    alertify.successAlert(msg).set({
        transition: 'zoom',
        onok: function () {
            $("body").removeClass("ajs-no-overflow");
            window.location.href = dcrc_lib.baseUrl() + url;
        }
    });
}

function warningMsg(msg) {
    alertify.warningAlert(msg).set({
        transition: 'zoom',
        onok: function () {
            $("body").removeClass("ajs-no-overflow");
        }
    });
}

function warningMsgRedirect(msg, url) {
    alertify.warningAlert(msg).set({
        transition: 'zoom',
        onok: function () {
            $("body").removeClass("ajs-no-overflow");
            window.location.href = dcrc_lib.baseUrl() + url;
        }
    });
}

function infoMsg(msg) {
    alertify.infoAlert(msg).set({
        transition: 'zoom',
        onok: function () {
            $("body").removeClass("ajs-no-overflow");
        }
    });
}

function confirmMsg(msg, callback) {
    alertify.confirmAlert(msg, callback).set(
        'labels', {ok: 'yes', cancel: 'No'}
    ).set('defaultFocus', 'cancel');
}

var dcrc_lib = (function () {
    "use strict";

    function ajax(url, type, data, callback) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: callback
        });
    }

    function valid(element) {
        element.removeClass('error link-tooltip');
        element.removeAttr('data-original-title');
    }

    function loadDropDown(element, data, type, isAllOption) {
        element.empty();
        if (!data) {
            data = [];
        }

        if (!data.length && isAllOption) {
            element.append($(
                '<option/>', {
                    value: "-1",
                    text: 'All'
                }
            ));
        }

        if (data.length) {
            element.append($(
                '<option/>', {
                    value: "-1",
                    text: isAllOption ? 'All' : '-- Please Select --'
                }
            ));

            if (type === 'char') {
                $.each(data, function (index, itemData) {
                    element.append($('<option/>', {
                            value: itemData.valueChar,
                            text: itemData.text
                        })
                    )
                });
            }

            if (type === 'string') {
                $.each(data, function (index, itemData) {
                    element.append($('<option/>', {
                            value: itemData.value,
                            text: itemData.text
                        })
                    );
                });
            }

            if (type === 'integer') {
                $.each(data, function (index, itemData) {
                    element.append($('<option/>', {
                            value: itemData.valueInteger,
                            text: itemData.text
                        })
                    );
                });
            }

            if (type === 'short') {
                $.each(data, function (index, itemData) {
                    element.append($('<option/>', {
                            value: itemData.valueShort,
                            text: itemData.text
                        })
                    );
                });
            }

            if (type === 'byte') {
                $.each(data, function (index, itemData) {
                    element.append($('<option/>', {
                            value: itemData.valueByte,
                            text: itemData.text
                        })
                    );
                });
            }
        }
    }

    function formIndexing(tableBody, row, serialNo, iterator) {
        if (!iterator)
            iterator = 0;

        for (var i = 0; i < row.length; i++) {
            tableBody.children().eq(i).children().children().each(function () {
                if (this.name) {
                    this.name = this.name.replace(
                        /\[(\d+)\]/, function (str, p) {
                            return '[' + (i + iterator) + ']';
                        });
                }

                if ($(this).hasClass(serialNo)) {
                    $(this).val(i + 1);
                }
            });
        }
    }

    function getSelectedOptionText(element, event) {
        return element.options[event.target.selectedIndex].text;
    }

    function handleCheckboxBeforeSave(form) {
        $(form).find('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                $(this).next('input[type="hidden"]').val('true');
            } else {
                $(this).next('input[type="hidden"]').val('false');
            }
        });
    }

    function switchToInvalidTab(targetControl) {
        if (!targetControl)
            targetControl = $('.error');
        var errorContainedPane = targetControl.first().parents('.tab-pane'), tabPaneID = errorContainedPane.attr('id');
        errorContainedPane.addClass('active in');
        errorContainedPane.siblings().removeClass('active in');
        $('a[href$="#' + tabPaneID + '"]').parent('li').siblings().removeClass('active');
        $('a[href$="#' + tabPaneID + '"]').parent('li').addClass('active');
    }

    function convertToDecimal(value) {
        return parseFloat(value.split(',').join(''));
    }

    function convertAmountInWord(amount) {
        var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
        var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        var tn = ['Ten', 'Eleven', 'Twelve', 'Thriteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        var tw = ['Twenty', 'Thirty', 'Fourty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        amount = amount.toString();
        amount = amount.replace(/[\, ]/g, '');
        if (amount != parseFloat(amount))
            return 'not a number';

        var x = amount.indexOf('.');
        if (x == -1) x = amount.length;
        if (x > 15) return 'Too Big';

        var n = amount.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                } else if (n[1] != '0') {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            } else if (n[i] != '0') {
                str += dg[n[i]] + '';
                if ((x - i) % 3 == 0) str += 'Hundred ';
                sk = 1;
            }

            if ((x - i) % 3 == 1) {
                if (sk) str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }

        if (x != amount.lenght) {
            var y = amount.length;
            str += 'Point';
            for (var z = x + 1; z, y; z++) str += dg[n[z]] + ' ';
        }
        return str.replace(/\s+/g, ' ');
    }

    function baseUrl() {
        //return window.location.protocol + '//' + window.location.host + '/dcrc/';
        return window.location.protocol + '//' + window.location.host + '/';
    }

    function baseReportLocation() {
        return window.location.protocol + '//' + window.location.host + '/resources/reports/';
         //return window.location.protocol + '//' + window.location.host + '/dcrc/resources/reports/';
    }

    return {
        ajax: ajax,
        valid: valid,
        loadDropDown: loadDropDown,
        formIndexing: formIndexing,
        getSelectedOptionText: getSelectedOptionText,
        handleCheckboxBeforeSave: handleCheckboxBeforeSave,
        switchToInvalidTab: switchToInvalidTab,
        convertToDecimal: convertToDecimal,
        convertAmountInWord: convertAmountInWord,
        baseUrl: baseUrl,
        baseReportLocation: baseReportLocation
    };

})();


$(document).ready(function () {
    var submitted = false;

    $('body').on('keydown', 'input, a, select', function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && e.target.type != 'submit') {
            e.preventDefault();

            if (e.target.tagName.toLocaleLowerCase() === 'a' || e.target.type === 'button') {
                $(this).click();
            }

            var manualNextIndex = $(this).attr("data-nextIndex");
            if (manualNextIndex) {
                var $manualNext = $('[tabIndex=' + manualNextIndex + ']');
                $manualNext.focus();
                return false;
            }

            var curIndex = this.tabIndex;
            var i = +curIndex + 1;
            var $next = null;
            var allNext = $('[tabIndex=' + i + ']:not(body):not([readonly]):not(:disabled)');
            if (allNext.length) {
                $next = allNext[0];
            }

            if (!$next) {
                var nextPossibleTabIndex = 10000;
                allNext = $('[tabindex]:not(body):not([readonly]):not(:disabled)').filter(function (ix, el) {
                    var tb = el.tabIndex;
                    if (+tb > +curIndex) {
                        nextPossibleTabIndex = nextPossibleTabIndex > +tb ? +tb : nextPossibleTabIndex;
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                if (allNext.length) {
                    $next = $('[tabIndex=' + nextPossibleTabIndex + ']');
                }
            }

            if (!$next) {
                $next = $('[tabIndex]:not(body):not([readonly]):not(:disabled)')[0];
            }
            if ($($next).attr('type') == 'reset') {
                $('input[type="submit"]').focus();
            } else {
                $($next).focus();
            }
        }
    });

    $('body').on('focus', 'input, a, select, textarea, button', function (e) {
        if ($(this).is('input:text')) {
            $(this).select();
        }
        dcrc_lib.switchToInvalidTab($(this));
    });

    $.validator.setDefaults({
        ignore: '.ignore',
        focusCleanup: true,
        showErrors: function (errorMap, errorList) {
            $.each(this.validElements(), function (index, element) {
                var $element = $(element);
                $element.removeClass("error");
            });

            $.each(errorList, function (index, error) {
                var $element = $(error.element);
                $element.addClass("error");
            });

            if (submitted) {
                $.each(errorList, function (index, error) {
                    var elementID = '#' + $(error.element).attr('id') + 'Error';
                    $(elementID).text($(error.element).attr('data-msg-required'));
                });

                /*  var summary = '';
                 $.each(errorList, function () {
                 if (this.message)
                 summary += '<li>' + this.message + '</list>';
                 });*/

                submitted = false;

                /* if (summary) {
                 warningMsg(summary);
                 }*/
            }
        }, invalidHandler: function (event, validator) {
            submitted = true;
            dcrc_lib.switchToInvalidTab();
        }
    });

    $.validator.messages.required = '';

    $.validator.addMethod('greaterThanZero', function (value, element, param) {
        if (typeof param == 'object') {
            if (param.val().trim())
                return dcrc_lib.convertToDecimal(value) > dcrc_lib.convertToDecimal(param.val().trim());
            else
                return true;
        }
        return dcrc_lib.convertToDecimal(value) > param;
    });

    $.validator.addMethod('greaterThanOrEqualToZero', function (value, element, param) {
        if (typeof param == 'object') {
            if (param.val().trim())
                return dcrc_lib.convertToDecimal(value) >= dcrc_lib.convertToDecimal(param.val().trim());
            else
                return true;
        }
        return dcrc_lib.convertToDecimal(value) >= param;
    });

    $.validator.addMethod('lessThanItem', function (value, element, param) {
        if (typeof param == 'object') {
            if (param.val().trim())
                return value < parseInt(param.val().trim());
            else
                return true;
        }
    });

    $.validator.addMethod("date", function (value, element) {
        if (!value || value === "")
            return true;

        var dateData;
        try {
            dateData = new Date(value);
        } catch (x) {
            dateData = Date.parse(value);
        }
        if (!dateData.getDate()) {
            try {
                dateData = $.datepicker.parseDate(globalConf.dateFormat(), value);
            } catch (x) {
                return false;
            }
        }

        return !dateData.getDate() ? false : true;
    }, "Please enter a date in " + globalConf.dateFormat() + " format");

    $.validator.addMethod("regex", function (value, element, regexp) {
        if (!value || value === "")
            return true;

        try {
            var rgex = new RegExp('[' + regexp + ']');
            return rgex.test(value);
        } catch (x) {
            return false;
        }
        return true;

    }, "Please enter valid data ");

    $('body').on('click', '.form-control', function () {
        var elementID = '#' + $(this).attr('id') + 'Error';
        $(this).removeClass('error');
        $(elementID).text('');
    });

    $('body').on('keypress', '.alphanumeric', function (e) {
        if (allowKeys(e)) {
            return true;
        }
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }

        e.preventDefault();
        return false;
    });

    $('body').on('keypress', '.phone', function (e) {
        var evt = (e) ? e : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    });

    $('body').on('keypress', '.amount', function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        return !((charCode != 46 || $(this).val().indexOf('.') != -1) && (charCode != 9) &&
        (charCode < 48 || charCode > 57) && (charCode != 8));
    });

    alertify.dialog('errorAlert', function factory() {
        return {
            build: function () {
                var errorHeader = '<span class="glyphicon glyphicon-exclamation-sign errorMsg gi-1x" ' +
                    'style="vertical-align:moddle;"></span> Application Error';
                this.setHeader(errorHeader);
            }
        };
    }, true, 'alert');

    alertify.dialog('successAlert', function factory() {
        return {
            build: function () {
                var successHeader = '<span class="glyphicon glyphicon-ok-sign successMsg gi-1x" ' +
                    'style="vertical-align:middle;"></span> Application Success';
                this.setHeader(successHeader);
            }
        };
    }, true, 'alert');

    alertify.dialog('warningAlert', function factory() {
        return {
            build: function () {
                var successHeader = '<span class="glyphicon glyphicon-warning-sign warningMsg gi-1x" ' +
                    'style="vertical-align:middle;"></span> Application Warning';
                this.setHeader(successHeader);
            }
        };
    }, true, 'alert');

    alertify.dialog('infoAlert', function factory() {
        return {
            build: function () {
                var successHeader = '<span class="glyphicon glyphicon-info-sign infoMsg gi-1x" ' +
                    'style="vertical-align:middle;"></span> Application Information';
                this.setHeader(successHeader);
            }
        };
    }, true, 'alert');

    alertify.dialog('confirmAlert', function factory() {
        return {
            build: function () {
                var confirmHeader = '<span class="glyphicon glyphicon-question-sign errorMsg gi-1x" ' +
                    'style="vertical-align:middle;"></span> Application Confirmation';
                this.setHeader(confirmHeader);
            }
        };
    }, true, 'confirm');

    alertify.dialog('successCustomerAlert', function factory() {
        return {
            build: function () {
                var successHeader = '<span class="glyphicon glyphicon-ok-sign successMsg gi-1x" ' +
                    'style="vertical-align:middle;"></span> Application Success';
                this.setHeader(successHeader);
            }
        };
    }, true, 'confirm');

    $.fn.disableElements = function (status) {
        $(this).removeClass('error');
        $(this).each(function () {
            $(this).attr('readonly', status);
            $(this).find('option').prop('disabled', status);

            if ($(this).is(':checkbox') || $(this).is(':radio')) {
                $(this).attr('disabled', status);
            }
            $('input:checkbox[name=checkme]').attr('disabled', status);
        });
    };

    $.fn.SimpleGridWithoutPaging = function (data, column_def) {
        $(this).dataTable().fnDestroy();
        $(this).dataTable({
            "paging": false,
            "retrieve": true,
            "data": data,
            "columns": column_def
        });
    };

    $.fn.ditSimpleGrid = function (data, column_def) {
        $(this).dataTable().fnDestroy();
        $(this).dataTable({
            "scrollY": "200px",
            "data": data,
            "columns": column_def,
            "editable": true
        });
    };

    $.fn.ditEditableGrid = function (data, column_def) {
        SimpleGridEditTable = $(this).dataTable({
            "data": data,
            "columns": column_def,
            "bStateSave": true
        });

        $(this).on('click', ' tbody td', function () {
            $(this).editable(function (sValue) {
                var aPos = SimpleGridEditTable.fnGetPosition(this);
                var aData = SimpleGridEditTable.fnGetData(aPos[0]);

                aData[aPos[1]] = sValue;

                return sValue;
            }, {
                "onblur": 'submit'
            });
        });

        $(this).on('change', ' tbody td', function () {
            $(this).css({"color": "#ffb7b7"});
        });
    };

    $.fn.addToGrid = function (form) {
        var formElelmentValue = {};

        $(form).serializeArray().map(function (item) {
            formElelmentValue[item.name] = item.value;
        });

        var dtTable = $(this).dataTable();

        dtTable.fnAddData(formElelmentValue);
        $(form)[0].reset();

        dtTable = dtTable.DataTable();

        $(this + " tbody tr").unbind('click');
        $(this + " tbody tr").bind('click', function () {
            dtTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            populate(dtTable.row('.selected').data(), form);
        });
    };

    $.fn.removeFromGrid = function (form, buttonSelector) {
        var dtTable = $(this).DataTable();

        dtTable.row('.selected').remove().draw(false);
        $(form)[0].reset();
    };

    $.fn.showDialog = function (url) {
        $.ajax({
            url: url,
            success: function (data) {
                $(this).html(data).dialog();
            }
        });
    };

    $.fn.showModalDialog = function (url) {
        $.ajax({
            url: url,
            success: function (data) {
                $(this).html(data).dialog({
                    modal: true,
                    buttons: {
                        Close: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        });
    };
});