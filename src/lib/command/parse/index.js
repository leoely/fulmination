import help from './help';
import main from './main';

export default function minify(...param) {
  if (param.length > 0) {
    switch (param[0]) {
      case '--help':
        help();
        break;
      default:
        main(...param);
        break;
    }
  } else {
    help();
  }
}
