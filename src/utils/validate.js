export const checkValidation = (data) => {
  const {name, email, password} = data;
  const check = {nameIsValid: true, emailIsValid: true, passwordIsValid: true};

  if (name === '') {
    check.nameIsValid = false;
    // alert('請輸入姓名');
  }

  const email_format =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email === '') {
    check.emailIsValid = false;
    // alert('請輸入信箱');
  } else if (email.match(email_format) === null) {
    check.emailIsValid = false;
    // alert('信箱輸入有誤');
  }

  if (password === '') {
    check.passwordIsValid = false;
    // alert('請輸入密碼');
  }

  return check;
};
