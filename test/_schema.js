const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const { Phone, UnixDate, CreditCard, State } = require('..')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      phone: {
        type: Phone,
        args: { value: { type: GraphQLString } },
        resolve: (root, args) => args.value
      },
      date: {
        type: UnixDate,
        args: { value: { type: GraphQLString } },
        resolve: (root, args) => args.value
      },
      card: {
        type: CreditCard,
        args: { value: { type: GraphQLString } },
        resolve: (root, args) => args.value
      },
      state: {
        type: State,
        args: { value: { type: State } },
        resolve: (root, args) => args.value
      }
    }
  })
})
