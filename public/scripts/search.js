//const urlDataHelpers  = require('./db/data_helpers/url_data_helpers.js')

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

    event.preventDefault()

    let searchInput = $(this).val()

    if (validateSearch(searchInput)){
      $.ajax({
        url: '/urls/search/'+ searchInput,
        method: 'GET'
      })
      .then(function (url) {
          //console.log(url)
          getURL(url);
      })
    }

  })




})
