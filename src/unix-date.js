const { GraphQLScalarType } = require('graphql')
const moment = require('moment')

module.exports = new GraphQLScalarType({
  name: 'UnixDate',
  description: 'Unix epoch timestamp',
  serialize: (value) => {
    return moment.parseZone(value).unix()
  },
  parseValue: (value) => {
    return moment.parseZone(value).unix()
  },
  parseLiteral (ast) {
    return moment.parseZone(ast.value).unix()
  }
})
