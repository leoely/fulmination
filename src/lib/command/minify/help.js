import {
  optionTip,
  commandDescription,
} from 'mien';
import Fulmination from '~/class/Fulmination';

export default function help(...param) {
  const fulmination = new Fulmination();
  fulmination.scanAll([
    [`
      [+]:
      |
      | █▀▄▀█ █ █▄░█ █ █▀▀ █▄█
      | █░▀░█ █ █░▀█ █ █▀░ ░█░
      |
      `, 0],
    [commandDescription('compress the fulmination file size by removing unnecessary space and line breaks'), 0],
    [optionTip('o', 'output', 'compression result output file directory.', false), 0],
  ]);
}
