import { Request, Response } from 'express';
import podcastsService from '../services/podcasts.service';

const listPodcastsByUser = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const podcasts = await podcastsService.listPodcastsByUser(Number(userId));
    res.status(200).send(podcasts);
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
  listPodcastsByUser,
};