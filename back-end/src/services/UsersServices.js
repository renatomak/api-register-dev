const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/config');
const {
  User,
  Address,
  Language,
  UserLanguage,
} = require('../models');

const includes = {
  include: [
    {
      model: Address,
      as: 'addresses',
    },
    {
      model: Language,
      as: 'Languages',
      through: { attributes: [] },
    },
  ],
};



const sequelize = new Sequelize(config.development);

const createUserLanguage = async (languages, userId) => {
  languages.map(async ({ id: languageId }) => {
    await UserLanguage.create({ languageId, userId });
  });
};

const createUserService = async (user) => {
  const createdTransaction = await sequelize.transaction();
  try {
    const {
      fullname, homePhone, cellPhone, address, Languages,
    } = user;

    const resultUser = await User.create(
      { fullname, homePhone, cellPhone },
      { transaction: createdTransaction },
    );
    const userId = resultUser.id;
    await createUserLanguage(Languages, userId);
    const newAddress = { ...address, userId };
    await Address.create(
      newAddress,
      { transaction: createdTransaction },
    );

    await createdTransaction.commit();

    return resultUser;
  } catch (error) {
    await createdTransaction.rollback();
    console.error(error.message);
    throw new Error();
  }
};

const getAllUsersService = async () => {
  try {
    const result = await User.findAll(includes);

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

// { field: 'fullname', value: 'Renato', table: 'User' }
const getUsersByQueryService = async (query) => {
  try {
    const values = Object.values(query);
    const column = values[0];
    const value = values[1];
    const table = values[2];

    const where = {
      [column]: {
        [Op.like]: `%${value}%`,
      },
    };
    const include = [
      {
        model: Address,
        as: 'addresses',
      },
      {
        model: Language,
        as: 'Languages',
        through: { attributes: [] },
      },
    ];
    let parameters = {};

    switch (table) {
      case 'User':
        parameters = { where, include };
        break;
      case 'Addresses':
        parameters = {
          include: [
            {
              model: Address,
              as: 'addresses',
              where,
            },
            {
              model: Language,
              as: 'Languages',
              through: { attributes: [] },
            },
          ],
        };
        break;
      case 'Language':
        parameters = {
          include: [
            {
              model: Address,
              as: 'addresses',
            },
            {
              model: Language,
              as: 'Languages',
              through: { attributes: [] },
              where,
            },
          ],
        };
        break;
      default:
    }

    const result = await User.findAll(parameters);

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getUserByIdService = async (id) => {
  try {
    return await User.findByPk(id, includes);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteUserService = async (id) => {
  const removeUserTransaction = await sequelize.transaction();
  try {
    await Address.destroy(
      { where: { userId: id } },
      { transaction: removeUserTransaction },
    );

    await User.destroy(
      { where: { id } },
      { transaction: removeUserTransaction },
    );

    await removeUserTransaction.commit();

    return true;
  } catch (error) {
    await removeUserTransaction.rollback();
    console.error(error.message);
    throw new Error();
  }
};

const updateUserService = async (user) => {
  const updateTransaction = await sequelize.transaction();
  try {
    const {
      id, fullname, homePhone, cellPhone, address, Languages,
    } = user;

    await UserLanguage.destroy({ where: { userId: id } });

    const userId = id;
    await createUserLanguage(Languages, userId);

    await User.update(
      { fullname, homePhone, cellPhone },
      { where: { id } },
      { transaction: updateTransaction },
    );

    await Address.update(
      address,
      { where: { id: address.id } },
      { transaction: updateTransaction },
    );

    await updateTransaction.commit();
  } catch (error) {
    await updateTransaction.rollback();
    console.error(error.message);
  }
};

module.exports = {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  deleteUserService,
  updateUserService,
  getUsersByQueryService,
};
