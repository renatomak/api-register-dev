module.exports = (sequelize) => {
  const UserLanguage = sequelize.define('UserLanguage',
    {},
    { timestamps: false });

  UserLanguage.associate = (models) => {
    models.Language.belongsToMany(models.User, {
      as: 'users',
      through: UserLanguage,
      foreignKey: 'languageId',
      otherKey: 'userId',
    });
    models.User.belongsToMany(models.Language, {
      as: 'Languages',
      through: UserLanguage,
      foreignKey: 'userId',
      otherKey: 'languageId',
    });
  };

  return UserLanguage;
};
