import Fulmination from '~/class/Fulmination';

const fulmination = new Fulmination();
fulmination.scan(`
  *+) green; bold: * == (+) bold: * Cluster (+) bold; dim: * display structure. &
  (+) green; bold: ** └─ (+) : * | (+) : *
`);
