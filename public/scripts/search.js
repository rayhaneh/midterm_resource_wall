$( document ).ready(function(){

  $('#search-form').on('submit',function (event) {

    event.preventDefault()

    let searchInput = $(this).serialize()

    if (validateSearch(searchInput)){

      $.ajax({
        url: '/urls/?'+ searchInput,
        method: 'GET',
      })
      .then(function (results) {

        $(location).attr('href', '/urls/?'+ searchInput)

      })

    }

  })

})
