# Fulmination
Add styles and colors to terminal text programmatically in new ways.

## Why use fulmination?

| ***Brief*** | ***Details*** |
| --- | --- |
| ***Refining***  | Syntax refinement makes development more effecient and suitable for lager project.       |
| ***Semantic***  | The semantic syntax is easier to read and is suitable for long-term development project. |
| ***Beautiful*** | Beautiful syntax provides a new way to adapt to complex projects.                        |

## You will be able to

***Text type:***
```javascript
fulmination.scan('(+) bold: hello fulmination text.');
```

***Paragraph type:***
```javascript
fulmination.scan(`
  [+] bold:
  | hello fulmination passage.
  | hello fulmination passage.
  | hello fulmination passage.
`);
```

***Complex situation:***
```javascript
fulmination.scanAll([
  [`
    [+] bold:
    |
  `, 1],
  ['(+) dim: This is the fulmination transfer text.', 2],
  ['(+) dim: This is the original text fulmination.', 0],
]);
```
***Complex situation:***
```javascript
fulmination.generateAll([
  ['(+) blue: when using multiple scan', 0],
  ['(+) yellow: the syntax becomes redundant', 0],
  ['(+) green: you can use scanAll', 0],
])
```
## Quick start

***Install fulmination using yarn:***
```shell
yarn add fulmination
```

***Install fulmination using pnpm:***
```shell
pnpm add fulmination
```

***Install fulmination using npm:***
```shell
npm install fulmination
```

***Using the syntax of fulmination:***
```javascript
import Fulmination from 'fulmination';

const fulmination = new Fulmination();
```

## Get in touch

If you find a bug or request a new feature,or have better suggestions,please contact the author.
[leoely@gmail789@gmail.com](mailto:leoely@gmail789@gmail.com)
