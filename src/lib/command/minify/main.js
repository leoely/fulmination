import path from 'path';
import fs from 'fs';
import { parseOption, } from 'mien';
import minify from '~/lib/util/minify';

export default async function main(...param) {
  const [file, ...rest] = param;
  const option = parseOption(...rest);
  const filePath = path.resolve('.', file);
  const string = fs.readFileSync(filePath).toString();
  const outputOption = option.o || option.output;
  if (typeof outputOption === 'string') {
    const outputPath = path.normalize(outputOption);
    fs.writeFileSync(outputPath, minify(string));
  } else {
    console.log(minify(string));
  }
}
