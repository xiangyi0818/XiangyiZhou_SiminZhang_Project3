const mongoose = require("mongoose")
// Recall how exports work in Node.js?
const userSchema = require('./user.schema').userSchema

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const userModel = mongoose.model("user", userSchema);

function insertUser(username,password) {
    return userModel.create(username,password);
}

function getAllUsers() {
    return userModel.find().exec();
}
// Note the difference between the find above and below.
// Above, this is finding pretty ALL documents
// Below is finding all the documents that match this
// constraint


// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
function findUserByUsername(username) {
    return userModel.findOne({username:username}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertUser,
    getAllUsers,
    findUserByUsername,
};