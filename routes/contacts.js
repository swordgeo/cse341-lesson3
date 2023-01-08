const { Router } = require('express');
const express = require('express');
const routes = express.Router();

//const {getContacts} = require('../controllers/contacts');
//const {getContact} = require('../controllers/contacts');

//routes.get('/', getContacts);
//routes.get('/:id', getContact);

const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getContacts);
// routes.get('/:id', contactsController.getContact);
// routes.post('/', contactsController.addContact);
// routes.patch('/:id', contactsController.updateContact);
// routes.delete('/:id', contactsController.updateContact);

module.exports = routes;

//const {getContacts} = require('../controllers/contacts');

//routes.get('/contacts', getContacts);
//routes.get('/username', userController.getUsername);