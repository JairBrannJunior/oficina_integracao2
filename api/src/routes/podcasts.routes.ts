import express from 'express';
import PodcastsController from '../controllers/PodcastsController';
import { authValidator } from '../validations/auth/auth.validator';
import { addPodcastValidator } from '../validations/podcasts/addPodcast.validator';
import { deletePodcastValidator } from '../validations/podcasts/deletePodcast.validator';
import { getPodcastByIdValidator } from '../validations/podcasts/getPodcastById.validator';
import { listPodcastsByUserValidator } from '../validations/podcasts/listPodcastsByUser.validator';
import { updatePodcastValidator } from '../validations/podcasts/updatePodcast.validator';

const router = express.Router();

router.use(authValidator);

router.get('/', listPodcastsByUserValidator, PodcastsController.listPodcastsByUser);
router.get('/:podcastId', getPodcastByIdValidator, PodcastsController.getPodcastById);
router.post('/', addPodcastValidator, PodcastsController.addPodcast);
router.put('/:podcastId', updatePodcastValidator, PodcastsController.updatePodcastById);
router.delete('/:podcastId', deletePodcastValidator, PodcastsController.deletePodcastById);

export default router;
