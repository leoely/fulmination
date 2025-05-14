import { describe, expect, test, } from '@jest/globals';
import chalk from 'chalk';
import ChalkParser from '~/class/ChalkParser';

describe('[Class] ChalkParser;', () => {
  test('The chalk parser parses the chalk highlighted syntax should correct.', () => {
    const chalkParser = new ChalkParser();
    const string = 'JavaScript often abbreviated as JS, is a programming language and core technology of the World Wide Web, alongside HTML and CSS.';
    expect(chalkParser.scan('bold')(string)).toEqual(chalk.bold(string));
    expect(chalkParser.scan('dim')(string)).toEqual(chalk.dim(string));
    expect(chalkParser.scan('italic')(string)).toEqual(chalk.italic(string));
    expect(chalkParser.scan('underline')(string)).toEqual(chalk.underline(string));
    expect(chalkParser.scan('inverse')(string)).toEqual(chalk.inverse(string));
    expect(chalkParser.scan('strikethrough')(string)).toEqual(chalk.strikethrough(string));
    expect(chalkParser.scan('red')(string)).toEqual(chalk.red(string));
    expect(chalkParser.scan('green')(string)).toEqual(chalk.green(string));
    expect(chalkParser.scan('yellow')(string)).toEqual(chalk.yellow(string));
    expect(chalkParser.scan('blue')(string)).toEqual(chalk.blue(string));
    expect(chalkParser.scan('magenta')(string)).toEqual(chalk.magenta(string));
    expect(chalkParser.scan('cyan')(string)).toEqual(chalk.cyan(string));
    expect(chalkParser.scan('white')(string)).toEqual(chalk.white(string));
    expect(chalkParser.scan('gray')(string)).toEqual(chalk.gray(string));
    expect(chalkParser.scan('bgBlack')(string)).toEqual(chalk.bgBlack(string));
    expect(chalkParser.scan('bgRed')(string)).toEqual(chalk.bgRed(string));
    expect(chalkParser.scan('bgGreen')(string)).toEqual(chalk.bgGreen(string));
    expect(chalkParser.scan('bgYellow')(string)).toEqual(chalk.bgYellow(string));
    expect(chalkParser.scan('bgBlue')(string)).toEqual(chalk.bgBlue(string));
    expect(chalkParser.scan('bgMagenta')(string)).toEqual(chalk.bgMagenta(string));
    expect(chalkParser.scan('bgCyan')(string)).toEqual(chalk.bgCyan(string));
    expect(chalkParser.scan('bgWhite')(string)).toEqual(chalk.bgWhite(string));
    expect(chalkParser.scan('rgb(100, 100, 100)')(string)).toEqual(chalk.rgb(100, 100, 100)(string));
    expect(chalkParser.scan('rgb(233, 21, 243)')(string)).toEqual(chalk.rgb(233, 21, 243)(string));
    expect(chalkParser.scan('bgRgb(100, 100, 100)')(string)).toEqual(chalk.bgRgb(100, 100, 100)(string));
    expect(chalkParser.scan('bgRgb(21, 123, 43)')(string)).toEqual(chalk.bgRgb(21, 123, 43)(string));
  });
});
