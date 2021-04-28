const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

const newsAccessor = require('../model/news.model');


router.get('/:id', function (req, res) {
    return newsAccessor.findNewsById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding News:${error}`));
});

// router.get('/news/', function(req, res) {
//     // return all pokemon
//     res.send(myNews)
// });


router.get('/', (req, res) => {
        console.log("get news")
        return newsAccessor.getAllNews()
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding News:${error}`));

});

router.post('/', (req, res) => {
    // NOTE: because we're using Mongoose, it will
    // filter out any data that we DON'T want
    // So we can safely pass it the entire body
    console.log("post news")
    return newsAccessor.insertNews(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding News:${error}`))
});

// router.get('/news/', function(req, res) {
//     // return all pokemon
//     res.send(myNews)
// });

module.exports = router;