import { IPodcast } from '../../src/interfaces/podcast.interface';
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
    const userId = 1;

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

    expect(await podcastsService.getPodcastById(userId, podcastId)).toEqual(podcast);
  });

  it('should throw exception when podcast not found', async () => {
    const podcastId = 1;
    const userId = 1;

    jest.spyOn(podcastsRepository, 'getById').mockReturnValueOnce(Promise.resolve(null) as any);

    try {
      await podcastsService.getPodcastById(userId, podcastId);
    } catch (error: any) {
      expect(error.statusCode).toEqual(404);
      expect(error.message).toEqual('Podcast not found');
    }
  });

  it('should throw exception when podcast is not linked to user', async () => {
    const podcastId = 1;
    const userId = 1;

    const podcast = {
      id: 1,
      title: 'test',
      description: 'test',
      publishedAt: new Date(),
      fileUrl: 'http://test.com/test.mp3',
      duration: 4237,
      userId: 2,
    };

    jest.spyOn(podcastsRepository, 'getById').mockReturnValueOnce(Promise.resolve(podcast) as any);

    try {
      await podcastsService.getPodcastById(userId, podcastId);
    } catch (error: any) {
      expect(error.statusCode).toEqual(403);
      expect(error.message).toEqual('This podcast is not linked to your account');
    }
  });

  it('should add podcast', async () => {
    const userId = 1;
    const dateNow = new Date();
    const podcast: IPodcast = {
      title: 'test',
      description: 'test',
      publishedAt: dateNow,
      fileUrl: 'http://test.com/test.mp3',
      duration: 4237,
    };

    const newPodcast = {
      id: 1,
      title: 'test',
      description: 'test',
      publishedAt: dateNow,
      fileUrl: 'http://test.com/test.mp3',
      duration: 4237,
      userId,
    };

    jest.spyOn(podcastsRepository, 'add').mockReturnValueOnce(Promise.resolve(newPodcast) as any);

    expect(await podcastsService.addPodcast(userId, podcast)).toEqual(newPodcast);
  });

  it('should update podcast', async () => {
    const userId = 1;
    const podcastId = 1;

    const newPodcastInfo: Partial<IPodcast> = {
      title: 'test2',
      description: 'test',
      publishedAt: new Date(),
      fileUrl: 'http://test.com/test.mp3',
      duration: 4237,
    };

    jest.spyOn(podcastsRepository, 'updateById').mockReturnValueOnce(Promise.resolve([1]) as any);

    expect(await podcastsService.updatePodcastById(userId, podcastId, newPodcastInfo)).toEqual(1);
  });

  it('should throw exception when podcast not found on edit', async () => {
    const userId = 1;
    const podcastId = 1;

    const newPodcastInfo: Partial<IPodcast> = {
      title: 'test2',
      description: 'test',
      publishedAt: new Date(),
      fileUrl: 'http://test.com/test.mp3',
      duration: 4237,
    };

    jest.spyOn(podcastsRepository, 'updateById').mockReturnValueOnce(Promise.resolve([0]) as any);

    try {
      await podcastsService.updatePodcastById(userId, podcastId, newPodcastInfo);
    } catch (error: any) {
      expect(error.statusCode).toEqual(404);
      expect(error.message).toEqual('Podcast not found');
    }
  });

  it('should delete podcast', async () => {
    const podcastId = 1;
    const userId = 1;

    jest.spyOn(podcastsRepository, 'deleteById').mockReturnValueOnce(Promise.resolve(1) as any);

    expect(await podcastsService.deletePodcastById(userId, podcastId)).toEqual(1);
  });

  it('should throw exception when podcast not found on delete', async () => {
    const podcastId = 1;
    const userId = 1;

    jest.spyOn(podcastsRepository, 'deleteById').mockReturnValueOnce(Promise.resolve(0) as any);

    try {
      await podcastsService.deletePodcastById(userId, podcastId);
    } catch (error: any) {
      expect(error.statusCode).toEqual(404);
      expect(error.message).toEqual('Podcast not found');
    }
  });
});
