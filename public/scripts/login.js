// Login Page Specific jQuery

$(document).ready(function() {
  $('#login-form').on('submit', function (event) {

    event.preventDefault()

    let email    = $(this).serializeArray()[0].value
    let password = $(this).serializeArray()[1].value

    let error = validateLogin(email, password)
    if (error) {
        $('#login-form .error').remove()
        $('#login-form').append($('<div>').addClass('error').text(error))
    }
    else {
      $.ajax({
        method: 'POST',
        url: '/login',
        data: $('#login-form').serialize()
      }).then(function(error) {
        if (error) {
          $('#login-form .error').remove()
          $('#login-form').append($('<div>').addClass('error').text(error))
        }
        else {
          $(location).attr('href', '/')
        }
      })

    }
    $(this).trigger('reset')

  })

})
