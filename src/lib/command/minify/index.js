import help from './help';
import main from './main';

export default function minify(...param) {
  switch (param[0]) {
    case '--help':
      help();
      break;
    default:
      main(...param);
      break;
  }
}
