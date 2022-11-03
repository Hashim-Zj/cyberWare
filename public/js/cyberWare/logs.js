// JavaScript FILE FOR REGISTER AND LOGIN AND LOGOUT AND FORGOT PASSWORD AND OTP VERIFICATION

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const emailId = document.querySelector('#email');
const phoneNo = document.querySelector('#phone');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

const form = document.querySelector('#signUp');

form.addEventListener('submit', function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // Validate form fields
  let isfirstNameValid = checkFirstName(),
    isLastNameValid = checkLastName(),
    isEmailValid = checkEmail(),
    isPhoneValid = checkPhone(),
    isPssswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isfirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPssswordValid &&
    isConfirmPasswordValid;

  if (isFormValid) {

  }
});

// FUNCTIONS

const isRequired = function (value) {
  value === '' ? false : true;
};

const isBetween = function (length, min, max) {
  if (length < min || length > max) return false;
  else return true;
};

const isEmailValid = function (email) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const isPhoneValid = function (phone) {
  if (phone.length === 10) {
    return true;
  } else return false;
};

const isPasswordStrong = (password) => {
  const regex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return regex.test(password);
};

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove('success');
  formField.classList.add('error');

  // show the error message
  const error = formField.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove('error');
  formField.classList.add('success');

  // hide the error message
  const error = formField.querySelector('small');
  error.textContent = '';
};

// dividual function to check fields

const checkFirstName = function () {
  let valid = false;
  const min = 3,
    max = 12;
  const fname = firstName.value.trim();

  if (!isRequired(fname)) {
    showError(firstName, 'This field is requied');
  } else if (!isBetween(fname.length, min, max)) {
    showError(
      firstName,
      `First Name must include in ${min} and ${max} characters.`
    );
  } else {
    showSuccess(firstName);
    valid = true;
  }
  return valid;
};

const checkLastName = function () {
  let valid = false;
  const min = 2,
    max = 12;
  const lname = lastName.value.trim();

  if (!isBetween(lname.length, min, max))
    showError(
      lastName,
      `Last Name must include in ${min} and ${max} characters.`
    );
  else {
    showSuccess(lastName);
    valid = true;
  }
  return valid;
};

const checkEmail = function () {
  let valid = false;
  const email = emailId.value.trim();
  if (!isRequired(email)) showError(emailId, 'EmailId is requierd.');
  else if (!isEmailValid(email)) showError(emailId, 'This Email is not valid');
  else {
    showSuccess(emailId);
    valid = true;
  }
  return valid;
};

const checkPhone = function () {
  let valid = false;
  const phone = phoneNo.value;
  if (!isRequired(phone)) showError(phoneNo, 'Phone No is requierd.');
  else if (!isPhoneValid(phone))
    showError(phoneNo, 'This PhoneNo must have 10 digit');
  else {
    showSuccess(phoneNo);
    valid = true;
  }
  return valid;
};

const checkPassword = function () {
  let valid = false;
  const min = 8,
    max = 12;
  const pwd = password.value.trim();

  if (!isRequired(pwd)) showError(password, "Password can't be empty.");
  else if (!isBetween(pwd.length, min, max))
    showError(password, 'Password must have include 8 and 12 characters.');
  else {
    showSuccess(password);
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPwd = confirmPassword.value.trim();
  const pwd = password.value.trim();

  if (!isRequired(confirmPwd)) {
    showError(confirmPassword, 'Please enter the password again');
  } else if (pwd !== confirmPwd) {
    showError(confirmPassword, 'Confirm password does not match');
  } else {
    showSuccess(confirmPassword);
    valid = true;
  }
  return valid;
};



const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay);
  };
};

form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'firstName':
      checkFirstName();
      break;
    case 'lastName':
      checkLastName();
      break;
    case 'email':
      checkEmail();
      break;
    case 'phone':
      checkPhone();
      break;
    case 'password':
      checkPassword();
      break;
    case 'confirmPassword':
      checkConfirmPassword();
      break;
  }
}));