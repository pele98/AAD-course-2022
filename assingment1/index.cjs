require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const port = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;
const db = require('./db.cjs');
const models = require('./models/index.cjs');
const typeDefs = require('./schema.cjs');

const resolvers = require('./resolvers/index.cjs');

const app = express();

db.connect(DB_HOST);

async function startServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { models };
    }
  });
  await server.start();
  server.applyMiddleware({ app, path: '/api' });
  return server.graphqlPath;
};

app.listen(port, async () => {
  const path = await startServer(app);
  console.log(`Graphql Server running at http://localhost:${port}${path}`)
});
