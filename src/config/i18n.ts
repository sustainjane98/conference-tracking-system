export const fallbackLng = 'en';
export const languages = [fallbackLng];
export const defaultNS = 'common';
export function getOptions(
  lng = fallbackLng,
  ns: string[] | string = defaultNS
) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
