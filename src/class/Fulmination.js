import chalk from 'chalk';
import { HighLight, FulminationLexer, } from 'glow.js';
import CtfParser from 'fulmination';
import ChalkParser from '~/class/ChalkParser';
import fulminationTemplate from '~/lib/template/fulminationTemplate';

function getWidth(length) {
  let ans = 1;
  while (true) {
    length /= 10;
    if (length < 1) {
      break;
    }
    ans += 1;
  }
  return ans;
}

class Fulmination {
  constructor(options = {}) {
    const defaultOptions =  {
      debug: false,
    };
    this.options = Object.assign(defaultOptions, options);
    this.line = 0;
    this.position = 1;
    this.status = 0;
    this.chalkParser = new ChalkParser();
    const highLight = new HighLight();
    highLight.addLexer(FulminationLexer);
    this.highLight = highLight;
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
    const fulmination = new CtfParser();
    const lines = text.split('\n');
    const { line, position, } = this;
    fulmination.scan('(+): * & (+): * (+) gray: ' + line + '(+): *');
    console.log(chalk.black.bgWhite(lines[line]));
    const asterisks = [];
    for (let i = 0; i < position - 1 + getWidth(line) + 2 - 1; i += 1) {
      asterisks.push('*');
    }
    fulmination.scan(
      '(+) :' + asterisks.join('') + '(+) bold: ~ (+) red; bold: ^ (+) bold: ~ &'
    );
    if (lines[line + 1] !== undefined) {
      const { highLight, } = this;
      const hl = highLight.parse(text).map((token) => fulminationTemplate(token)).join('');
      fulmination.scan('(+) gray: * ' + (line + 1) + '(+): *');
      console.log((chalk.black.bgWhite(hl)));
    }
    console.log(chalk.bold('\n' + error.message));
    console.log(error.stack);
  }

