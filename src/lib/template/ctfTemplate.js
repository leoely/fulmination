import chalk from 'chalk';

export default function ctfTemplate(e) {
  const { type, elem, } = e;
  switch (type) {
    case ':':
      return chalk.rgb(200, 200, 0)(':');
    case ' ':
      return ' ';
    case 'key':
      return chalk.rgb(30, 30, 225)(elem);
    case 'unit':
    case 'value':
      return chalk.rgb(0, 0, 0)(elem);
    case '-':
      return chalk.rgb(250, 250, 20)('-');
    case '"':
      return chalk.rgb(47, 47, 47)('"');
    case '(':
      return chalk.rgb(200, 23, 23)('(');
    case ')':
      return chalk.rgb(200, 23, 23)(')')
    case 'comment':
      return chalk.rgb(49, 49, 49)(elem);
  }
}
