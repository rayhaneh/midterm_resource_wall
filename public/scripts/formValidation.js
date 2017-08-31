// VALIDATE REGISTRATION FORM
function validateRegistration(name, email, password) {
  let error = ''
  if (!name) {
    error  = 'Please provide a name.'
  }
  else if (!email) {
    error = 'Please provide an email address.'
  }
  else if (!password) {
    error = 'Please provide a password.'
  }
  return error
}

// VALIDATE LOGIN FORM
function validateLogin (email, password) {
  let error = ''
  if (!email) {
    error = 'Please provide an email address.'
  }
  else {
    if (!password) {
      error = 'Please provide a password.'
    }
  }
  return error
}


// VALIDATE A NEW URL
function validateNewURL (newURL) {
  let error = ''
  if (!newURL.description)  {error = 'Please provide a description.'}
  if (!newURL.title) {error = 'Please provide a valid title.'}
  if (!newURL.url)   {error = 'Please provide a valid URL.'}
  return error
}


// VALIDATE A NEW COMMENT
function validateComment (commentText, rating) {
  let error = ''
  if (!commentText) {
    error = 'Please provide a comment.'
  }
  else {
    if (!rating) {
      error = 'Please provide a rating.'
    }
  }
  return error
}


// VALIDATE SEARCH FORM
function validateSearch (text) {
  text = text.replace('searchText=','')
  if (text) {
    return true
  }
  else {
    return false
  }
}


