import podcastsRepository from '../../src/repositories/podcasts.repository';
import podcastsService from '../../src/services/podcasts.service';

describe('PodcastsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list podcasts by user', async () => {
    const userId = 1;

    const podcasts = [
      {
        id: 1,
        title: 'test',
        description: 'test',
        publishedAt: new Date(),
        fileUrl: 'http://test.com/test.mp3',
        duration: 4237,
        userId,
      },
      {
        id: 1,
        title: 'test2',
        description: 'test2',
        publishedAt: new Date(),
        fileUrl: 'http://test2.com/test2.mp3',
        duration: 3981,
        userId,
      },
    ];

    jest.spyOn(podcastsRepository, 'listByUserId').mockReturnValueOnce(Promise.resolve(podcasts) as any);

    expect(await podcastsService.listPodcastsByUser(userId)).toEqual(podcasts);
  });

  it('should return empty array when user has no podcasts', async () => {
    const userId = 1;

    jest.spyOn(podcastsRepository, 'listByUserId').mockReturnValueOnce(Promise.resolve([]) as any);

    expect(await podcastsService.listPodcastsByUser(userId)).toEqual([]);
  });

  it('should get podcast by id', async () => {
    const podcastId = 1;

    const podcast = {
      id: 1,
      title: 'test',
      description: 'test',
      publishedAt: new Date(),
      fileUrl: 'http://test.com/test.mp3',
      duration: 4237,
      userId: 1,
    };

    jest.spyOn(podcastsRepository, 'getById').mockReturnValueOnce(Promise.resolve(podcast) as any);

    expect(await podcastsService.getPodcastById(podcastId)).toEqual(podcast);
  });

  it('should throw exception when podcast not found', async () => {
    const podcastId = 1;

    jest.spyOn(podcastsRepository, 'getById').mockReturnValueOnce(Promise.resolve(null) as any);

    try {
      await podcastsService.getPodcastById(podcastId);
    } catch (error: any) {
      expect(error.statusCode).toEqual(404);
      expect(error.message).toEqual('Podcast not found');
    }
  });
});
