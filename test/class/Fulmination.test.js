import { describe, expect, test, } from '@jest/globals';
import chalk from 'chalk';
import Fulmination from '~/class/Fulmination';

describe('[Class] Fulmination;', () => {
  test('The result of fulmination parsing a piece of text should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) bold; red: This is fulmination text syntax (+) dim; underline: fulmination text will be in same line.'))).toMatch('[\"\\u001b[1m\\u001b[31mThis is fulmination text syntax\\u001b[39m\\u001b[22m\",\"\\u001b[2m\\u001b[4mfulmination text will be in same line.\\u001b[24m\\u001b[22m\"]');
  });

  test('Compression will not affect the display results', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; green:
      | compression will not affect the display results.
    `))).toMatch('[\"\\u001b[1m\\u001b[32mcompression will not affect the display results.\\u001b[39m\\u001b[22m\",\"\\n\"]');
    expect(JSON.stringify(fulmination.scan(`
      [+]bold;green:|compression will not affect the display results.
    `))).toMatch('[\"\\u001b[1m\\u001b[32mcompression will not affect the display results.\\u001b[39m\\u001b[22m\",\"\\n\"]');
  });

  test('The result of fulmination parsing multiple paragraphs of text should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; green:
      | This is fulmination passage syntax.
      | Each passage will in different line.
      | Each passage is start with delimiter.
    `))).toMatch('[\"\\u001b[1m\\u001b[32mThis is fulmination passage syntax.\\u001b[39m\\u001b[22m\",\"\\n\",\"\\u001b[1m\\u001b[32mEach passage will in different line.\\u001b[39m\\u001b[22m\",\"\\n\",\"\\u001b[1m\\u001b[32mEach passage is start with delimiter.\\u001b[39m\\u001b[22m\",\"\\n\"]');
  });

  test('The result of fulmination parsing mixed text should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      (+) bold: bold, underline and so on is chalk style. (+) underline: You can get this section document in chalk. &
      (+) bold: text and passage use same chalk style.
      [+] bold:
      | style use "";"" as delimiter, passage use """|"" as delimiter.
      | Passage apply style to all passage.Text apply style only to one text.
    `))).toMatch('[\"\\u001b[1mbold, underline and so on is chalk style.\\u001b[22m\",\"\\u001b[4mYou can get this section document in chalk.\\u001b[24m\",\"\\n\",\"\\u001b[1mtext and passage use same chalk style.\\u001b[22m\",\"\\u001b[1mstyle use \\\";\\\" as delimiter, passage use \\\"|\\\" as delimiter.\\u001b[22m\",\"\\n\",\"\\u001b[1mPassage apply style to all passage.Text apply style only to one text.\\u001b[22m\",\"\\n\"]');
  });

  test('Fulmination should be able to handle multiple lines of spaces.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+): * - * (+) bold: Gentoo (+): ":'))).toMatch('[\" - \",\"\\u001b[1mGentoo\\u001b[22m\",\":\"]');
    expect(JSON.stringify(fulmination.scan(`
      (+) green; bold: * == (+) bold: * Cluster (+) bold; dim: * display structure. &
      (+) green; bold: ** └─ (+) : * | *
    `))).toMatch('[\"\\u001b[32m\\u001b[1m ==\\u001b[22m\\u001b[39m\",\"\\u001b[1m Cluster\\u001b[22m\",\"\\u001b[1m\\u001b[2m display structure.\\u001b[1m\\u001b[22m\",\"\\n\",\"\\u001b[32m\\u001b[1m  └─\\u001b[22m\\u001b[39m\",\" | \"]');
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; underline:
      | ** test for multiple lines of space
      | ** test for multiple lines of space
    `))).toMatch('[\"\\u001b[1m\\u001b[4m  test for multiple lines of space\\u001b[24m\\u001b[22m\",\"\\n\",\"\\u001b[1m\\u001b[4m  test for multiple lines of space\\u001b[24m\\u001b[22m\",\"\\n\"]');
  });

  test('Fulmination should be able to support multiple languages.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) dim; underline: 테스트는 다양한 언어를 지원할 수 있습니다.'))).toMatch('[\"\\u001b[2m\\u001b[4m테스트는 다양한 언어를 지원할 수 있습니다.\\u001b[24m\\u001b[22m\"]');
    expect(JSON.stringify(fulmination.scan(`
      [+] black; bgRed:
      | 테스트는 여러 줄에 걸쳐 다양한 언어를 지원할 수 있습니다.
      | 테스트는 여러 줄에 걸쳐 다양한 언어를 지원할 수 있습니다.
      | 테스트는 여러 줄에 걸쳐 다양한 언어를 지원할 수 있습니다.
    `))).toMatch('[\"\\u001b[30m\\u001b[41m테스트는 여러 줄에 걸쳐 다양한 언어를 지원할 수 있습니다.\\u001b[49m\\u001b[39m\",\"\\n\",\"\\u001b[30m\\u001b[41m테스트는 여러 줄에 걸쳐 다양한 언어를 지원할 수 있습니다.\\u001b[49m\\u001b[39m\",\"\\n\",\"\\u001b[30m\\u001b[41m테스트는 여러 줄에 걸쳐 다양한 언어를 지원할 수 있습니다.\\u001b[49m\\u001b[39m\",\"\\n\"]');
  });

  test('Fulmination scanning escape result should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    fulmination.scan('(+) bold; red: ', true);
    expect(JSON.stringify(fulmination.scanEscape('(+) dim; underline: test the results of scanning escape.'))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scanning escape.\\u001b[39m\\u001b[22m\"]');
    expect(JSON.stringify(fulmination.scan('(+) dim; underline: test the result of scanning.'))).toMatch('[\"\\u001b[2m\\u001b[4mtest the result of scanning.\\u001b[24m\\u001b[22m\"]');
  });

  test('Fulmination scanning escape multi-line results should be correct.', () => {
    const fulmination = new Fulmination({ debug: true, });
    fulmination.scan(`
      [+] bold; red:
      |
    `, true);
    expect(JSON.stringify(fulmination.scanEscape('(+) dim; underline: test the results of scaning escape.'))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scaning escape.\\u001b[39m\\u001b[22m\",\"\\n\"]');
    expect(JSON.stringify(fulmination.scan('(+) dim; underline: test the result of scaning.'))).toMatch('[\"\\u001b[2m\\u001b[4mtest the result of scaning.\\u001b[24m\\u001b[22m\"]');
  });

  test('Fulmination should handle variable escaping.', () => {
    const fulmination = new Fulmination({ debug: true, });
    const number = 1;
    const dependence = 'remove';
    expect(JSON.stringify(fulmination.scan(`
      [+]:
      |
      (+) bold: Dependence check error number * (+): "[ (+) bold: "b ` + number + ` " (+): "]"": 2&
      (+): Command line program \` (+) bold: "b ` + dependence + ` " (+): \` don\'t be installed. 2&
      (+) bold: Prossible help (+): "; 2&
    `))).toMatch("[\"\",\"\\n\",\"\\u001b[1mDependence check error number \\u001b[22m\",\"[\",\"\\u001b[1m1\\u001b[22m\",\"]\\\":\",\"\\n\",\"\\n\",\"Command line program `\",\"\\u001b[1mremove\\u001b[22m\",\"` don't be installed.\",\"\\n\",\"\\n\",\"\\u001b[1mProssible help\\u001b[22m\",\";\",\"\\n\",\"\\n\"]");
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

  test('Fulmination transfer symbols should be recoginizable.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) bold: "("+") dim": underline: test escape single line.'))).toMatch('[\"\\u001b[1m(+) dim: underline: test escape single line.\\u001b[22m\"]');
    expect(JSON.stringify(fulmination.scan(`
      [+] bold:
      | "("+") dim": underline": test escape symbols multi-line.
    `))).toMatch('[\"\\u001b[1m(+) dim: underline: test escape symbols multi-line.\\u001b[22m\",\"\\n\"]');
  });

  test('Number in fulmination cannot be used as escape sequences.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) black; bgRed: nvm install 22.'))).toMatch('[\"\\u001b[30m\\u001b[41mnvm install 22.\\u001b[49m\\u001b[39m\"]');
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; underline:
      | node -v # Should print ""v22.16.0"".
      | nvm current # Should print ""v22.16.0"".
    `))).toMatch('[\"\\u001b[1m\\u001b[4mnode -v # Should print \\\"v22.16.0\\\".\\u001b[24m\\u001b[22m\",\"\\n\",\"\\u001b[1m\\u001b[4mnvm current # Should print \\\"v22.16.0\\\".\\u001b[24m\\u001b[22m\",\"\\n\"]');
  });

  test('Fulmination should be able to handle the transfer of text in sections.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) bold: "19 (+) dim: underline: test escape single line.'))).toMatch('[\"\\u001b[1m(+) dim: underline: test escape single line.\\u001b[22m\"]');
    expect(JSON.stringify(fulmination.scan('(+) bold: "b (+) dim: underline:" test escape single line.'))).toMatch('[\"\\u001b[1m(+) dim: underline: test escape single line.\\u001b[22m\"]');
    expect(JSON.stringify(fulmination.scan('(+) bold: "b (+) dim: underline: " test escape single line.'))).toMatch('[\"\\u001b[1m(+) dim: underline: test escape single line.\\u001b[22m\"]');
  });

  test('Fulmination should be able to handle multiple line breaks on a single line.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) red; bold: test multiple carriage retrun on a single line. 2&'))).toMatch('[\"\\u001b[31m\\u001b[1mtest multiple carriage retrun on a single line.\\u001b[22m\\u001b[39m\",\"\\n\",\"\\n\"]');
    expect(JSON.stringify(fulmination.scan('(+) red; bold: there are numbers such as 1 that require extra attention. 2&'))).toMatch('[\"\\u001b[31m\\u001b[1mthere are numbers such as 1 that require extra attention.\\u001b[22m\\u001b[39m\",\"\\n\",\"\\n\"]');
  });

  test('Fulmination should be able to handle paragraph text transfer.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; red:
      | "19 (+) dim; underline: test the results of scaning escape,
      |
    `))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scaning escape,\\u001b[39m\\u001b[22m\",\"\\n\",\"\",\"\\n\"]');
    expect(JSON.stringify(fulmination.scan(`
      [+] bold; red:
      | "b (+) dim; underline:" test the results of scaning escape,
      |
    `))).toMatch('[\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scaning escape,\\u001b[39m\\u001b[22m\",\"\\n\",\"\",\"\\n\"]');
  });

  test('Fulmination generation funciton should output the correct result.', () => {
    const fulmination = new Fulmination();
    expect(JSON.stringify(fulmination.generate('(+) bold: test generation function.'))).toMatch('\"\\u001b[1mtest generation function.\\u001b[22m\"');
    expect(JSON.stringify(fulmination.generate(`
      [+] bold; green:
      | test function generate
      | test function generate escape
      | test function generate all
    `))).toMatch('\"\\u001b[1m\\u001b[32mtest function generate\\u001b[39m\\u001b[22m\\n\\u001b[1m\\u001b[32mtest function generate escape\\u001b[39m\\u001b[22m\\n\\u001b[1m\\u001b[32mtest function generate all\\u001b[39m\\u001b[22m\\n\"');
    fulmination.scan('(+) bold:', true);
    expect(JSON.stringify(fulmination.generateEscape('test "generation" function.'))).toMatch('\"\\u001b[1mtest \\\"generation\\\" function.\\u001b[22m\"');
    fulmination.scan('[+] bold:', true);
    expect(JSON.stringify(fulmination.generate(`
      [+] bold; green:
      | test function generate
      | test function generate escape
      | test function generate all
    `))).toMatch('\"\\u001b[1m\\u001b[32mtest function generate\\u001b[39m\\u001b[22m\\n\\u001b[1m\\u001b[32mtest function generate escape\\u001b[39m\\u001b[22m\\n\\u001b[1m\\u001b[32mtest function generate all\\u001b[39m\\u001b[22m\\n\"');
    expect(JSON.stringify(fulmination.generateAll([
      [`
        [+] bold; red:
        |
      `, 1],
      ['(+) dim; underline: test the results of scaning escape.', 2],
      ['(+) dim; underline: test the result of scaning.', 0],
    ]))).toMatch('\"\\u001b[1m\\u001b[31m(+) dim; underline: test the results of scaning escape.\\u001b[39m\\u001b[22m\\n\\u001b[2m\\u001b[4mtest the result of scaning.\\u001b[24m\\u001b[22m\"');
  });

  test('Fulminatin should be able to handle multiple asterisk correctly.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) green; bold: test multiple asterisk ** (+): test multiple asterisk'))).toMatch('[\"\\u001b[32m\\u001b[1mtest multiple asterisk  \\u001b[22m\\u001b[39m\",\"test multiple asterisk\"]');
  });

  test('Fulminatin should be able to correctly escape asterisks.', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan('(+) bold: SELECT "* FROM users;'))).toMatch('[\"\\u001b[1mSELECT * FROM users;\\u001b[22m\"]');
  });

  test('Fulmination should be able to support the original situation', () => {
    const fulmination = new Fulmination({ debug: true, });
    expect(JSON.stringify(fulmination.scan(`
      <+> dim:
      Error: Things keep happening!
      *** at /home/gbusey/file.js:525:2
      *** at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)
      *** at Actor.<anonymous> (/home/gbusey/actors.js:400:8)
      *** at increaseSynergy (/home/gbusey/actors.js:701:6)
    `))).toMatch('[\"\\u001b[2mError:Thingskeephappening!\\u001b[22m\\n\\u001b[2m   at/home/gbusey/file.js:525:2\\u001b[22m\\n\\u001b[2m   atFrobnicator.refrobulate(/home/gbusey/business-logic.js:424:21)\\u001b[22m\\n\\u001b[2m   atActor.<anonymous>(/home/gbusey/actors.js:400:8)\\u001b[22m\\n\\u001b[2m   atincreaseSynergy(/home/gbusey/actors.js:701:6)\\u001b[22m\\n\\u001b[2m\\u001b[22m\"]');
  });
});
