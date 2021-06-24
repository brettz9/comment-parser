const { parse } = require('../../lib');

const source = `
  /**
   * @param {Function} [processor=data => data] A function to run
   */`;

it('default', () => {
  const parsed = parse(source);
  // console.log(inspect(parsed[0]));

  expect(parsed[0].problems).to.deep.equal([]);
  expect(parsed[0].tags[0]).to.shallowDeepEqual({
    name: 'processor',
    default: 'data => data',
    optional: true,
    description: 'A function to run',
    problems: [],
  });
});
