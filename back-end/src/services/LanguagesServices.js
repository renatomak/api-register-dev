const { Language } = require('../models');

const getAll = async () => {
  try {
    const result = await Language.findAll();

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAll,
};
