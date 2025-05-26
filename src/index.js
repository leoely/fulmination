import Fulmination from '~/class/Fulmination';

function showCommandTip(command, dependence) {
  return  '(+): * Use ` (+) bold: "b' + command + ' ' + dependence + '" (+) bold: (+): ` install related dependence.';
}
const fulmination = new Fulmination({ debug: true, });
const dependence = 'remove';
console.log(fulmination.scanAll([
  ['(+): * - * (+) bold: Gentoo (+): ": 2&', 0],
  ['(+): * ' + showCommandTip('emerge --ask', dependence), 0],
  [`
    [+]:
    |
    |
    `, 0],
  ['(+): * - * (+) bold: Archlinux (+): ": 2&', 0],
  ['(+): * ' + showCommandTip('pacman -S', dependence), 0],
  [`
    [+]:
    |
    |
    `, 0],
  ['(+): * - * (+) bold: Ubuntu (+): ": 2&', 0],
  ['(+): * ' + showCommandTip('apt-get install', dependence), 0],
]));
console.log(fulmination.scanAll([
  ['(+): * - * (+) bold: Gentoo (+): ": 2&', 0],
  ['(+): * ' + showCommandTip('emerge --ask', dependence), 0],
  [`
    [+]:
    |
    |
    `, 0],
  ['(+): * - * (+) bold: Archlinux (+): ": 2&', 0],
  ['(+): * ' + showCommandTip('pacman -S', dependence), 0],
  [`
    [+]:
    |
    |
    `, 0],
  ['(+): * - * (+) bold: Ubuntu (+): ": 2&', 0],
  ['(+): * ' + showCommandTip('apt-get install', dependence), 0],
]));
