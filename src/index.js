import Fulmination from '~/class/Fulmination';
import help from '~/lib/command/parse/help';

const fulmination = new Fulmination();
fulmination.scan(`
  [+] bold:
  | "* need to be escaped
  | "" need to be escaped
  | ect need to be escaped
`);
