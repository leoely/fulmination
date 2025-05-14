import { describe, expect, test, } from '@jest/globals';
import minify from '~/lib/util/minify';

describe('[Function] minify;', () => {
  test('minify color text formate text should correct.', async () => {
    expect(minify(`
      (+) bold: bold, underline and so on is chalk style. (+) underline: You can get this section document in chalk. &
      (+) bold: text and passage use same chalk style.
      [+] bold:
      | style use ";" as delimiter, passage use "|" as delimiter.
      | Passage apply style to all passage.Text apply style only to one text.
    `)).toMatch('(+)bold:bold, underline and so on is chalk style.(+)underline:You can get this section document in chalk.&(+)bold:text and passage use same chalk style.[+]bold:|style use \";\" as delimiter, passage use \"|\" as delimiter.|Passage apply style to all passage.Text apply style only to one text.');
  });
});
