import { describe, expect, test, } from '@jest/globals';
import minify from '~/lib/util/minify';

describe('[Function] minify;', () => {
  test('minify fulmination text formate text should correct.', async () => {
    expect(minify(`
      (+) bold: bold, underline and so on is chalk style. (+) underline: You can get this section document in chalk. &
      (+) bold: text and passage use same chalk style.
      [+] bold:
      | style use "";"" as delimiter, passage use """|"" as delimiter.
      | Passage apply style to all passage.Text apply style only to one text.
    `)).toMatch('(+)bold:bold, underline and so on is chalk style.(+)underline:You can get this section document in chalk.&(+)bold:text and passage use same chalk style.[+]bold:|style use \"\";\"\" as delimiter, passage use \"\"\"|\"\" as delimiter.|Passage apply style to all passage.Text apply style only to one text.');
  });
  test('minify should be able to handle spaces between words.', async () => {
    expect(minify(`
      (+) bold; red: This is ctf text syntax (+) dim; underline: ctf text will be in same line.
      [+] bold; green:
      | This is ctf passage syntax.
      | Each passage will in different line.
      | Each    passage is start with delimiter.
    `)).toMatch('(+)bold;red:This is ctf text syntax(+)dim;underline:ctf text will be in same line.[+]bold;green:|This is ctf passage syntax.|Each passage will in different line.|Each    passage is start with delimiter.');
  });
});
