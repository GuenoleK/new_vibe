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
  }
};
