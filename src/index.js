import chalk from 'chalk';
import CtfParser from '~/class/CtfParser';

const ctfParser = new CtfParser();
ctfParser.scan('(+) bold; red: This is ctf text syntax');
