import authSchema from '../db/schema/authSchema.js';
import jwt from 'jsonwebtoken';

const authValidator = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body);
  } catch (error){
    next(error);
  }
  next();
};

const checkTokenSetUser = (req, res, next) => {
  const token = req.get('authorization');
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) {
        next(error);
      }  
      req.user = user;
      next();
    });
  } else {
    next();
  }
};

export { authValidator, checkTokenSetUser};