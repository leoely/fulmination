export default function minify(str) {
  let strings = [];
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    switch (char) {
      case '\n':
        break;
      case ' ': {
        const { length, } = strings;
        const prevChar = str.charAt(i - 1);
        if (prevChar !== ' ' && prevChar !== '|' && prevChar !== ''
          && prevChar !== '\n' && prevChar !== ';' && prevChar !== ']'
          && prevChar !== ')' && prevChar !== ':') {
          strings.push(char);
        }
        break;
      }
      case '\t':
        break;
      default:
        strings.push(char);
        break;
    }
  }
  str = strings.join('');
  strings = [];
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    switch (char) {
      case '\n':
        break;
      case ' ': {
        const { length, } = strings;
        const nextChar = str.charAt(i + 1);
        if (nextChar !== '|' && nextChar !== '(') {
          strings.push(char);
        }
        break;
      }
      case '\t':
        break;
      default:
        strings.push(char);
        break;
    }
  }
  return strings.join('');
}
