const { GraphQLEnumType } = require('graphql')

const generateEnum = (array) =>
  array.reduce((accum, next) => {
    accum[next] = {}
    return accum
  }, {})

class EnumType extends GraphQLEnumType {
  constructor (config) {
    config.values = Array.isArray(config.values) ? generateEnum(config.values) : config.values
    super(config)
  }
}

module.exports = EnumType
