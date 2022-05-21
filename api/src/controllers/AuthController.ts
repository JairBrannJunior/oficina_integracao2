import { Request, Response } from 'express';
import { LoginBody } from '../interfaces/login.interface';
import authService from '../services/auth.service';

const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const user = await authService.login(req.body);
    res.set('x-access-token', user.token)
    res.status(200).send(user);
  } catch (error: any) {
    res.status(error.statusCode).send({
      error: {
        statusCode: error.statusCode,
        message: error.message,
      },
    });
  }
};

export default {
  login,
};
