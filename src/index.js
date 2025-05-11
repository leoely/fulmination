import chalk from 'chalk';
import CtfParser from '~/class/CtfParser';

const ctfParser = new CtfParser();
ctfParser.scan(`
  (+) bold; gray: text1 (+) bold; green: text2 (+) red: text3 &
  (+) bold; red: text4
`);
