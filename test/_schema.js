const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const gnt = require('..')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      phone: {
        type: gnt.Phone,
        args: { value: { type: GraphQLString } },
        resolve: (root, args) => args.value
      },
      date: {
        type: gnt.UnixDate,
        args: { value: { type: GraphQLString } },
        resolve: (root, args) => args.value
      },
      card: {
        type: gnt.CreditCard,
        args: { value: { type: GraphQLString } },
        resolve: (root, args) => args.value
      },
      state: {
        type: gnt.State,
        args: { value: { type: gnt.State } },
        resolve: (root, args) => args.value
      }
    }
  })
})
