$(document).ready(function() {

  $('#AddNewForm').on('submit', function(event) {
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url   : '/urls',
      data: {'newURL': $(this).serializeArray()[0].value}
    }).then(function(err) {
      if(err) {
      }
      else {
      }
    })
  })

})
