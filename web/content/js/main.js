$(function() {
   // $('.textfield__input.date').daterangepicker();
   $('.textfield__input.date').daterangepicker({
      timePickerIncrement: 30,
      locale: {
           format: 'DD/MM/YYYY'
      }
   });
})
