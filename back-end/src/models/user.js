const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: DataTypes.STRING(120),
    homePhone: DataTypes.STRING,
    cellPhone: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasOne(models.Address,
      { foreignKey: 'userId', as: 'addresses' });
  };

  return User;
};

module.exports = defineUserModel;
