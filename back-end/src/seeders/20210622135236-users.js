module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users',
    [
      {
        fullname: 'Renato Marques',
        homePhone: '62999999999',
        cellPhone: '62989898989',
      },
      {
        fullname: 'Monica',
        homePhone: '62888888888',
        cellPhone: '62989898989',
      },
      {
        fullname: 'Ines',
        homePhone: '62977777777',
        cellPhone: '62989898989',
      },
      {
        fullname: 'Marcia',
        homePhone: '62966666666',
        cellPhone: '62989898989',
      },
    ]),

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
