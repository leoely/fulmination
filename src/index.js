import Fulmination from '~/class/Fulmination';

const fulmination = new Fulmination();
fulmination.scan(`
  (+) cyan: there are three line breaks here "" 3&
  (+) [cyan: there are three line breaks here 3&
  [+]:
  |
`);
