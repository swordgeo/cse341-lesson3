const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


//db("cse341-database").collection('contacts')

//using try/catch for troubleshooting
const getContacts = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db("cse341-database").collection('contacts').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }

};

//await mongodb...  .find({_id: userId})
const getContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('contacts').find({_id: userId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};

//await mongodb...  .insertOne(contact)
const addContact = async (req, res, next) => {

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
//might need mongodb.getDB()...
  try {
    const result = await mongodb.getDb().db("cse341-database").collection('contacts').insertOne(contact);
    //201 means new thing created as opposed to general 200 "everything worked"
    res.status(201).json(result);
  } catch (err) {
    //400 means user error - didn't use all values for instance
    res.status(400).json({message: err.message});
  }
}

module.exports = { getContacts, getContact, addContact};