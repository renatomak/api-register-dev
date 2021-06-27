module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: { allowNull: false, type: Sequelize.STRING(120) },
      homePhone: { type: Sequelize.STRING },
      cellPhone: { allowNull: false, type: Sequelize.STRING },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
