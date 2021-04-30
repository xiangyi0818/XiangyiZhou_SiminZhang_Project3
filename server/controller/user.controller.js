const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authParser = require('./auth.helper');

const userAccessor = require('../model/user.model');
const { useParams } = require('react-router');

// router.get('/:username', function (req, res) {
//     return userAccessor.findUserByUsername(req.params.username)
//         .then((response) => res.status(200).send(response),
//             (error) =>  res.status(404).send(`Error finding News:${error}`));
// });

// router.get('/news/', function(req, res) {
//     // return all pokemon
//     res.send(myNews)
// });
//get username
router.post('/username', authParser, (req,res) => {
    // console.log("log out")
    console.log(req.username)
    res.send(req.username)
})

//login
router.post('/authenticate', function (req, res) {
    const {username, password} = req.body;
    // console.log(req.body.username)
    // console.log("login user")
    userAccessor.findUserByUsername(username)
        .then((user) => {
            user.comparePassword(password, (error, match) => {
                if (match) {
                    const payload = {username};
                    // JWT is encrypting our payload (which is whatever data we want
                    // to carry across sessions: in this case, just the username)
                    // into the cookie based on our SECRET
                    // console.log(process.env.SUPER_SECRET)
                    const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                        expiresIn: '14d' // optional cookie expiration date
                    });
                    // console.log("login token")
                    // console.log(token);
                    // Here we are setting the cookie on our response obect.  
                    // Note that we are returning the username, but that isn't as necessary anymore
                    // unless we want to reference that on the frontend
                    res.cookie('token', token, {httpOnly: true})
                    console.log("log in", token);
                    return res.status(200).send({username});
                }
                // console.log(response)
                return res.status(400).send("The password does not match");
            });
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
        console.log("status",res.status)

    });

router.get('/', (req, res) => {
    // if (req.query.username) {
    //    PokemonAccessor.findPokemonByOwner(req.query.username)
    //         .then((response) => res.status(200).send(response),
    //             (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
    // } else {
        // console.log("get user")
        return userAccessor.getAllUsers()
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding User:${error}`));

});

//sign up
router.post('/', (req, res) => {
    // NOTE: because we're using Mongoose, it will
    // filter out any data that we DON'T want
    // So we can safely pass it the entire body
    // console.log("post user")
    return userAccessor.findUserByUsername(req.body.username)
        .then((entry) => {
            if (entry) {
                return res.status(403).send("username already exist!")
            }
            userAccessor.insertUser(req.body)
            // console.log("sign up1")
            const username = req.body.username;
            const payload = {username};
            // JWT is encrypting our payload (which is whatever data we want
            // to carry across sessions: in this case, just the username)
            // into the cookie based on our SECRET
            // console.log(process.env.SUPER_SECRET)
            // console.log("sign up2")
            const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                expiresIn: '14d' // optional cookie expiration date
            });
            // console.log("login token")
            // console.log(token);
            // Here we are setting the cookie on our response obect.  
            // Note that we are returning the username, but that isn't as necessary anymore
            // unless we want to reference that on the frontend
            // console.log("sign up3")
            res.cookie('token', token, {httpOnly: true})
            // console.log("sign up 4",token)
            // console.log("sign up", token)
            // console.log("sign up", username)
            return res.status(200).send({username});

        })
        .then((entry) => res.status(200).send(entry))
        .catch((error) => res.status(404).send(`Error finding Pokedex Entry:${error}`))
});

router.post('/logout',(req,res) => {
    // console.log("log out")
    // console.log("token before logout", req.cookies.token);
    res.clearCookie("token");
    // console.log("token after logout", req.cookies.token);
    res.sendStatus(200);

})



module.exports = router;