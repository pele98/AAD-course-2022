const { gql } = require('apollo-server-express');

module.exports = gql`
scalar DateTime

type Note {
  id: String!
  content: String!
  author: User!
  disabled: Boolean!
  favoriteCount: Int!
  favoritedBy: [User]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type User {
  id: String!
  username: String!
  email: String!
  avatar: String
  notes: [Note!]!
  favorites: [Note!]!
}

type NoteFeed {
  notes: [Note]!
  cursor: String!
  hasNextPage: Boolean!
}

type Query {
  notes: [Note]
  note(id: ID): Note!
  getDisabled(disabled: Boolean!): [Note]
  getAllNotes: [Note]
  user(username: String!): User
  users: [User!]!
  me: User!
  noteFeed(cursor: String): NoteFeed
}

type Mutation {
  newNote(content: String!, disabled: Boolean!): Note
  updateNote(id: ID!, content: String, disabled: Boolean): Note!
  deleteNote(id: ID!): Boolean!
  toggleFavorite(id: ID!): Note!
  toggleNoteStatus(id: ID!): Note!
  signUp(username: String!, email: String!, password: String!): String!
  signIn(username: String, email: String, password: String!): String!
}
`;
