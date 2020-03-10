import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import quotes from './quotes.js';

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

router.get('/', (req, res, next) => {
  axios.get(process.env.API_URL,{
    params: {
      client_id: process.env.CLIENT_ID,
      count: '30',
      query: 'nature'
    }
  })
    .then(response => {
      res.json(buildInspirations(response.data));
    }).catch(error => next(error));
});

export { router as inspirationsRoute };