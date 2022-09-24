module.exports = {
  notes: async (parent, args, { models }) => {
    return await models.Note.find({disabled: false});
  },
  note: (parent, args, { models }) => {
    return models.Note.findById({id: args.id});
  },
  getDisabled: async (parent, args, { models }) => {
    return await models.Note.find({disabled: true});
  },
  getAllNotes: async (parent, args, { models }) => {
    return await models.Note.find();
  },
};
