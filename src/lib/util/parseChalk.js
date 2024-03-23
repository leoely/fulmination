import ChalkParser from '~/class/ChalkParser';

let chalkParser;

export default function parseChalk(format, style) {
  if (chalkParser === undefined) {
    chalkParser = new ChalkParser();
  }
  return chalkParser.scan(format, style);
}
