import Joi from "joi"

const clientJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  address: Joi.object(),
  birthDate: Joi.date(),
  tags: Joi.any(),
  active: Joi.boolean(),
  score: Joi.number(),
  preferences: Joi.object(),
  lastLogin: Joi.date(),
  notes: Joi.any(),
})

export { clientJoiSchema }
