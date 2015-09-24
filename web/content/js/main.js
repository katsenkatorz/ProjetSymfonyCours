$(function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    var todayDate = new Date(today);
    todayDate.setHours(00);

    var startDate = "2015-09-25", // some start date
        endDate = "2015-09-28",  // some end date
        dateRange = [];           // array to hold the range

    for (var d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
        dateRange.push($.datepicker.formatDate('dd-mm-yy', d));
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
                console.log(date);
                console.log(todayDate);
                var dateString = jQuery.datepicker.formatDate('dd-mm-yy', date);

                if ($.inArray(dateString, dateRange) != -1) {
                    return [dateRange.indexOf(dateString) == -1, 'reserved'];
                }
                else if (date >= todayDate) {
                    alert('sdfs');
                    return [true, 'available'];
                }
                //else if (date == todayDate) {
                //    return [true, 'today'];
                //}
                else {
                    return [false, "disabled"];
                }
                //else {
                //    if (date == todayDate) {
                //        return [true, 'today'];
                //    }
                //}
            }
        },
        presetRanges: [],
        presets: {dateRange: "Date Range"}

    });

});
