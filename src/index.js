import Fulmination from '~/class/Fulmination';

const fulmination = new Fulmination({ debug: true, });
console.log(fulmination.scanAll([
  [`
    [+] bold:
    |
  `, 1],
  ['(+) cyan: this is case of code 1', 2],
  ['(+) magenta: this is case of code 2', 0],
]));
