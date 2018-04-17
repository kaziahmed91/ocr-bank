# OCR Bank

## Installation

```bash
npm install --save https://github.com/localjo/ocr-bank
```

## Usage

```js
import fs from 'fs';
import { parseAccountFile} from 'ocr-bank';

parseAccountFile(fs.readFileSync('input.txt', 'utf-8'));
```

## Tests

```bash
npm test
```

## TODO

This is an unfinished solution. Here's what's left to do:

### 1) Suggest alternatives for ambiguous numbers

  One possible solution is to write a function that compares an ambiguous input digit to all valid digits, counts the number of pipes/underscores that are different for each one, filters them for those that have only one difference, and then returns the numerical values for those possible alternates in an array. That function could then be called on each digit in the ambiguous account number (maybe starting with illegible characters first), creating a new account number that could be run through the `validateAccountNumber()` function to see if it has a valid checksum. Valid alternative account numbers could then be pushed to an array that is appended to the result. There is one failing test case to test for this functionality, but more should be added.

### 2) Add more test cases

  The tests included with this solution aren't complete. More test cases need to be added to ensure that all possible scenarios are handled, including creating tests for `parseAccountFile()` that test several potential account files, including very large files.
  
### 3) Improve formatting and organization of test files

  All test inputs and expected outputs could be saved to external files. Some of the test inputs are organized that way already, but outputs are not, and there could be a more elegant, async solution that uses a glob syntax to read all of the input files and check their output.