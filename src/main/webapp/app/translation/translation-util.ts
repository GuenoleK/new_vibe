import i18next from 'i18next';

class TranslationUtil {
  translate = (text: string) => i18next.t(text);
}

export const translationUtil = new TranslationUtil();
