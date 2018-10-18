import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema, IResolvers } from 'graphql-tools'
import { LibraryAPI, Book, Author} from './api';


interface Context {
    dataSources: { libraryAPI: LibraryAPI }
}

const resolvers: IResolvers = {
    Query: {
        async getBooks(_root: null, _args: {}, ctx: Context): Promise<Book[]> {
            return await ctx.dataSources.libraryAPI.getBooks()
        },
        async getAuthors(_root: null, _args: {}, ctx: Context): Promise<Author[]> {
            return await ctx.dataSources.libraryAPI.getAuthors()
        },
    },
    Book: {
        async author(book: Book, _args: {}, ctx: Context): Promise<Author | undefined> {
            return await ctx.dataSources.libraryAPI.getAuthor(book.authorId)
        }
    },
    Author: {
        async books(author: Author, _args: {}, ctx: Context): Promise<Book[]> {
            return await ctx.dataSources.libraryAPI.getBooks(author.books)
        }
    }
}

const typeDefs = importSchema('./src/schema.graphql')
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
