const { parse } = require('../../lib');

const source = `
  /** Multi-line typedef for an options object type.
   *
   * @typedef {{
   *   prop: number
   * }} MyOptions description text
   */`;

it('name after multiline tag', () => {
  const parsed = parse(source);
  // console.log(inspect(parsed[0]));

  expect(parsed[0].problems).to.deep.equal([]);
  expect(parsed[0].tags[0]).to.shallowDeepEqual({
    tag: 'typedef',
    name: 'MyOptions',
    type: '{prop: number}',
    description: 'description text',
    problems: [],
  });
});
