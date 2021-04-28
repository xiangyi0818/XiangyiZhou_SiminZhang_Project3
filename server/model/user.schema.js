const Mongoose = require('mongoose');

const Schema = require('mongoose').Schema;
exports.userSchema = new Schema({
// mongoose automically gives this an _id attribute of ObjectId
// newsId: String,
userId:Schema.Types.ObjectId,
username:{ type: String, index: true },
password:String,
// this explicitly declares what collection we're using
}, { collection : 'user',versionKey: false  });

// const News = mongoose.model('news', NewsSchema); 