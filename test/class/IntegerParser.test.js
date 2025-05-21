import { describe, expect, test, } from '@jest/globals';
import IntegerParser from '~/class/IntegerParser';

describe('[Class] IntegerParser;', () => {
  test('Integer parser should able to parse numbers correctly.', () => {
    const integerParser = new IntegerParser();
    integerParser.scan('234423');
    expect(integerParser.getInteger()).toBe(234423);
    integerParser.resetInteger();
    integerParser.scan('45325');
    expect(integerParser.getInteger()).toBe(45325);
  });
});
