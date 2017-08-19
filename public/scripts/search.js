

//const $urlDataHelpers  = require('.../db/data_helpers/url_data_helpers.js');

//console.log(urlDataHelpers);

$( document ).ready(function(){

  function validateSearch(searchInput) {

  //    if ((searchInput === "") || (searchInput === null)) {
  //          alert("Please enter a valid URL");
  //          return false;
  //       }

  //   else return true;

  // }
      return true;
  }


  $('#search-form').on('submit',function (event) {

    let searchInput = $(this).serialize()
    console.log(searchInput)

    event.preventDefault()


    if (validateSearch(searchInput)){
      $.ajax({
        url: '/:id/search/' + searchInput,
        method: 'GET',
        data: searchInput
      })
      .then(function (url) {
          //console.log(url)
          //getURL(url, null);

      })
    }

  })




})
