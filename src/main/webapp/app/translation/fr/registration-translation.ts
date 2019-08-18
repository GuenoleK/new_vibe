export const registration = {
  fields: {
    username: {
      placeholder: "Nom d'utilisateur",
      info: {
        tooltip: {
          sentence: {
            partOne: "Le nom d'utilisateur ne peut contenir",
            partTwo: "de majusucle ou d'espace."
          }
        }
      }
    },
    email: {
      placeholder: 'Email'
    },
    password: {
      placeholder: 'Mot de passe',
      validationPlaceholder: 'Validation mot de passe'
    },
    structure: {
      placeholder: 'Structure',
      options: {
        french: 'Français',
        english: 'English'
      }
    },
    language: {
      placeholder: 'Langue'
    }
  },
  buttons: {
    register: "S'inscrire"
  },
  message: {
    success: "Inscription réussie. Vous receverai un mail afin d'activer votre compte Vibe",
    warningFields: 'Vous devez remplir tous les champs',
    error: "Une erreur s'est produite lors de votre inscription"
  },
  activation: {
    success: 'Votre compte a bien été activé, vous allez être redirigé vers la page de connexion',
    errorFirstSentence: "Une erreur s'est produite lors de l'activation de votre compte.",
    errorSecondSentence: 'Veulliez contacter les administrateurs afin de rélger la situation',
    inProgress: 'Activation du compte en cours, veuillez patienter.',
    emptyState: {
      title: 'Validation du compte'
    }
  }
};
