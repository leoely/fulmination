import Fulmination from '~/class/Fulmination';

const fulmination = new Fulmination();

//fulmination.scan(`
  //*+) green; bold: * == (+) bold: * Cluster (+) bold; dim: * display structure. &
  //(+) green; bold: ** └─ (+) : * | (+) : *
//`);
//
const version = 'v1.0.0';
fulmination.scanAll([
  ['[+] bold:', 1],
  [`
    |
    | The version of node currently used is lower:
    |
    | please use node version greater or equal than ${version}.
  `, 2],
  ['(+): use command `', 0],
  ['(+) bold: node -v', 0],
  ['(+): ` check current version of node. &', 0],
  ['(+) bold: the following are possible solutions: &', 0],
  ['(+):', 1],
  ['* - visit the officical website of node to download and install the latest version node.', 2],
  ['(+): *** officical website address of node is (+) bold: https://nodejs.org &', 0],
  ['(+):', 1],
  ['* - use command line tool `', 2],
  ['(+) bold: nvm (+): ` install and use lastest version node. &', 0],
  ['(+): *** github address of nvm is  (+) bold: https://github.com/nvm-sh/nvm &', 0]
]);
