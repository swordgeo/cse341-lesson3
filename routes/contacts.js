const express = require('express');
const routes = express.Router();

const {getContacts} = require('../controllers/contacts');
const {getContact} = require('../controllers/contacts');


routes.get('/', getContacts);

routes.get('/:id', getContact);

module.exports = routes;

//const {getContacts} = require('../controllers/contacts');

//routes.get('/contacts', getContacts);
//routes.get('/username', userController.getUsername);