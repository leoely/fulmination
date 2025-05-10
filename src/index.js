import chalk from 'chalk';
import CtfParser from '~/class/CtfParser';

const ctfParser = new CtfParser();
ctfParser.scan(`
[+] bold:
| ** This is ctf passage syntax.
| ** Each passage will in different line.
| ** Each passage is start with delimiter.
|Each passage is start with delimiter.
`);
