$(function () {

    var first_year = '.first_year';
    var second_year = '.second_year';
    var first_month = '.first_month';
    var second_month = '.second_month';
    var first_day = '.first_day';
    var second_day = '.second_day';
    var dates = JSON.parse($('#form_date_resa').val());
    var startDate = dates.arrival;
    var endDate = dates.departure;

    function convertDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        date = yyyy + '-' + mm + '-' + dd;
        return date;
    }

    var todayDate = new Date();
    todayDate.setHours(00);


    var dateRange = [];
    if (startDate.length == endDate.length) {
        for (var i = 0; i < startDate.length; i++) {
            for (var d = new Date(startDate[i]); d <= new Date(endDate[i]); d.setDate(d.getDate() + 1)) {
                dateRange.push($.datepicker.formatDate('dd-mm-yy', d));
            }
        }
    }

    $(".textfield__input.date").daterangepicker({
        datepickerOptions: {
            closeText: 'Fermer',
            prevText: 'Précédent',
            nextText: 'Suivant',
            currentText: 'Aujourd\'hui',
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
            dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            weekHeader: 'Sem.',
            dateFormat: 'dd-mm-yy',
            numberOfMonths: 1,
            minDate: todayDate,
            maxDate: null,
            beforeShowDay: function (date) {
                var dateString = jQuery.datepicker.formatDate('dd-mm-yy', date);
                if ($.inArray(dateString, dateRange) != -1) {
                    return [false, 'reserved'];
                }
                else if (convertDate(date) >= convertDate(todayDate)) {
                    return [true, 'available'];
                }
                else {
                    return [false, "disabled"];
                }

            }, onSelect: function (selectedDate) {
                var date = selectedDate.match(/\d+/g);
                var tableMonth = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
                var monthNb = parseInt(date[1]) - 1;

                if ($(first_day).hasClass("fill")) {
                    $(second_day).html(date[0]);
                    $(second_month).html(tableMonth[monthNb]);
                    $(second_year).html(date[2]);
                    $(first_day).removeClass("fill");
                } else {
                    $(first_day).html(date[0]).addClass("fill");
                    $(first_month).html(tableMonth[monthNb]).addClass("fill");
                    $(first_year).html(date[2]).addClass("fill");
                }

                console.log(selectedDate);
                //test(selectedDate);
            }
            //console.log(dateStr);

        },
        onChange: function () {
            //var test = $(".textfield__input.date").daterangepicker("getHightlightedElements");
            var range = $(".textfield__input.date").daterangepicker("getRange");
            var startDate = range.start;
            var endDate = range.end;
            //console.log(startDate, endDate);
            //console.log(test);
        },
        presetRanges: [],
        presets: {dateRange: "Date Range"}

    });
    function test(selectedDate) {
        var parsedFilter = $('.parsedFilter');
        if (parsedFilter.length >= 0) {
            $(".textfield__input.date").daterangepicker({
                datepickerOptions: {
                    //minDate: selectedDate,
                    beforeShowDay: function (date) {
                        var from = selectedDate;
                        var numbers = from.match(/\d+/g);
                        var testDate = new Date(numbers[2] + "-" + numbers[1] + "-" + numbers[0]);
                        testDate.setHours(00);
                        if (convertDate(testDate) <= convertDate(date)) {
                            return [true, "available parsedFilter"];
                        } else {
                            return [false, "testfalse"];
                        }
                    }
                }
            });
        } else {
            console.log("false");
        }
    }
});

