// This file includes all the javascript code for the profile.ejs

$(document).ready(function() {

  // Load all URLs first
  loadURLs()

  // Make an ajax call to the server to save the new URL
  $('#newForm').on('submit', function(event) {

    event.preventDefault()

    let newURL = {
      URL           : $(this).serializeArray()[0].value,
      Title         : $(this).serializeArray()[1].value,
      cat_id        : $(this).serializeArray()[2].value,
      Desc          : $(this).serializeArray()[3].value,
      overallRating : 0
    }

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
        // Reload the new URL

        loadURLs()
        console.log(err)

      }
    })
    $(this).trigger('reset')
  })


  // Make an ajax call to the server when user edits their profile
  $('#editinfo').on('submit', function(event) {
    event.preventDefault()

    let id    = $('#editinfo').attr('userid')
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
  $('#newForm, #editinfo').hide();

  $('#plus').click(function() {
    $('#newForm').toggle();
     $('#editinfo').hide();
  })

  // Add listener to the edit form button and slide it up and down (initially form wil be hidden)
  $('#editprofile').click(function() {
    $('#editinfo').toggle();
      $('#newForm').hide();
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



  let $url = $('<div>').addClass('col-lg-3')
                .append($('<header>').addClass('head')
                  .append($('<h5>')
                    .append($('<a>').attr('id','theTitle').attr('href',`/urls/${url.id}`).text(url.Title))
                    )
                  )
                .append($('<main>').addClass('textbox'))


  $.ajax({
    url: "http://api.linkpreview.net",
    dataType: 'jsonp',
    data: {q: url, key: '5999af0c8116d0cb15d2da6aeb47c10fee170ae37ec89'},
    success: function (response) {
      let imageURL = response.image
      $url.append($('<div>')
        .append($('<img>').attr('src', imageURL).attr('id', 'api-image'))
        )
        .append($('<p>').text(url.Desc))
        .append($('<footer>')
        .append($ratingStars))
    }
  })


  return $url
}










