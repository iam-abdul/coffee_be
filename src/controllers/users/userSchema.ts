import Joi from "joi";

export const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().optional(),
});
