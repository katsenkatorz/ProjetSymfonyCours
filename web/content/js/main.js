$(function () {

    var startDate = "2015-09-25", // some start date
        endDate = "2015-09-28",  // some end date
        dateRange = [];           // array to hold the range

    console.log(new Date(startDate));
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
            minDate: 0,
            maxDate: null,
            beforeShowDay: function (date) {
                var dateString = jQuery.datepicker.formatDate('dd-mm-yy', date);
                return [dateRange.indexOf(dateString) == -1]
            }
        },
        presetRanges: [],
        presets: {dateRange: "Date Range"}

    });

});
