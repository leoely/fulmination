import chalk from 'chalk';
import Fulmination from '~/class/Fulmination';

const fulmination = new Fulmination();
fulmination.scan(`
  (+) bold: bold, underline and so on is chalk style. (+) underline: You can get this section document in chalk. &
  (+) bold: text and passage use same chalk style.
  [+] bold:
  | style use ";" as delimiter, passage use "|" as delimiter.
  | Passage apply style to all passage.Text apply style only to one text.
`);
