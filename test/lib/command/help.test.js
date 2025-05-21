import { describe, expect, test, } from '@jest/globals';
import help from '~/lib/command/help';

describe('[Function] help;', () => {
  test('The help information should be displayed correctly.', async () => {
    expect(JSON.stringify(help(true))).toMatch('[\"\",\"\\n\",\"▒█▀▀▀ █░░█ █░░ █▀▄▀█ ░▀░ █▀▀▄ █▀▀█ ▀▀█▀▀ ░▀░ █▀▀█ █▀▀▄\",\"\\n\",\"▒█▀▀▀ █░░█ █░░ █░▀░█ ▀█▀ █░░█ █▄▄█ ░░█░░ ▀█▀ █░░█ █░░█\",\"\\n\",\"▒█░░░ ░▀▀▀ ▀▀▀ ▀░░░▀ ▀▀▀ ▀░░▀ ▀░░▀ ░░▀░░ ▀▀▀ ▀▀▀▀ ▀░░▀\",\"\\n\",\"\",\"\\n\",\"-\",\"\\u001b[1m parse\\u001b[22m\",\" Parse input fulmination file and output to terminal.\",\"\",\"\\n\",\"-\",\"\\u001b[1m minify\\u001b[22m\",\" Minify input fulmination file and output to terminal.\",\"\",\"\\n\",\"\",\"\\n\"]');
  });
});
