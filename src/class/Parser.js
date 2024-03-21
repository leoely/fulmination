import { stdout, } from 'process';
import chalk from 'chalk';

function getStyle(formates) {
  let style = chalk;
  for (let i = 0; i < formates.length; i += 1) {
    const formate = formates[i];
    switch (formate) {
      case 'bold':
        style = style.bold;
        break;
      case 'dim':
        style = style.dim;
        break;
      case 'italic':
        style = style.italic;
        break;
      case 'underline':
        style = style.underline;
        break;
      case 'inverse':
        style = style.inverse;
        break;
      case 'strikethrough':
        style = style.strikethrough;
        break;
      case 'red':
        style = style.red;
        break;
      case 'green':
        style = style.green;
        break;
      case 'yellow':
        style = style.green;
        break;
      case 'blue':
        style = style.blue;
        break;
      case 'magenta':
        style = style.magenta;
        break;
      case 'cyan':
        style = style.cyan;
        break;
      case 'white':
        style = style.white;
        break;
      case 'gray':
        style = style.gray;
        break;
      case 'bgBlack':
        style = style.bgBlack;
        break;
      case 'bgRed':
        style = style.bgRed;
        break;
      case 'bgGreen':
        style = style.bgGreen;
        break;
      case 'bgYellow':
        style = style.bgYellow;
        break;
      case 'bgBlue':
        style = style.bgBlue;
        break;
      case 'bgMegenta':
        style = style.bgMegenta;
      case 'bgCyan':
        style = style.bgCyan;
      case 'bgWhite':
        style = style.bgWhite;
      default:
        throw Error(`Formate ${formate} is invalid.`);
        break;
    }
  }
  return style;
}

function showText(text, formates) {
  const style = getStyle(formates);
  process.stdout.write(style(text));
}

function showPassages(passages, formates) {
  const style = getStyle(formates);
  passages.forEach((passage) => {
    console.log(style(passage));
  });
}

class Parser {
  constructor() {
    this.l = 0;
    this.p = 0;
    this.status = 0;
  }

  scan(text) {
    for (let i = 0; i < text.length; i += 1) {
      const char = text.charAt(i);
      switch (char) {
        case ' ': {
          const prevChar = text.charAt(i - 1);
          if (prevChar === ' ' || prevChar === '|' || prevChar === '') {
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
        }
        break;
      }
      case 1: {
        if (char === '+') {
          this.status = 2;
        } else {
          throw Error('This position should be "+".');
        }
        break;
      }
      case 2: {
        if (char === ')') {
          this.elems = [];
          this.status = 3;
          this.formates = [];
        } else {
          throw Error('This position should be ")".');
        }
        break;
      }
      case 3: {
        if (char === ',') {
          const formate = this.elems.join('').trimStart();
          this.formates.push(formate);
          this.elems = [];
        } else if (char === ':') {
          const formate = this.elems.join('').trimStart();
          this.formates.push(formate);
          this.status = 4;
          this.elems = [];
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 4: {
        if (char === 'EOF' || char === '(' || char === '[') {
          showText(this.elems.join('').trim(), this.formates);
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
          throw Error('This position should be "+".');
        }
        break;
      }
      case 6: {
        if (char === ']') {
          this.elems = [];
          this.status = 7;
          this.formates = [];
        } else {
          throw Error('This position should be "]".');
        }
        break;
      }
      case 7: {
        if (char === ',') {
          const formate = this.elems.join('').trimStart();
          this.formates.push(formate);
          this.elems = [];
        } else if (char === ':') {
          const formate = this.elems.join('').trimStart();
          this.formates.push(formate);
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
          this.passages.push(this.elems.join('').trim());
          this.elems = [];
        } else if (char === 'EOF' || char === '(' || char === '[') {
          this.passages.push(this.elems.join('').trim());
          showPassages(this.passages, this.formates);
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
    }
  }
}

export default Parser;
