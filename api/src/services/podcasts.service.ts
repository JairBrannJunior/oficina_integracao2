import podcastsRepository from '../repositories/podcasts.repository';

const listPodcastsByUser = async (userId: number) => {
  const podcasts = await podcastsRepository.listByUserId(userId);
  return podcasts;
};

export default {
  listPodcastsByUser,
};
