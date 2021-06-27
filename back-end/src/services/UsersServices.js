const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/config');
const {
  User,
  Address,
  Language,
  UserLanguage,
} = require('../models');

const include = {
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
  try {
    languages.map(async ({ id: languageId }) => UserLanguage.create({ languageId, userId }));
  } catch (error) {
    const message = 'ERRO ao tentar cadastrar novas linguagens - metódo: createUserLanguage'+error.message;
    throw new Error(message);
  }
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
    const message = 'ERRO ao tentar cadastrar novo Desenvolvedor - metódo: createUserService.' + error.message;
    throw new Error(message);
  }
};

const getAllUsersService = async () => {
  try {
    return await User.findAll(include);
  } catch (error) {
    console.error( error.message);
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
    let parameters = {};

    switch (table) {
      case 'User':
        parameters = { where, include };
        break;
      case 'Addresses':
        include[0] = {...include[0], where}
        parameters = { include }
        break;
      case 'Language':
        include[1] = {...include[1], where}
        parameters = { include }
        break;
      default:
    }
    const result = await User.findAll(parameters);
    return result;
  } catch (error) {
    const message = 'ERROR ao tentar buscar os Desenvolverdor cadastrado - metódo: getUsersByQueryService.' + error.message;
    throw new Error(message);
  }
};

const getUserByIdService = async (id) => {
  try {
    return await User.findByPk(id, includes);
  } catch (error) {
    const message = 'ERROR ao tentar localizar o Desenvolvedor por ID  - metódo: getUserByIdService.'+ error.message;
    throw new Error(message);
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
    const message = 'ERROR ao tentar excluir o Desenvolvedor - metódo: deleteUserService.'+ error.message;
    throw new Error(message);
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
    const message = 'ERROR ao tentar atualizar os dados do Desenvolvedor - metódo: updateUserService.'+ error.message;
    throw new Error(message);
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
