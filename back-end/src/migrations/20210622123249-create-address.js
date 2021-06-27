module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      state: { allowNull: false, type: Sequelize.STRING },
      city: { allowNull: false, type: Sequelize.STRING },
      district: { type: Sequelize.STRING },
      street: { type: Sequelize.STRING },
      number: { type: Sequelize.INTEGER },
      complement: { type: Sequelize.STRING },
      cep: { allowNull: false, type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'userId',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Addresses');
  },
};
