const express = require('express');
const app = express();
const news = require('./server/controller/news.controller.js');
const comment = require('./server/controller/comment.controller.js');
const user = require('./server/controller/user.controller.js');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const mongoDBEndpoint = 'mongodb://127.0.0.1/collection_name';

const mongoose = require('mongoose');


// This is the default address for MongoDB.
// Make sure MongoDB is running!
// const mongoEndpoint = 'mongodb://127.0.0.1/pokemon_app';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


// const postRouter = require('./routes/posts');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())
app.use(cookieParser());


// app.use(postRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/news',news);
app.use('/api/comment',comment);
app.use('/api/user',user);


app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.send("this is a dummy server");
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});