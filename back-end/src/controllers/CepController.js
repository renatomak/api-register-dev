const rescue = require('express-rescue');
const { consultarCep } = require('correios-brasil');

const {
  STATUS_200_OK,
  STATUS_400_BAD_REQUEST,
} = require('../util');

const consultCep = rescue(async (req, res) => {
  try {
    const { query } = req;
    const {
      cep, logradouro, complemento, bairro, localidade, uf, number,
    } = await consultarCep(query.cep);

    const newResult = {
      cep,
      street: logradouro,
      complement: complemento,
      city: localidade,
      district: bairro,
      state: uf,
      number,
    };

    return res.status(STATUS_200_OK).json(newResult);
  } catch (err) {
    console.error(err.message);
    return res.status(STATUS_400_BAD_REQUEST).json({ message: 'Invalid fields' });
  }
});

module.exports = {
  consultCep,
};
