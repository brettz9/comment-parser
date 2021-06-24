import {
  isSpace,
  seedTokens,
  seedBlock,
  splitLines,
  splitSpace,
  seedSpec,
} from '../../src/util';

test.each([
  ['win', 'a\r\nb\r\nc', ['a', 'b', 'c']],
  ['unix', 'a\nb\nc', ['a', 'b', 'c']],
  ['mixed', 'a\nb\r\nc', ['a', 'b', 'c']],
  ['none', 'abc', ['abc']],
])('spliLines - %s', (name, source, parsed) =>
  expect(splitLines(source)).to.equal(parsed)
);

test.each([
  ['pre', '  abc', ['  ', 'abc']],
  ['pre', 'abc  ', ['', 'abc  ']],
  ['pre+post', '  abc  ', ['  ', 'abc  ']],
  ['none', 'abc', ['', 'abc']],
])('spliSpace - %s', (name, source, parsed) =>
  expect(splitSpace(source)).to.equal(parsed)
);

test.each([
  ['space', ' ', true],
  ['spaces', '  ', true],
  ['tab', '\t', true],
  ['tabs', '\t\t', true],
  ['line end', '\n', true],
  ['line ends', '\n\n', true],
  ['line return', '\r', true],
  ['line returns', '\r\r', true],
  ['mixed space', '\n\r\t', true],
  ['mixed', '\naba', false],
  ['alpahnumeric', '1abcd34', false],
  ['symbols', '*', false],
  ['empty', '', false],
])('isSpace - %s', (name, source, result) =>
  expect(isSpace(source)).to.equal(result)
);

it('seedTokens defaults', () => {
  expect(seedTokens()).to.equal({
    start: '',
    delimiter: '',
    postDelimiter: '',
    tag: '',
    postTag: '',
    name: '',
    postName: '',
    type: '',
    postType: '',
    description: '',
    end: '',
  });
});

it('seedTokens overrides', () => {
  expect(seedTokens({ description: 'abc' })).to.equal({
    start: '',
    delimiter: '',
    postDelimiter: '',
    tag: '',
    postTag: '',
    name: '',
    postName: '',
    type: '',
    postType: '',
    description: 'abc',
    end: '',
  });
});

it('seedBlock defaults', () => {
  expect(seedBlock()).to.equal({
    description: '',
    tags: [],
    source: [],
    problems: [],
  });
});

it('seedBlock overrides', () => {
  expect(seedBlock({ description: 'abc' })).to.equal({
    description: 'abc',
    tags: [],
    source: [],
    problems: [],
  });
});

it('seedSpec defaults', () => {
  expect(seedSpec()).to.equal({
    tag: '',
    name: '',
    type: '',
    optional: false,
    description: '',
    problems: [],
    source: [],
  });
});

it('seedSpec overrides', () => {
  expect(seedSpec({ description: 'abc' })).to.equal({
    tag: '',
    name: '',
    type: '',
    optional: false,
    description: 'abc',
    problems: [],
    source: [],
  });
});
