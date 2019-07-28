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
  }
};
