//this code is for validation of email
function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

//this code is for validation of name
function ValidateName(inputText) {
  var nameformat = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
  if (inputText.match(nameformat)) {
    return true;
  } else {
    return false;
  }
}

//this code is for validation of phone no
function ValidatePhone(inputText) {
  var phoneFormat = /^[0-9]+$/;
  if (inputText.match(phoneFormat)) {
    return true;
  } else {
    return false;
  }
}

//this code is for validation of Username
function ValidateUsername(inputText) {
  var usernameFormat = /^[a-zA-Z0-9]+$/;
  if (inputText.match(usernameFormat)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  ValidateEmail,
  ValidateName,
  ValidatePhone,
  ValidateUsername,
};
