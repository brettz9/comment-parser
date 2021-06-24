const { parse, stringify, transforms, tokenizers } = require('../../lib');
const { examples } = require('./examples');

const table = examples.map((fn) => [fn.name.replace(/_/g, ' '), fn]);

table.forEach(([name, fn]) => {
  it('example - ' + name, () => {
    const source = fn.toString();
    expect(() =>
      fn(source, parse, stringify, transforms, tokenizers)
    ).not.to.throw();
  });
});
