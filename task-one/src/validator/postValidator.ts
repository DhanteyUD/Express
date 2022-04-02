import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  organization: Joi.string().required(),
  products: Joi.array().items(Joi.string()),
  marketValue: Joi.string(),
  address: Joi.string().required(),
  ceo: Joi.string(),
  country: Joi.string().required(),
  employees: Joi.array().items(Joi.string()),
});

export const postValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  schema
    .validateAsync(req.body, { abortEarly: false })

    .then(() => next())

    .catch((err) => {
      res.status(403).end(err.message);
    });
};
