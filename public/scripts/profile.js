// This file includes all the javascript code for the profile.ejs

$(document).ready(function() {

  // Load all URLs first
  loadURLs()

  // Make an ajax call to the server to save the new URL
  $('#new-url-form').on('submit', function(event) {

    event.preventDefault()

    let newURL = {
      url           : $(this).serializeArray()[0].value,
      title         : $(this).serializeArray()[1].value,
      cat_id        : $(this).serializeArray()[2].value,
      description   : $(this).serializeArray()[3].value,
      overallRating : 0
    }

    let error = validateNewURL(newURL)

    const http  = new RegExp("http://")
    const https = new RegExp("https://")
    if (!(newURL.url.match(http)) && !(newURL.url.match(https))) {
      newURL.url = `http://${newURL.URL}`
    }


    if (error) {
      $('#new-url-form .error').remove()
      $('#new-url-form').append($('<div>').addClass('error').text(error))
    }
    else {
      $.ajax({
        method: 'POST',
        url   : '/urls',
        data  : {'newURL': newURL}
      }).then(function(err) {
        if(err) {
          $('#new-url-form .error').remove()
          $('#new-url-form').append($('<div>').addClass('error').text(error))
        }
        else {
          loadURLs()
        }
      })
      $(this).trigger('reset')
    }

  })



  // Make an ajax call to the server when user edits their profile
  $('#edit-profile-form').on('submit', function(event) {
    event.preventDefault()

    let id    = $('#edit-profile-form').attr('userid')
    let url   = `/users/${id}`
    let name  = $(this).serializeArray()[0].value
    let email = $(this).serializeArray()[1].value

    $.ajax({
      method: 'PUT',
      url   : url,
      data: {id: id, name: name, email: email}
    })
    .then(function(err) {
      $(location).attr('href', url)
    })
  })



  // Add listener to the new form button and slide it up and down (initially form wil be hidden)
  $('#new-url-form, #edit-profile-form').hide();

  $('#new-url-form-toggle').click(function() {
    $('#new-url-form').toggle();
     $('#edit-profile-form').hide();
  })

  // Add listener to the edit form button and slide it up and down (initially form wil be hidden)
  $('#edit-profile-form-toggle').click(function() {
    $('#edit-profile-form').toggle();
      $('#new-url-form').hide();
  })

})


function loadURLs () {
  let id  = $('#urls-container').attr('userid')
  let url = `/users/${id}/urls`


  $('#urls-container').html('')
  $('#urls-container').append($('<div>').addClass('row').addClass('justify-content-center'))

    $.ajax({
      method: 'GET',
      url: url,
    }).then(function(response) {
      renderURLS(response)
    })

  }



// Renders All URLs
function renderURLS(urls) {
  let urlsContainer = $('#urls-container div')

  urls.forEach(function(url) {
    let urlElement = createURLElement(url)
    urlsContainer.prepend(urlElement)
  })

}



// Create a URL element (to be added to the DOM by renderURLS)
function createURLElement(url) {

  let $ratingStars = $('<div>').addClass('rating')
  for (let i = 0; i < url.overallRating; i++) {
    $ratingStars.append($('<span>').html('<i class="fa fa-star" aria-hidden="true"></i>'))
  }
  for (let i = 0; i < 5 - url.overallRating; i++) {
    $ratingStars.append($('<span>').html('<i class="fa fa-star-o" aria-hidden="true"></i>'))
  }



  let $url = $('<div>').addClass('col-lg-4').addClass('urlcontainer')
                  .append($('<a>').attr('href',`/urls/${url.id}`)
                      .append($('<div>').addClass('url-image')
                        .append($('<img>').attr('src', url.image))
                        )
                      .append($('<div>').addClass('url-content')
                        .append($('<h4>').text(url.title))
                        .append($('<div>')
                          .append($('<p>').text(`${url.description.substring(0,200)} ...`))
                          )
                        .append($ratingStars)
                        )
                      )

  return $url
}










