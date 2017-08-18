$(document).ready(function() {


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
        console.log(err)
      }
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
})






// function loadURLs () {
//   $('#').html('') // add the element
//   $.ajax({
//     method: 'GET',
//     url: '/user/:id/URLS',
//   }).then(function(response) {
//       renderURLS(response)
//   })
// }



// // Renders all the tweets in the database and adds them to the DOM (one by one)
// function renderTweets(tweets) {
//   let tweetsContainer = $('#tweets-container')
//   tweets.forEach(function(tweet) {
//     let tweetsArticle = createTweetElement(tweet)
//     tweetsContainer.prepend(tweetsArticle)
//   })

// }


// // Create a tweet element (to be added to the DOM by renderTweets)
// function createTweetElement(tweet) {

//   const time = timeStamp(Date.now(),tweet.created_at)

//   let $tweet = $('<article>').addClass('tweet')
//   .append($('<header>')
//         .append(`<img src='${tweet.user.avatars.small}'>`)
//         .append($('<div>').addClass('name').text(tweet.user.name))
//         .append($('<div>').addClass('handle').text(tweet.user.handle))
//     )
//   .append($('<main>').addClass('tweet')
//         .text(tweet.content.text)
//     )
//   .append($('<footer>')
//         .append($('<span>').addClass('time').text(time))
//         .append($('<span>').addClass('symbols')
//           .append($('<i>').addClass('fa').addClass('fa-flag')
//             .attr('aria-hidden',true)
//             )
//           .append($('<i>').addClass('fa').addClass('fa-retweet')
//             .attr('aria-hidden',true)
//             )
//           .append($('<i>').addClass('fa').addClass('fa-heart')
//             .addClass((tweet.like.indexOf(Cookies.get('email')) !== -1 ? 'liked': ''))
//             .attr('aria-hidden',true).data('_id',tweet._id).data('owner',tweet.user.email)
//             )
//           .append($('<span>').attr('id','like-counter').addClass('light')
//             .append(tweet.like.length)
//             )
//           )
//     )
//   console.log(Cookies.get('email'),tweet.like.indexOf(Cookies.get('email')))

//   return $tweet
// }
























