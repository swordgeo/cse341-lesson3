const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};





// const {MongoClient} = require('mongodb');

// async function main() {

//   const uri = "mongodb+srv://swordgeo:ogisdumb@cluster0.e61pr3o.mongodb.net/test?retryWrites=true&w=majority";
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     //toss any further functions in here
//     await listDatabases(client);
//   } catch(e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }

// }

// main().catch(console.error);

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => {
//     console.log(`- ${db.name}`);
//   })
// }

