const {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  search,
} = require('./UsersControllers');
const { consultCep } = require('./CepController');
const { getAllLinguages } = require('./LanguagesController');

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  search,
  consultCep,
  getAllLinguages,
};
