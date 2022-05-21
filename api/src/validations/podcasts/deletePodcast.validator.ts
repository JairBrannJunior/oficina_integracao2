import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  podcastId: Joi.number().required(),
});

export const deletePodcastValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.params, { abortEarly: false, allowUnknown: true, stripUnknown: true });

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
