import Fulmination from '~/class/Fulmination';

const fulmination = new Fulmination();
fulmination.scan(`
  [+] bold:
  | the display will be the same
  [+] bold:|the display will be the same
`);
