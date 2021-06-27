const rescue = require('express-rescue');
const {
  STATUS_201_CREATED,
  STATUS_200_OK,
  STATUS_400_BAD_REQUEST,
  STATUS_404_NOT_FOUND,
  STATUS_204_NO_CONTENT,
  STATUS_401_UNAUTHORIZED
} = require('../util');

const {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  deleteUserService,
  updateUserService,
  getUsersByQueryService,
} = require('../services/UsersServices');

const getAllUsers = rescue(async (_req, res) => {
  try {
    const result = await getAllUsersService();
    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(err.message);
    return res.status(STATUS_401_UNAUTHORIZED).json({ message: 'Internal Error' });
  }
});

const search = rescue(async (req, res) => {
  try {
    const { query } = req;
    const result = await getUsersByQueryService(query);

    return res.status(STATUS_200_OK).json(result);
  } catch (error) {
    console.error(err.message);
    return res.status(STATUS_401_UNAUTHORIZED).json({ message: 'Internal Error' });
  }
});

const createUser = rescue(async (req, res) => {
  try {
    const result = await createUserService(req.body);
    return res.status(STATUS_201_CREATED).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(STATUS_400_BAD_REQUEST).json({ message: 'Bad request' });
  }

});

const getUserById = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);

    if (!user) return res.status(STATUS_404_NOT_FOUND).json({ message: 'User does not exist' });

    return res.status(STATUS_200_OK).json(user);
  } catch (err) {
    console.error(error.message);
    return res.status(STATUS_400_BAD_REQUEST).json({ message: 'Bad request' });
  }
});

const removeUser = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserService(id);

    return res.status(STATUS_204_NO_CONTENT).end();
  } catch (error) {
    console.error(error.message);
    return res.status(STATUS_404_NOT_FOUND).json({ message: 'User does not exist' });
  }
});

const updateUser = rescue(async (req, res) => {
  try {
      const { body: user } = req;

  updateUserService(user);

  res.status(204).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error(error.message);
    return res.status(STATUS_404_NOT_FOUND).json({ message: 'User does not exist' });
  }
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  search,
};
