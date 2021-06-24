const {
  parse,
  stringify,
  transforms: { align },
} = require('../../lib');

it('align - ignore trailing right space', () => {
  const source = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     * @param {string} name
     * @param {any} value the value parameter
     */`;

  const expected = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     * @param {string} name
     * @param {any}    value the value parameter
     */`.slice(1);

  const parsed = parse(source);
  const aligned = align()(parsed[0]);
  const stringified = stringify(aligned);

  expect(stringified).to.equal(expected);
});
