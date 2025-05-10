import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   ping: String
 * }
 */
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            ping: {
                type: GraphQLString,
                resolve: () => 'hello world'
            }
        }
    })
});

export { schema };
