import { optionTip, } from 'mien';
import Fulmination from '~/class/Fulmination';

export default function help(...param) {
  const fulmination = new Fulmination();
  fulmination.scan(optionTip('o', 'output', 'Compression result output file directory.', true));
}
