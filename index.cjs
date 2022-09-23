require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const port = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;
const db = require('./db.cjs');
const models = require('./models/index.cjs');

const { Note } = models;

const typeDefs = gql`
  type Note {
    id: ID
    content: String!
    author: String!
    disabled: Boolean!
  }

  type Query {
    hello: String
    notes: [Note]
    note(id: String): Note
    getDisabled(disabled: Boolean!): [Note]
    getAllNotes: [Note]
  }

  type Mutation {
    newNote(content: String!, author: String!, disabled: Boolean!): Note!
    deleteNote(id: String): Note
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello developer!',
    notes: async () => {
      return await Note.find({disabled: false});
    },
    note: (parent, args) => {
      return Note.findById({id: args.id});
    },
    getDisabled: async () => {
      return await Note.find({disabled: true});
    },
    getAllNotes: async () => {
      return await Note.find();
    },
  },
  Mutation: {
    deleteNote: async (parent, args) => {
      const test = await Note.findByIdAndUpdate(args.id, {
        disabled: true,
      });
      console.log(test);
      return test;
    },
    newNote: async (parent, args) => {
      return await Note.create({
        content: args.content,
        author: args.author,
        disabled: args.disabled || false,
      });
    }
  }
};

const app = express();

db.connect(DB_HOST);

async function startServer(app) {
  const server =  new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/api' });
  return server.graphqlPath;
};

app.listen(port, async () => {
  const path = await startServer(app);
  console.log(`Graphql Server running at http://localhost:${port}${path}`)
});
