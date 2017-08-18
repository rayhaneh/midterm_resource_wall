
$( document ).ready(function(){

  $('#search-form').on('submit',function () {

    event.preventDefault()

    let searchInput = $(this).serialize()

    if (validateSearch(searchInput)){
      $.ajax({
        url: '/urls/search/'+ searchInput,
        method: 'GET'
      })
      .then(function (url) {
          console.log('*****',url);
      })
    }

  })

})
