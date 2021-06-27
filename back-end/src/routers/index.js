const express = require('express');
const Controller = require('../controllers');

const router = express.Router();

router.get('/', Controller.search);

router.get('/user',
  Controller.getAllUsers);

router.get('/user/:id',
  Controller.getUserById);

router.post('/user',
  Controller.createUser);

router.put('/user',
  Controller.updateUser);

router.delete('/user/:id',
  Controller.removeUser);

router.get('/cep', Controller.consultCep);

router.get('/languages',
  Controller.getAllLinguages);

module.exports = router;
