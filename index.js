export function parseAccountFile(accountFile) {
  const lines = accountFile.split('\n');
  const accounts = [];
  while (lines.length) {
    accounts.push(lines.splice(0, 4).join('\n'));
  }
  return accounts
    .map(text => {
      if (!text) return;
      return parseAccountNumber(text);
    })
    .map(number => {
      return formatAccountNumber(number);
    })
    .filter(account => account)
    .join('\n');
}

export function formatAccountNumber(number) {
  if (!number) return false;
  if (number.includes('?')) return number + ' ILL';
  if (!validateAccountNumber(number)) return number + ' ERR';
  return number;
}

export function validateAccountNumber(number) {
  const sum = number
    .split('')
    .reverse()
    .map(i => parseInt(i, 10))
    .reduce((acc, d, i) => {
      return acc + d * (i + 1);
    });
  return sum % 11 === 0;
}

export function parseAccountNumber(text) {
  let accountNumber = [...Array(9)].map((el, i) => {
    return getDigitByPosition(text, i);
  });
  return accountNumber.join('');
}

export function getDigitByPosition(text, position) {
  var digit = '\n' + text.split('\n').map(line => {
    const digitWidth = 3;
    const start = digitWidth * position;
    const end = digitWidth * (position + 1);
    return line.slice(start, end);
  }).splice(0, 3).join('\n');
  return getIntegerFromDigit(digit) || '?';
}

export function getIntegerFromDigit(digit) {
  return Object.keys(digitMap).find(key => {
    return digitMap[key] === digit;
  });
}

export const digitMap = {
  0:`
 _ 
| |
|_|`,
  1: `
   
  |
  |`,
  2: `
 _ 
 _|
|_ `,
  3: `
 _ 
 _|
 _|`,
  4: `
   
|_|
  |`,
  5: `
 _ 
|_ 
 _|`,
  6: `
 _ 
|_ 
|_|`,
  7: `
 _ 
  |
  |`,
  8: `
 _ 
|_|
|_|`,
  9: `
 _ 
|_|
 _|`
};
