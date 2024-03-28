#!/usr/bin/env node

import help from '~/lib/command/help';
import minify from '~/lib/command/minify';
import parse from '~/lib/command/parse';

async function main() {
  const [_1, _2, one, ...rest] = process.argv;
  switch (one) {
    case 'minify':
      await minify(...rest);
      break;
    case 'parse':
      await parse(...rest);
      break;
    default:
      help(...rest);
      break;
  }
  process.exit(0);
}

main();
