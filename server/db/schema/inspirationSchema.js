import Joi from '@hapi/joi';

//inspiration schema
const schema = Joi.object().keys({
  quote: {
    text: Joi.string().required(),
    author: Joi.string().required(),
  },
  image: {
    imageUrl: Joi.string().required(),
    authorName: Joi.string().required(),
    authorLink: Joi.string().required(),
    alt: Joi.string().required(),
  },
});

export default schema;