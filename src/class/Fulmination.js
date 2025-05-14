import { stdout, } from 'process';
import chalk from 'chalk';
import parseChalk from '~/lib/util/parseChalk';
import parseCtf from '~/lib/util/parseCtf';
import ctfTemplate from '~/lib/template/ctfTemplate';

function showErrorText(text, line) {
  console.log(' ' + chalk.gray(line) + ' ' + chalk.black.bgWhite(text));
}

function showErrorPosition(position) {
  const stringList = [];
  for (let i = 0; i < position + (3 - 1); i += 1) {
    stringList.push(' ');
  }
  stringList.push(chalk.bold('~' + chalk.red('^') + '~'));
  console.log(stringList.join(''));
}

function showBesideText(text, line) {
  const highLightText = parseCtf(text).map((e) => ctfTemplate(e)).join('');
  console.log(' ' + chalk.gray(line) + ' ' + chalk.black.bgWhite(highLightText));
}

class Fulmination {
  constructor(options = {}) {
    const defaultOptions =  {
      debug: false,
    };
    this.options = Object.assign(defaultOptions, options);
    this.line = 1;
    this.position = 1;
    this.status = 0;
    const {
      options: {
        debug,
      },
    } = this;
    if (debug === true) {
      this.results = [];
    }
  }

  showErrorLocation(text, error) {
    const lines = text.split('\n');
    const { line, position, } = this;
    showErrorText(lines[line], line);
    showErrorPosition(position);
    if (lines[line + 1] !== undefined) {
      showBesideText(lines[line + 1], line + 1);
    }
    console.log('');
    console.log(chalk.bold(error.message));
    console.log(error.stack);
  }

  handleSpace() {
    let ans = false;
    const { elems, } = this;
    for (let i = elems.length - 1; i >= 0; i -= 1) {
      const char = elems[i];
      if (char !== ' ' && char !== '|' && char !== '*' && char !== ':') {
        ans = true;
        break;
      }
    }
    return ans;
  }

  showText(text, style, linebreak) {
    if (linebreak === true) {
      const {
        options: {
          debug,
        },
      } = this;
      if (debug === true) {
        this.results.push(style(text));
        this.results.push('\n');
      } else {
        console.log(style(text));
      }
    } else {
      const {
        options: {
          debug,
        },
      } = this;
      if (debug === true) {
        this.results.push(style(text));
      } else {
        process.stdout.write(style(text));
      }
    }
  }

  showPassages(passages, style) {
    passages.forEach((passage) => {
      const {
        options: {
          debug,
        },
      } = this;
      if (debug === true) {
        this.results.push(style(passage));
        this.results.push('\n');
      } else {
        console.log(style(passage));
      }
    });
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
            this.position = 1;
            this.line += 1;
            break;
          default:
            this.position += 1;
            this.dealEfficientChar(char);
            break;
        }
      }
      this.dealEfficientChar('EOF');
    } catch (e) {
      this.showErrorLocation(text, e);
    }
    return this.results;
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
          this.style = parseChalk(format);
          this.elems = [];
        } else if (char === ':') {
          const format = this.elems.join('').trimStart();
          this.style = parseChalk(format);
          this.status = 4;
          this.elems = [];
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 4: {
        if (char === 'EOF' || char === '(' || char === '[' || char === '&') {
          if (char === 'EOF') {
            this.status = 0;
            this.showText(this.elems.join('').trimEnd(), this.style);
            delete this.elems;
            break;
          }
          if (char === '&') {
            this.showText(this.elems.join('').trimEnd(), this.style, true);
            this.elems =  [];
          } else {
            this.showText(this.elems.join('').trimEnd(), this.style);
          }
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
            if (char === ' ') {
              if (this.handleSpace()) {
                this.elems.push(char);
              }
            } else {
              this.elems.push(char);
            }
          }
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
          this.style = parseChalk(format);
          this.elems = [];
        } else if (char === ':') {
          const format = this.elems.join('').trimStart();
          this.style = parseChalk(format);
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
          this.passages.shift();
          this.showPassages(this.passages, this.style);
          if (char === '(') {
            this.status = 1;
          }
          if (char === '['){
            this.status = 5;
          }
          if (char === 'EOF') {
            delete this.elems;
            delete this.passages;
            this.status = 0;
            break;
          }
        } else {
          if (char === '*') {
            this.elems.push(' ');
          } else {
            if (char === ' ') {
              if (this.handleSpace()) {
                this.elems.push(char);
              }
            } else {
              this.elems.push(char);
            }
          }
        }
        break;
      }
    }
  }
}

export default Fulmination;
