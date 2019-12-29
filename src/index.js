import '@babel/polyfill/noConflict'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            db,
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
})

const opt = {
    port: process.env.PORT || 4000,
    cors: {
        credentials: true,
        origin: ["http://localhost:8080"]
    }
}

server.start(opt, () => {
    console.log('The server is up!')
})