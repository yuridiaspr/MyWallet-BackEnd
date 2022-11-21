import joi from "joi";

export const descriptionSchema = joi.object({
  date: joi.string().required(),
  value: joi.number().positive().required(),
  description: joi.string().required(),
  status: joi.string().required(),
  email: joi.string(),
});
