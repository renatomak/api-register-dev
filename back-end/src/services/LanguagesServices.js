const { Language } = require('../models');

const getAll = async () => {
  try {
    const result = await Language.findAll();

    return result;
  } catch (error) {
    const message = 'ERRO ao tenatar buscar as Linguagens de programação cadastradas - metódo: getAll' + error.message;
    throw new Error(message)
  }
};

module.exports = {
  getAll,
};
