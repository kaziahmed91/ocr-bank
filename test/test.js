import assert from 'assert';
import fs from 'fs';
import glob from 'glob';
import {
  getIntegerFromDigit,
  getDigitByPosition,
  parseAccountFile,
  parseAccountNumber,
  formatAccountNumber,
  validateAccountNumber
} from '../index.js';

const inputFile = fs.readFileSync('./test/input.txt', 'utf-8');
const n000000000 = fs.readFileSync('./test/numbers/000000000.txt', 'utf-8');
const n111111111 = fs.readFileSync('./test/numbers/111111111.txt', 'utf-8');
const n123456789 = fs.readFileSync('./test/numbers/123456789.txt', 'utf-8');

describe('parseAccountFile', function() {
  it('parses an account file', function() {
    assert.equal(parseAccountFile(inputFile), `000000000
111111111 ERR
222222222 ERR
333333333 ERR
444444444 ERR
555555555 ERR
666666666 ERR
777777777 ERR
888888888 ERR
999999999 ERR
123456789
000000051
49006771? ILL
1234?678? ILL`);
  });
});

describe('getIntegerFromDigit', function() {
  it('parses 0', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
| |
|_|`), '0');
  });
  it('parses 1', function() {
    assert.equal(getIntegerFromDigit(`
   
  |
  |`), '1');
  });
  it('parses 2', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
 _|
|_ `), '2');
  });
  it('parses 3', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
 _|
 _|`), '3');
  });
  it('parses 4', function() {
    assert.equal(getIntegerFromDigit(`
   
|_|
  |`), '4');
  });
  it('parses 5', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
|_ 
 _|`), '5');
  });
  it('parses 6', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
|_ 
|_|`), '6');
  });
  it('parses 7', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
  |
  |`), '7');
  });
  it('parses 8', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
|_|
|_|`), '8');
  });
  it('parses 9', function() {
    assert.equal(getIntegerFromDigit(`
 _ 
|_|
 _|`), '9');
  });
});

describe('getDigitByPosition', function() {
  it('gets digit from position 0', function() {
    assert.equal(getDigitByPosition(n123456789, 0), '1');
  });
  it('gets digit from position 1', function() {
    assert.equal(getDigitByPosition(n123456789, 1), '2');
  });
  it('gets digit from position 2', function() {
    assert.equal(getDigitByPosition(n123456789, 2), '3');
  });
  it('gets digit from position 3', function() {
    assert.equal(getDigitByPosition(n123456789, 3), '4');
  });
  it('gets digit from position 4', function() {
    assert.equal(getDigitByPosition(n123456789, 4), '5');
  });
  it('gets digit from position 5', function() {
    assert.equal(getDigitByPosition(n123456789, 5), '6');
  });
  it('gets digit from position 6', function() {
    assert.equal(getDigitByPosition(n123456789, 6), '7');
  });
  it('gets digit from position 7', function() {
    assert.equal(getDigitByPosition(n123456789, 7), '8');
  });
  it('gets digit from position 8', function() {
    assert.equal(getDigitByPosition(n123456789, 8), '9');
  });
});

describe('parseAccountNumber', function() {
  it('parses 000000000', function() {
    assert.equal(parseAccountNumber(n000000000), '000000000');
  });
  it('parses 111111111', function() {
    assert.equal(parseAccountNumber(n111111111), '111111111');
  });
  it('parses 123456789', function() {
    assert.equal(parseAccountNumber(n123456789), '123456789');
  });
});

describe('formatAccountNumber', function() {
  it('appends ILL to numbers with illegible characters', function() {
    assert.equal(formatAccountNumber('123?56789'), '123?56789 ILL');
  });
  it('appends ERR to numbers that invalid account numbers', function() {
    assert.equal(formatAccountNumber('664371495'), '664371495 ERR');
  });
  
  it('appends AMB and alternatives to ambiguous numbers', function() {
    assert.equal(
      formatAccountNumber('888888888'),
      "888888888 AMB ['888886888', '888888880', '888888988']"
    );
    assert.equal(
      formatAccountNumber('555555555'),
      "555555555 AMB ['555655555', '559555555']"
    );
  });
});

describe('validateAccountNumber', function() {
  it('returns false for invalid account numbers', function() {
    assert.equal(validateAccountNumber('664371495'), false);
  });
  it('returns true for valid account numbers', function() {
    assert.equal(validateAccountNumber('457508000'), true);
  });
});
