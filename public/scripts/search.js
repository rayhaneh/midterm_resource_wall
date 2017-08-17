
$( document ).ready(function(){

    function search () {

      $('#searchURL').click(function () {

        event.preventDefault();

        let searchInput = $('input').val();

        // if the search is empty
        if ((searchInput === "") || (searchInput === null)) {
          alert("Please enter a valid URL");
          return;
        }


        else {
          $.ajax({
            url: 'urls/search/'+ searchInput,
            method: 'GET'
            //dataType: 'html',
            //data: $(this).serialize()
          }).done(function (url) {
              console.log(url);
              //getURL();
            });

        }


      });
    }

    search();
})
