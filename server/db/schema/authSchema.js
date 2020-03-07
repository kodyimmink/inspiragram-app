import Joi from '@hapi/joi';

//user login schema
const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9]+$)/).min(2).max(30).required(),
    password: Joi.string().min(10).required()
});

export default schema;