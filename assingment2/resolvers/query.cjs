module.exports = {
  notes: async (parent, args, { models }) => {
    return await models.Note.find({disabled: false}).limit(100);
  },
  note: async (parent, args, { models }) => {
    return await models.Note.findById(args.id);
  },
  getDisabled: async (parent, args, { models }) => {
    return await models.Note.find({disabled: true});
  },
  getAllNotes: async (parent, args, { models }) => {
    return await models.Note.find();
  },
  user: async (parent, args, { models }) => {
    return await models.User.findOne({ username: args.username });
  },
  users: async (parent, args, { models }) => {
    return await models.User.find({}).limit(100);
  },
  me: async (parent, args, { models, user }) => {
    return await models.User.findById(user.id);
  },
  noteFeed: async (parent, { cursor }, { models }) => {
    const limit = 10;
    let hasNextPage = false;
    let cursorQuery = {};

    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }

    let notes = await models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    if (notes.length > limit) {
      hasNextPage = true;
      notes = notes.slice(0, -1);
    }
    const newCursor = notes[notes.length - 1]._id;
    return {
      notes,
      cursor: newCursor,
      hasNextPage
    };
  }
};
