import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { LibraryAPI, Book, Author} from './api';


interface LibraryContext {
    dataSources: { libraryAPI: LibraryAPI }
}

const resolvers = {
    Query: {
        async getBooks(_root: null, _args: {}, { dataSources }: LibraryContext): Promise<Book[]> {
            return await dataSources.libraryAPI.getBooks()
        },
        async getAuthors(_root: null, _args: {}, { dataSources }: LibraryContext): Promise<Author[]> {
            return await dataSources.libraryAPI.getAuthors()
        },
    },
    Book: {
        async author(book: Book, _args: {}, { dataSources }: LibraryContext): Promise<Author | undefined> {
            console.log('fetching the author!')
            return await dataSources.libraryAPI.getAuthor(book.authorId)
        }
    },
    Author: {
        async books(author: Author, _args: {}, { dataSources }: LibraryContext): Promise<Book[]> {
            console.log('fetching the books!')
            return await dataSources.libraryAPI.getBooks(author.books)
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
