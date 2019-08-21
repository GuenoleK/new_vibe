export const passwordManagement = {
  resetPassword: {
    request: {
      title: 'Password request',
      description: 'You will recieve a email to reset your password',
      fields: {
        email: {
          placeholder: 'Email'
        }
      },
      buttons: {
        confirm: 'Confirm'
      },
      messages: {
        success: 'An email has been sent.',
        warning: {
          emailValidation: 'Please enter a valid email adresse (Example: test@gmail.com)'
        },
        error: {
          emailDoesNotExist: 'This email adress does not exists in Vibe.',
          error: 'An error occured.'
        }
      }
    },
    reset: {
      title: 'New password',
      description: 'Please enter your new password',
      fields: {
        password: {
          placeholder: 'Password'
        },
        confirmationPassword: {
          placeholder: 'Password validation'
        }
      },
      button: {
        confirm: 'Confirm'
      },
      messages: {
        success: 'Your new password has been successfully created. You will be redirected to the sign in page',
        warningNotEqual: 'Please enter the same password.',
        warningEmptyField: 'Please fill all the indicated fields.',
        error: 'An error occured.',
        noRequestPasswordError: 'You did not asked for a password reset.'
      }
    }
  }
};
