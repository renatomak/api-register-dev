const AddressModel = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    complement: DataTypes.STRING,
    cep: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' });
  };

  return Address;
};

module.exports = AddressModel;
