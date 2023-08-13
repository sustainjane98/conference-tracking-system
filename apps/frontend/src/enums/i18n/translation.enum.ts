import { TranslationsCommon } from './translations-common.enum';
import { TranslationsTalks } from './translations-talks.enum';

export const Translations = {
  COMMON: TranslationsCommon,
  TALKS: TranslationsTalks,
} as const;

export type TranslationFiles = TranslationsCommon | TranslationsTalks;
