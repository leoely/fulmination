# Fulmination

## Why use fulmination?

| Brief | Details |
| --- | --- |
| Refining  | Syntax refinement makes development more effecient and suitable for lager project.       |
| Semantic  | The semantic syntax is easier to read and is suitable for long-term development project. |
| Beautiful | Beautiful syntax provides a new way to adapt to complex projects.                        |

## You will be able to.

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
## Quick start
