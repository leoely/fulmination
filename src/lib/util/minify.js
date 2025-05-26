export default function minify(text) {
  let chars = [];
  outer: for (let i = 0; i < text.length; i += 1) {
    const char = text.charAt(i);
    if (char.match(/^\s$/) !== null && char !== ' ') {
      continue outer;
    }
    let flag = 0;
    switch (char) {
      case ' ': {
        const prevChar = text.charAt(i - 1);
        switch (prevChar) {
          case '|':
          case ':':
          case ';':
          case ']':
          case ')':
          case '&':
            continue outer;
          default: {
            const spaces = [];
            inner: for (let j = i + 1; j < text.length; j += 1) {
              const char = text.charAt(j);
              switch (char) {
                case '':
                case ':':
                case ';':
                case '|':
                case '(':
                case '[':
                case '&':
                  break inner;
                case ' ':
                  spaces.push(char);
                  break;
                default:
                  chars = chars.concat(spaces);
                  i = j - 1;
                  break inner;
              }
            }
            const nextChar = text.charAt(i + 1);
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
      }
      default:
        chars.push(char);
    }
  }
  return chars.join('');
}
