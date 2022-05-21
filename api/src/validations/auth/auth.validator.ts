import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authValidator = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: accessToken } = req.headers;

  if (!accessToken) {
    return res.status(401).json({
      error: {
        statusCode: 401,
        message: 'Token not provided',
      },
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET) as JwtPayload;
    req.userId = decoded['id'];
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        statusCode: 401,
        message: 'Invalid token',
      },
    });
  }
}