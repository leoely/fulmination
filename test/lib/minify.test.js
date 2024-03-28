import { describe, expect, test, } from '@jest/globals';
import minify from '~/lib/util/minify';

describe('[lib] color text formate test case;', () => {
  test('minify color text formate text;', async () => {
    expect(minify(`
      (+) dim: This is fulmination text style. (+) dim: This is fulmination text end test. |

      [+] red; bold:
        | This is text will be color as red and bold.
        | This is a fulmination minify function test text,
        | test this text whether or not be minify correctly,
        | test this text minify result.
    `)).toMatch('(+)dim:This is fulmination text style.(+)dim:This is fulmination text end test.|[+]red;bold:|This is text will be color as red and bold.|This is a fulmination minify function test text,|test this text whether or not be minify correctly,|test this text minify result.');
  });
});
