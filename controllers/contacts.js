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
  //I notice it'll let me have some of these values blank but we'll deal with that in time
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

//await mongodb...  .find({_id: userId})
const delContact = async (req, res, next) => {
  try {
    
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('contacts').deleteOne({_id: userId});

    //result = { "acknowledged" : true, "deletedCount" : 1 }
    if (result.deletedCount > 0) {
      res.status(200).json({message: "Successfully deleted contact."});
    } else {
        //404 means does not exist
        res.status(404).json({message: "Can't find this contact."});
    }
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};


//await mongodb...  .replaceOne({_id: userId}, <new info as const>)
const editContact = async (req, res, next) => {
    //this will over
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    //console.log(contact);

  try {
    
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("cse341-database").collection('contacts').updateOne(
      {_id: userId},
      //this will overwrite EVERYTHING; we can't change one field at a time (yet)
      {$set: {
        "firstName": contact.firstName, 
        "lastName": contact.lastName,
        "email": contact.email,
        "favoriteColor": contact.favoriteColor,
        "birthday": contact.birthday
      }}
    );
    //console.log(result);

    //{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
    //Could add another nest for modifiedCount but to what end?
    if (result.matchedCount > 0) {
      //204 succeeds but doesn't navigate away
      //The relevant circumstance is I can't run json messages from it
      //But I'll leave it anyway or else it won't give me any response at all?!
      res.status(204).json({message: "Successfully updated contact."});
    } else {
        //404 means does not exist
        res.status(404).json({message: "Can't find this contact."});
    }
  } catch (err) {
    //500 means server error, not user error
    res.status(500).json({message: err.message});
  }
};



module.exports = { getContacts, getContact, addContact, delContact, editContact};