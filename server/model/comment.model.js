const mongoose = require("mongoose")
// Recall how exports work in Node.js?
const commentSchema = require('./comment.schema').commentSchema

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const commentModel = mongoose.model("comment", commentSchema);

function insertComment(comment) {
    return commentModel.create(comment);
}

function getAllComments() {
    return commentModel.find().exec();
}
// Note the difference between the find above and below.
// Above, this is finding pretty ALL documents
// Below is finding all the documents that match this
// constraint

function findCommentByNewsId(newsId) {
    return ;
}

// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
function findCommentById(id) {
    return commentModel.findById(id).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertComment,
    getAllComments,
    findCommentById
};