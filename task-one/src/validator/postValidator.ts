import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  organization: Joi.string().required(),
  products: Joi.array().items(Joi.string()).required(),
  marketValue: Joi.string().required(),
  address: Joi.string().required(),
  ceo: Joi.string().required(),
  country: Joi.string().required(),
  noOfEmployees: Joi.custom((val) => {
    if (typeof val === 'number') return val;
    throw new Error('must be a number');
  }),
  employees: Joi.array().items(Joi.string()).required(),
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
