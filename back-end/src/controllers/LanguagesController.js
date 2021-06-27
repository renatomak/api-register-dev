const rescue = require('express-rescue');

const { getAll } = require('../services/LanguagesServices');
const {
  STATUS_400_BAD_REQUEST,
  STATUS_200_OK,
} = require('../util');

const getAllLinguages = rescue(async (_req, res) => {
  try {
    const result = await getAll();

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(STATUS_400_BAD_REQUEST).json({ message: 'Bad request' });
  }
});

module.exports = {
  getAllLinguages,
};
