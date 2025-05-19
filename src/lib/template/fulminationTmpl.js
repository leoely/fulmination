import chalk from 'chalk';

export default function fulminationTmpl(e) {
  const { type, elem, } = e;
  switch (type) {
    case ' ':
      return ' ';
    case 'format':
      return chalk.rgb(220, 100, 80)(elem);
    case 'text':
      return chalk.rgb(52, 69, 223)(elem);
    case 'colon':
      return chalk.rgb(0, 0, 100)(elem);
    case 'semicolon':
      return chalk.rgb(100, 0, 20)(elem);
    case 'comma':
      return chalk.rgb(250, 250, 20)(elem);
    case 'squareParenthese':
      return chalk.rgb(47, 47, 47)(elem);
    case 'parenthese':
      return chalk.rgb(0, 123, 123)(elem);
    case 'plus':
      return chalk.rgb(200, 23, 23)(elem);
    case 'dividing':
      return chalk.rgb(49, 49, 49)(elem);
    case 'asterick':
      return chalk.rgb(80, 80, 200)(elem);
  }
}
