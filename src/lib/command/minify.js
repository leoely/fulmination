import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import minify from '~/lib/util/minify';

export default async function parse(...param) {
  const [file, ...rest] = param;
  const filePath = path.resolve('.', file);
  const string = fs.readFileSync(filePath).toString();
  console.log(minify(string));
}
