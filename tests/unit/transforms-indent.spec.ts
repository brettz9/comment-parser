import indent from '../../src/transforms/indent';
import getParser from '../../src/parser/index';
import getStringifier from '../../src/stringifier/index';

it('push', () => {
  const source = `
  /**
   * Description may go
   * over multiple lines followed by @tags
   *
* @my-tag {my.type} my-name description line 1
      description line 2
      * description line 3
   */`;

  const expected = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     *
  * @my-tag {my.type} my-name description line 1
        description line 2
        * description line 3
     */`;

  const parsed = getParser()(source);
  const out = getStringifier()(indent(4)(parsed[0]));
  expect(out).to.equal(expected.slice(1));
});

it('pull', () => {
  const source = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     *
  * @my-tag {my.type} my-name description line 1
        description line 2
        * description line 3
     */`;

  const expected = `
  /**
   * Description may go
   * over multiple lines followed by @tags
   *
* @my-tag {my.type} my-name description line 1
      description line 2
      * description line 3
   */`;

  const parsed = getParser()(source);
  const out = getStringifier()(indent(2)(parsed[0]));
  expect(out).to.equal(expected.slice(1));
});

it('force pull', () => {
  const source = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     *
  * @my-tag {my.type} my-name description line 1
        description line 2
        * description line 3
     */`;

  const expected = `
/**
 * Description may go
 * over multiple lines followed by @tags
 *
* @my-tag {my.type} my-name description line 1
    description line 2
    * description line 3
 */`;

  const parsed = getParser()(source);
  const indented = indent(0)(parsed[0]);
  const out = getStringifier()(indented);
  expect(out).to.equal(expected.slice(1));
});

it('spec source referencing', () => {
  const parsed = getParser()(`/** @tag {type} name Description */`);
  const block = indent(0)(parsed[0]);
  expect(block.tags[0].source[0] === block.source[0]).to.equal(true);
});

it('block source clonning', () => {
  const parsed = getParser()(`/** @tag {type} name Description */`);
  const block = indent(0)(parsed[0]);
  parsed[0].source[0].tokens.description = 'test';
  expect(block.source[0].tokens.description).to.equal('Description ');
});
