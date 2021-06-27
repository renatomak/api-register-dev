module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Addresses',
    [
      {
        state: 'Goiás',
        city: 'Goiânia',
        district: 'Centro',
        street: 'Av. Goiás',
        number: '801',
        complement: '',
        cep: '740000-000',
        userId: 1,
      },
      {
        state: 'Goiás',
        city: 'Aparecida',
        district: 'Centro',
        street: 'Av. aparecida',
        number: '8',
        complement: '',
        cep: '740000-000',
        userId: 2,
      },
      {
        state: 'Goiás',
        city: 'Trindade',
        district: 'Centro',
        street: 'Av. princiapl',
        number: '100',
        complement: '',
        cep: '740000-000',
        userId: 3,
      },
      {
        state: 'Goiás',
        city: 'Goiânira',
        district: 'Alto do Vale',
        street: 'Rua 5',
        number: '200',
        complement: '',
        cep: '740000-000',
        userId: 4,
      },
    ]),

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Addresses', null, {});
  },
};
