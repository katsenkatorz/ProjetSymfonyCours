$(function() {
   // $('.textfield__input.date').daterangepicker();
   $('.textfield__input.date').daterangepicker({
      timePickerIncrement: 30,
      isInvalidDate: {
         startDate : "24/09/2015",
         endDate : "27/09/2015",
      },
      locale: {
           format: 'DD/MM/YYYY'
      }
   });
})
