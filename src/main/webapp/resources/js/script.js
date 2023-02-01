$(document).ajaxSend(function (e, xhr, options) {
    var token = $('input[name="_csrf"]').val();
    xhr.setRequestHeader("X-CSRF-TOKEN", token);
    if (options.type.toUpperCase() === "POST") {
        $.blockUI();
    }
    NProgress.start();
}).ajaxStart(function () {
    NProgress.set(0.4);
}).ajaxStop(function () {
    $.unblockUI();
    NProgress.done();
}).ajaxError(function (event, jgxhr, settings, thrownError) {
    $.unblockUI();
    NProgress.done();
    if (event.redirect) {
        window.location.href = event.redirect;
    }
    switch (jgxhr.status) {
        case 901:
            window.location.href = dcrc_lib.baseUrl() + 'login';
            break;
        case 500:
            errorMsg('System encountered with problem(s). Please try again or if the problem persist, contact with Administrator.');
            break;
        case 404:
            errorMsg('Invalid Request - 404');
            break;
        case 400:
            errorMsg('Bad Request - 400');
            break;
    }
}).ajaxComplete(function () {
    $.unblockUI();
    NProgress.done();
}).ajaxSuccess(function (event, request, settings) {
    $.unblockUI();
    NProgress.done();
    if (event.redirect) {
        window.location.href = event.redirect;
    }
    var location = request.getResponseHeader('Location');
    if (location && location != window.location.href) {
        window.location.href = location;
    }
});

//endregion

$(document).ready(function () {
    controlInitialize();

    var datePickerOptions = {
        dateFormat: globalConf.dateFormat(),
        changeMonth: true,
        changeYear: true,
        yearRange: 'c-65:c+10',
        beforeShow: function (input, inst) {
            if ($(input).prop("readonly")) {
                return false;
            }
        }
    };

    $('.datepicker').datepicker(datePickerOptions);

    $('body').on('keydown', '.datepicker', function (e) {
        if (e.keyCode == 9 || e.keyCode == 13) {
            var id = $(this).attr('id');
            parseEntryAsDate(id);
        } else if ((!e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            var val = $(this).val();
            val = val.trim();
            if (val) {
                if (val.length > 7) {
                    e.preventDefault();
                    val = val.substr(0, 8);
                    $(this).val(val);
                }
            }
            $(this).datepicker('hide');
        } else if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 40)) {
            return true;
        } else {
            e.preventDefault();
        }
    });

    $('body').on('focus', '.datepicker', function () {
        if ($(this).hasClass('dynamic')) {
            $(this).datepicker(datePickerOptions);
        }
    });

    $('body').on('change', '.datepicker', function () {
        if ($(this).val() !== '') {
            $(this).removeClass('error');
        }
    });

    $('body').on('keypress', '.amountValue', function (e) {
        var $this = $(this);
        if (e.ctrlKey == true && (e.charCode == 97 || e.charCode == 99 || e.charCode == 118 || e.charCode == 120)) {
            return;
        }

        if ((e.which != 46 || $this.val().indexOf('.') != -1) && ((e.which < 48 || e.which > 57)
            && (e.which !== 0 && e.which != 8))) {
            e.preventDefault();
        }

        var text = $(this).val();
        if ((e.which == 46) && (text.indexOf('.') == -1)) {
            setTimeout(function () {
                if ($this.val() !== '.') {
                    if ($this.val().substring($this.val().indexOf('.')).length > 3) {
                        $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
                    }
                }
            }, 1);
        }

        if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 2)
            && (e.which !== 0 && e.which != 8) && ($(this)[0].selectionStart >= text.length - 2)) {
            e.preventDefault();
        }
    });

    $('.amountValue').on('change', function () {
        if ($(this).val().toLocaleString() == '.') {
            $(this).val('');
        }
    });

    $('body').on('keydown', '.numeric', function (e) {
        if (allowKeys(e)) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('.modal').on('show.bs.modal', function () {
        var crossButton = "<button class='modal-cross pull-right' type='button' data-dismiss='modal'>X</button>"
        $(crossButton).prependTo($(this).find('.modal-body'));
    });

    $('.modal').on('hide.bs.modal', function () {
        $(this).find('.modal-cross').remove();
    });
});