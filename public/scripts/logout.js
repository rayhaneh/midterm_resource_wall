$(document).ready(function() {
  $('#logoutlink').on('click', function (event) {

    event.preventDefault()

    $.ajax({
        method: 'POST',
        url: '/logout',
      }).then(function(error) {
        $(location).attr('href', '/login')
      })

  })
})
