import path from 'path';
import fs from 'fs';
import Fulmination from '~/class/fulmination';

export default async function parse(...param) {
  const [file, ...rest] = param;
  const filePath = path.resolve('.', file);
  const string = fs.readFileSync(filePath).toString();
  const fulmination = new Fulmination();
  fulmination.scan(string);
}
