import chalk from 'chalk';

export default function fulminationTmpl(e) {
  const { type, elem, } = e;
  switch (type) {
    case ' ':
      return ' ';
    case 'line':
      return chalk.rgb(100, 79, 233)(elem);
    case 'escape':
      return chalk.rgb(120, 21, 125)(elem);
    case 'format':
      return chalk.rgb(100, 23, 23)(elem);
    case 'text':
      return chalk.rgb(21, 32, 120)(elem);
    case 'colon':
      return chalk.rgb(0, 0, 100)(elem);
    case 'semicolon':
      return chalk.rgb(100, 0, 20)(elem);
    case 'and':
      return chalk.rgb(30, 80, 200)(elem);
    case 'squareParenthese':
      return chalk.rgb(47, 47, 47)(elem);
    case 'parenthese':
      return chalk.rgb(0, 123, 123)(elem);
    case 'plus':
      return chalk.rgb(70, 20, 255)(elem);
    case 'dividing':
      return chalk.rgb(49, 49, 49)(elem);
    case 'asterick':
      return chalk.rgb(80, 80, 200)(elem);
  }
}
