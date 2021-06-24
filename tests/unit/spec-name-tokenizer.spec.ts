import nameTokenizer from '../../src/parser/tokenizers/name';
import { seedTokens, seedSpec } from '../../src/util';

const tokenize = nameTokenizer();

it('single word', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({ description: 'param param description 0' }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: 'param',
            postName: ' ',
            description: 'param description 0',
          }),
        },
      ],
    })
  );
});

it('dash-delimitered', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({ description: 'param-param description 0' }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param-param',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: 'param-param',
            postName: ' ',
            description: 'description 0',
          }),
        },
      ],
    })
  );
});

it('quoted', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({ description: '"param param" description 0' }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param param',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '"param param"',
            postName: ' ',
            description: 'description 0',
          }),
        },
      ],
    })
  );
});

it('inconsistent quotes', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({ description: '"param param description 0' }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: '"param',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '"param',
            postName: ' ',
            description: 'param description 0',
          }),
        },
      ],
    })
  );
});

it('optional', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({ description: '[param] param description' }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      optional: true,
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[param]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('optional with default', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param=value] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      optional: true,
      default: 'value',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[param=value]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('quoted default', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param="value"] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      optional: true,
      default: '"value"',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[param="value"]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('loosely quoted default', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param="value] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      optional: true,
      default: '"value',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[param="value]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('quoted default with =', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param="value=1"] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      optional: true,
      default: '"value=1"',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[param="value=1"]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('non-alphanumeric', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '$param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: '$param',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '$param',
            postName: ' ',
            description: 'description',
          }),
        },
      ],
    })
  );
});

it('spread notation', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '...params description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: '...params',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '...params',
            postName: ' ',
            description: 'description',
          }),
        },
      ],
    })
  );
});

it('optionsl spread notation', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[...params] description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: '...params',
      optional: true,
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[...params]',
            postName: ' ',
            description: 'description',
          }),
        },
      ],
    })
  );
});

it('optional multiple words', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param name] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param name',
      optional: true,
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[param name]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('name spacing', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[ param = value ] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      optional: true,
      default: 'value',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[ param = value ]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('inconsistent brackets', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      problems: [
        {
          code: 'spec:name:unpaired-brackets',
          line: 1,
          critical: true,
          message: 'unpaired brackets',
        },
      ],
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            description: '[param param description',
          }),
        },
      ],
    })
  );
});

it('empty name', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[=value] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      problems: [
        {
          code: 'spec:name:empty-name',
          line: 1,
          critical: true,
          message: 'empty name',
        },
      ],
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            description: '[=value] param description',
          }),
        },
      ],
    })
  );
});

it('empty default value', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param=] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      problems: [
        {
          code: 'spec:name:empty-default',
          line: 1,
          critical: true,
          message: 'empty default value',
        },
      ],
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            description: '[param=] param description',
          }),
        },
      ],
    })
  );
});

it('empty', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      problems: [
        {
          code: 'spec:name:empty-name',
          line: 1,
          critical: true,
          message: 'empty name',
        },
      ],
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            description: '[] param description',
          }),
        },
      ],
    })
  );
});

it('default value syntax', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param=value=value] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      problems: [
        {
          code: 'spec:name:invalid-default',
          line: 1,
          critical: true,
          message: 'invalid default value syntax',
        },
      ],
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            description: '[param=value=value] param description',
          }),
        },
      ],
    })
  );
});

it('default with arrow', () => {
  expect(
    tokenize(
      seedSpec({
        source: [
          {
            number: 1,
            source: '...',
            tokens: seedTokens({
              description: '[param = value => value] param description',
            }),
          },
        ],
      })
    )
  ).to.equal(
    seedSpec({
      name: 'param',
      optional: true,
      default: 'value => value',
      source: [
        {
          number: 1,
          source: '...',
          tokens: seedTokens({
            name: '[param = value => value]',
            postName: ' ',
            description: 'param description',
          }),
        },
      ],
    })
  );
});

it('after multiline {type}', () => {
  const sourceIn = [
    {
      number: 0,
      source: '...',
      tokens: seedTokens({
        tag: '@aram',
        postTag: ' ',
        type: '{function(',
      }),
    },
    {
      number: 1,
      source: '...',
      tokens: seedTokens({ type: '  number' }),
    },
    {
      number: 2,
      source: '...',
      tokens: seedTokens({
        type: ')}',
        postType: ' ',
        description: 'paramname description text',
      }),
    },
  ];

  const sourceOut = JSON.parse(JSON.stringify(sourceIn));
  Object.assign(sourceOut[2].tokens, {
    name: 'paramname',
    postName: ' ',
    description: 'description text',
  });

  expect(tokenize(seedSpec({ source: sourceIn }))).to.equal(
    seedSpec({
      name: 'paramname',
      source: sourceOut,
    })
  );
});
