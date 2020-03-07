import authSchema from '../db/schema/authSchema.js';

const signUpValidator = async (req, res, next) => {
    try {
        await authSchema.validateAsync(req.body);
    } catch (error){
        next(error)
    }
    next();
};

export { signUpValidator };