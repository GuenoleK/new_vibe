import i18next from 'i18next';
import { frenchTranslation } from './fr/french-translation';
import { englishTranslation } from './en/english-translation';
export const initializeTranslation = (language?: string) => {
  i18next.init(getTranslationRessources(language));
};

function getTranslationRessources(language?: string) {
  switch (language) {
    case 'fr':
      return frenchTranslation;
    case 'en':
      return englishTranslation;
    default:
      return englishTranslation;
  }
}
