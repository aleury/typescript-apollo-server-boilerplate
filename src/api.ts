import { find, filter, includes } from 'lodash'
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'

export interface Book {
    id: number
    title: string
    authorId: number
}

export interface Author {
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

export class LibraryAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://api.example.com/'
    }

    async getBooks(ids?: number[]) {
        return await Promise.resolve(
            ids ? filter(books, b => includes(ids, b.id)) : books
        )
    }

    async getAuthors() {
        return await Promise.resolve(authors)
    }

    async getBook(id: number) {
        return await Promise.resolve(find(books, { id }))
    }

    async getAuthor(id: number) {
        return await Promise.resolve(find(authors, { id }))
    }
}