module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Languages',
    [
      { language: 'JAVA' },
      { language: 'PYTHON' },
      { language: 'JAVASCRIPT' },
      { language: 'GOLANG' },
      { language: 'CSHARP' },
      { language: 'ELIXIR' },
    ],
    {}),

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Languages', null, {});
  },
};
