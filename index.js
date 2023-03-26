const peg = require('pegjs');

const grammar = `
  start = program
  program = "program" ident "{" command "}"
  command = "print" "(" string ")"
  ident = [a-zA-Z]+
  string = "'" [^']* "'"
`;

const parser = peg.generate(grammar);

const code = `
program hello {
  print('Hello, world!');
}
`;

const ast = parser.parse(code);
console.log(ast);






function translate(ast) {
  if (ast.type === 'program') {
    const name = ast.name;
    const body = translate(ast.body);
    return {
      type: 'program',
      name,
      body,
    };
  } else if (ast.type === 'print') {
    const arg = ast.arg;
    return {
      type: 'writeln',
      args: [arg],
    };
  } else {
    throw new Error(`Unexpected AST node type: ${ast.type}`);
  }
}

const portugolAst = {
  type: 'program',
  name: 'hello',
  body: {
    type: 'print',
    arg: "'Hello, world!'",
  },
};

const pascalAst = translate(portugolAst);
console.log(pascalAst);
