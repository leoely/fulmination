import { CtfLexer, HighLight, } from 'glow.js';

let highLight;

export default function parseCtf(text) {
  if (highLight === undefined) {
    highLight = new HighLight();
    highLight.addLexer(CtfLexer);
  }
  return highLight.parse(text);
}
