import Parser from '~/class/Parser';

const parser = new Parser();
parser.scan(`
  [+] bold, red:
    | Test text which whether or not be seted properly.
    | Test text content whether or not show correctly.
`);
