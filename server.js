const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
// const mongoDBEndpoint = 'mongodb://127.0.0.1/collection_name';
// const mongoDBEndpoint = "mongodb+srv://Xiangyi:banana1234@project3.0zkrp.mongodb.net/collection_name?retryWrites=true&w=majority"
const mongoDBEndpoint = process.env.MONGODB_URI||'mongodb://127.0.0.1/collection_name';
// const mongoDBEndpoint = process.env.MONGODB_URI||'mongodb://127.0.0.1/collection_name';

mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

const news = require('./server/controller/news.controller.js');
const comment = require('./server/controller/comment.controller.js');
const user = require('./server/controller/user.controller.js');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');






// This is the default address for MongoDB.
// Make sure MongoDB is running!
// const mongoEndpoint = 'mongodb://127.0.0.1/pokemon_app';
// useNewUrlParser is not required, but the old parser is deprecated

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


// const postRouter = require('./routes/posts');

app.use(express.static(path.join(__dirname, 'build')));
// app.use(cors())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());


// app.use(postRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/news',news);
app.use('/api/comment',comment);
app.use('/api/user',user);


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // res.send("this is a dummy server");
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});