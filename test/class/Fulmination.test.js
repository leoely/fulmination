import { describe, expect, test, } from '@jest/globals';
import chalk from 'chalk';
import Fulmination from '~/class/Fulmination';

describe('[Class] Fulmination;', () => {
  test('The result of fulmination parsing a pieceof text should be correct.', () => {
    const fulmination = new Fulmination({
      debug: true,
    });
    expect(JSON.stringify(fulmination.scan('(+) bold; red: This is ctf text syntax (+) dim; underline: ctf text will be in same line.'))).toMatch('[\"\\u001b[31mThis is ctf text syntax\\u001b[39m\",\"\\u001b[4mctf text will be in same line.\\u001b[24m\"]');
  });

  test('The result of fulmination parsing multiple paragraphs of text should be correct.', () => {
    const fulmination = new Fulmination({
      debug: true
    });
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; green:
      | This is ctf passage syntax.
      | Each passage will in different line.
      | Each passage is start with delimiter.
    `))).toMatch('[\"\\u001b[32mThis is ctf passage syntax.\\u001b[39m\",\"\\n\",\"\\u001b[32mEach passage will in different line.\\u001b[39m\",\"\\n\",\"\\u001b[32mEach passage is start with delimiter.\\u001b[39m\",\"\\n\"]');
  });

  test('The result of fulmination parsing mixed text should be correct.', () => {
    const fulmination = new Fulmination({
      debug: true,
    });
    expect(JSON.stringify(fulmination.scan(`
      (+) bold: bold, underline and so on is chalk style. (+) underline: You can get this section document in chalk. &
      (+) bold: text and passage use same chalk style.
      [+] bold:
      | style use ";" as delimiter, passage use "|" as delimiter.
      | Passage apply style to all passage.Text apply style only to one text.
    `))).toMatch('[\"\\u001b[1mbold, underline and so on is chalk style.\\u001b[22m\",\"\\u001b[4mYou can get this section document in chalk.\\u001b[24m\",\"\\n\",\"\",\"\\u001b[1mtext and passage use same chalk style.\\u001b[22m\",\"\\u001b[1mstyle use \\\";\\\" as delimiter, passage use \\\"\\u001b[22m\",\"\\n\",\"\\u001b[1m\\\" as delimiter.\\u001b[22m\",\"\\n\",\"\\u001b[1mPassage apply style to all passage.Text apply style only to one text.\\u001b[22m\",\"\\n\"]');
  });
});
