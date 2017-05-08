const { GraphQLScalarType } = require('graphql')
const cc = require('credit-card')

function parse (value) {
  const {
    card,
    validCardNumber,
    validCvv: validCVV,
    validExpiryMonth,
    validExpiryYear,
    isExpired
  } = cc.validate(getPayload())
  if (validCardNumber) {
    return Object.assign(card, {
      validCVV,
      validExpiryMonth,
      validExpiryYear,
      isExpired
    })
  }

  function getPayload () {
    switch (typeof value) {
      case 'string':
      case 'number': {
        const cardType = cc.determineCardType(value.toString())
        return {
          number: value.toString(),
          cardType
        }
      }
      default: return Object.assign({ cardType: value.cardType || value.type }, value)
    }
  }
}

module.exports = new GraphQLScalarType({
  name: 'CreditCard',
  description: 'Valid US credit card',
  serialize: parse,
  parseValue: parse,
  parseLiteral (ast) {
    return parse(ast.value)
  }
})
