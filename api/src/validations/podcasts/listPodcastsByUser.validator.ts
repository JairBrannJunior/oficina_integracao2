import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const listPodcastsByUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
  });

  const { error } = schema.validate(req.query, { abortEarly: false, allowUnknown: true, stripUnknown: true });

  if (error) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: 'Validation failed',
        details: error.details,
      },
    });
  }

  return next();
};
