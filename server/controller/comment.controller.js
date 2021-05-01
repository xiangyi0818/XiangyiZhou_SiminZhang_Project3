const express = require('express');
const router = express.Router();
const authParser = require('./auth.helper');


const commentAccessor = require('../model/comment.model');


// router.get('/:id', function (req, res) {
//     return commentAccessor.findCommentById(req.params.id)
//         .then((response) => res.status(200).send(response),
//             (error) =>  res.status(404).send(`Error finding News:${error}`));
// });

router.get('/', (req, res) => {
    // console.log("id",req.query.newsId)
    if (req.query.newsId !== undefined) {
       return commentAccessor.findCommentByNewsId(req.query.newsId)
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding News:${error}`));
    } else {
        // console.log("get comment")
        return commentAccessor.getAllComments()
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding Comments:${error}`));
    }

});


router.post('/', authParser,(req, res) => {
    // NOTE: because we're using Mongoose, it will
    // filter out any data that we DON'T want
    // So we can safely pass it the entire body
    const newComment = req.body
    newComment.username = req.username;
    console.log("post comment",newComment)
    return commentAccessor.insertComment(newComment)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Comment:${error}`))
});


router.put('/:commentId', authParser,(req, res) => {
    const newComment = req.body;
    console.log("put request", req.params.commentId, newComment)
    return commentAccessor.putCommentByCommentId(req.params.commentId, newComment)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Comment:${error}`))
});

router.delete('/:id',authParser, (req, res)=>{
    // console.log("get delete request")
    return commentAccessor.deletelCommentById(req.params.id)
        .then((response) => res.status(200).send(response),
        (error) => res.status(404).send(`Error finding News:${error}`))
})

router.delete('/',authParser, (req, res)=>{
    // console.log("get delete request")
    if (req.query.newsId !== undefined) {

        return commentAccessor.deletelCommentByNewsId(req.query.newsId)
             .then((response) => res.status(200).send(response),
                 (error) =>  res.status(404).send(`Error finding News:${error}`));
     }
})

module.exports = router;