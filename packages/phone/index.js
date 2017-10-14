const { GraphQLScalarType } = require('graphql')
const phone = require('phone')

const TOLL_FREE_PREFIX = ['800', '844', '855', '866', '877', '888']

const parse = (value) => {
  const num = String(value).replace(/\D/g, '').slice(-10)
  if (num.length === 10 && TOLL_FREE_PREFIX.some(v => v === num.substr(0, 3))) {
    return `+1${num}`
  }
  return phone(String(value))[0]
}

// Index 0 is phone, index 1 is country code
module.exports = new GraphQLScalarType({
  name: 'PhoneNumber',
  serialize: parse,
  parseValue: parse,
  parseLiteral (ast) {
    return parse(ast.value)
  }
})
