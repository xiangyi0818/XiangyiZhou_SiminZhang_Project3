const mongoose = require("mongoose");

const Schema = require('mongoose').Schema;
exports.newsSchema = new Schema({
// mongoose automically gives this an _id attribute of ObjectId
// newsId: String,
// newsId:Schema.Types.ObjectId,
title:String,
creationTime: {type:Date,default:Date.now},
newsContent:String,
userId: String,
commentNumber:Number,
// this explicitly declares what collection we're using
}, { collection : 'news',versionKey: false  });

// const News = mongoose.model('news', NewsSchema); 