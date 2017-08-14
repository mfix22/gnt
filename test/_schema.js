const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const gnt = require('..')

const resolve = (root, args) => args.value

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      phone: {
        type: gnt.Phone,
        args: { value: { type: GraphQLString } },
        resolve
      },
      date: {
        type: gnt.UnixDate,
        args: { value: { type: GraphQLString } },
        resolve
      },
      card: {
        type: gnt.CreditCard,
        args: { value: { type: GraphQLString } },
        resolve
      },
      state: {
        type: gnt.State,
        args: { value: { type: gnt.State } },
        resolve
      },
      zip1: {
        type: gnt.ZipCode,
        args: { value: { type: GraphQLString } },
        resolve
      },
      zip2: {
        type: gnt.ZipCode,
        args: { value: { type: GraphQLString } },
        resolve
      }
    }
  })
})
