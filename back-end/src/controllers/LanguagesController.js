const rescue = require('express-rescue');

const { getAll } = require('../services/LanguagesServices');
const {
  STATUS_200_OK,
} = require('../util');

const getAllLinguages = rescue(async (_req, res) => {
  const result = await getAll();

  return res.status(STATUS_200_OK).json(result);
});

module.exports = {
  getAllLinguages,
};
