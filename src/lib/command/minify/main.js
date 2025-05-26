import path from 'path';
import fs from 'fs';
import { parseOptions, } from 'mien';
import minify from '~/lib/util/minify';

export default async function main(...param) {
  const [file, ...rest] = param;
  const options = parseOptions(...rest);
  const filePath = path.resolve('.', file);
  const string = fs.readFileSync(filePath).toString();
  const output = options.o || options.output;
  if (typeof output === 'string') {
    const outputPath = path.normalize(output);
    fs.writeFileSync(outputPath, minify(string));
  } else {
    console.log(minify(string));
  }
}
