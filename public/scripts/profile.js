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
        console.log("I'm in error", err);
      }
      else {
        // Deal with this later
        // Reload the new URL


        loadURLs(newURL)


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



  //Initially form wil be hidden.
  $('#newForm, #editinfo').hide();

  $('#plus').click(function() {
    $('#newForm').toggle();//Form toggles on button clic
    //Initially form wil be hidden.
  })

  $('#editprofile').click(function() {
    $('#editinfo').toggle();//Form toggles on button click
  })



function loadURLs (newURL) {
  //$('#').html('') // add the element
  $.ajax({
    url: '/users/:id/urls',
    method: 'GET'
  }).then(renderURLs(newURL));
}


//loadURLs();

}) //jQuery Ends

// Renders all the URLs in the database and adds them to the DOM (one by one)
function renderURLs(response) {
  let URLContainer = $('#siteContainer')

  response.forEach(function(resp) {
    let newArticle = createNewSiteElement(resp)
    $siteContainer.append(newArticle);
  });



// function loadURLs () {
//   $('#').html('') // add the element
//   $.ajax({
//     method: 'GET',
//     url: '/user/:id/URLS',
//   }).then(function(response) {
//       renderURLS(response)
//   })
// }






// Create a URL element (to be added to the DOM by renderTweets)
function createNewSiteElement(jSonData) {

  var newURL = (`
      <p><br/></p>
      <article>
        <header>
          <h5><a>${newURL.title}</a></h5>
        </header>
        <p>${newURL.Desc}</p>
        <footer>
          <span>RatingPlaceholder</span>
        </footer>
      </article>
    `);

    return `${newURL}`;


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
























