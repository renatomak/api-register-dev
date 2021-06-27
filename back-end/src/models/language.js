const defineSpecialtiesModel = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    language: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return Language;
};

module.exports = defineSpecialtiesModel;
