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

  resetLocation() {
    this.line = 0;
    this.position = 1;
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
    delete this.asterisk;
    delete this.other;
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
        generate,
      } = this;
      if (debug === true || generate === true) {
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
        generate,
      } = this;
      if (debug === true || generate === true) {
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
          generate,
        } = this;
        if (debug === true || generate === true) {
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
      this.showText(this.chars.join('').trimEnd().replace('*', ' '), linebreak);
    }
    this.status = status;
    this.cleanAsteriskAndOther();
  }

  showPassagesAndJump(status) {
    const { passages, chars, asterisk, other, } = this;
    if (asterisk === true && other !== true) {
      passages.push(chars.join(''));
    } else {
      passages.push(chars.join('').trimEnd().replaceAll('*', ' '));
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
    const { asterisk, } = this;
    if (asterisk !== true) {
      const { chars, } = this;
      for (let i = chars.length - 1; i >= 0; i -= 1) {
        const char = chars[i];
        if (char === ' ') {
          chars[i] = undefined;
        } else {
          break;
        }
      }
    }
    this.asterisk = true;
    const { other, } = this;
    if (other === true) {
      this.chars.push('*');
    } else {
      this.chars.push(' ');
    }
  }

  dealOther(char) {
    this.other = true;
    this.asterisk = false;
    this.chars.push(char);
  }

  dealSpace(char) {
    const { other, } = this;
    if (other === true) {
      this.chars.push(char);
    } else {
      if (this.handleSpace()) {
        this.chars.push(char);
      }
    }
  }

  generate(text, sustain, reserve) {
    this.generate = true;
    this.results = [];
    const products = this.scan(text, sustain, reserve);
    delete this.generate;
    delete this.results;
    return products.join('');
  }

  generateEscape(text, sustain, reserve) {
    this.generate = true;
    this.results = [];
    const products = this.scanEscape(text, reserve);
    delete this.generate;
    delete this.results;
    return products.join('');
  }

  generateAll(array) {
    this.generate = true;
    this.results = [];
    const products = this.scanAll(array);
    delete this.generate;
    delete this.results;
    return products.join('');
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
      const {
        options: {
          debug,
        },
        generate,
      } = this;
      if (debug === true || generate === true){
        const { results, } = this;
        this.results = [];
        return results;
      }
    } else {
      throw new Error('[Error] Method scanAll parameters which should be a array type');
    }
  }

  scan(text, sustain, reserve) {
    this.sustain = sustain;
    const results = this.dealText(text, this.dealChar.bind(this));
    delete this.sustain;
    this.resetLocation();
    const {
      options: {
        debug,
      },
      generate,
    } = this;
    if (debug === true || generate === true){
      if (reserve !== true) {
        this.results = [];
      }
      return results;
    }
  }

  scanEscape(text, reserve) {
    this.first = true;
    const results = this.dealTextEscape(text, this.dealCharEscape.bind(this));
    this.resetLocation();
    const {
      options: {
        debug,
      },
      generate,
    } = this;
    if (debug === true || generate === true) {
      if (reserve !== true) {
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
      generate,
    } = this;
    if (debug === true || generate === true) {
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
                case ')':
                case ']':
                case '"':
                case '*':
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
      generate,
    } = this;
    if (debug === true || generate === true) {
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
    switch (char) {
      case '':
        switch (status) {
          case 4: {
            const { linebreak, } = this;
            this.showTextAndJump(0, linebreak);
            delete this.linebreak;
            delete this.chars;
            delete this.first;
            break;
          }
          case 10:
            this.showPassagesAndJump(0);
            this.passages = [];
            delete this.first;
            break;
        }
        break;
      case '|': {
        this.first = true;
        const { passages, chars, asterisk, other, } = this;
        if (asterisk === true && other !== true) {
          passages.push(chars.join(''));
        } else {
          passages.push(chars.join('').trimEnd().replaceAll('*', ' '));
        }
        this.chars = [];
        this.cleanAsteriskAndOther();
        break;
      }
      case '*': {
        this.asterisk = true;
        this.chars.push(' ');
        break;
      }
      case ' ': {
        const { first, } = this;
        if (first !== true) {
          this.chars.push(char);
        }
        break;
      }
      case '&': {
        const { status, } = this;
        if (status !== 4) {
          throw new Error('[Error] "&" can only appear in status 4.');
        }
        this.linebreak = true;
        break;
      }
      default:
        this.first = false;
        this.dealOther(char);
    }
  }

  dealEscapeHeadAndJump(char, directStatus, bothStatus, intStatus) {
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
      case '|':
      case '*':
        this.escapeAndJump(char, directStatus);
        break;
      default: {
        if (char === 'b') {
          this.keep = true;
          this.head = true;
          this.status = bothStatus;
        } else if (isDecimal(char)) {
          const { integerParser, } = this;
          integerParser.resetInteger();
          integerParser.dealChar(char);
          this.keep = true;
          this.status = intStatus;
        } else {
          throw new Error('[Error] Escape character format error. ');
        }
      }
    }
  }

  dealEscapeBothAndJump(char, status) {
    switch (char) {
      case ' ': {
        const { head, } = this;
        if (head !== true) {
          this.chars.push(char);
        }
        break;
      }
      case '"':
        this.status = status;
        delete this.head;
        this.keep = true;
        this.other = true;
        break;
      default:
        this.head = false;
        this.chars.push(char);
    }
  }

  dealIntegerAndJump(char, status) {
    if (isDecimal(char)) {
      const { integerParser, } = this;
      integerParser.dealChar(char);
    } else {
      const { integerParser, } = this;
      this.step = integerParser.getInteger();
      this.keep = true;
      this.head = true;
      if (char !== ' ') {
        this.chars.push(char);
        this.head = false;
      }
      this.status = status;
    }
  }

  dealStepAndJump(char, status) {
    const { step, } = this;
    if (step === 1) {
      this.status = status;
      delete this.keep;
      delete this.head;
    } else {
      this.step -= 1;
    }
    switch (char) {
      case ' ': {
        const { head, } = this;
        if (head !== true) {
          this.chars.push(char);
        }
        break;
      }
      default:
        this.head = false;
        this.chars.push(char);
    }
  }

  dealChar(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case ' ':
            this.keep = false;
            break;
          case '(':
            this.status = 1;
            break;
          case '[':
            this.status = 7;
            break;
          case '': {
            const { chalkParser, integerParser, } = this;
            chalkParser.resetStyles();
            integerParser.resetInteger();
            break;
          }
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
            this.keep = false;
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
            const { sustain, } = this;
            if (sustain !== true) {
              this.showText(this.chars.join('').replaceAll('*', ' '));
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
            this.keep = false;
            break;
          case '*':
            this.dealAsterisk();
            break;
          case ' ':
            this.dealSpace(char);
            this.keep = true;
            break;
          default:
            if (char >= '0' && char <= '9') {
              this.chars.push(char);
              this.status = 17;
            } else {
              this.dealOther(char);
            }
        }
        break;
      case 5:
        this.dealEscapeHeadAndJump(char, 4, 6, 13);
        break;
      case 6:
        this.dealEscapeBothAndJump(char, 4);
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
          case ' ': {
            const { other, } = this;
            if (other === true) {
              this.chars.push(char);
            }
            break;
          }
          case '|': {
            const { passages, chars, asterisk, other, } = this;
            if (asterisk === true && other !== true) {
              passages.push(chars.join(''));
            } else {
              passages.push(chars.join('').trimEnd().replaceAll('*', ' '));
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
            const { sustain, } = this;
            if (sustain !== true) {
              const { chalkParser, integerParser, } = this;
              chalkParser.resetStyles();
              integerParser.resetInteger();
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
            this.keep = true;
            break;
          default:
            this.dealOther(char);
        }
        break;
      }
      case 11:
        this.dealEscapeHeadAndJump(char, 10, 12, 15);
        break;
      case 12:
        this.dealEscapeBothAndJump(char, 10);
        break;
      case 13:
        this.dealIntegerAndJump(char, 14);
        break;
      case 14:
        this.dealStepAndJump(char, 4);
        this.keep = true;
        this.other = true;
        break;
      case 15:
        this.dealIntegerAndJump(char, 16);
        break;
      case 16:
        this.dealStepAndJump(char, 10);
        this.keep = true;
        this.other = true;
        break;
      case 17:
        switch (char) {
          case '&': {
            const { chars, integerParser, } = this;
            integerParser.resetInteger();
            const { length, } = chars;
            for (let i = length - 1; i >= 0; i -= 1) {
              const char = chars[i];
              if (char >= '0' && char <= '9') {
                integerParser.dealChar(char);
              } else {
                chars.splice(i, (length - 1 - i + 1));
                break;
              }
            }
            const integer = integerParser.getInteger();
            this.showText(this.chars.join('').trimEnd().replaceAll('*', ' '));
            const {
              options: {
                debug,
              },
              generate,
            } = this;
            for (let i = 0; i < integer; i += 1) {
              if (debug === true || generate === true) {
                const { results, style, } = this;
                results.push('\n');
              } else {
                console.log('');
              }
            }
            this.status = 0;
            this.chars =  [];
            this.keep = false;
            this.cleanAsteriskAndOther();
            break;
          }
          default:
            this.cleanAsteriskAndOther();
            if (char >= '0' && char <= '9') {
              this.chars.push(char);
            } else {
              this.chars.push(char)
              this.status = 4;
            }
        }
        break;
    }
  }
}

export default Fulmination;
