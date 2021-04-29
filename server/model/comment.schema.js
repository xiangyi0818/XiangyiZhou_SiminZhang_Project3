const Mongoose = require('mongoose');

const Schema = require('mongoose').Schema;
exports.commentSchema = new Schema({
// mongoose automically gives this an _id attribute of ObjectId
// newsId: String,
// commentId:String,
username:String,
newsId:String,
content:String,
creationTime: {type:Date,default:Date.now},

// this explicitly declares what collection we're using
}, { collection : 'comment',versionKey: false  });

// const News = mongoose.model('news', NewsSchema); 