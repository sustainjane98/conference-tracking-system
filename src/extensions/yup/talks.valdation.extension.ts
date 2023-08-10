import { addMethod, string } from 'yup';

addMethod(string, 'talk', function talk(msg: string) {
  return this.matches(
    /^[A-Za-zÄÖÜäöü\s]+\s\d{2}\s?(seconds?|sec|s|minutes?|min|m|h|hours?)$/gm,
    { name: 'talk', message: msg },
  );
});
