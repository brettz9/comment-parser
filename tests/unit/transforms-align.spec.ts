import align from '../../src/transforms/align';
import getParser, { Parser } from '../../src/parser/index';
import getStringifier, { Stringifier } from '../../src/stringifier/index';

let parse: Parser;
let stringify: Stringifier;

beforeEach(() => {
  parse = getParser();
  stringify = getStringifier();
});

it('multiline', () => {
  const source = `
  /**
   * Description may go
   * over multiple lines followed by @tags
   *
* @some-tag {some-type} some-name description line 1
* @another-tag {another-type} another-name description line 1
      description line 2
      * description line 3
   */`;

  const expected = `
  /**
   * Description may go
   * over multiple lines followed by @tags
   *
   * @some-tag    {some-type}    some-name    description line 1
   * @another-tag {another-type} another-name description line 1
                                              description line 2
   *                                          description line 3
   */`.slice(1);

  const parsed = parse(source);
  const aligned = align()(parsed[0]);
  const out = stringify(aligned);

  // console.log(inspect(aligned));
  expect(out).to.equal(expected);
});

it('one-liner', () => {
  const source = `  /** @tag {type} name description */`;
  const parsed = parse(source);
  const out = stringify(align()(parsed[0]));

  expect(out).to.equal(source);
});

it('same line open', () => {
  const source = `
  /** @tag {type} name description
   */`.slice(1);
  const parsed = parse(source);
  const out = stringify(align()(parsed[0]));

  expect(out).to.equal(source);
});

it('same line close', () => {
  const source = `
  /**
   * @tag {type} name description */`;

  const expected = `
  /**
   * @tag {type} name description */`.slice(1);

  const parsed = parse(source);
  const aligned = align()(parsed[0]);
  const out = stringify(aligned);

  expect(out).to.equal(expected);
});

it('spec source referencing', () => {
  const parsed = parse(`/** @tag {type} name Description */`);
  const block = align()(parsed[0]);
  expect(block.tags[0].source[0] === block.source[0]).to.equal(true);
});

it('block source clonning', () => {
  const parsed = parse(`/** @tag {type} name Description */`);
  const block = align()(parsed[0]);
  parsed[0].source[0].tokens.description = 'test';
  expect(block.source[0].tokens.description).to.equal('Description ');
});

it('ignore right whitespace', () => {
  const source = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     * @private
     * @param {string} name
     * @param {any} value the value parameter
     *
     */`.slice(1);

  const expected = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     * @private
     * @param   {string} name
     * @param   {any}    value the value parameter
     *
     */`.slice(1);

  const parsed = parse(source);
  const aligned = align()(parsed[0]);
  const stringified = stringify(aligned);

  expect(stringified).to.equal(expected);
});

it('collapse postDelimiter', () => {
  const source = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     *  @param {string} name the name parameter
     *     @param {any} value the value parameter
     */`.slice(1);

  const expected = `
    /**
     * Description may go
     * over multiple lines followed by @tags
     * @param {string} name  the name parameter
     * @param {any}    value the value parameter
     */`.slice(1);

  const parsed = parse(source);
  const aligned = align()(parsed[0]);
  const stringified = stringify(aligned);

  expect(stringified).to.equal(expected);
});
