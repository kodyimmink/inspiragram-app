import express from 'express';
import { likes } from '../../../db/connection.js';

const router = express.Router();

//add 1 like and add userId to likeList
router.post('/likeInspiration', (req, res, next) => {
  const inspirationId = req.body.inspirationId;
  likes.findOneAndUpdate( 
    {inspirationId: inspirationId },
    { 
      $inc: { 
        numOfLikes: 1
      },
      $push: {
        userIds: req.body.userId 
      }
    }
  )
    .then( results => res.json(results))
    .catch( error => next(error));
});

//get likes for each inspiration
router.post('/getLikes', (req, res, next) => {
  console.log(req);
  const inspirationsList = req.body;
  inspirationsList.forEach( element => {
    likes.find( {
      inspirationId: element,
    })
      .then( results => res.json(results))
      .catch( error => next(error));
  });
  console.log(inspirationsList);
});

export { router as likesRoute };