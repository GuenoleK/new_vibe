export const passwordManagement = {
  resetPassword: {
    request: {
      description: 'En entrant votre adresse mail, vous receverez un message afin de réinitialiser votre mot de passe.',
      fields: {
        email: {
          placeholder: 'Email'
        }
      },
      buttons: {
        confirm: 'Confirmer'
      },
      messages: {
        success: "Un email a été envoyé sur l'adresse indiquée.",
        warning: {
          emailValidation: 'Veuillez entrer une adresse mail valide (Exemple: test@gmail.com)'
        },
        error: {
          emailDoesNotExist: "Cette adresse mail n'existe pas dans l'application Vibe.",
          error: "Une erreur s'est produite lors de la demande de réinitialisation du mot de passe."
        }
      }
    },
    reset: {
      description: 'Veuillez entrer votre nouveau mot de passe',
      fields: {
        password: {
          placeholder: 'Mot de passe'
        },
        confirmationPassword: {
          placeholder: 'Validation mot de passe'
        }
      },
      button: {
        confirm: 'Confirmer'
      },
      messages: {
        success: 'Votre nouveau mot de passe a été créé avec succes.',
        warningNotEqual: 'Veuillez entrez le même mot de passe.',
        warningEmptyField: 'Veuillez remplir tous les champs.',
        error: "Une erreur s'est produite lors de la création du mot de passe.",
        noRequestPasswordError: "Vous n'avez fait aucune demande de réinitialisation de mot de passe."
      }
    }
  }
};
