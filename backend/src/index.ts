import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { CountryResolver } from "./resolver/Country";
import DataSource from'./db';
import { buildSchema } from "type-graphql";
import cors from 'cors';
import express from 'express';
import http from "http";

const start = async (): Promise<void> => {
    const app = express();
    await DataSource.initialize();
    const httpServer = http.createServer(app);

    app.use(
        ["/", "/graphql"],
        cors<cors.CorsRequest>({
          origin: "http://localhost:3000,http://localhost:4000".split(","),
          credentials: true,
        }),
        express.json(),
    );

    const schema = await buildSchema({
        resolvers: [CountryResolver],
      });

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    
        context: ({ req, res }) => {
          return { req, res };
        },
      });
  
      await server.start();
      server.applyMiddleware({ app, cors: false, path: "/" });
      httpServer.listen({ port: 4000 }, () =>
        console.log(
          `🚀 Server ready at ${"localhost"}:${4000}${server.graphqlPath}`
        )
      );
};

void start();