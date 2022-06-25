export function required(message) {
  return message || "Обязательное поле";
}

export function validatePassword(value) {
  if (value.length < 8) return "Minimum 8 symbols";
}

export function validateCPassword(password) {
  return function (value) {
    if (value !== password) {
      return "Passwords are not same";
    }
  };
}

export function validateTelephoneNum(value) {
  for (let i = 0; i < value.length; i++) {
    if (value.length > 11 || value.length < 11) {
      return "Minimum 11 symbols";
    }
    if (value.charAt(0) !== 8) {
      return "Your password is invalid";
    }
  }
}
