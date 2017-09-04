const { GraphQLScalarType, Kind } = require('graphql')

const parse = v => {
  if (v == null) return null
  const string = String(v)
  return string.length ? string : null
}

module.exports = new GraphQLScalarType({
  name: 'NonEmptyString',
  description: "String where '' is treated as null",
  serialize: parse,
  parseValue: parse,
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parse(ast.value) : null;
  }
})
