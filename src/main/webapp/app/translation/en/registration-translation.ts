export const registration = {
  fields: {
    username: {
      placeholder: 'Username',
      info: {
        tooltip: {
          sentence: {
            partOne: "The username can't contain",
            partTwo: 'capital letters or space.'
          }
        }
      }
    },
    email: {
      placeholder: 'Email'
    },
    password: {
      placeholder: 'Password',
      validationPlaceholder: 'Password validation'
    },
    structure: {
      placeholder: 'Structure',
      options: {
        french: 'Français',
        english: 'English'
      }
    },
    language: {
      placeholder: 'Language'
    }
  },
  buttons: {
    register: 'Register'
  },
  message: {
    success: 'Registration successful. You will recieve an email to activate your Vibe account.',
    warningFields: 'Please fill all the fields',
    error: 'An error occured'
  },
  activation: {
    success: 'Your account is now active. You will be redirected to the login page.',
    errorFirstSentence: 'An error occrured.',
    errorSecondSentence: 'Please contact the administrators.',
    inProgress: 'Account activation in progress, please wait.'
  }
};
