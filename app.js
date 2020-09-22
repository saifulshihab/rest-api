const express = require('express');
require('dotenv/config');
const postRouter = require('./routes/Posts');
const bosyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connect to MongoDB
const connectDB = mongoose.connect(process.env.DB_URL);
connectDB.then(() => {
  console.log('*********** Connected to MongoDB Server!! ***********');
});

//Middleware
app.use(bodyParser.json());
app.use('/posts', postRouter);

//Routes

//Express Home
app.use((req, res, next) => {
  res.status = 200;
  res.send('<h1>Express Home!!</h1>');
});

//Starting Server
app.listen(4000, '127.0.0.1', () => {
  console.log(
    '\n<=======- Server is running at http://127.0.0.1:4000 -=======>\n'
  );
});
