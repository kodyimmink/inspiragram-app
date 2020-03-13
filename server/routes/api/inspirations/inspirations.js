import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import quotes from './quotes.js';
import { inspirations } from '../../../db/connection.js';

dotenv.config();
const router = express.Router();

function buildInspirations(imagesArray){
  const inspirations = [];
  imagesArray.forEach( image => {
    const inspiration = {
      quote: quotes[Math.floor(Math.random() * quotes.length)],
      image: {
        imageUrl: image.urls.regular,
        authorName: image.user.name,
        authorLink: image.user.links.html,
        alt: image.alt_description
      }
    };
    inspirations.push(inspiration);
  });
  return inspirations;
}

//get inspirations
router.get('/', (req, res, next) => {
  //limit size request
  const size = req.query.size;
  try {
    if (size <= 100){
      inspirations.aggregate(
        [ { $sample: { size: 30 } }]
      ).then( randomInspirations => res.json(randomInspirations));
    }
  } catch(error) {
    next(error);
  }
});

//generate inspirations
router.get('/generate', (req, res, next) => {
  axios.get(process.env.API_URL,{
    params: {
      client_id: process.env.CLIENT_ID,
      count: '30',
      query: 'nature'
    }
  })
    .then(response => {
      buildInspirations(response.data).forEach( inspiration => {
        inspirations.insert(inspiration);
      });
    })
    .catch(error => next(error));
});

export { router as inspirationsRoute };