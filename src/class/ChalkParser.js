import chalk from 'chalk';

class ChalkParser {
  constructor() {
    this.status = 0;
    this.style = chalk;
  }

  matchChar(source, target, status) {
    if (source === target) {
      this.status = status;
    } else {
      throw new Error('[Error] This position should be the character ' + target + '.');
    }
  }

  getStyle(source, target, name) {
    const { style, } = this;
    if (source === target) {
      return style[name];
    } else {
      if (name.substring !== 'bg') {
        throw new Error('[Error] Wrong color name.');
      } else {
        throw new Error('[Error] Wrong background color name.');
      }
    }
  }

  getListStyle(char, name) {
    const { style, } = this;
    if (char >= '0' && char <= '9') {
      this.elems.push(char);
    } else if (char === ',') {
      this.ints.push(parseInt(this.elems.join('')));
      this.elems = [];
    } else if (char === ')') {
      this.ints.push(parseInt(this.elems.join('')));
      this.elems = [];
      const { ints, } = this;
      if (ints.length === 3) {
        return style[name](...ints);
      } else {
        throw Error('[Error] Error in method ' + name + 'parameter list.');
      }
    }
  }

  scan(text) {
    for (let i = 0; i < text.length; i += 1) {
      const char = text.charAt(i);
      this.dealChar(char);
    }
    return this.getStyles();
  }

  initParseListStyle() {
    this.ints = [];
    this.elems = [];
  }

  resetStyles() {
    this.style = chalk;
  }

  setStyles(style) {
    this.style = style;
  }

  getStyles(style) {
    const { style: ans, } = this;
    this.status = 0;
    return ans;
  }

