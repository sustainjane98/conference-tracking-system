const talksTitleRegexString = '^[A-Za-zÄÖÜäöü\\s]+';

export const talksTitleRegex = new RegExp(talksTitleRegexString, 'gm');

const durationRegexString = '\\d{1,3}';

const durationUnitRegexString = '(minutes?|min|m)$';

export const durationRegex = new RegExp(durationRegexString, 'gm');

export const durationUnitRegex = new RegExp(durationUnitRegexString, 'gm');

const talksRegexString = `${talksTitleRegexString}(\\s${durationRegexString}\\s?${durationUnitRegexString.replace(
  '$',
  ''
)})?$`;

export const talksRegex = new RegExp(talksRegexString, 'gm');
