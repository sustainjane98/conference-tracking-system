import { TranslationsCommon } from '@/enums/i18n/translations-common.enum';
import { TranslationsTalks } from '@/enums/i18n/translations-talks.enum';

export const Translations = {
  COMMON: TranslationsCommon,
  TALKS: TranslationsTalks,
} as const;

export type TranslationFiles =
  | TranslationsCommon
  | TranslationsTalks;
