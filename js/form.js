function checkDetails() {
  /**
   *  Author : Amir Abdiukov
   * Defining the document itself
   */
  var formsDoc = document.getElementById("DetailsForm")

  /**
   * Retrieving values from the document
   * 
   * 
   * @param {string} username - must contain at least two letters (uppercase and lowercase).
   * meaning that there must be at least 1 upper case and 1 lowercase 
   * @param {string} email - must contain a valid email format.
   * I would check it by checking whether the email contains "@" and "." characters (only once)
   * @param {int} phone - Phone field must contain digits only. 
   * I would also check that it has at least 8 characters
   * @param {string} info_textbox - Textbox field must not be empty
   */
  var username = formsDoc.username;
  var email = formsDoc.email;
  var phone = formsDoc.phone;
  var info_textbox = formsDoc.info;

  /**
   * @param {boolean} sumbittedSuccessfully - checker that will check whether all the values were entered correctly
   * if one of the values entered is wrong, this gets changed to false and the form does not get submitted
   */

  var sumbittedSuccessfully = true;

  /**
   * START OF VALIDATION SECTION OF CODE
   */

  /**
   * Username validation
   */ 
  var character = '';
  var upper_character_counter = 0;
  var lower_character_counter = 0;
  for (var i = 0; i <= username.value.length; i++) {
    character = username.value.charAt(i);
    if (isNaN(character * 1)) {
      if (character == character.toUpperCase()) {
        upper_character_counter++;
      }
      else if (character == character.toLowerCase()) {
        lower_character_counter++;
      }
    }
  }
/**
 * @param {int} lower_character_counter - the number of lower case characters e.g "l"
 * @param {int} upper_character_counter - the number of upper case characters e.g "L"
 */

  if (lower_character_counter >= 1 && upper_character_counter >= 1) {
    username.setCustomValidity('');
  } else {
    username.setCustomValidity('Please enter the username. It must contain at least 1 upper case character and at least 1 lower case character.');
    sumbittedSuccessfully = false;
  }

  
  /**
   * Phone and Email validation
   * They are validated together, as only one (either phone or email) needs to be entered for the form to be sent
   */
  //

  /**
   * Validating that email contains "@"" and "."
   */
  var character = '';
  var a_symbol_counter = 0;
  var dot_counter = 0;

  for (var i = 0; i <= email.value.length; i++) {
    character = email.value.charAt(i);
    if (character == "@") {
      a_symbol_counter++;
    }
    else if (character == ".") {
      dot_counter++;
    }
  }


/**
 * Validating that each character is a digit
 */
  var character = '';
  var non_digit = 0;
  for (var i = 0; i <= phone.value.length; i++) {
    character = phone.value.charAt(i);
    if ((isNaN(character * 1))) {
      non_digit++;
    }
  }


  /**
   * Validating that either phone or email were entered correctly
   */
  var correctly_entered = 2;

  /**
   * @param {int} non_digit - number of non-digit characters in the user input for phone number
   * @param {int} phone.value.length - the length of the user input inside the phone box
   */
  if (non_digit > 0 || phone.value.length < 8) {
    correctly_entered--;
  }

  /**
   * @param {int} a_symbol_counter - the number of times "@" symbol was entered into the box
   * @param {int} dot_counter - the number of times "." was entered into the box
   */
  if (a_symbol_counter != 1 || dot_counter != 1) {
    correctly_entered--;
  }

  /**
   * @param {int} correctly_entered - The amount of correctly entered fields. Starts from 2, the more incorrect fields there are, the less the number is
   * If the number of correct fields is 0, the error is displayed and the form DOES NOT get submitted
   */
  switch (correctly_entered) {
    case 0:
      alert("Please enter your details - this can be email and/or phone \nEmail field must contain a valid email format. \nPhone field must contain digits only (at least 8 digits).")
      sumbittedSuccessfully = false;
  }

/**
 * Validating the info textbox
 * @param {int} info_textbox.value.length - the length of the user input inside info textbox (also known as Message textbox)
 */

  switch (info_textbox.value.length) {
    case 0:
      info_textbox.setCustomValidity('Please enter additional information');
      sumbittedSuccessfully = false;
      break;
    default:
      info_textbox.setCustomValidity('');
      break;
  }

  /**
   * END OF VALIDATION SECTION OF CODE
   */

/**
 * START OF THE FORM SUBMITION SECTION OF CODE
 * @param {boolean} submittedSuccessfully - if value is true the form gets submitted and the user gets notified, if value is false, the form does not get submitted.
 */

 /**
  * There is no need to add "break" after each statement, as "return true" or "return false" act as break statements
  */
  switch (sumbittedSuccessfully) {
    case true:
      alert("Thank you for contacting us. We shall respond shortly.");
      return true;
    case false:
      return false;
  }
  
  /**
   * END OF THE FORM SUBMISSION SECTION OF CODE
   */
}