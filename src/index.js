import Fulmination from '~/class/Fulmination';
import help from '~/lib/command/parse/help';

const fulmination = new Fulmination();
fulmination.scanAll([
  [`
    <+> bold; red:
    *** this is an examle of a fulmination content.
  `, 0],
  [`
    [+] bold; blue:
    | this is an example of a fulmination paragraph.
  `, 0],
  [`
    <+> bold; red:
    *** this is an examle of a fulmination content.
  `, 0],
]);
