$(document).ready(function() {

  $('#newForm').on('submit', function(event) {
    let newURL = {
      URL           : $(this).serializeArray()[0].value,
      Title         : $(this).serializeArray()[1].value,
      Desc          : $(this).serializeArray()[0].value,
      overallRating : 0
    }
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url   : '/urls',
      data  : {'newURL': newURL}
    }).then(function(err) {
      if(err) {
      }
      else {
      }
    })
  })
  $('#newForm','#editinfo').hide(); //Initially form wil be hidden.
  $('#plus').click(function() {
    $('#newForm').toggle();//Form toggles on button clic
    //Initially form wil be hidden.
  $('#edit').click(function() {
    $('#editinfo').toggle();//Form toggles on button click
  });
})
