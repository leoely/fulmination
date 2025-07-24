import Fulmination from '~/class/Fulmination';
import { commandTip, } from 'mien';

export default function help(debug) {
  const fulmination = new Fulmination({ debug, });
  const fulminationLogo = `
    [+]:
    |
    | ▒█▀▀▀ █░░█ █░░ █▀▄▀█ ░▀░ █▀▀▄ █▀▀█ ▀▀█▀▀ ░▀░ █▀▀█ █▀▀▄
    | ▒█▀▀▀ █░░█ █░░ █░▀░█ ▀█▀ █░░█ █▄▄█ ░░█░░ ▀█▀ █░░█ █░░█
    | ▒█░░░ ░▀▀▀ ▀▀▀ ▀░░░▀ ▀▀▀ ▀░░▀ ▀░░▀ ░░▀░░ ▀▀▀ ▀▀▀▀ ▀░░▀
    |
  `;
  const fulminationParse = commandTip('parse', 'Parse input fulmination file and output to terminal.');
  const fulminationMinify = commandTip('minify', 'Minify input fulmination file and output to terminal.');
  if (debug === true) {
    const results = [];
    results.push(fulmination.scan(fulminationLogo));
    results.push(fulmination.scan(fulminationParse));
    results.push(fulmination.scan('(+): &'));
    results.push(fulmination.scan(fulminationMinify));
    results.push(fulmination.scan(`
      [+]:
      |
      |
    `))
    return results.flat();
  } else {
    fulmination.scan(fulminationLogo);
    fulmination.scan(fulminationParse);
    fulmination.scan('(+): &');
    fulmination.scan(fulminationMinify);
    fulmination.scan(`
      [+]:
      |
      |
    `);
  }
}
