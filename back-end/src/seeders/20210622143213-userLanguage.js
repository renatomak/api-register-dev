module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('UserLanguages',
    [
      { userId: 1, languageId: 1 },
      { userId: 1, languageId: 3 },
      { userId: 2, languageId: 1 },
      { userId: 2, languageId: 2 },
      { userId: 3, languageId: 4 },
      { userId: 3, languageId: 5 },
      { userId: 3, languageId: 3 },
    ],
    {}),

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('UserLanguages', null, {});
  },
};
