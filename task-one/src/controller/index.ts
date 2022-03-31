import { Request, Response, NextFunction } from 'express';

export function indexController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(`
    <h1> Clinton Otse Express API </h1>
    <p> Use '/api' to navigate database </p>
  `);
}
