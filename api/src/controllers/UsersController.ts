import { Request, Response } from 'express';
import User from '../models/User';
import usersService from '../services/users.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).send(user);
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
  createUser,
};
