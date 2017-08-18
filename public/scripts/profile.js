$(document).ready(function() {

  // Load all URLs first
  loadURLs()

  // Make an ajax call to the server to save the new URL
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
        // Reload the new URL
        loadURLs()
        console.log(err)
      }
    })
    $(this).trigger('reset')
  })

  //Initially form wil be hidden.
  $('#newForm, #editinfo').hide();

  $('#plus').click(function() {
    $('#newForm').toggle();//Form toggles on button clic
     $('#editinfo').hide();
    //Initially form wil be hidden.
  })

  $('#editprofile').click(function() {
    $('#editinfo').toggle();//Form toggles on button click
      $('#newForm').hide();
  })

})






function loadURLs () {
  $('#urls-container').html('')
  $('#urls-container').append($('<div>').addClass('row').addClass('justify-content-center'))


  $.ajax({
    method: 'GET',
    url: '/users/1/urls',
  }).then(function(response) {
      renderURLS(response)
  })
}



// Renders all the URLS in the database and adds them to the DOM (one by one)

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
                .append($('<main>').addClass('textbox')
                    .append($('<p>').text(url.Desc))
                    )
                .append($('<footer>')
                    .append($ratingStars))




  return $url
}
























