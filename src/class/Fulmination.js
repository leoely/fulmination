import { HighLight, FulminationLexer, } from 'glow.js';
import Fulmination1 from 'fulmination';
import ChalkParser from '~/class/ChalkParser';
import IntegerParser from '~/class/IntegerParser';
import fulminationTmpl from '~/lib/template/fulminationTmpl';

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

function isDecimal(char) {
  return char >= '0' && char <= '9';
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
    this.integerParser = new IntegerParser();
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
    const highLight = new HighLight();
    highLight.addLexer(FulminationLexer);
    const fulmination = new Fulmination1();
    const lines = text.split('\n');
    const { line, position, } = this;
    fulmination.scanAll([
      ['(+): * & (+): * (+) gray: ' + line + '(+): * (+) black; bgWhite: ', 1],
      [lines[line], 2],
      ['(+): * &', 0]
    ]);
    const asterisks = [];
    for (let i = 0; i < position - 1 + getWidth(line) + 2 - 1; i += 1) {
      asterisks.push('*');
    }
    fulmination.scan(
      '(+) :' + asterisks.join('') + '(+) bold: ~ (+) red; bold: ^ (+) bold: ~ &'
    );
    const nextLineIndex = line + 1;
    const nextLine = lines[nextLineIndex];
    if (nextLine !== undefined) {
      const hl = highLight.parse(nextLine).map((token) => fulminationTmpl(token)).join('');
      fulmination.scanAll([
        ['(+) gray: * ' + (nextLineIndex) + '(+): * (+) black; bgWhite: ', 1],
        [hl, 2],
        ['(+): &', 0],
      ]);
    }
    fulmination.scanAll([
      ['(+) bold: ', 1],
      [error.message, 2],
      ['(+): * &', 0]
    ]);
    console.log(error.stack);
  }

  cleanAsteriskAndOther() {
    this.asterisk = false;
    this.other = false;
  }

  handleSpace() {
    let ans = false;
    const { chars, } = this;
    for (let i = chars.length - 1; i >= 0; i -= 1) {
      const char = chars[i];
      if (char !== ' ') {
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
      this.showText(this.chars.join(''), linebreak);
    } else {
      this.showText(this.chars.join('').trimEnd(), linebreak);
    }
    this.status = status;
    this.cleanAsteriskAndOther();
  }

  showPassagesAndJump(status) {
    const { passages, chars, asterisk, other, } = this;
    if (asterisk === true && other !== true) {
      passages.push(chars.join(''));
    } else {
      passages.push(chars.join('').trimEnd());
    }
    passages.shift();
    this.showPassages();
    if (status !== undefined) {
      this.status = status;
    }
    this.cleanAsteriskAndOther();
  }

  escapeAndJump(char, status) {
    this.keep = true;
    this.dealOther(char);
    this.status = status;
  }

  dealAsterisk() {
    this.asterisk = true;
    this.chars.push(' ');
  }

  dealOther(char) {
    this.other = true;
    this.chars.push(char);
  }

  dealSpace(char) {
    if (this.handleSpace()) {
      this.chars.push(char);
    }
  }

  scanAll(array) {
    if (Array.isArray(array)) {
      array.map((elem) => {
        const [text, code] = elem;
        switch (code) {
          case 0:
            this.scan(text, undefined, true);
            break;
          case 1:
            this.scan(text, true, true);
            break;
          case 2:
            this.scanEscape(text, true);
            break;
          default:
            throw new Error('[Error] parameter code can only the interval [0, 2]');
        }
      });
      return this.results;
    } else {
      throw new Error('[Error] Method scanAll parameters which should be a array type');
    }
  }

  scan(text, end, keep) {
    this.end = end;
    const results = this.dealText(text, this.dealChar.bind(this));
    delete this.end;
    const {
      options: {
        debug,
      },
    } = this;
    if (debug === true){
      if (keep !== true) {
        this.results = [];
      }
      return results;
    }
  }

  scanEscape(text, keep) {
    const results = this.dealTextEscape(text, this.dealCharEscape.bind(this));
    const {
      options: {
        debug,
      },
    } = this;
    if (debug === true) {
      if (keep !== true) {
        this.results = [];
      }
      return results;
    }
  }

  dealTextEscape(text, dealMethod) {
    try {
      for (let i = 0; i <= text.length; i += 1) {
        const char = text.charAt(i);
        switch (char) {
          case '\n':
            this.line += 1;
            this.position = 1;
            break;
          default:
            dealMethod(char);
            this.position += 1;
        }
      }
    } catch (error) {
      this.showErrorLocation(text, error);
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

  dealText(text, dealMethod) {
    try {
      for (let i = 0; i <= text.length; i += 1) {
        const char = text.charAt(i);
        switch (char) {
          case ' ': {
            const previousChar = text.charAt(i - 1);
            const { keep, } = this;
            if (keep !== true) {
              switch (previousChar) {
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
                  dealMethod(char);
                  this.position += 1;
              }
            } else {
              dealMethod(char);
              this.position += 1;
            }
            break;
          }
          case '\n':
            this.line += 1;
            this.position = 1;
            break;
          default:
            dealMethod(char);
            this.position += 1;
        }
      }
    } catch (error) {
      this.showErrorLocation(text, error);
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

  dealCharEscape(char) {
    const { status, } = this;
    switch (status) {
      case 4:
      case 10:
        break;
      default:
        throw new Error('[Error] Escape scan must be in status 4 and 10.');
    }
    this.other = true;
    switch (char) {
      case '':
        switch (status) {
          case 4:
            this.showText(this.chars.join(''));
            this.cleanAsteriskAndOther();
            this.status = 0;
            this.chars = [];
            break;
          case 10:
            this.showPassagesAndJump();
            this.passages = [];
            break;
        }
        break;
      default:
        this.chars.push(char);
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
            this.status = 7;
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
            this.chars = [];
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
          case '': {
            const { end, } = this;
            if (end !== true) {
              this.showText(this.chars.join(''));
              this.status = 0;
              this.cleanAsteriskAndOther();
              delete this.chars;
            }
            break;
          }
          case '"':
            this.status = 5;
            break;
          case '(':
            this.showTextAndJump(1);
            break;
          case '[':
            this.showTextAndJump(7);
            break;
          case '&':
            this.showTextAndJump(0, true);
            this.chars =  [];
            break;
          case '*':
            this.dealAsterisk();
            break;
          case ' ':
            this.dealSpace(char);
            this.keep = false;
            break;
          default:
            this.dealOther(char);
        }
        break;
      case 5:
        switch (char) {
          case '(':
          case ')':
          case '[':
          case ']':
          case '+':
          case ':':
          case ';':
          case '&':
          case '"':
          case '*':
            this.escapeAndJump(char, 4);
            break;
          default: {
            if (char === 'b') {
              this.keep = true;
              this.status = 6;
            } else if (isDecimal(char)) {
              const { integerParser, } = this;
              integerParser.resetInteger();
              integerParser.dealChar(char);
              this.keep = true;
              this.status = 13;
            } else {
              throw new Error('[Error] Escape character format error. ');
            }
          }
        }
        break;
      case 6:
        switch (char) {
          case '"':
            this.status = 4;
            break;
          default:
            this.chars.push(char);
        }
        break;
      case 7:
        switch (char) {
          case '+':
            this.status = 8;
            break;
          default:
            throw new Error('[Error] This should be "+".');
        }
        break;
      case 8: {
        switch (char) {
          case ']': {
            const { chalkParser, } = this;
            this.chars = [];
            this.status = 9;
            chalkParser.resetStyles();
            break;
          }
          default:
            throw new Error('[Error] This should be "]".');
        }
        break;
      }
      case 9:
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
            this.status = 10;
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
      case 10: {
        switch (char) {
          case '|': {
            const { passages, chars, asterisk, other, } = this;
            if (asterisk === true && other !== true) {
              passages.push(chars.join(''));
            } else {
              passages.push(chars.join('').trimEnd());
            }
            this.chars = [];
            this.cleanAsteriskAndOther();
            break;
          }
          case '"':
            this.status = 11;
            break;
          case '(':
            this.showPassagesAndJump(1);
            break;
          case '': {
            const { end, } = this;
            if (end !== true) {
              this.showPassagesAndJump(0);
              delete this.chars;
              delete this.passages;
            }
            break;
          }
          case '(':
            this.showPassagesAndJump(1);
            break;
          case '[':
            this.showPassagesAndJump(7);
            break;
          case '*':
            this.dealAsterisk();
            break;
          case ' ':
            this.dealSpace(char);
            this.keep = false;
            break;
          default:
            this.dealOther(char);
        }
        break;
      }
      case 11:
        switch (char) {
          case '(':
          case ')':
          case '[':
          case ']':
          case '+':
          case ':':
          case ';':
          case '&':
          case '"':
          case '*':
            this.escapeAndJump(char, 10);
            break;
          default:
            this.keep = true;
            this.dealOther(char);
        }
        break;
      case 12:
        break;
      case 13: {
        if (isDecimal(char)) {
          const { integerParser, } = this;
          integerParser.dealChar(char);
        } else {
          const { integerParser, } = this;
          this.step = integerParser.getInteger();
          this.chars.push(char);
          this.status = 14;
        }
        break;
      }
      case 14: {
        const { step, } = this;
        if (step === 1) {
          this.status = 4;
        } else {
          this.step -= 1;
        }
        this.chars.push(char);
        break;
      }
    }
  }
}

export default Fulmination;
