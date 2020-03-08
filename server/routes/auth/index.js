import express from 'express';
import bcrypt from 'bcryptjs';
import { users } from '../../db/connection.js';
import { authValidator } from '../../validation/validators.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

//login failed error message
function loginFailedError(res, next) {
  res.status(403);
  const error = new Error('Login failed.');
  next(error);
}

//create jwt and send to frontend
function createTokenSendResponse(user, res, next){
  const payload = {
    _id: user._id,
    username: user.username
  };
  jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' }, (error, token) => {
    if(error){
      loginFailedError(res, next);
    } else {
      res.json({token});
    }
  });
}

//signup route, validate input
router.post('/signup', authValidator, (req, res, next) => {

  //check if already exists
  users.findOne({
    username: req.body.username
  }).then( user => {
    if (user){
      //username already exists
      const error = new Error('Username already exists.');
      res.status(409);
      next(error);
    } else {
      bcrypt.hash(req.body.password, 12).then( hashedPassword => {
        const newUser = {
          username: req.body.username,
          password: hashedPassword
        };
        //insert new user in db
        users.insert(newUser).then( insertedUser => {
          createTokenSendResponse(insertedUser, res, next);
        });
      });
    }
  });
});

//login route, validate input
router.post('/login', authValidator, (req, res, next) => {
    
  //check if user is in db
  users.findOne({
    username: req.body.username
  }).then( user => {
    //username is valid
    if (user) {
      bcrypt.compare(req.body.password, user.password).then( result => {
        if (result){
          //create jwt
          createTokenSendResponse(user, res, next);
        } else {
          loginFailedError(res, next);
        }
      });
    } else {
      loginFailedError(res, next);
    }
  });
});

export { router as authRoute };