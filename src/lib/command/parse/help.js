import {
  commandUsage,
  commandDescription,
} from 'mien';
import Fulmination from '~/class/Fulmination';

export default function help(...param) {
  const fulmination = new Fulmination();
  fulmination.scanAll([
    [`
      [+]:
      |
      |  █▀▀█ █▀▀█ █▀▀█ █▀▀ █▀▀
      |  █░░█ █▄▄█ █▄▄▀ ▀▀█ █▀▀
      |  █▀▀▀ ▀░░▀ ▀░▀▀ ▀▀▀ ▀▀▀
      |
      `, 0],
    [commandUsage('parse "[file"]'), 0],
    [commandDescription('parsing the fulmination grammar file output results'), 0],
  ]);
}
