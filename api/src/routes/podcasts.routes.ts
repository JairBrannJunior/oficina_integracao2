import express from 'express';
import PodcastsController from '../controllers/PodcastsController';
import { authValidator } from '../validations/auth/auth.validator';
import { getPodcastByIdValidator } from '../validations/podcasts/getPodcastById.validator';
import { listPodcastsByUserValidator } from '../validations/podcasts/listPodcastsByUser.validator';

const router = express.Router();

router.use(authValidator);

router.get('/', listPodcastsByUserValidator, PodcastsController.listPodcastsByUser);
router.get('/:podcastId', getPodcastByIdValidator, PodcastsController.getPodcastById);

export default router;