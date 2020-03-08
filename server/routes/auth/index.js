import express from 'express';
import bcrypt from 'bcryptjs';
import { users, db } from '../../db/connection.js';
import { signUpValidator } from '../../validation/validators.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Authorization Route'
    })
})

//signup route, validate input
router.post('/signup', signUpValidator, (req, res, next) => {

    //check if already exists
    users.findOne({
        username: req.body.username
    }).then( user => {
        if (user){
            //username already exists
            const error = new Error('Username already exists.')
            res.status(409);
            next(error);
        } else {
            bcrypt.hash(req.body.password, 12).then( hashedPassword => {
                const newUser = {
                    username: req.body.username,
                    password: hashedPassword
                }
                //insert new user in db
                users.insert(newUser).then( insertedUser => {
                    delete insertedUser.password;
                    //maybe return just _id and username explictly?
                    res.json(insertedUser)
                })
            })
        }
    });
})

export { router as authRoute };