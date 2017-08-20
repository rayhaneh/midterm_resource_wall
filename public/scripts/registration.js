// This file includes all the javascript code for registration page

$(document).ready(function() {

  // Add an event listener to registration form and check the input fields.
  $('#registration-form').on('submit', function (event) {

    event.preventDefault()

    let name     = $(this).serializeArray()[0].value
    let email    = $(this).serializeArray()[1].value
    let password = $(this).serializeArray()[2].value

    // Validate the input fields
    let error = validateRegistration(name, email, password)

    if (error) {
      $('#registration-form .error').remove()
      $('#registration-form').append($('<div>').addClass('error').text(error))
    }
    else {
      $.ajax({
        method: 'POST',
        url: '/register',
        data: $('#registration-form').serialize()
      }).then(function(error) {
        if (error) {
          $('#registration-form .error').remove()
          $('#registration-form').append($('<div>').addClass('error').text(error))
        }
        else {
          $(location).attr('href', '/urls')
        }
      })

    }

    $(this).trigger('reset')

  })


  $('#registration-form input').on('click', function (event) {
    $('#registration-form .error').remove()
  })

})
