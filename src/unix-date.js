const { GraphQLScalarType } = require('graphql')
const moment = require('moment')

module.exports = new GraphQLScalarType({
  name: 'UnixDate',
  serialize: (value) => {
    return moment(value).unix()
  },
  parseValue: (value) => {
    return moment(value).unix()
  },
  parseLiteral (ast) {
    return moment(ast.value).unix()
  }
})
