const express = require('express');
const app = express();
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;



app.use('/', require('./routes'))// http://localhost:3000

//only if mongodb is connected do we listen

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

