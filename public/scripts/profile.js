$(document).ready(function() {


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
        //console.log("I'm fine")
      }
    })
  })

  //Initially form wil be hidden.
  $('#newForm','#editinfo').hide();

  $('#plus').click(function() {
    $('#newForm').toggle();//Form toggles on button clic
    //Initially form wil be hidden.
  })

  $('#edit').click(function() {
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

}





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

}
























