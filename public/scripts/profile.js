$(document).ready(function(){
  $('#AddNewForm').on('submit') {
    $.ajax({
      method: 'POST',
      url   : '/urls',
      data: $(this).serialize()
    }).then(function(err) {
      if(err) {
        console.log('error')
      }
      else {
        console.log('ok')
      }
    })
  }

})