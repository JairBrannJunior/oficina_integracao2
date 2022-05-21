import express from 'express';
import PodcastsController from '../controllers/PodcastsController';
import { listPodcastsByUserValidator } from '../validations/podcasts/listPodcastsByUser.validator';

const router = express.Router();

router.get('/', listPodcastsByUserValidator, PodcastsController.listPodcastsByUser);

export default router;