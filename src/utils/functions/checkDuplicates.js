const checkDuplicates = async (name, description, model, id = null) => {
  const query = {
    _id: {
      $ne: id
    },
    $or: [
      {
        name
      },
      {
        description
      }
    ]
  };

  const result = await model.findOne(query);

  return result;
};

module.exports = { checkDuplicates };
