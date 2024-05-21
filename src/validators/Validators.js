export default class Validators {
  static validateEmail = email => {
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      email.trim() !== '' && emailRegEx.test(String(email.trim()).toLowerCase())
    );
  };

  static validatePassword = password => {
    return password.trim() !== '' && password.trim().length >= 8;
  };

  static validateName = name => {
    const regexWithoutSymbolsOrNumbers = /^[A-Za-z\s]+$/;
    return regexWithoutSymbolsOrNumbers.test(name);
  };

  static validatePasswordMatch = (password1, password2) => {
    return password1 == password2;
  };

  static validateMobileNumber = mobileNumber => {
    const regexTenDigitMobileNumber = /^\d{10}$/;
    return regexTenDigitMobileNumber.test(mobileNumber);
  };

  static validateNumber = (input) => {
    return !isNaN(input);
  }

  static validateStringNotEmpty = name => {
    return name.length > 0;
  };

}
