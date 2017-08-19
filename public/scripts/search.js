$( document ).ready(function(){

  $('#search-form').on('submit',function (event) {

    event.preventDefault()

    let searchInput = $(this).serializeArray()[0].value

    if (validateSearch(searchInput)){

      $.ajax({
        url: '/urls/search/'+ searchInput,
        method: 'GET'
      })
      .then(function (results) {

        window.history.pushState('results','results',`/urls/${searchInput}`)

        let urls = results.urls
        if (urls.length !== 0) {
          $('main').html('')
          for (let i = 0; i < urls.length; i++){
            $('main')
            .prepend($('<div>')
              .append($('<p>').text(urls[i].id))
              .append($('<p>').text(urls[i].URL))
              .append($('<p>').text(urls[i].Title))
              .append($('<p>').text(urls[i].Desc))
                )
          }
        }
        else {
          // So no results where found
        }

      })

    }

  })

})