  cleanAsteriskAndOther() {
    this.asterisk = false;
    this.other = false;
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

  showText(text, linebreak) {
    if (linebreak === true) {
      const {
        options: {
          debug,
        },
      } = this;
      if (debug === true) {
        const { results, style, } = this;
        results.push(style(text));
        results.push('\n');
      } else {
        const { style, } = this;
        console.log(style(text));
      }
    } else {
      const {
        options: {
          debug,
        },
      } = this;
      if (debug === true) {
        const { results, style, } = this;
        results.push(style(text));
      } else {
        const { style, } = this;
        process.stdout.write(style(text));
      }
    }
  }

  showPassages() {
    const { passages, } = this;
    if (Array.isArray(passages)) {
      passages.forEach((passage) => {
        const {
          options: {
            debug,
          },
        } = this;
        if (debug === true) {
          const { style, } = this;
          this.results.push(style(passage));
          this.results.push('\n');
        } else {
          const { style, } = this;
          console.log(style(passage));
        }
      });
    } else {
      throw new Error('[Error] The parameter section should be of array type.');
    }
  }

  showTextAndJump(status, linebreak) {
    const { asterisk, other, } = this;
    if (asterisk === true && other !== true) {
      this.showText(this.elems.join(''), linebreak);
    } else {
      this.showText(this.elems.join('').trimEnd(), linebreak);
    }
    this.status = status;
    this.cleanAsteriskAndOther();
  }

  showPassagesAndJump(status) {
    const { passages, elems, asterisk, other, } = this;
    if (asterisk === true && other !== true) {
      passages.push(elems.join(''));
    } else {
      passages.push(elems.join('').trimEnd());
    }
    passages.shift();
    this.showPassages();
    this.status = status;
    this.cleanAsteriskAndOther();
  }

  dealAsterisk() {
    this.asterisk = true;
    this.elems.push(' ');
  }

  dealOther(char) {
    this.other = true;
    this.elems.push(char);
  }

  dealSpace(char) {
    if (this.handleSpace()) {
      this.elems.push(char);
    }
  }

  scan(text) {
    try {
      for (let i = 0; i <= text.length; i += 1) {
        const char = text.charAt(i);
        switch (char) {
          case ' ': {
            const prevChar = text.charAt(i - 1);
            switch (prevChar) {
              case ' ':
              case '|':
              case '&':
              case ':':
              case ';':
              case '':
              case ')':
              case ']':
              case '\n':
                this.position += 1;
                break;
              default:
                this.dealChar(char);
                this.position += 1;
            }
            break;
          }
          case '\n':
            this.line += 1;
            this.position = 1;
            break;
          default:
            this.dealChar(char);
            this.position += 1;
        }
      }
    } catch (e) {
      this.showErrorLocation(text, e);
    }
    const {
      options: {
        debug,
      },
    } = this;
    if (debug === true) {
      return this.results;
    }
  }

  dealChar(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case '(':
            this.status = 1;
            break;
          case '[':
            this.status = 5;
            break;
          case '':
            break;
          default:
            throw new Error('[Error] This should a "(" or "[".');
        }
        break;
      case 1:
        switch (char) {
          case '+':
            this.status = 2;
            break;
          default:
            throw new Error('[Error] This should be a "+".');
        }
        break;
      case 2:
        switch (char) {
          case ')': {
            const { chalkParser, } = this;
            this.elems = [];
            this.status = 3;
            chalkParser.resetStyles();
            break;
          }
          default:
            throw new Error('[Error] This should be a ")".');
        }
        break;
      case 3:
        switch (char) {
          case ';': {
            const { chalkParser, } = this;
            this.style = chalkParser.getStyles();
            const { style, } = this;
            chalkParser.setStyles(style);
            break;
          }
          case ':': {
            const { chalkParser, } = this;
            this.style = chalkParser.getStyles();
            this.status = 4;
            const { style, } = this;
            chalkParser.setStyles(style);
            break;
          }
          default: {
            const { chalkParser, } = this;
            chalkParser.dealChar(char);
          }
        }
        break;
      case 4:
        switch (char) {
          case '':
            this.showText(this.elems.join(''));
            this.status = 0;
            this.cleanAsteriskAndOther();
            delete this.elems;
            break;
          case '(':
            this.showTextAndJump(1);
            break;
          case '[':
            this.showTextAndJump(5);
            break;
          case '&':
            this.showTextAndJump(0, true);
            this.elems =  [];
            break;
          case '*':
            this.dealAsterisk();
            break;
          case ' ':
            this.dealSpace(char);
            break;
          default:
            this.dealOther(char);
        }
        break;
      case 5:
        switch (char) {
          case '+':
            this.status = 6;
            break;
          default:
            throw new Error('[Error] This should be "+".');
        }
        break;
      case 6: {
        switch (char) {
          case ']': {
            const { chalkParser, } = this;
            this.elems = [];
            this.status = 7;
            chalkParser.resetStyles();
            break;
          }
          default:
            throw new Error('[Error] This should be "]".');
        }
        break;
      }
      case 7:
        switch (char) {
          case ';': {
            const { chalkParser, } = this;
            this.style = chalkParser.getStyles();
            const { style, } = this;
            chalkParser.setStyles(style);
            break;
          }
          case ':': {
            const { chalkParser, } = this;
            this.style = chalkParser.getStyles();
            this.status = 8;
            this.passages = [];
            const { style, } = this;
            chalkParser.setStyles(style);
            break;
          }
          default: {
            const { chalkParser, } = this;
            chalkParser.dealChar(char);
          }
        }
        break;
      case 8: {
        switch (char) {
          case '|': {
            const { passages, elems, asterisk, other, } = this;
            if (asterisk === true && other !== true) {
              passages.push(elems.join(''));
            } else {
              passages.push(elems.join('').trimEnd());
            }
            this.elems = [];
            this.cleanAsteriskAndOther();
            break;
          }
          case '(':
            this.showPassagesAndJump(1);
            break;
          case '':
            this.showPassagesAndJump(0);
            delete this.elems;
            delete this.passages;
            break;
          case '(':
            this.showPassagesAndJump(1);
            break;
          case '[':
            this.showPassagesAndJump(5);
            break;
          case '*':
            this.dealAsterisk();
            break;
          case ' ':
            this.dealSpace(char);
            break;
          default:
            this.dealOther(char);
        }
        break;
      }
    }
  }
}

export default Fulmination;
