import chalk from 'chalk';
import CtfParser from '~/class/CtfParser';

const ctfParser = new CtfParser();
ctfParser.scan(`
  [+] bold; red; underline:
    | This is test demo text1.
    | This is test demo text1.
    | This is test demo text1.
    | This is test demo text1.
`);
