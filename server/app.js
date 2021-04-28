require('dotenv').config();
const paperRoutes =require('./routes/pastpapers')
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();

const ports = process.env.PORT || 3000;



mongoose.connect('mongodb://localhost/Tododb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(ports, console.log(`Server is running on port ${ports}`));
  })
  .catch((err) => console.log(`Could not connect to database server`, err));

app.use(bodyParser.json());
app.use(cors());




app.use('/pastpapers', express.static(path.join('pastpapers')));

  app.use('/api/pastpapers', paperRoutes);