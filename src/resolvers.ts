import { IResolvers } from 'graphql-tools'
import { LibraryAPI, Book, Author} from './api';

export interface Context {
    dataSources: { libraryAPI: LibraryAPI }
}

export const resolvers: IResolvers = {
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