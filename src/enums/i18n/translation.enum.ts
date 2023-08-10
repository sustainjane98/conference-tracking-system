import { TranslationsCommon } from '@/enums/i18n/translations-common.enum';

export const Translations = {
  COMMON: TranslationsCommon,
} as const;

export type TranslationFiles = TranslationsCommon;
