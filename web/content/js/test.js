$(function () {
    // $('.textfield__input.date').daterangepicker();
    $('.textfield__input.date').datepicker();
});


(function (a, k) {
    function i() {
        this.debug = !1;
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass =
            "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: "January February March April May June July August September October November December".split(" "),
            monthNamesShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            dayNames: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            dayNamesShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            dayNamesMin: "Su Mo Tu We Th Fr Sa".split(" "),
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        };
        a.extend(this._defaults, this.regional[""]);
        this.dpDiv = h(a('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }

    function h(b) {
        return b.delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a",
            "mouseout", function () {
                a(this).removeClass("ui-state-hover");
                -1 != this.className.indexOf("ui-datepicker-prev") && a(this).removeClass("ui-datepicker-prev-hover");
                -1 != this.className.indexOf("ui-datepicker-next") && a(this).removeClass("ui-datepicker-next-hover")
            }).delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a", "mouseover", function () {
                if (!a.datepicker._isDisabledDatepicker(n.inline ? b.parent()[0] : n.input[0]))a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
                    a(this).addClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && a(this).addClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && a(this).addClass("ui-datepicker-next-hover")
            })
    }

    function f(b, c) {
        a.extend(b, c);
        for (var d in c)if (null == c[d] || c[d] == k)b[d] = c[d];
        return b
    }

    a.extend(a.ui, {datepicker: {version: "1.9.2"}});
    var d = (new Date).getTime(), n;
    a.extend(i.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function () {
            this.debug && console.log.apply("",
                arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (a) {
            f(this._defaults, a || {});
            return this
        },
        _attachDatepicker: function (b, c) {
            var d = null, f;
            for (f in this._defaults) {
                var h = b.getAttribute("date:" + f);
                if (h) {
                    d = d || {};
                    try {
                        d[f] = eval(h)
                    } catch (i) {
                        d[f] = h
                    }
                }
            }
            f = b.nodeName.toLowerCase();
            h = "div" == f || "span" == f;
            b.id || (this.uuid += 1, b.id = "dp" + this.uuid);
            var k = this._newInst(a(b), h);
            k.settings = a.extend({}, c || {}, d || {});
            "input" == f ? this._connectDatepicker(b, k) : h && this._inlineDatepicker(b, k)
        },
        _newInst: function (b,
                            c) {
            return {
                id: b[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: b,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: c,
                dpDiv: !c ? this.dpDiv : h(a('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function (b, c) {
            var d = a(b);
            c.append = a([]);
            c.trigger = a([]);
            d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
                function (a, b, d) {
                    c.settings[b] = d
                }).bind("getData.datepicker", function (a, b) {
                    return this._get(c, b)
                }), this._autoSize(c), a.data(b, "datepicker", c), c.settings.disabled && this._disableDatepicker(b))
        },
        _attachments: function (b, c) {
            var d = this._get(c, "appendText"), f = this._get(c, "isRTL");
            c.append && c.append.remove();
            d && (c.append = a('<span class="' + this._appendClass + '">' + d + "</span>"), b[f ? "before" : "after"](c.append));
            b.unbind("focus", this._showDatepicker);
            c.trigger && c.trigger.remove();
            d = this._get(c, "showOn");
            ("focus" ==
            d || "both" == d) && b.focus(this._showDatepicker);
            if ("button" == d || "both" == d) {
                var d = this._get(c, "buttonText"), h = this._get(c, "buttonImage");
                c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                    src: h,
                    alt: d,
                    title: d
                }) : a('<button type="button"></button>').addClass(this._triggerClass).html("" == h ? d : a("<img/>").attr({
                    src: h,
                    alt: d,
                    title: d
                })));
                b[f ? "before" : "after"](c.trigger);
                c.trigger.click(function () {
                    if (a.datepicker._datepickerShowing && a.datepicker._lastInput == b[0])a.datepicker._hideDatepicker();
                    else {
                        a.datepicker._datepickerShowing && a.datepicker._lastInput != b[0] && a.datepicker._hideDatepicker();
                        a.datepicker._showDatepicker(b[0])
                    }
                    return false
                })
            }
        },
        _autoSize: function (a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var c = new Date(2009, 11, 20), d = this._get(a, "dateFormat");
                if (d.match(/[DM]/)) {
                    var f = function (a) {
                        for (var b = 0, c = 0, d = 0; d < a.length; d++)a[d].length > b && (b = a[d].length, c = d);
                        return c
                    };
                    c.setMonth(f(this._get(a, d.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    c.setDate(f(this._get(a, d.match(/DD/) ? "dayNames" :
                        "dayNamesShort")) + 20 - c.getDay())
                }
                a.input.attr("size", this._formatDate(a, c).length)
            }
        },
        _inlineDatepicker: function (b, c) {
            var d = a(b);
            d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv).bind("setData.datepicker", function (a, b, d) {
                c.settings[b] = d
            }).bind("getData.datepicker", function (a, b) {
                return this._get(c, b)
            }), a.data(b, "datepicker", c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b),
                c.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (b, c, d, h, i) {
            b = this._dialogInst;
            b || (this.uuid += 1, this._dialogInput = a('<input type="text" id="dp' + this.uuid + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), b = this._dialogInst = this._newInst(this._dialogInput, !1), b.settings = {}, a.data(this._dialogInput[0], "datepicker", b));
            f(b.settings, h || {});
            c = c && c.constructor == Date ? this._formatDate(b, c) : c;
            this._dialogInput.val(c);
            this._pos = i ? i.length ? i : [i.pageX, i.pageY] : null;
            this._pos || (this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)]);
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            b.settings.onSelect = d;
            this._inDialog = !0;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            a.blockUI && a.blockUI(this.dpDiv);
            a.data(this._dialogInput[0], "datepicker", b);
            return this
        },
        _destroyDatepicker: function (b) {
            var c = a(b), d = a.data(b, "datepicker");
            if (c.hasClass(this.markerClassName)) {
                var f = b.nodeName.toLowerCase();
                a.removeData(b, "datepicker");
                "input" == f ? (d.append.remove(), d.trigger.remove(), c.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == f || "span" == f) && c.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function (b) {
            var c = a(b), d = a.data(b, "datepicker");
            if (c.hasClass(this.markerClassName)) {
                var f = b.nodeName.toLowerCase();
                if ("input" == f)b.disabled = !1, d.trigger.filter("button").each(function () {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                }); else if ("div" == f || "span" == f)c = c.children("." + this._inlineClass), c.children().removeClass("ui-state-disabled"), c.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1);
                this._disabledInputs = a.map(this._disabledInputs,
                    function (a) {
                        return a == b ? null : a
                    })
            }
        },
        _disableDatepicker: function (b) {
            var c = a(b), d = a.data(b, "datepicker");
            if (c.hasClass(this.markerClassName)) {
                var f = b.nodeName.toLowerCase();
                if ("input" == f)b.disabled = !0, d.trigger.filter("button").each(function () {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                }); else if ("div" == f || "span" == f)c = c.children("." + this._inlineClass), c.children().addClass("ui-state-disabled"), c.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",
                    !0);
                this._disabledInputs = a.map(this._disabledInputs, function (a) {
                    return a == b ? null : a
                });
                this._disabledInputs[this._disabledInputs.length] = b
            }
        },
        _isDisabledDatepicker: function (a) {
            if (!a)return !1;
            for (var c = 0; c < this._disabledInputs.length; c++)if (this._disabledInputs[c] == a)return !0;
            return !1
        },
        _getInst: function (b) {
            try {
                return a.data(b, "datepicker")
            } catch (c) {
                throw"Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function (b, c, d) {
            var h = this._getInst(b);
            if (2 == arguments.length && "string" == typeof c)return "defaults" ==
            c ? a.extend({}, a.datepicker._defaults) : h ? "all" == c ? a.extend({}, h.settings) : this._get(h, c) : null;
            var i = c || {};
            "string" == typeof c && (i = {}, i[c] = d);
            if (h) {
                this._curInst == h && this._hideDatepicker();
                var n = this._getDateDatepicker(b, !0), x = this._getMinMaxDate(h, "min"), B = this._getMinMaxDate(h, "max");
                f(h.settings, i);
                null !== x && (i.dateFormat !== k && i.minDate === k) && (h.settings.minDate = this._formatDate(h, x));
                null !== B && (i.dateFormat !== k && i.maxDate === k) && (h.settings.maxDate = this._formatDate(h, B));
                this._attachments(a(b), h);
                this._autoSize(h);
                this._setDate(h, n);
                this._updateAlternate(h);
                this._updateDatepicker(h)
            }
        },
        _changeDatepicker: function (a, c, d) {
            this._optionDatepicker(a, c, d)
        },
        _refreshDatepicker: function (a) {
            (a = this._getInst(a)) && this._updateDatepicker(a)
        },
        _setDateDatepicker: function (a, c) {
            var d = this._getInst(a);
            d && (this._setDate(d, c), this._updateDatepicker(d), this._updateAlternate(d))
        },
        _getDateDatepicker: function (a, c) {
            var d = this._getInst(a);
            d && !d.inline && this._setDateFromField(d, c);
            return d ? this._getDate(d) : null
        },
        _doKeyDown: function (b) {
            var c =
                a.datepicker._getInst(b.target), d = !0, f = c.dpDiv.is(".ui-datepicker-rtl");
            c._keyEvent = !0;
            if (a.datepicker._datepickerShowing)switch (b.keyCode) {
                case 9:
                    a.datepicker._hideDatepicker();
                    d = !1;
                    break;
                case 13:
                    return d = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", c.dpDiv), d[0] && a.datepicker._selectDay(b.target, c.selectedMonth, c.selectedYear, d[0]), (b = a.datepicker._get(c, "onSelect")) ? (d = a.datepicker._formatDate(c), b.apply(c.input ? c.input[0] : null, [d, c])) : a.datepicker._hideDatepicker(),
                        !1;
                case 27:
                    a.datepicker._hideDatepicker();
                    break;
                case 33:
                    a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(c, "stepBigMonths") : -a.datepicker._get(c, "stepMonths"), "M");
                    break;
                case 34:
                    a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(c, "stepBigMonths") : +a.datepicker._get(c, "stepMonths"), "M");
                    break;
                case 35:
                    (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target);
                    d = b.ctrlKey || b.metaKey;
                    break;
                case 36:
                    (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target);
                    d = b.ctrlKey || b.metaKey;
                    break;
                case 37:
                    if (b.ctrlKey || b.metaKey)a.datepicker._adjustDate(b.target, f ? 1 : -1, "D");
                    d = b.ctrlKey || b.metaKey;
                    b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(c, "stepBigMonths") : -a.datepicker._get(c, "stepMonths"), "M");
                    break;
                case 38:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D");
                    d = b.ctrlKey || b.metaKey;
                    break;
                case 39:
                    if (b.ctrlKey || b.metaKey)a.datepicker._adjustDate(b.target, f ? -1 : 1, "D");
                    d = b.ctrlKey || b.metaKey;
                    b.originalEvent.altKey && a.datepicker._adjustDate(b.target,
                        b.ctrlKey ? +a.datepicker._get(c, "stepBigMonths") : +a.datepicker._get(c, "stepMonths"), "M");
                    break;
                case 40:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D");
                    d = b.ctrlKey || b.metaKey;
                    break;
                default:
                    d = !1
            } else 36 == b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : d = !1;
            d && (b.preventDefault(), b.stopPropagation())
        },
        _doKeyPress: function (b) {
            var c = a.datepicker._getInst(b.target);
            if (a.datepicker._get(c, "constrainInput")) {
                var c = a.datepicker._possibleChars(a.datepicker._get(c, "dateFormat")), d = String.fromCharCode(b.charCode ==
                k ? b.keyCode : b.charCode);
                return b.ctrlKey || b.metaKey || " " > d || !c || -1 < c.indexOf(d)
            }
        },
        _doKeyUp: function (b) {
            b = a.datepicker._getInst(b.target);
            if (b.input.val() != b.lastVal)try {
                if (a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, a.datepicker._getFormatConfig(b)))a.datepicker._setDateFromField(b), a.datepicker._updateAlternate(b), a.datepicker._updateDatepicker(b)
            } catch (c) {
                a.datepicker.log(c)
            }
            return !0
        },
        _showDatepicker: function (b) {
            b = b.target || b;
            "input" != b.nodeName.toLowerCase() &&
            (b = a("input", b.parentNode)[0]);
            if (!(a.datepicker._isDisabledDatepicker(b) || a.datepicker._lastInput == b)) {
                var c = a.datepicker._getInst(b);
                a.datepicker._curInst && a.datepicker._curInst != c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0]));
                var d = a.datepicker._get(c, "beforeShow"), d = d ? d.apply(b, [b, c]) : {};
                if (!1 !== d) {
                    f(c.settings, d);
                    c.lastVal = null;
                    a.datepicker._lastInput = b;
                    a.datepicker._setDateFromField(c);
                    a.datepicker._inDialog &&
                    (b.value = "");
                    a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight);
                    var h = !1;
                    a(b).parents().each(function () {
                        h = h | a(this).css("position") == "fixed";
                        return !h
                    });
                    d = {left: a.datepicker._pos[0], top: a.datepicker._pos[1]};
                    a.datepicker._pos = null;
                    c.dpDiv.empty();
                    c.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
                    a.datepicker._updateDatepicker(c);
                    d = a.datepicker._checkOffset(c, d, h);
                    c.dpDiv.css({
                        position: a.datepicker._inDialog && a.blockUI ? "static" : h ? "fixed" :
                            "absolute", display: "none", left: d.left + "px", top: d.top + "px"
                    });
                    if (!c.inline) {
                        var d = a.datepicker._get(c, "showAnim"), i = a.datepicker._get(c, "duration"), k = function () {
                            var b = c.dpDiv.find("iframe.ui-datepicker-cover");
                            if (b.length) {
                                var d = a.datepicker._getBorders(c.dpDiv);
                                b.css({
                                    left: -d[0],
                                    top: -d[1],
                                    width: c.dpDiv.outerWidth(),
                                    height: c.dpDiv.outerHeight()
                                })
                            }
                        };
                        c.dpDiv.zIndex(a(b).zIndex() + 1);
                        a.datepicker._datepickerShowing = !0;
                        if (a.effects && (a.effects.effect[d] || a.effects[d]))c.dpDiv.show(d, a.datepicker._get(c,
                            "showOptions"), i, k); else c.dpDiv[d || "show"](d ? i : null, k);
                        (!d || !i) && k();
                        c.input.is(":visible") && !c.input.is(":disabled") && c.input.focus();
                        a.datepicker._curInst = c
                    }
                }
            }
        },
        _updateDatepicker: function (b) {
            this.maxRows = 4;
            var c = a.datepicker._getBorders(b.dpDiv);
            n = b;
            b.dpDiv.empty().append(this._generateHTML(b));
            this._attachHandlers(b);
            var d = b.dpDiv.find("iframe.ui-datepicker-cover");
            d.length && d.css({left: -c[0], top: -c[1], width: b.dpDiv.outerWidth(), height: b.dpDiv.outerHeight()});
            b.dpDiv.find("." + this._dayOverClass +
            " a").mouseover();
            c = this._getNumberOfMonths(b);
            d = c[1];
            b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            1 < d && b.dpDiv.addClass("ui-datepicker-multi-" + d).css("width", 17 * d + "em");
            b.dpDiv[(1 != c[0] || 1 != c[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            b == a.datepicker._curInst && (a.datepicker._datepickerShowing && b.input && b.input.is(":visible") && !b.input.is(":disabled") && b.input[0] !=
            document.activeElement) && b.input.focus();
            if (b.yearshtml) {
                var f = b.yearshtml;
                setTimeout(function () {
                    f === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml);
                    f = b.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (a) {
            var c = function (a) {
                return {thin: 1, medium: 2, thick: 3}[a] || a
            };
            return [parseFloat(c(a.css("border-left-width"))), parseFloat(c(a.css("border-top-width")))]
        },
        _checkOffset: function (b, c, d) {
            var f = b.dpDiv.outerWidth(), h = b.dpDiv.outerHeight(), i = b.input ? b.input.outerWidth() :
                0, k = b.input ? b.input.outerHeight() : 0, n = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()), q = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
            c.left -= this._get(b, "isRTL") ? f - i : 0;
            c.left -= d && c.left == b.input.offset().left ? a(document).scrollLeft() : 0;
            c.top -= d && c.top == b.input.offset().top + k ? a(document).scrollTop() : 0;
            c.left -= Math.min(c.left, c.left + f > n && n > f ? Math.abs(c.left + f - n) : 0);
            c.top -= Math.min(c.top, c.top + h > q && q > h ? Math.abs(h + k) : 0);
            return c
        },
        _findPos: function (b) {
            for (var c =
                this._getInst(b), c = this._get(c, "isRTL"); b && ("hidden" == b.type || 1 != b.nodeType || a.expr.filters.hidden(b));)b = b[c ? "previousSibling" : "nextSibling"];
            b = a(b).offset();
            return [b.left, b.top]
        },
        _hideDatepicker: function (b) {
            var c = this._curInst;
            if (c && !(b && c != a.data(b, "datepicker")) && this._datepickerShowing) {
                var b = this._get(c, "showAnim"), d = this._get(c, "duration"), f = function () {
                    a.datepicker._tidyDialog(c)
                };
                if (a.effects && (a.effects.effect[b] || a.effects[b]))c.dpDiv.hide(b, a.datepicker._get(c, "showOptions"), d, f); else c.dpDiv["slideDown" ==
                b ? "slideUp" : "fadeIn" == b ? "fadeOut" : "hide"](b ? d : null, f);
                b || f();
                this._datepickerShowing = !1;
                (b = this._get(c, "onClose")) && b.apply(c.input ? c.input[0] : null, [c.input ? c.input.val() : "", c]);
                this._lastInput = null;
                this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv)));
                this._inDialog = !1
            }
        },
        _tidyDialog: function (a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (b) {
            if (a.datepicker._curInst) {
                var b =
                    a(b.target), c = a.datepicker._getInst(b[0]);
                (b[0].id != a.datepicker._mainDivId && 0 == b.parents("#" + a.datepicker._mainDivId).length && !b.hasClass(a.datepicker.markerClassName) && !b.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && (!a.datepicker._inDialog || !a.blockUI) || b.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst != c) && a.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (b, c, d) {
            var b = a(b), f = this._getInst(b[0]);
            this._isDisabledDatepicker(b[0]) || (this._adjustInstDate(f,
                c + ("M" == d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
        },
        _gotoToday: function (b) {
            var b = a(b), c = this._getInst(b[0]);
            if (this._get(c, "gotoCurrent") && c.currentDay)c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear; else {
                var d = new Date;
                c.selectedDay = d.getDate();
                c.drawMonth = c.selectedMonth = d.getMonth();
                c.drawYear = c.selectedYear = d.getFullYear()
            }
            this._notifyChange(c);
            this._adjustDate(b)
        },
        _selectMonthYear: function (b, c, d) {
            var b = a(b),
                f = this._getInst(b[0]);
            f["selected" + ("M" == d ? "Month" : "Year")] = f["draw" + ("M" == d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10);
            this._notifyChange(f);
            this._adjustDate(b)
        },
        _selectDay: function (b, c, d, f) {
            var h = a(b);
            !a(f).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(h[0]) && (h = this._getInst(h[0]), h.selectedDay = h.currentDay = a("a", f).html(), h.selectedMonth = h.currentMonth = c, h.selectedYear = h.currentYear = d, this._selectDate(b, this._formatDate(h, h.currentDay, h.currentMonth, h.currentYear)))
        },
        _clearDate: function (b) {
            b = a(b);
            this._getInst(b[0]);
            this._selectDate(b, "")
        },
        _selectDate: function (b, c) {
            var d = a(b), d = this._getInst(d[0]), c = null != c ? c : this._formatDate(d);
            d.input && d.input.val(c);
            this._updateAlternate(d);
            var f = this._get(d, "onSelect");
            f ? f.apply(d.input ? d.input[0] : null, [c, d]) : d.input && d.input.trigger("change");
            d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], "object" != typeof d.input[0] && d.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (b) {
            var c =
                this._get(b, "altField");
            if (c) {
                var d = this._get(b, "altFormat") || this._get(b, "dateFormat"), f = this._getDate(b), h = this.formatDate(d, f, this._getFormatConfig(b));
                a(c).each(function () {
                    a(this).val(h)
                })
            }
        },
        noWeekends: function (a) {
            a = a.getDay();
            return [0 < a && 6 > a, ""]
        },
        iso8601Week: function (a) {
            a = new Date(a.getTime());
            a.setDate(a.getDate() + 4 - (a.getDay() || 7));
            var c = a.getTime();
            a.setMonth(0);
            a.setDate(1);
            return Math.floor(Math.round((c - a) / 864E5) / 7) + 1
        },
        parseDate: function (b, c, d) {
            if (null == b || null == c)throw"Invalid arguments";
            c = "object" == typeof c ? c.toString() : c + "";
            if ("" == c)return null;
            for (var f = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff, f = "string" != typeof f ? f : (new Date).getFullYear() % 100 + parseInt(f, 10), h = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort, i = (d ? d.dayNames : null) || this._defaults.dayNames, k = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort, n = (d ? d.monthNames : null) || this._defaults.monthNames, q = d = -1, C = -1, J = -1, I = !1, H = function (a) {
                    (a = ga + 1 < b.length && b.charAt(ga + 1) == a) && ga++;
                    return a
                },
                     z = function (a) {
                         var b = H(a), a = RegExp("^\\d{1," + ("@" == a ? 14 : "!" == a ? 20 : "y" == a && b ? 4 : "o" == a ? 3 : 2) + "}"), a = c.substring(M).match(a);
                         if (!a)throw"Missing number at position " + M;
                         M += a[0].length;
                         return parseInt(a[0], 10)
                     }, F = function (b, d, f) {
                    var b = a.map(H(b) ? f : d, function (a, b) {
                        return [[b, a]]
                    }).sort(function (a, b) {
                        return -(a[1].length - b[1].length)
                    }), g = -1;
                    a.each(b, function (a, b) {
                        var d = b[1];
                        if (c.substr(M, d.length).toLowerCase() == d.toLowerCase())return g = b[0], M += d.length, !1
                    });
                    if (-1 != g)return g + 1;
                    throw"Unknown name at position " +
                    M;
                }, U = function () {
                    if (c.charAt(M) != b.charAt(ga))throw"Unexpected literal at position " + M;
                    M++
                }, M = 0, ga = 0; ga < b.length; ga++)if (I)"'" == b.charAt(ga) && !H("'") ? I = !1 : U(); else switch (b.charAt(ga)) {
                case "d":
                    C = z("d");
                    break;
                case "D":
                    F("D", h, i);
                    break;
                case "o":
                    J = z("o");
                    break;
                case "m":
                    q = z("m");
                    break;
                case "M":
                    q = F("M", k, n);
                    break;
                case "y":
                    d = z("y");
                    break;
                case "@":
                    var ca = new Date(z("@")), d = ca.getFullYear(), q = ca.getMonth() + 1, C = ca.getDate();
                    break;
                case "!":
                    ca = new Date((z("!") - this._ticksTo1970) / 1E4);
                    d = ca.getFullYear();
                    q = ca.getMonth() +
                    1;
                    C = ca.getDate();
                    break;
                case "'":
                    H("'") ? U() : I = !0;
                    break;
                default:
                    U()
            }
            if (M < c.length && (h = c.substr(M), !/^\s+/.test(h)))throw"Extra/unparsed characters found in date: " + h;
            -1 == d ? d = (new Date).getFullYear() : 100 > d && (d += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d <= f ? 0 : -100));
            if (-1 < J) {
                q = 1;
                C = J;
                do {
                    f = this._getDaysInMonth(d, q - 1);
                    if (C <= f)break;
                    q++;
                    C -= f
                } while (1)
            }
            ca = this._daylightSavingAdjust(new Date(d, q - 1, C));
            if (ca.getFullYear() != d || ca.getMonth() + 1 != q || ca.getDate() != C)throw"Invalid date";
            return ca
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864E9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (a, c, d) {
            if (!c)return "";
            var f = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort, h = (d ? d.dayNames : null) || this._defaults.dayNames, i = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort, d = (d ? d.monthNames :
                    null) || this._defaults.monthNames, k = function (c) {
                (c = J + 1 < a.length && a.charAt(J + 1) == c) && J++;
                return c
            }, n = function (a, b, c) {
                b = "" + b;
                if (k(a))for (; b.length < c;)b = "0" + b;
                return b
            }, q = "", C = !1;
            if (c)for (var J = 0; J < a.length; J++)if (C)"'" == a.charAt(J) && !k("'") ? C = !1 : q += a.charAt(J); else switch (a.charAt(J)) {
                case "d":
                    q += n("d", c.getDate(), 2);
                    break;
                case "D":
                    var I;
                    I = c.getDay();
                    var H = f, z = h;
                    I = k("D") ? z[I] : H[I];
                    q += I;
                    break;
                case "o":
                    q += n("o", Math.round(((new Date(c.getFullYear(), c.getMonth(), c.getDate())).getTime() - (new Date(c.getFullYear(),
                        0, 0)).getTime()) / 864E5), 3);
                    break;
                case "m":
                    q += n("m", c.getMonth() + 1, 2);
                    break;
                case "M":
                    I = c.getMonth();
                    H = i;
                    z = d;
                    I = k("M") ? z[I] : H[I];
                    q += I;
                    break;
                case "y":
                    q += k("y") ? c.getFullYear() : (10 > c.getYear() % 100 ? "0" : "") + c.getYear() % 100;
                    break;
                case "@":
                    q += c.getTime();
                    break;
                case "!":
                    q += 1E4 * c.getTime() + this._ticksTo1970;
                    break;
                case "'":
                    k("'") ? q += "'" : C = !0;
                    break;
                default:
                    q += a.charAt(J)
            }
            return q
        },
        _possibleChars: function (a) {
            for (var c = "", d = !1, f = function (c) {
                (c = h + 1 < a.length && a.charAt(h + 1) == c) && h++;
                return c
            }, h = 0; h < a.length; h++)if (d)"'" ==
            a.charAt(h) && !f("'") ? d = !1 : c += a.charAt(h); else switch (a.charAt(h)) {
                case "d":
                case "m":
                case "y":
                case "@":
                    c += "0123456789";
                    break;
                case "D":
                case "M":
                    return null;
                case "'":
                    f("'") ? c += "'" : d = !0;
                    break;
                default:
                    c += a.charAt(h)
            }
            return c
        },
        _get: function (a, c) {
            return a.settings[c] !== k ? a.settings[c] : this._defaults[c]
        },
        _setDateFromField: function (a, c) {
            if (a.input.val() != a.lastVal) {
                var d = this._get(a, "dateFormat"), f = a.lastVal = a.input ? a.input.val() : null, h, i;
                h = i = this._getDefaultDate(a);
                var k = this._getFormatConfig(a);
                try {
                    h = this.parseDate(d,
                        f, k) || i
                } catch (n) {
                    this.log(n), f = c ? "" : f
                }
                a.selectedDay = h.getDate();
                a.drawMonth = a.selectedMonth = h.getMonth();
                a.drawYear = a.selectedYear = h.getFullYear();
                a.currentDay = f ? h.getDate() : 0;
                a.currentMonth = f ? h.getMonth() : 0;
                a.currentYear = f ? h.getFullYear() : 0;
                this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function (a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function (b, c, d) {
            if (null == c || "" === c)c = d; else {
                var f;
                if ("string" == typeof c)a:{
                    try {
                        f = a.datepicker.parseDate(a.datepicker._get(b,
                            "dateFormat"), c, a.datepicker._getFormatConfig(b));
                        break a
                    } catch (h) {
                    }
                    var i = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, b = i.getFullYear();
                    f = i.getMonth();
                    for (var i = i.getDate(), k = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, n = k.exec(c); n;) {
                        switch (n[2] || "d") {
                            case "d":
                            case "D":
                                i += parseInt(n[1], 10);
                                break;
                            case "w":
                            case "W":
                                i += 7 * parseInt(n[1], 10);
                                break;
                            case "m":
                            case "M":
                                f += parseInt(n[1], 10);
                                i = Math.min(i, a.datepicker._getDaysInMonth(b, f));
                                break;
                            case "y":
                            case "Y":
                                b += parseInt(n[1], 10), i = Math.min(i,
                                    a.datepicker._getDaysInMonth(b, f))
                        }
                        n = k.exec(c)
                    }
                    f = new Date(b, f, i)
                } else"number" == typeof c ? isNaN(c) ? c = d : (b = new Date, b.setDate(b.getDate() + c), c = b) : c = new Date(c.getTime()), f = c;
                c = f
            }
            if (c = c && "Invalid Date" == c.toString() ? d : c)c.setHours(0), c.setMinutes(0), c.setSeconds(0), c.setMilliseconds(0);
            return this._daylightSavingAdjust(c)
        },
        _daylightSavingAdjust: function (a) {
            if (!a)return null;
            a.setHours(12 < a.getHours() ? a.getHours() + 2 : 0);
            return a
        },
        _setDate: function (a, c, d) {
            var f = !c, h = a.selectedMonth, i = a.selectedYear, c = this._restrictMinMax(a,
                this._determineDate(a, c, new Date));
            a.selectedDay = a.currentDay = c.getDate();
            a.drawMonth = a.selectedMonth = a.currentMonth = c.getMonth();
            a.drawYear = a.selectedYear = a.currentYear = c.getFullYear();
            (h != a.selectedMonth || i != a.selectedYear) && !d && this._notifyChange(a);
            this._adjustInstDate(a);
            a.input && a.input.val(f ? "" : this._formatDate(a))
        },
        _getDate: function (a) {
            return !a.currentYear || a.input && "" == a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay))
        },
        _attachHandlers: function (b) {
            var c =
                this._get(b, "stepMonths"), f = "#" + b.id.replace(/\\\\/g, "\\");
            b.dpDiv.find("[data-handler]").map(function () {
                a(this).bind(this.getAttribute("data-event"), {
                    prev: function () {
                        window["DP_jQuery_" + d].datepicker._adjustDate(f, -c, "M")
                    }, next: function () {
                        window["DP_jQuery_" + d].datepicker._adjustDate(f, +c, "M")
                    }, hide: function () {
                        window["DP_jQuery_" + d].datepicker._hideDatepicker()
                    }, today: function () {
                        window["DP_jQuery_" + d].datepicker._gotoToday(f)
                    }, selectDay: function () {
                        window["DP_jQuery_" + d].datepicker._selectDay(f, +this.getAttribute("data-month"),
                            +this.getAttribute("data-year"), this);
                        return !1
                    }, selectMonth: function () {
                        window["DP_jQuery_" + d].datepicker._selectMonthYear(f, this, "M");
                        return !1
                    }, selectYear: function () {
                        window["DP_jQuery_" + d].datepicker._selectMonthYear(f, this, "Y");
                        return !1
                    }
                }[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (b) {
            var c = new Date, c = this._daylightSavingAdjust(new Date(c.getFullYear(), c.getMonth(), c.getDate())), d = this._get(b, "isRTL"), f = this._get(b, "showButtonPanel"), h = this._get(b, "hideIfNoPrevNext"), i = this._get(b,
                "navigationAsDateFormat"), k = this._getNumberOfMonths(b), n = this._get(b, "showCurrentAtPos"), q = this._get(b, "stepMonths"), C = 1 != k[0] || 1 != k[1], J = this._daylightSavingAdjust(!b.currentDay ? new Date(9999, 9, 9) : new Date(b.currentYear, b.currentMonth, b.currentDay)), I = this._getMinMaxDate(b, "min"), H = this._getMinMaxDate(b, "max"), n = b.drawMonth - n, z = b.drawYear;
            0 > n && (n += 12, z--);
            if (H)for (var F = this._daylightSavingAdjust(new Date(H.getFullYear(), H.getMonth() - k[0] * k[1] + 1, H.getDate())), F = I && F < I ? I : F; this._daylightSavingAdjust(new Date(z,
                n, 1)) > F;)n--, 0 > n && (n = 11, z--);
            b.drawMonth = n;
            b.drawYear = z;
            var F = this._get(b, "prevText"), F = !i ? F : this.formatDate(F, this._daylightSavingAdjust(new Date(z, n - q, 1)), this._getFormatConfig(b)), F = this._canAdjustMonth(b, -1, z, n) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + F + '"><span class="ui-icon ui-icon-circle-triangle-' + (d ? "e" : "w") + '">' + F + "</span></a>" : h ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + F + '"><span class="ui-icon ui-icon-circle-triangle-' +
            (d ? "e" : "w") + '">' + F + "</span></a>", U = this._get(b, "nextText"), U = !i ? U : this.formatDate(U, this._daylightSavingAdjust(new Date(z, n + q, 1)), this._getFormatConfig(b)), h = this._canAdjustMonth(b, 1, z, n) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + U + '"><span class="ui-icon ui-icon-circle-triangle-' + (d ? "w" : "e") + '">' + U + "</span></a>" : h ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + U + '"><span class="ui-icon ui-icon-circle-triangle-' + (d ? "w" :
                "e") + '">' + U + "</span></a>", q = this._get(b, "currentText"), U = this._get(b, "gotoCurrent") && b.currentDay ? J : c, q = !i ? q : this.formatDate(q, U, this._getFormatConfig(b)), i = !b.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(b, "closeText") + "</button>" : "", f = f ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (d ? i : "") + (this._isInRange(b, U) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' +
            q + "</button>" : "") + (d ? "" : i) + "</div>" : "", i = parseInt(this._get(b, "firstDay"), 10), i = isNaN(i) ? 0 : i, q = this._get(b, "showWeek"), U = this._get(b, "dayNames");
            this._get(b, "dayNamesShort");
            var M = this._get(b, "dayNamesMin"), ga = this._get(b, "monthNames"), ca = this._get(b, "monthNamesShort"), jb = this._get(b, "beforeShowDay"), G = this._get(b, "showOtherMonths"), ib = this._get(b, "selectOtherMonths");
            this._get(b, "calculateWeek");
            for (var La = this._getDefaultDate(b), w = "", p = 0; p < k[0]; p++) {
                var A = "";
                this.maxRows = 4;
                for (var T = 0; T < k[1]; T++) {
                    var X =
                        this._daylightSavingAdjust(new Date(z, n, b.selectedDay)), O = " ui-corner-all", V = "";
                    if (C) {
                        V += '<div class="ui-datepicker-group';
                        if (1 < k[1])switch (T) {
                            case 0:
                                V += " ui-datepicker-group-first";
                                O = " ui-corner-" + (d ? "right" : "left");
                                break;
                            case k[1] - 1:
                                V += " ui-datepicker-group-last";
                                O = " ui-corner-" + (d ? "left" : "right");
                                break;
                            default:
                                V += " ui-datepicker-group-middle", O = ""
                        }
                        V += '">'
                    }
                    for (var V = V + ('<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + O + '">' + (/all|left/.test(O) && 0 == p ? d ? h : F : "") + (/all|right/.test(O) &&
                        0 == p ? d ? F : h : "") + this._generateMonthYearHeader(b, n, z, I, H, 0 < p || 0 < T, ga, ca) + '</div><table class="ui-datepicker-calendar"><thead><tr>'), Y = q ? '<th class="ui-datepicker-week-col">' + this._get(b, "weekHeader") + "</th>" : "", O = 0; 7 > O; O++)var R = (O + i) % 7, Y = Y + ("<th" + (5 <= (O + i + 6) % 7 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + U[R] + '">' + M[R] + "</span></th>");
                    V += Y + "</tr></thead><tbody>";
                    Y = this._getDaysInMonth(z, n);
                    z == b.selectedYear && n == b.selectedMonth && (b.selectedDay = Math.min(b.selectedDay, Y));
                    O = (this._getFirstDayOfMonth(z,
                        n) - i + 7) % 7;
                    Y = Math.ceil((O + Y) / 7);
                    this.maxRows = Y = C ? this.maxRows > Y ? this.maxRows : Y : Y;
                    for (var R = this._daylightSavingAdjust(new Date(z, n, 1 - O)), ea = 0; ea < Y; ea++) {
                        for (var V = V + "<tr>", Ra = !q ? "" : '<td class="ui-datepicker-week-col">' + this._get(b, "calculateWeek")(R) + "</td>", O = 0; 7 > O; O++) {
                            var Da = jb ? jb.apply(b.input ? b.input[0] : null, [R]) : [!0, ""], Z = R.getMonth() != n, ua = Z && !ib || !Da[0] || I && R < I || H && R > H, Ra = Ra + ('<td class="' + (5 <= (O + i + 6) % 7 ? " ui-datepicker-week-end" : "") + (Z ? " ui-datepicker-other-month" : "") + (R.getTime() == X.getTime() &&
                                n == b.selectedMonth && b._keyEvent || La.getTime() == R.getTime() && La.getTime() == X.getTime() ? " " + this._dayOverClass : "") + (ua ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Z && !G ? "" : " " + Da[1] + (R.getTime() == J.getTime() ? " " + this._currentClass : "") + (R.getTime() == c.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!Z || G) && Da[2] ? ' title="' + Da[2] + '"' : "") + (ua ? "" : ' data-handler="selectDay" data-event="click" data-month="' + R.getMonth() + '" data-year="' + R.getFullYear() + '"') + ">" + (Z && !G ? "&#xa0;" : ua ? '<span class="ui-state-default">' +
                                R.getDate() + "</span>" : '<a class="ui-state-default' + (R.getTime() == c.getTime() ? " ui-state-highlight" : "") + (R.getTime() == J.getTime() ? " ui-state-active" : "") + (Z ? " ui-priority-secondary" : "") + '" href="#">' + R.getDate() + "</a>") + "</td>");
                            R.setDate(R.getDate() + 1);
                            R = this._daylightSavingAdjust(R)
                        }
                        V += Ra + "</tr>"
                    }
                    n++;
                    11 < n && (n = 0, z++);
                    V += "</tbody></table>" + (C ? "</div>" + (0 < k[0] && T == k[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    A += V
                }
                w += A
            }
            w += f + (a.ui.ie6 && !b.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' :
                "");
            b._keyEvent = !1;
            return w
        },
        _generateMonthYearHeader: function (a, c, d, f, h, i, k, n) {
            var q = this._get(a, "changeMonth"), C = this._get(a, "changeYear"), J = this._get(a, "showMonthAfterYear"), I = '<div class="ui-datepicker-title">', H = "";
            if (i || !q)H += '<span class="ui-datepicker-month">' + k[c] + "</span>"; else {
                for (var k = f && f.getFullYear() == d, z = h && h.getFullYear() == d, H = H + '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">', F = 0; 12 > F; F++)if ((!k || F >= f.getMonth()) && (!z || F <= h.getMonth()))H += '<option value="' +
                F + '"' + (F == c ? ' selected="selected"' : "") + ">" + n[F] + "</option>";
                H += "</select>"
            }
            J || (I += H + (i || !q || !C ? "&#xa0;" : ""));
            if (!a.yearshtml)if (a.yearshtml = "", i || !C)I += '<span class="ui-datepicker-year">' + d + "</span>"; else {
                var n = this._get(a, "yearRange").split(":"), U = (new Date).getFullYear(), k = function (a) {
                    a = a.match(/c[+-].*/) ? d + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? U + parseInt(a, 10) : parseInt(a, 10);
                    return isNaN(a) ? U : a
                }, c = k(n[0]), n = Math.max(c, k(n[1] || "")), c = f ? Math.max(c, f.getFullYear()) : c, n = h ? Math.min(n, h.getFullYear()) :
                    n;
                for (a.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; c <= n; c++)a.yearshtml += '<option value="' + c + '"' + (c == d ? ' selected="selected"' : "") + ">" + c + "</option>";
                a.yearshtml += "</select>";
                I += a.yearshtml;
                a.yearshtml = null
            }
            I += this._get(a, "yearSuffix");
            J && (I += (i || !q || !C ? "&#xa0;" : "") + H);
            return I + "</div>"
        },
        _adjustInstDate: function (a, c, d) {
            var f = a.drawYear + ("Y" == d ? c : 0), h = a.drawMonth + ("M" == d ? c : 0), c = Math.min(a.selectedDay, this._getDaysInMonth(f, h)) + ("D" == d ? c : 0), f = this._restrictMinMax(a,
                this._daylightSavingAdjust(new Date(f, h, c)));
            a.selectedDay = f.getDate();
            a.drawMonth = a.selectedMonth = f.getMonth();
            a.drawYear = a.selectedYear = f.getFullYear();
            ("M" == d || "Y" == d) && this._notifyChange(a)
        },
        _restrictMinMax: function (a, c) {
            var d = this._getMinMaxDate(a, "min"), f = this._getMinMaxDate(a, "max"), d = d && c < d ? d : c;
            return f && d > f ? f : d
        },
        _notifyChange: function (a) {
            var c = this._get(a, "onChangeMonthYear");
            c && c.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function (a) {
            a = this._get(a,
                "numberOfMonths");
            return null == a ? [1, 1] : "number" == typeof a ? [1, a] : a
        },
        _getMinMaxDate: function (a, c) {
            return this._determineDate(a, this._get(a, c + "Date"), null)
        },
        _getDaysInMonth: function (a, c) {
            return 32 - this._daylightSavingAdjust(new Date(a, c, 32)).getDate()
        },
        _getFirstDayOfMonth: function (a, c) {
            return (new Date(a, c, 1)).getDay()
        },
        _canAdjustMonth: function (a, c, d, f) {
            var h = this._getNumberOfMonths(a), d = this._daylightSavingAdjust(new Date(d, f + (0 > c ? c : h[0] * h[1]), 1));
            0 > c && d.setDate(this._getDaysInMonth(d.getFullYear(),
                d.getMonth()));
            return this._isInRange(a, d)
        },
        _isInRange: function (a, c) {
            var d = this._getMinMaxDate(a, "min"), f = this._getMinMaxDate(a, "max");
            return (!d || c.getTime() >= d.getTime()) && (!f || c.getTime() <= f.getTime())
        },
        _getFormatConfig: function (a) {
            var c = this._get(a, "shortYearCutoff"), c = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10);
            return {
                shortYearCutoff: c,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a,
                    "monthNames")
            }
        },
        _formatDate: function (a, c, d, f) {
            c || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            c = c ? "object" == typeof c ? c : this._daylightSavingAdjust(new Date(f, d, c)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), c, this._getFormatConfig(a))
        }
    });
    a.fn.datepicker = function (b) {
        if (!this.length)return this;
        a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick).find(document.body).append(a.datepicker.dpDiv),
            a.datepicker.initialized = !0);
        var c = Array.prototype.slice.call(arguments, 1);
        return "string" == typeof b && ("isDisabled" == b || "getDate" == b || "widget" == b) || "option" == b && 2 == arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function () {
            typeof b == "string" ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
        })
    };
    a.datepicker = new i;
    a.datepicker.initialized = !1;
    a.datepicker.uuid =
        (new Date).getTime();
    a.datepicker.version = "1.9.2";
    window["DP_jQuery_" + d] = a
})(jQuery);