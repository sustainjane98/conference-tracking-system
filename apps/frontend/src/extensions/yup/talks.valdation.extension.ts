import { addMethod, string } from 'yup';
import { talksRegex } from '../../regex/talks.regex';

addMethod(string, 'talk', function talk(msg: string) {
  return this.matches(talksRegex, {
    name: 'talk',
    message: msg,
  });
});
