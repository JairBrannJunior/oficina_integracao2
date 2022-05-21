import { Request, Response } from 'express';
import { IPodcast } from '../interfaces/podcast.interface';
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

const getPodcastById = async (req: Request, res: Response) => {
  const { podcastId } = req.params;
  try {
    const podcast = await podcastsService.getPodcastById(req.userId, Number(podcastId));
    res.status(200).send(podcast);
  } catch (error: any) {
    res.status(error.statusCode).send({
      error: {
        statusCode: error.statusCode,
        message: error.message,
      },
    });
  }
};

const addPodcast = async (req: Request<{}, {}, IPodcast>, res: Response) => {
  try {
    const newPodcast = await podcastsService.addPodcast(req.userId, req.body);
    res.status(201).send(newPodcast);
  } catch (error: any) {
    res.status(error.statusCode).send({
      error: {
        statusCode: error.statusCode,
        message: error.message,
      },
    });
  }
};

const updatePodcastById = async (req: Request, res: Response) => {
  const { podcastId } = req.params;
  try {
    await podcastsService.updatePodcastById(req.userId, Number(podcastId), req.body as Partial<IPodcast>);
    res.status(200).send();
  } catch (error: any) {
    res.status(error.statusCode).send({
      error: {
        statusCode: error.statusCode,
        message: error.message,
      },
    });
  }
};

const deletePodcastById = async (req: Request, res: Response) => {
  const { podcastId } = req.params;
  try {
    await podcastsService.deletePodcastById(req.userId, Number(podcastId));
    res.status(200).send();
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
  getPodcastById,
  addPodcast,
  updatePodcastById,
  deletePodcastById,
};
