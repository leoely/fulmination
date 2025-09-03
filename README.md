# Fulmination

## Why use fulmination

<table>
<tr>
<td>
Refining
</td>
<td>
Syntax refinement makes development more effecient and suitable for lager project.
</td>
</tr>
<tr>
<td>
Semantic
</td>
<td>
The semantic syntax is easier to read and is suitable for long-term development project.
</td>
</tr>
<tr>
<td>Beautiful</td>
<td>
Beautiful syntax provides a new way to adapt to complex projects
</td>
</tr>
</table>

## You will be able to

<table>
<tr>
<td>Text</td>
<td>
```javascript
fulmination.scan('(+) bold: hello fulmination text.');
```
</td>
</tr>
<tr>
<td>
  Paragraph
</td>
<td>
```javascript
fulmination.scan(`
  [+] bold:
  | hello fulmination passage.
  | hello fulmination passage.
  | hello fulmination passage.
`);
```
</td>
</tr>
<tr>
<td>Complex situation</td>
<td>
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
</td>
</tr>
</table

## Quick start
