const { gql } = require('apollo-server-express');

module.exports = gql`
scalar DateTime

type Note {
  id: ID
  content: String!
  author: String!
  disabled: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  updateNote(id: ID!, content: String, author: String, disabled: Boolean): Note!
  deleteNote(id: ID!): Boolean!
}
`;
