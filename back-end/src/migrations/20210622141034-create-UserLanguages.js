module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserLanguages', {
      userId: {
        type: Sequelize.INTEGER,
        field: 'userId',
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      languageId: {
        type: Sequelize.INTEGER,
        field: 'languageId',
        references: {
          model: 'Languages',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UserLanguages');
  },
};
