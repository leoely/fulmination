import path from 'path';
import fs from 'fs';
import Fulmination from '~/class/fulmination';
import help from './help';

export default async function main(...param) {
  const [file, ...rest] = param;
  const filePath = path.resolve('.', file);
  if (fs.existsSync(filePath) && path.extname(filePath)) {
    const string = fs.readFileSync(filePath).toString();
    const fulmination = new Fulmination();
    fulmination.scan(string);
  } else {
    help();
  }
}
