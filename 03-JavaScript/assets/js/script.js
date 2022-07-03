// Author: Ryan Whitmore
// Written for UCB Coding Bootamp assignment Module 3

// Potential password characters, consistent with the OWASP list of
// password special characters:
// https://owasp.org/www-community/password-special-characters
var lowerCaseAlphabeticCharacters = "abcdefghijklmnopqrstuvwxyz"
var upperCaseAlphabeticCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var numericCharacters = "1234567890"
var specialCharacters = String.raw`"!#$%&'()*+,-./:;<=>?@[\]^_{|}~"` + "`"

// Define the Window messages that will be used for prompting the user
// for their desired password characters and length
var passwordLengthMsg = `
Please enter the desired length of the password by providing a number.
The password must have more than 7 and less than 129 characters.
`

var provideBooleanRequest = " (Choose `OK` to yes, `Cancel` for no.)"

// Prompt for lower-case characters
var lowerCaseAlphabetMsg = `
Would you like to include lower-case alphabet characters in your password?
`
lowerCaseAlphabetMsg += provideBooleanRequest

// Prompt for upper-case characters
var upperCaseAlphabetMsg = `
Would you like to include upper-case alphabet characters in your password?
`
upperCaseAlphabetMsg += provideBooleanRequest

// Prompt for numeric characters
var numericCharactersMsg = `
Would you like to include numeric characters in your password?
`
numericCharactersMsg += provideBooleanRequest

// Prompt for special characters
var specialCharactersMsg = `
Would you like to include special characters in your password?
`
specialCharactersMsg += provideBooleanRequest


// Functions for generating the password length ================================

// This function checks to see if the user-provided password meets the
// length criteria specified in the Acceptance criteria.
function passwordLengthMeetsCriteria(userProvidedPassword) {
  // This function returns true if value meets acceptance criteria, false otherwise.
  // Function is expecting an integer argument or a type that can be cast
  // to a type for integer logic operations.

  if (userProvidedPassword >= 8 && userProvidedPassword <= 128) {
    return true;
  };
  return false;

}

// This function is defined in order to reduce duplicate code when prompting
// the use for a password.
function promptForPasswordLength(passwordLengthMsg) {
  // This function prompts the user for a password length.
  // This function is expecting a string argument to provide in the window prompt
  // and returns a string from the window prompt.
  
  return window.prompt(passwordLengthMsg);

}

// This function prompts the user for a password length and iteratively checks
// to ensure that the acceptance criteria are met, re-prompting the user until
// the criteria are met. 
function generatePasswordLength() {
  // This function returns an integer value associated with the string value
  // provided by the user in the window prompt.

  var passwordLength = parseInt(promptForPasswordLength(passwordLengthMsg));

  // Loop will re-prompt the user for a password length until the
  // acceptance criteria are met.
  while (!passwordLengthMeetsCriteria(passwordLength)){
    window.alert("Password length invalid. Try again.")
    passwordLength = parseInt(promptForPasswordLength(passwordLengthMsg));
  }

  return passwordLength;

}


// Main function for generating the password ===================================

// *** Disclaimer
// Motivation for the random character generator used in the following function
// came from StackOverflow:
// https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript
// ***

// This is the main password generator function. It queries the user for their
// password character preferences,; i.e. the password length, and whether or not
// to include lower-case alphabet characters, upper case alphabet characters,
// numeric characters, or special characters; and then randomly generates a
// password from the available characters based on the user-specified password
// length.
function generatePassword() {
  // This function returns a string representing the randomly generated password
  
  // Prompt the user for a password length
  var passwordLength = generatePasswordLength();

  // The following are boolean types that will be used in logic for
  // determining which characters to include in the password
  var useLowerCaseAlphabet = window.confirm(lowerCaseAlphabetMsg);
  var useUpperCaseAlphabet = window.confirm(upperCaseAlphabetMsg);
  var useNumericCharacters = window.confirm(numericCharactersMsg);
  var useSpecialCharacters = window.confirm(specialCharactersMsg);

  // Initialize the string containing the pool of all possible password characters
  var passwordCharacterPool = ""

  // Using the user-specified preferences, build the full string of characters
  // that can be used to generate the password
  if (useLowerCaseAlphabet) {passwordCharacterPool += lowerCaseAlphabeticCharacters};
  if (useUpperCaseAlphabet) {passwordCharacterPool += upperCaseAlphabeticCharacters};
  if (useNumericCharacters) {passwordCharacterPool += numericCharacters};
  if (useSpecialCharacters) {passwordCharacterPool += specialCharacters};

  // The user could select no characters to use in the password, so default to
  // the lower-case alphabet characters to ensure a non-empty password is
  // returned.
  if (passwordCharacterPool === "") {
    window.alert("Nothing was selected. Defaulting to lower-case alphabetic characters.")
    passwordCharacterPool = lowerCaseAlphabeticCharacters
  }

  // Randomly select characters from the pool of possible password characters
  // and generate a password that has a length equal to that specified by the user
  var password = "";
  for (var i = 0; i < passwordLength; i++) {
    var rnum = Math.floor(Math.random() * passwordCharacterPool.length);
    password += passwordCharacterPool.substring(rnum, rnum+1);
  };

  return password

}

// Write the new password string to the #password ID
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);
