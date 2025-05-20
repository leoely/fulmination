import { describe, expect, test, } from '@jest/globals';
import chalk from 'chalk';
import Fulmination from '~/class/Fulmination';

describe('[Class] Fulmination;', () => {
  test('The result of fulmination parsing a piece of text should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) bold; red: This is ctf text syntax (+) dim; underline: ctf text will be in same line.'))).toMatch('[\"\\u001b[1m\\u001b[31mThis is ctf text syntax\\u001b[39m\\u001b[22m\",\"\\u001b[2m\\u001b[4mctf text will be in same line.\\u001b[24m\\u001b[22m\"]');
  });

  test('The result of fulmination parsing multiple paragraphs of text should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; green:
      | This is ctf passage syntax.
      | Each passage will in different line.
      | Each passage is start with delimiter.
    `))).toMatch('[\"\\u001b[1m\\u001b[32mThis is ctf passage syntax.\\u001b[39m\\u001b[22m\",\"\\n\",\"\\u001b[1m\\u001b[32mEach passage will in different line.\\u001b[39m\\u001b[22m\",\"\\n\",\"\\u001b[1m\\u001b[32mEach passage is start with delimiter.\\u001b[39m\\u001b[22m\",\"\\n\"]');
  });

  test('The result of fulmination parsing mixed text should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      (+) bold: bold, underline and so on is chalk style. (+) underline: You can get this section document in chalk. &
      (+) bold: text and passage use same chalk style.
      [+] bold:
      | style use ";" as delimiter, passage use "|" as delimiter.
      | Passage apply style to all passage.Text apply style only to one text.
    `))).toMatch('[\"\\u001b[1mbold, underline and so on is chalk style.\\u001b[22m\",\"\\u001b[4mYou can get this section document in chalk.\\u001b[24m\",\"\\n\",\"\\u001b[1mtext and passage use same chalk style.\\u001b[22m\",\"\\u001b[1mstyle use \\\";\\\" as delimiter, passage use \\\"\\u001b[22m\",\"\\n\",\"\\u001b[1m\\\" as delimiter.\\u001b[22m\",\"\\n\",\"\\u001b[1mPassage apply style to all passage.Text apply style only to one text.\\u001b[22m\",\"\\n\"]');
  });

  test('Fulmination should be able to handle multiple lines of spaces.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      (+) green; bold: * == (+) bold: * Cluster (+) bold; dim: * display structure. &
      (+) green; bold: ** └─ (+) : * | (+) : *
    `))).toMatch('[\"\\u001b[32m\\u001b[1m ==\\u001b[22m\\u001b[39m\",\"\\u001b[1m Cluster\\u001b[22m\",\"\\u001b[1m\\u001b[2m display structure.\\u001b[1m\\u001b[22m\",\"\\n\",\"\\u001b[32m\\u001b[1m  └─\\u001b[22m\\u001b[39m\",\" |\",\" \"]');
  });

  test('Fulmination scanning escape result should be correct..', () => {
    const fulmination = new Fulmination({ debug: true, });
    fulmination.scan('(+) bold; red: ', true);
    expect(JSON.stringify(fulmination.scanEscape('(+) dim; underline: test the results of scanning escape.'))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scanning escape.\\u001b[39m\\u001b[22m\"]');
    expect(JSON.stringify(fulmination.scan('(+) dim; underline: test the result of scanning.'))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scanning escape.\\u001b[39m\\u001b[22m\",\"\\u001b[2m\\u001b[4mtest the result of scanning.\\u001b[24m\\u001b[22m\"]');
  });

  test('Fulmination scanning escape multi-line results should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    fulmination.scan(`
      [+] bold; red:
      |
    `, true);
    expect(JSON.stringify(fulmination.scanEscape('(+) dim; underline: test the results of scaning escape.'))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scaning escape.\\u001b[39m\\u001b[22m\",\"\\n\"]');
    expect(JSON.stringify(fulmination.scan('(+) dim; underline: test the result of scaning.'))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scaning escape.\\u001b[39m\\u001b[22m\",\"\\n\",\"\\u001b[2m\\u001b[4mtest the result of scaning.\\u001b[24m\\u001b[22m\"]');
  });

  test('Fulmination scan all should output correct results.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scanAll([
      [`
        [+] bold; red:
        |
      `, 1],
      ['(+) dim; underline: test the results of scaning escape.', 2],
      ['(+) dim; underline: test the result of scaning.', 0],
    ]))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scaning escape.\\u001b[39m\\u001b[22m\",\"\\n\",\"\\u001b[2m\\u001b[4mtest the result of scaning.\\u001b[24m\\u001b[22m\"]');
  });
});
