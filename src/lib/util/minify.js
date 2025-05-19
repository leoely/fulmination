export default function minify(text) {
  let chars = [];
  outer: for (let i = 0; i < text.length; i += 1) {
    const char = text.charAt(i);
    if (char.match(/^\s$/) !== null && char !== ' ') {
      continue outer;
    }
    switch (char) {
      case ' ': {
        const prevChar = text.charAt(i - 1);
        const nextChar = text.charAt(i + 1);
        switch (prevChar) {
          case '':
          case ' ':
          case '|':
          case ':':
          case ';':
          case ']':
          case ')':
          case '&':
            continue outer;
          default:
            switch (nextChar) {
              case '':
              case ' ':
              case ':':
              case ';':
              case '|':
              case '(':
              case '[':
              case '&':
                continue outer;
              default:
                chars.push(char);
                continue outer;
            }
        }
      }
      default:
        chars.push(char);
    }
  }
  return chars.join('');
}
