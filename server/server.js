import { ApolloServer } from '@apollo/server'
import express from 'express'
import http from 'http' 
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors'
import bodyParser from 'body-parser'
import { resolvers, typeDefs } from './src/peopleCarsScheme.js';

const startApolloServer = async (typeDefs, resolvers) => {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    })

    await server.start()

    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async({req, res}) => ({token: req.headers.token})
        })
    )

    await new Promise(resolve => httpServer.listen({port:4000}, resolve))
    console.log(`server ready at htpp://localhost:4000/graphql`)
}

startApolloServer(typeDefs, resolvers)