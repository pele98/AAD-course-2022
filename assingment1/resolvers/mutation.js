module.exports = {
  deleteNote: async (parent, { id }, { models, user }) => {
    const note = await models.Note.findById(id);
    try {
      await note.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { author, disabled, content, id }, { models, user }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          content,
          author,
          disabled
        }
      },
      { new: true }
    );
  },
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: args.author,
      disabled: args.disabled || false,
    });
  }
};
