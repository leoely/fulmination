class ChalkParser {
  constructor() {
    this.status = 0;
  }

  matchChar(source, target, status) {
    if (source === target) {
      this.status = status;
    } else {
      throw new Error(`This position should be ${target}.`);
    }
  }

  scan(text, style) {
    for (let i = 0; i < text.length; i += 1) {
      const char = text.charAt(i);
      if (char === ' ') {
        continue;
      }
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
          }
          break;
        }
        case 1: {
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
        }
        case 2:
          this.matchChar(char, 'u', 3);
          break;
        case 3: {
          if (char === 'e') {
            style = style.blue;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        }
        case 4: {
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
              throw new Error('Background color name error.');
          }
          break;
        }
        case 5:
          if (char === 'e') {
            this.status = 6;
          } else if (char === 'g') {
            this.status = 59;
            this.elems = [];
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 6:
          if (char === 'd') {
            style = style.bgRed;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'n') {
            style = style.bgGreen;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'w') {
            style = style.bgYellow;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'e') {
            style = style.bgBlue;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'a') {
            style = style.bgMegenta;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 25:
          this.matchChar(char, 'y', 26);
          break;
        case 26:
          this.matchChar(char, 'a', 27);
          break;
        case 27:
          if (char === 'n') {
            style = style.bgCyan;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'e') {
            style = style.bgWhite;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 33:
          this.matchChar(char, 'c', 34);
          break;
        case 34:
          if (char === 'k') {
            style = style.bgBlack;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 35:
          this.matchChar(char, 'l', 36);
          break;
        case 36:
          if (char === 'd') {
            style = style.bold;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 37:
          this.matchChar(char, 'y', 38);
          break;
        case 38:
          this.matchChar(char, 'a', 39);
          break;
        case 39:
          if (char === 'n') {
            style = style.cyan;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 40:
          this.matchChar(char, 'r', 41);
          break;
        case 41:
          this.matchChar(char, 'a', 42);
          break;
        case 42:
          if (char === 'y') {
            style = style.gray;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 43:
          if (char === 't') {
            this.status = 44;
          } else if (char === 'n') {
            this.status = 48;
          } else {
            throw new Error('Background color name error.');
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
          if (char === 'c') {
            style = style.italic;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'e') {
            style = style.inverse;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'a') {
            style = style.megenta;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 59:
          this.matchChar(char, 'b', 60);
          break;
        case 60:
          this.matchChar(char, '(', 61);
          this.ints = [];
          this.elems = [];
          break;
        case 61:
          if (char >= '0' && char <= '9') {
            this.elems.push(char);
          } else if (char === ',') {
            this.ints.push(parseInt(this.elems.join('')));
          } else if (char === ')') {
            this.ints.push(parseInt(this.elems.join('')));
            const { ints, } = this;
            if (ints.length === 3) {
              style = style.bgRgb(...ints);
            } else {
              throw Error('The bgRgb param list is error.');
            }
          }
          break;
        case 62:
          if (char === 'e') {
            this.status = 63;
          } else if (char === 'g') {
            this.status = 64;
          } else {
          }
          break;
        case 63:
          if (char === 'd') {
            style = style.red;
          } else {
            throw new Error('Background color name error.');
          }
          break;
        case 64:
          this.matchChar(char, 'b', 65);
          break;
        case 65:
          this.matchChar(char, '(', 66);
          this.ints = [];
          this.elems = [];
          break;
        case 66:
          if (char >= '0' && char <= '9') {
            this.elems.push(char);
          } else if (char === ',') {
            this.ints.push(parseInt(this.elems.join('')));
          } else if (char === ')') {
            this.ints.push(parseInt(this.elems.join('')));
            const { ints, } = this;
            if (ints.length === 3) {
              style = style.rgb(...ints);
            } else {
              throw Error('The bgRgb param list is error.');
            }
          }
          break;
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
          if (char === 'e') {
            style = style.white;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'h') {
            style = style.strikethrough;
          } else {
            throw new Error('Background color name error.');
          }
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
          if (char === 'w') {
            style = style.yellow;
          } else {
            throw new Error('Background color name error.');
          }
          break;
      }
    }
  }
}

export default ChalkParser;
