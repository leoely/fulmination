import Fulmination from '~/class/Fulmination';
import help from '~/lib/command/parse/help';

const fulmination = new Fulmination();
//fulmination.scanAll([
  //[`
    //<+> bold; red:
    //*** this is an examle of a fulmination content.
  //`, 0],
  //[`
    //[+] bold; blue:
    //| this is an example of a fulmination paragraph.
  //`, 0],
  //[`
    //<+> bold; red:
    //*** this is an examle of a fulmination content.
  //`, 0],
//]);

fulmination.scan(`
  <+> dim:
  Error: Things keep happening!
  *** at /home/gbusey/file.js:525:2
  *** at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)
  *** at Actor.<anonymous> (/home/gbusey/actors.js:400:8)
  *** at increaseSynergy (/home/gbusey/actors.js:701:6)
`);
fulmination.scan('(+) bold: some');
