$(document).ready(function() {

  $('#newForm').on('submit', function(event) {
    console.log($(this).serializeArray()[0].value)
    console.log($(this).serializeArray()[1].value)
    console.log($(this).serializeArray()[2].value)
    console.log($(this).serializeArray()[3].value)

    let newURL = {
      URL           : $(this).serializeArray()[0].value,
      Title         : $(this).serializeArray()[1].value,
      Desc          : $(this).serializeArray()[2].value,
      cat_id        : $(this).serializeArray()[3].value,
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

})
