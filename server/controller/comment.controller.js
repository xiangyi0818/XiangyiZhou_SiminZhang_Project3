const express = require('express');
const router = express.Router();

const commentAccessor = require('../model/comment.model');


router.get('/:id', function (req, res) {
    return commentAccessor.findCommentById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding News:${error}`));
});

router.get('/', (req, res) => {
    // if (req.query.username) {
    //    PokemonAccessor.findPokemonByOwner(req.query.username)
    //         .then((response) => res.status(200).send(response),
    //             (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
    // } else {
        console.log("get comment")
        return commentAccessor.getAllComments()
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding Comments:${error}`));

});


router.post('/', (req, res) => {
    // NOTE: because we're using Mongoose, it will
    // filter out any data that we DON'T want
    // So we can safely pass it the entire body
    console.log("post comment")
    return commentAccessor.insertComment(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Comment:${error}`))
});



module.exports = router;