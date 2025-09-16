import Fulmination from '~/class/Fulmination';
import help from '~/lib/command/parse/help';

const fulmination = new Fulmination();
fulmination.scan(`
  <+> dim:
  Error:Thingskeephappening!
  *** at /home/gbusey/file.js:525:2
  *** at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)
  *** at Actor.<anonymous> (/home/gbusey/actors.js:400:8)
  *** at increaseSynergy (/home/gbusey/actors.js:701:6)
`);
