const { GraphQLScalarType, GraphQLError } = require('graphql')
const validZips = require('./_zips')

const check = value => {
  if (validZips.has(value)) return value
  throw new GraphQLError(`${value} is not a valid zipcode`)
}

const leftPad = (v, n, c = '0') =>
  String(v).length >= n ? String(v) : (String(c).repeat(n) + v).slice(-n);

const validate = value => {
  if (!value || isNaN(value)) throw new GraphQLError(`${value} is not a parsable to a zipcode`)
  return check(leftPad(value, 5))
}

module.exports = new GraphQLScalarType({
  name: 'ZipCode',
  description: 'Valid 5-digit US zipcode',
  serialize: validate,
  parseValue: validate,
  parseLiteral: ast => validate(ast.value)
})
