import Joi from "joi";
import { EItemTypes } from "../../models/Items.js";

export const addShopSchema = Joi.object({
  name: Joi.string().required().max(50),
  description: Joi.string().required().max(500),
  image: Joi.string().required().max(350),
  lat: Joi.number().required().max(90).min(-90),
  long: Joi.number().required().max(180).min(-180),
  city: Joi.string().required().max(50),
  state: Joi.string().required().max(50),
});

export const addItemSchema = Joi.object({
  shopId: Joi.string().required(),
  name: Joi.string().required().max(20),
  description: Joi.string().required().max(500),
  image: Joi.string().required().max(350),
  price: Joi.number().required().min(0),
  type: Joi.valid(...Object.values(EItemTypes)).required(),
});

export const addReviewSchema = Joi.object({
  shopId: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
});
