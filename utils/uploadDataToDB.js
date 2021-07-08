const uploadDataToDB = (uploadDB) => {
  uploadDB.forEach((elem) => {
    const { model, values } = elem;

    model.insertMany(values, { ordered: false }, (err, docs) => {
      if (err) {
        if (err.code == 11000) {
        } else console.log(err);
      }
    });
  });
};

module.exports = uploadDataToDB;