  dealChar(char) {
    const { status, } = this;
    switch (status) {
      case 0: {
        switch (char) {
          case 'b':
            this.status = 1;
            break;
          case 'c':
            this.status = 37;
            break;
          case 'd':
            this.status = 90;
            break;
          case 'g':
            this.status = 40;
            break;
          case 'i':
            this.status = 43;
            break;
          case 'm':
            this.status = 53;
            break;
          case 'r':
            this.status = 62;
            break;
          case 'w':
            this.status = 67;
            break;
          case 's':
            this.status = 71;
            break;
          case 'y':
            this.status = 83;
            break;
          case 'u':
            this.status = 94;
            break;
        }
        break;
      }
      case 1:
        switch (char) {
          case 'l':
            this.status = 2;
            break;
          case 'g':
            this.status = 4;
            break;
          case 'o':
            this.status = 35;
            break;
        }
        break;
      case 2:
        switch (char) {
          case 'u':
            this.status = 3;
            break;
          case 'a':
            this.status = 92;
            break;
        }
        break;
      case 3:
        this.style = this.getStyle(char, 'e', 'blue');
        break;
      case 4:
        switch (char) {
          case 'R':
            this.status = 5;
            break;
          case 'G':
            this.status = 7;
            break;
          case 'Y':
            this.status = 11;
            break;
          case 'B':
            this.status = 16;
            break;
          case 'M':
            this.status = 19;
            break;
          case 'C':
            this.status = 25;
            break;
          case 'W':
            this.status = 28;
            break;
          default:
            throw new Error('[Error] Wrong Background color name.');
        }
        break;
      case 5:
        if (char === 'e') {
          this.status = 6;
        } else if (char === 'g') {
          this.status = 59;
        } else {
          throw new Error('[Error] Wrong color name.');
        }
        break;
      case 6:
        this.style = this.getStyle(char, 'd', 'bgRed');
        break;
      case 7:
        this.matchChar(char, 'r', 8);
        break;
      case 8:
        this.matchChar(char, 'e', 9);
        break;
      case 9:
        this.matchChar(char, 'e', 10);
        break;
      case 10:
        this.style = this.getStyle(char, 'n', 'bgGreen');
        break;
      case 11:
        this.matchChar(char, 'e', 12);
        break;
      case 12:
        this.matchChar(char, 'l', 13);
        break;
      case 13:
        this.matchChar(char, 'l', 14);
        break;
      case 14:
        this.matchChar(char, 'o', 15);
        break;
      case 15:
        this.style = this.getStyle(char, 'w', 'bgYellow');
        break;
      case 16:
        this.matchChar(char, 'l', 17);
        break;
      case 17:
        if (char === 'u') {
          this.status = 18;
        } else if (char === 'a') {
          this.status = 33;
        }
        break;
      case 18:
        this.style = this.getStyle(char, 'e', 'bgBlue');
        break;
      case 19:
        this.matchChar(char, 'a', 20);
        break;
      case 20:
        this.matchChar(char, 'g', 21);
        break;
      case 21:
        this.matchChar(char, 'e', 22);
        break;
      case 22:
        this.matchChar(char, 'n', 23);
        break;
      case 23:
        this.matchChar(char, 't', 24);
        break;
      case 24:
        this.style = this.getStyle(char, 'a', 'bgMagenta');
        break;
      case 25:
        this.matchChar(char, 'y', 26);
        break;
      case 26:
        this.matchChar(char, 'a', 27);
        break;
      case 27:
        this.style = this.getStyle(char, 'n', 'bgCyan');
        break;
      case 28:
        this.matchChar(char, 'h', 29);
        break;
      case 29:
        this.matchChar(char, 'i', 30);
        break;
      case 30:
        this.matchChar(char, 't', 31);
        break;
      case 31:
        this.style = this.getStyle(char, 'e', 'bgWhite');
        break;
      case 33:
        this.matchChar(char, 'c', 34);
        break;
      case 34:
        this.style = this.getStyle(char, 'k', 'bgBlack');
        break;
      case 35:
        this.matchChar(char, 'l', 36);
        break;
      case 36:
        this.style = this.getStyle(char, 'd', 'bold');
        break;
      case 37:
        this.matchChar(char, 'y', 38);
        break;
      case 38:
        this.matchChar(char, 'a', 39);
        break;
      case 39:
        this.style = this.getStyle(char, 'n', 'cyan');
        break;
      case 40:
        this.matchChar(char, 'r', 41);
        break;
      case 41:
        if (char === 'a') {
          this.status = 42;
        } else if (char === 'e') {
          this.status = 88;
        } else {
          throw new Error('[Error] Wrong color name.');
        }
        break;
      case 42:
        this.style = this.getStyle(char, 'y', 'gray');
        break;
      case 43:
        if (char === 't') {
          this.status = 44;
        } else if (char === 'n') {
          this.status = 48;
        } else {
          throw new Error('[Error] Wrong color name.');
        }
        break;
      case 44:
        this.matchChar(char, 'a', 45);
        break;
      case 45:
        this.matchChar(char, 'l', 46);
        break;
      case 46:
        this.matchChar(char, 'i', 47);
        break;
      case 47:
        this.style = this.getStyle(char, 'c', 'italic');
        break;
      case 48:
        this.matchChar(char, 'v', 49);
        break;
      case 49:
        this.matchChar(char, 'e', 50);
        break;
      case 50:
        this.matchChar(char, 'r', 51);
        break;
      case 51:
        this.matchChar(char, 's', 52);
        break;
      case 52:
        this.style = this.getStyle(char, 'e', 'inverse');
        break;
      case 53:
        this.matchChar(char, 'a', 54);
        break;
      case 54:
        this.matchChar(char, 'g', 55);
        break;
      case 55:
        this.matchChar(char, 'e', 56);
        break;
      case 56:
        this.matchChar(char, 'n', 57);
        break;
      case 57:
        this.matchChar(char, 't', 58);
        break;
      case 58:
        this.style = this.getStyle(char, 'a', 'magenta');
        break;
      case 59:
        this.matchChar(char, 'b', 60);
        break;
      case 60:
        this.matchChar(char, '(', 61);
        this.initParseListStyle();
        break;
      case 61: {
        const ans = this.getListStyle(char, 'bgRgb');
        if (ans !== undefined) {
          this.style = ans;
        }
        break;
      }
      case 62:
        if (char === 'e') {
          this.status = 63;
        } else if (char === 'g') {
          this.status = 64;
        } else {
          throw new Error('[Error] Wrong color name.');
        }
        break;
      case 63:
        this.style = this.getStyle(char, 'd', 'red');
        break;
      case 64:
        this.matchChar(char, 'b', 65);
        break;
      case 65:
        this.matchChar(char, '(', 66);
        this.initParseListStyle();
        break;
      case 66: {
        const ans = this.getListStyle(char, 'rgb');
        if (ans !== undefined) {
          this.style = ans;
        }
        break;
      }
      case 67:
        this.matchChar(char, 'h', 68);
        break;
      case 68:
        this.matchChar(char, 'i', 69);
        break;
      case 69:
        this.matchChar(char, 't', 70);
        break;
      case 70:
        this.style = this.getStyle(char, 'e', 'white');
        break;
      case 71:
        this.matchChar(char, 't', 72);
        break;
      case 72:
        this.matchChar(char, 'r', 73);
        break;
      case 73:
        this.matchChar(char, 'i', 74);
        break;
      case 74:
        this.matchChar(char, 'k', 75);
        break;
      case 75:
        this.matchChar(char, 'e', 76);
        break;
      case 76:
        this.matchChar(char, 't', 77);
        break;
      case 77:
        this.matchChar(char, 'h', 78);
        break;
      case 78:
        this.matchChar(char, 'r', 79);
        break;
      case 79:
        this.matchChar(char, 'o', 80);
        break;
      case 80:
        this.matchChar(char, 'u', 81);
        break;
      case 81:
        this.matchChar(char, 'g', 82);
        break;
      case 82:
        this.style = this.getStyle(char, 'h', 'strikethrough');
        break;
      case 83:
        this.matchChar(char, 'e', 84);
        break;
      case 84:
        this.matchChar(char, 'l', 85);
        break;
      case 85:
        this.matchChar(char, 'l', 86);
        break;
      case 86:
        this.matchChar(char, 'o', 87);
        break;
      case 87:
        this.style = this.getStyle(char, 'w', 'yellow');
        break;
      case 88:
        this.matchChar(char, 'e',89);
        break;
      case 89:
        this.style = this.getStyle(char, 'n', 'green');
        break;
      case 90:
        this.matchChar(char, 'i', 91);
        break;
      case 91:
        this.style = this.getStyle(char, 'm', 'dim');
        break;
      case 92:
        this.matchChar(char, 'c', 93);
        break;
      case 93:
        this.style = this.getStyle(char, 'k', 'black');
        break;
      case 94:
        this.matchChar(char, 'n', 95);
        break;
      case 95:
        this.matchChar(char, 'd', 96);
        break;
      case 96:
        this.matchChar(char, 'e', 97);
        break;
      case 97:
        this.matchChar(char, 'r', 98);
        break;
      case 98:
        this.matchChar(char, 'l', 99);
        break;
      case 99:
        this.matchChar(char, 'i', 100);
        break;
      case 100:
        this.matchChar(char, 'n', 101);
        break;
      case 101:
        this.style = this.getStyle(char, 'e', 'underline');
        break;
      default:
        throw new Error('[Error] Name resolution error.');
    }
  }
}

export default ChalkParser;
