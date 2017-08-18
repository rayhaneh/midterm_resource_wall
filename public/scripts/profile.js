$(document).ready(function() {

  $('#newForm').on('submit', function(event) {
    let newURL = {
      URL           : $(this).serializeArray()[0].value,
      Title         : $(this).serializeArray()[1].value,
      cat_id        : $(this).serializeArray()[2].value,
      Desc          : $(this).serializeArray()[3].value,
      overallRating : 0
    }
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url   : '/urls',
      data  : {'newURL': newURL}
    }).then(function(err) {
      if(err) {
        // Deal with this later
      }
      else {
        // Deal with this later
      }
    })
  })

  //Initially form wil be hidden.
  $('#newForm, #editinfo').hide();

  $('#plus').click(function() {
    $('#newForm').toggle();//Form toggles on button clic
    //Initially form wil be hidden.
  })

  $('#editprofile').click(function() {
    $('#editinfo').toggle();//Form toggles on button click
  })
})
