import Fulmination from '~/class/Fulmination';

const fulmination = new Fulmination();
fulmination.scanAll([
  [`
    [+] bold; red:
    |
  `, 1],
  ['(+) dim; underline: test the results of scaning escape.', 2],
  ['(+) dim; underline: test the result of scaning.', 0],
  ['(+) dim; underline: test the result of scaning.', 0],
]);
