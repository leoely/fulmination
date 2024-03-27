import chalk from 'chalk';

export default function ctfTemplate(e) {
  const { type, elem, } = e;
  switch (type) {
    case ' ':
      return ' ';
    case 'formate':
      return chalk.rgb(200, 200, 0)(elem);
    case 'text':
      return chalk.rgb(52, 69, 223)(elem);
    case 'colon':
      return chalk.rgb(0, 0, 0)(elem);
    case 'comma':
      return chalk.rgb(250, 250, 20)(elem);
    case 'squareParenthese':
      return chalk.rgb(47, 47, 47)(elem);
    case 'parentthese':
      return chalk.rgb(200, 23, 23)(elem);
    case 'plus':
      return chalk.rgb(200, 23, 23)(elem);
    case 'dividing':
      return chalk.rgb(49, 49, 49)(elem);
  }
}
