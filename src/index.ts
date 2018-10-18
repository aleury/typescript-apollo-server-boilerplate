import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { find, filter } from 'lodash'

interface Book {
    id: number
    title: string
    authorId: number
}


interface Author {
    id: number
    name: string
    books: number[]
}

const books: Book[] = [
    {
        id: 1,
        title: 'Harry Potter and the Chamber of Secrets',
        authorId: 1,
    },
    {
        id: 2,
        title: 'Jurassic Park',
        authorId: 2,
    },
]

const authors: Author[] = [
    {
        id: 1,
        name: 'J.K. Rowling',
        books: [1],
    },
    {
        id: 2,
        name: 'Michael Crichton',
        books: [2],
    }
]

const resolvers = {
    Query: {
        getBooks: () => books,
        getAuthors: () => authors,
    },
    Book: {
        author(book: Book) {
            return find(authors, { id: book.authorId })
        }
    },
    Author: {
        books(author: Author) {
            return filter(books, { authorId: author.id })
        }
    }
}
const typeDefs = importSchema('./src/schema.graphql')
const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
