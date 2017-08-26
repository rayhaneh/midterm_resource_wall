// Login Page Specific jQuery

$(document).ready(function() {
  $('#login-form').on('submit', function (event) {

    event.preventDefault()

    let email    = $(this).serializeArray()[0].value
    let password = $(this).serializeArray()[1].value

    let error = validateLogin(email, password)
    if (error) {
        $('#login-form .loginerror').remove()
        $('#login-form').append($('<div>').addClass('loginerror').text(error))
    }
    else {
      $.ajax({
        method: 'POST',
        url: '/login',
        data: $('#login-form').serialize()
      }).then(function(error) {
        if (error) {
          $('#login-form .loginerror').remove()
          $('#login-form').append($('<div>').addClass('loginerror').text(error))
        }
        else {
          $(location).attr('href', '/urls')
        }
      })

    }
    $(this).trigger('reset')

  })


  $('#login-form input').on('click', function (event) {
    $('#login-form .loginerror').remove()
  })

})
