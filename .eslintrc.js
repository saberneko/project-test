module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "camelcase": [0, {"properties": "never"}],
    // close no-unused-vars when debug
    "no-unused-vars": [process.env.NODE_ENV === 'production' ? 2 : 0],
    "one-var": [0],
    "indent": ["error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 }, "SwitchCase": 1 }],
    // forbid no multiple spaces except property of object, variable-declaration and import-declaration
    "no-multi-spaces": ["error", {
      exceptions: {
        "Property": true,
        "VariableDeclarator": true,
        "ImportDeclaration": true
      },
    }]

  }
}
