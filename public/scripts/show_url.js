$(document).ready(function() {

  // Load the number of all existing likes for this specific URL
  loadLikeCount()

  // Load all existing comments first
  loadComments()

  // Add a new listener to new comment form and wait for new comment submission
  $('#new-comment-form').on('submit', function(event) {
    event.preventDefault()

    let commentText = ''
    if ($(this).serializeArray()[0]){
      commentText = $(this).serializeArray()[0].value
    }

    let rating = ''
    if ($(this).serializeArray()[1]){
      rating = $(this).serializeArray()[1].value
    }

    let urlid = $('#new-comment-form').attr('URLid')
    let url   = `/urls/${urlid}/comments`

    let error = validateComment(commentText, rating)
    if (error) {
      $('#new-comment-form .container .commenterror').remove()
      $('#new-comment-form .container').append($('<div>').addClass('commenterror').text(error))
    }
    else{
      $.ajax({
        method: 'POST',
        url   : url,
        data  : {'content': commentText, 'rating': rating}
      }).then(function(error) {
        if (error) {
          $('#new-comment-form .container .commenterror').remove()
          $('#new-comment-form .container').append($('<div>').addClass('commenterror').text(error))
        }
        else {
          loadComments()
        }
      })
      $(this).trigger('reset')
      $('#new-comment-form .error').remove()
      $('.star-cb-group input').removeAttr('checked')
    }
  })


  // Add a listener to rating stars and wait for rating submission
  $('.star-cb-group label').on('click', function(event) {
    $('.star-cb-group input').removeAttr('checked')
    $(this).prev('input').attr('checked','checked')
  })


  // Add a listener to comments button
  $('#likebutton').on('click', function(event) {

    event.preventDefault()

    let urlid = $('#likebutton').attr('URLid')
    let url   = `/urls/${urlid}/likes`

    $.ajax({
      method: 'POST',
      url   : url,
    }).then(function(result) {
      $('#counter').text(result.likecount)
      })
  })
})




// loadLikeCount
function loadLikeCount() {

  let urlid = $('#likebutton').attr('URLid')
  let url   = `/urls/${urlid}/likes`

  $.ajax({
    method: 'GET',
    url   : url,
  }).then(function(result) {
    $('#counter').text(result.likecount)
    })
}




// Load all comments by calling the render comments function
function loadComments() {
  let urlid = $('#new-comment-form').attr('URLid')
  let url   = `/urls/${urlid}/comments`

  $('#comments-container').html('')
  $('#comments-container').append($('<div>').addClass('row').addClass('justify-content-center'))


  $.ajax({
    method: 'GET',
    url: url,
  }).then(function(response) {
    renderComments(response)
    updateOverallRating(response)
  })
}



// Render all comments by calling the createCommentElement
function renderComments(comments) {
  let commentsContainer = $('#comments-container div')
  comments.forEach(function(comment) {
    let commentElm = createCommentElement(comment)
    commentsContainer.prepend(commentElm)
  })
}



// Create a URL element (to be added to the DOM by renderURLS)
function createCommentElement(comment) {
  let $ratingStars = $('<div>')
  for (let i = 0; i < comment.rating; i++) {
    $ratingStars.append($('<span>').html('<i class="fa fa-star" aria-hidden="true"></i>'))
  }
  for (let i = 0; i < 5 - comment.rating; i++) {
    $ratingStars.append($('<span>').html('<i class="fa fa-star-o" aria-hidden="true"></i>'))
  }


  let $comment = $('<div>').addClass('container').addClass('comment-box')
                    .append($('<header>')
                      .append($('<img>').attr('src',comment.avatar))
                      .append($('<div>').append($('<p>').text(comment.name)))
                      )
                    .append($('<main>')
                      .append($('<p>').text(comment.content))
                      .append($ratingStars)
                      )
  return $comment
}




function updateOverallRating(comments) {
  let $ratingContainer = $('#oneurlcontainer .rating')
  let overallRating = 0
  comments.forEach(function(comment) {
    overallRating += comment.rating
  })
  overallRating = Math.round(overallRating/comments.length)

  $ratingContainer.html('')
  for (let i = 0; i < overallRating; i++) {
    $ratingContainer.append('<span><i class="fa fa-star" aria-hidden="true"></i></span>')
  }
  for (let i = 0; i < 5 - overallRating; i++) {
    $ratingContainer.append('<span><i class="fa fa-star-o" aria-hidden="true"></i></span>')
  }



}
















