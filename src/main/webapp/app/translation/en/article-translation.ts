export const article = {
  detail: {
    content: {
      emptyState: {
        title: 'No content',
        description: 'There is no content yet for this song'
      }
    },
    pdfCard: {
      header: {
        title: 'Lyrics',
        menu: {
          modify: 'Update the lyrics',
          delete: 'Delete the lyrics',
          download: 'Download'
        }
      },
      uploadZone: {
        title: 'Missing lyrics',
        description: {
          mobile: "Touch to upload the lyrics' file (PDF)",
          common: "Click or drop the lyrics' file to upload it (PDF)",
          commonViewer: 'The lyrics have not been added yet for this song.'
        }
      },
      mobile: {
        descriptionText: "Open the lyrics' file",
        linkText: 'SEE THE LYRICS'
      }
    },
    audioCard: {
      header: {
        title: 'Audio to upload',
        menu: {
          modify: 'Update the audio',
          delete: 'Delete the audio',
          download: 'Download'
        }
      }
    }
  }
};
