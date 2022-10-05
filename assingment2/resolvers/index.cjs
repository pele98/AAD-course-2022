const Query = require('./query.cjs');
const Mutation = require('./mutation.cjs');
const Note = require('./note.cjs');
const User = require('./user.cjs');
const { GraphQLDateTime } = require('graphql-scalars');

module.exports = {
  Query,
  Mutation,
  Note,
  User,
  DateTime: GraphQLDateTime
};
