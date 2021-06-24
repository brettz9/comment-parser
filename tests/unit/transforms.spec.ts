import { flow } from '../../src/transforms/index';
import { seedBlock } from '../../src/util';
import { Block } from '../../src/primitives';

const t0 = (b: Block): Block => ({ ...b, description: b.description + ' t0' });
const t1 = (b: Block): Block => ({ ...b, description: b.description + ' t1' });

it('multiple', () => {
  const block = seedBlock({ description: 'test' });
  expect(flow(t0, t1)(block).description).to.equal('test t0 t1');
});

it('one', () => {
  const block = seedBlock({ description: 'test' });
  expect(flow(t0)(block).description).to.equal('test t0');
});

it('none', () => {
  const block = seedBlock({ description: 'test' });
  expect(flow()(block).description).to.equal('test');
});
