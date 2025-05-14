import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import Fulmination from '~/class/Fulmination';

export default async function parse(...param) {
  const [file, ...rest] = param;
  const filePath = path.resolve('.', file);
  const string = fs.readFileSync(filePath).toString();
  new Fulmination().scan(string);
}
