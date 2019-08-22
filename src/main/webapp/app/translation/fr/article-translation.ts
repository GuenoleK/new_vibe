export const article = {
  detail: {
    content: {
      emptyState: {
        title: 'Aucun contenu',
        description: "Aucun contenu n'a encore été ajouté pour ce chant."
      }
    },
    pdfCard: {
      header: {
        title: 'Paroles',
        menu: {
          modify: 'Modifier les paroles',
          delete: 'Supprimer les paroles',
          download: 'Télécharger'
        }
      },
      uploadZone: {
        title: 'Paroles manquantes',
        description: {
          mobile: 'Appuyer pour charger le fichier de paroles (PDF)',
          common: 'Cliquer ou déposer pour charger le fichier de paroles (PDF)',
          commonViewer: "Les paroles n'ont pas encore été ajoutées pour cette chanson."
        }
      },
      mobile: {
        descriptionText: 'Ouvrir le fichier des paroles',
        linkText: 'VOIR LES PAROLES'
      }
    },
    audioCard: {
      header: {
        title: 'Audio à uploader',
        menu: {
          modify: "Modifier l'audio",
          delete: "Supprimer l'audio",
          download: 'Télécharger'
        }
      }
    }
  }
};
