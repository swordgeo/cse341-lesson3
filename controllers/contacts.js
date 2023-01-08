const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


//db("cse341-database").collection('contacts')
const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db("cse341-database").collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db("cse341-database").collection('contacts').find({_id: userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

module.exports = { getContacts, getContact};