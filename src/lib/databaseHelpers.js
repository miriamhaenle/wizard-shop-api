const saveToDb = (entry) => entry.save();

const findAll = (model) => model.find();

const findById = (model, id) => {
  return model.findOne({ _id: id });
};

const findAndUpdate = (model, id, valueToUpdate) => {
  return model.findByIdAndUpdate(id, valueToUpdate, {
    new: true,
    useFindAndModify: false,
  });
};

export { saveToDb, findById, findAll, findAndUpdate };
