import chalk from 'chalk';
import commandTip from '~/lib/util/commandTip';

export default function help(...param) {
  console.log([
    '',
    '█▀▀ █░█ █░░ █▀▄▀█ █ █▄░█ ▄▀█ ▀█▀ █ █▀█ █▄░',
    '█▀░ █▄█ █▄▄ █░▀░█ █ █░▀█ █▀█ ░█░ █ █▄█ █░▀█',
    '',
    '  ' + chalk.bold('Manner.js command' + ':'),
    '',
    commandTip('parse', 'Parse input ctf file and output to terminal.'),
    '',
    commandTip('minify', 'Minify input ctf file and output to terminal.'),
    '',
  ].join('\n'));
}
