import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string(),
  members: Joi.string(),
  publishedAt: Joi.date(),
  thumbnail: Joi.string(),
  description: Joi.string(),
  fileUrl: Joi.string(),
  duration: Joi.number(),
});

export const updatePodcastValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown: true });

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
