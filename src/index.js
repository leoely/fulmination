import chalk from 'chalk';
import CtfParser from '~/class/CtfParser';

const ctfParser = new CtfParser();
ctfParser.scan(`
(+) bold; green: some demo text1 (+) bold; dim: some demo text2 |
(+) green: some deom text3
`);
ctfParser.scan(`
(+) bold; green: some demo text1 (+) bold; dim: some demo text2 |
(+) green: some deom text3
`);
