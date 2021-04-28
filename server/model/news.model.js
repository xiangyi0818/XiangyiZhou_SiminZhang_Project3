const mongoose = require("mongoose")
// Recall how exports work in Node.js?
const newsSchema = require('./news.schema').newsSchema

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const newsModel = mongoose.model("news", newsSchema);

function insertNews(news) {
    return newsModel.create(news);
}

function getAllNews() {
    return newsModel.find().exec();
}
// Note the difference between the find above and below.
// Above, this is finding pretty ALL documents
// Below is finding all the documents that match this
// constraint


// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
function findNewsById(id) {
    return newsModel.findById(id).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertNews,
    getAllNews,
    findNewsById,
};