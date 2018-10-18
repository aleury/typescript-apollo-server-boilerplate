import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

import { LibraryAPI } from './api'
import { resolvers } from './resolvers'

const typeDefs = importSchema('./src/schema/schema.graphql')
const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
    schema,
    dataSources: () => {
        return {
            libraryAPI: new LibraryAPI(),
        }
    }
})
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
