const Joi = require('@hapi/joi');
const registerValidator = Joi.object({
    username : Joi.string().min(3).max(15).required(),
    password : Joi.string().min(8).max(20).required(),
    email : Joi.string().email().required()
});

const loginValidator = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(8).max(20).required()
});

module.exports = { registerValidator, loginValidator }