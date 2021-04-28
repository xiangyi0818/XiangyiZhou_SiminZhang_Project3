const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userAccessor = require('../model/user.model');


router.get('/:username', function (req, res) {
    return userAccessor.findUserByUsername(req.params.username)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding News:${error}`));
});

// router.get('/news/', function(req, res) {
//     // return all pokemon
//     res.send(myNews)
// });

router.post('/authenticate', function (req, res) {
    userAccessor.findUserByUsername(req.body.username)
        .then((user) => {
            if (user.password === req.body.password) {
                res.status(200).send(user);
            } else {
                res.status(404).send('Failed to authenticate user!');
            }
        })
});


router.get('/', (req, res) => {
    // if (req.query.username) {
    //    PokemonAccessor.findPokemonByOwner(req.query.username)
    //         .then((response) => res.status(200).send(response),
    //             (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
    // } else {
        console.log("get user")
        return userAccessor.getAllUsers()
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding User:${error}`));

});


router.post('/', (req, res) => {
    // NOTE: because we're using Mongoose, it will
    // filter out any data that we DON'T want
    // So we can safely pass it the entire body
    console.log("post user")
    return userAccessor.findUserByUsername(req.body.username)
        .then((entry) => {
            if (entry) {
                return res.status(403).send("username already exist!")
            }
            return userAccessor.insertUser(req.body)

        })
        .then((entry) => res.status(200).send(entry))
        .catch((error) => res.status(404).send(`Error finding Pokedex Entry:${error}`))
});



module.exports = router;