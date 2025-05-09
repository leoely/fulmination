import { stdout, } from 'process';
import chalk from 'chalk';
import parseChalk from '~/lib/util/parseChalk';
import parseCtf from '~/lib/util/parseCtf';
import ctfTemplate from '~/lib/template/ctfTemplate';

function showText(text, style) {
  process.stdout.write(style(text));
}

function showPassages(passages, style) {
  passages.forEach((passage) => {
    console.log(style(passage));
  });
}

function showErrorText(text, line) {
  console.log(' ' + chalk.gray(line) + ' ' + chalk.black.bgWhite(text));
}

function showErrorPosition(p) {
  const stringList = [];
  for (let i = 0; i < p + 3; i += 1) {
    stringList.push(' ');
  }
  stringList.push(chalk.bold('~' + chalk.red('^') + '~'));
  console.log(stringList.join(''));
}

function showBesideText(text, line) {
  const highLightText = parseCtf(text).map((e) => ctfTemplate(e)).join('');
  console.log(' ' + chalk.gray(line) + ' ' + chalk.black.bgWhite(highLightText));
}

class Parser {
  constructor() {
    this.l = 1;
    this.p = 0;
    this.status = 0;
  }

  showErrorLocation(text, error) {
    const lines = text.split('\n');
    const { l, p, } = this;
    showErrorText(lines[l], l);
    showErrorPosition(p);
    if (lines[l + 1] !== undefined) {
      showBesideText(lines[l + 1], l + 1);
    }
    console.log('');
    console.log(chalk.bold(error.message));
    console.log(error.stack);
  }

  scan(text) {
    try {
      for (let i = 0; i < text.length; i += 1) {
        const char = text.charAt(i);
        switch (char) {
          case ' ': {
            const prevChar = text.charAt(i - 1);
            if (prevChar === ' ' || prevChar === '|' || prevChar === '' ||
              prevChar === '\n') {
              this.p += 1;
            } else {
              this.dealEfficientChar(char);
            }
            break;
          }
          case '\n':
            this.p = 1;
            this.line += 1;
            break;
          default:
            this.p += 1;
            this.dealEfficientChar(char);
            break;
        }
      }
      this.dealEfficientChar('EOF');
    } catch (e) {
      this.showErrorLocation(text, e);
    }
  }

  dealEfficientChar(char) {
    switch (this.status) {
      case 0: {
        switch (char) {
          case '(':
            this.status = 1;
            break;
          case '[':
            this.status = 5;
            break;
          default:
            throw new Error('Ctf format should start with "(" or "[".');
        }
        break;
      }
      case 1: {
        if (char === '+') {
          this.status = 2;
        } else {
          throw new Error('This position should be "+".');
        }
        break;
      }
      case 2: {
        if (char === ')') {
          this.elems = [];
          this.style = chalk;
          this.status = 3;
        } else {
          throw new Error('This position should be ")".');
        }
        break;
      }
      case 3: {
        if (char === ';') {
          const format = this.elems.join('').trimStart();
          this.style = parseChalk(format, this.style);
          this.elems = [];
        } else if (char === ':') {
          const format = this.elems.join('').trimStart();
          this.style = parseChalk(format, this.style);
          this.status = 4;
          this.elems = [];
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 4: {
        if (char === 'EOF' || char === '(' || char === '[' || char === '&') {
          if (char === '&') {
            this.elems.push('\n');
            showText(this.elems.join('').trimStart(), this.style);
          } else {
            showText(this.elems.join('').trim(), this.style);
          }
          if (char === '&') {
            this.status = 0;
          }
          if (char === '(') {
            this.status = 1;
          }
          if (char === '['){
            this.status = 5;
          }
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 5: {
        if (char === '+') {
          this.status = 6;
        } else {
          throw new Error('This position should be "+".');
        }
        break;
      }
      case 6: {
        if (char === ']') {
          this.elems = [];
          this.status = 7;
          this.style = chalk;
        } else {
          throw new Error('This position should be "]".');
        }
        break;
      }
      case 7: {
        if (char === ';') {
          const format = this.elems.join('').trimStart();
          this.style = parseChalk(format, this.style);
          this.elems = [];
        } else if (char === ':') {
          const format = this.elems.join('').trimStart();
          this.style = parseChalk(format, this.style);
          this.status = 8;
          this.passages = [];
          this.elems = [];
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 8: {
        if (char === '|') {
          this.passages.push(this.elems.join('').trimEnd());
          this.elems = [];
        } else if (char === 'EOF' || char === '(' || char === '[') {
          this.passages.push(this.elems.join('').trimEnd());
          showPassages(this.passages, this.style);
          if (char === '(') {
            this.status = 1;
          }
          if (char === '['){
            this.status = 5;
          }
        } else {
          if (char === '*') {
            this.elems.push(' ');
          } else {
            this.elems.push(char);
          }
        }
        break;
      }
    }
  }
}

export default Parser;
