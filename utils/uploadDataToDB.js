const uploadDataToDB = async (uploadDB) => {
  const { model, values } = uploadDB;

  try {
    const data = await model.insertMany(values, { ordered: false });
    return data ? data.length : 0;
  } catch (err) {
    if (err.code == 11000) {
    } else console.log(err);
  }
};

module.exports = uploadDataToDB;
