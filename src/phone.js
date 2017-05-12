const { GraphQLScalarType } = require('graphql')
const phone = require('phone')

// Index 0 is phone, index 1 is country code
module.exports = new GraphQLScalarType({
  name: 'PhoneNumber',
  serialize: (value) => {
    return phone(value.toString())[0]
  },
  parseValue: (value) => {
    return phone(value.toString())[0]
  },
  parseLiteral (ast) {
    return phone(ast.value.toString())[0]
  }
})
