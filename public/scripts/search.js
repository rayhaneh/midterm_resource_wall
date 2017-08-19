$( document ).ready(function(){

  $('#search-form').on('submit',function (event) {

    event.preventDefault()

    let searchInput = $(this).serializeArray()[0].value

    if (validateSearch(searchInput)){

      $.ajax({
        url: '/urls/search/'+ searchInput,
        method: 'GET'
      })
      .then(function (urls) {
        console.log(urls.length)
        if (urls.length !== 0) {
          $('main').html('')
          for (let i = 0; i < urls.length; i++){
            $('main').prepend($('<p>').text(urls[i].URL))
          }
        }
        else {
          // So no results where found
        }

      })

    }

  })

})
