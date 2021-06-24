import { getJoiner } from '../../src/parser/tokenizers/description';
import { Line } from '../../src/primitives';
import { seedTokens } from '../../src/util';

const source: Line[] = [
  {
    number: 1,
    source: '  /**',
    tokens: seedTokens({
      start: '  ',
      delimiter: '/**',
    }),
  },
  {
    number: 2,
    source: '   *   ',
    tokens: seedTokens({
      start: '   ',
      delimiter: '*',
      postDelimiter: '   ',
    }),
  },
  {
    number: 3,
    source: '   *   Description first line\twith\ttabs   ',
    tokens: seedTokens({
      start: '   ',
      delimiter: '*',
      postDelimiter: '   ',
      description: 'Description first line\twith\ttabs   ',
    }),
  },
  {
    number: 4,
    source: '   *     second line   ',
    tokens: seedTokens({
      start: '   ',
      delimiter: '*',
      postDelimiter: '     ',
      description: 'second line   ',
    }),
  },
  {
    number: 5,
    source: '   *   ',
    tokens: seedTokens({
      start: '   ',
      delimiter: '*',
      postDelimiter: '   ',
    }),
  },
  {
    number: 6,
    source: '   *       third line   ',
    tokens: seedTokens({
      start: '   ',
      delimiter: '*',
      postDelimiter: '       ',
      description: 'third line   ',
    }),
  },
  {
    number: 7,
    source: '   */',
    tokens: seedTokens({
      start: '   ',
      end: '*/',
    }),
  },
];

it('compact', () => {
  const joined = getJoiner('compact')(source);
  expect(joined).to.equal(
    'Description first line\twith\ttabs second line third line'
  );
});

it('preserve', () => {
  const joined = getJoiner('preserve')(source);
  expect(joined).to.equal(
    '  \n  Description first line\twith\ttabs   \n    second line   \n  \n      third line   '
  );
});

it('preserve - empty', () => {
  const joined = getJoiner('preserve')([]);
  expect(joined).to.equal('');
});

it('preserve - no delimiter', () => {
  const joined = getJoiner('preserve')([
    {
      number: 1,
      source: '...',
      tokens: seedTokens({
        start: '   ',
        delimiter: '',
        postDelimiter: '',
        description: 'line with no delimiter',
      }),
    },
  ]);
  expect(joined).to.equal('   line with no delimiter');
});

it('custom', () => {
  const spacerFn = (source: Line[]) =>
    source
      .map(({ tokens: { description } }) =>
        description.replace(/\s+/g, ' ').trim().toUpperCase()
      )
      .filter((s) => s !== '')
      .join(' ');

  const joined = getJoiner(spacerFn)(source);
  expect(joined).to.equal(
    'DESCRIPTION FIRST LINE WITH TABS SECOND LINE THIRD LINE'
  );
});
