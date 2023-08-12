const talksTitleRegexString = '^[A-Za-zÄÖÜäöü\\s]+';

export const talksTitleRegex = new RegExp(
  talksTitleRegexString,
  'gm',
);

const durationRegexString = '\\d{2}';

const durationUnitRegexString = '(minutes?|min|m)$';

export const durationRegex = new RegExp(
  durationRegexString,
  'gm',
);

export const durationUnitRegex = new RegExp(
  durationUnitRegexString,
  'gm',
);

const talksRegexString = `${talksTitleRegexString}\\s${durationRegexString}\\s?${durationUnitRegexString}`;

export const talksRegex = new RegExp(
  talksRegexString,
  'gm',
);
