#!/usr/bin/env node
const fs = require('fs-extra')
const slug = require('to-slug-case')
const logSymbols = require('log-symbols');

const args = process.argv.slice(2)

if (!args.length) throw new Error('`type` is required. Try `npm run generate -- <your type name>`')

const type = args.join(' ')

const path = `./packages/${slug(type)}`

fs.mkdirSync(path)

const cap = s => s[0].toUpperCase() + s.slice(1).toLowerCase()

const pkgJsonTemplate = {
  name: `graphql-types-${slug(type)}`,
  version: '0.0.0',
  description: `GraphQL Normalized ${args.map(cap).join(' ')} Type`,
  main: 'index.js',
  keywords: [
    'graphql',
    'normalized',
    'types',
    'scalar',
    'gin-n-tonic',
    type
  ],
  license: 'MIT',
  dependencies: {
  },
  peerDependencies: {
    'graphql': '*'
  }
}

const indexTemplate =
`const { GraphQLScalarType } = require('graphql')

const parse = v => {
  // Feel free to handle this however you would like!
}

module.exports = new GraphQLScalarType({
  name: '${args.map(cap).join('')}',
  description: '',
  serialize: parse,
  parseValue: parse,
  parseLiteral(ast) {
    return parse(ast.value);
  }
})`

const indexSpecTemplate =
`const type = require('.')

test('${type}', () => {
  expect(dl._scalarConfig.parseValue())
})`


fs.writeFileSync(`${path}/index.js`, indexTemplate)
fs.writeFileSync(`${path}/index.spec.js`, indexSpecTemplate)
fs.writeJsonSync(`${path}/package.json`, pkgJsonTemplate, {spaces: 2})

console.log('\n', logSymbols.success, args.map(cap).join(''), 'type created!', '\n')
