import { describe, expect, test, } from '@jest/globals';
import minify from '~/lib/util/minify';

describe('[lib] color text formate test case;', () => {
  test('minify color text formate text;', async () => {
    expect(minify(`
      [+] red; bold:
        | This is text will be color as red and bold.
        | This is a fulmination minify function test text,
        | test this text whether or not be minify correctly,
        | test this text minify result.
    `)).toMatch('[+] red; bold:|This is text will be color as red and bold.|This is a fulmination minify function test text,|test this text whether or not be minify correctly,|test this text minify result.');
  });
});
