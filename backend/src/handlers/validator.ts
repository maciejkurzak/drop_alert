import Joi from '@hapi/joi';

const registrationValidator = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required().alphanum(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
  });
  return schema.validate(data);
};

const loginValidator = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export { registrationValidator, loginValidator };
