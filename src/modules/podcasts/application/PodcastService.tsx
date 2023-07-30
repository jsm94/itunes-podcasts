import { Podcast } from "../domain/Podcast";
import { PodcastRepository } from "../domain/PodcastRepository";

export class PodcastService {
  constructor(private readonly repository: PodcastRepository) {}

  getMostPopularPodcasts(limit: number): Promise<Podcast[]> {
    return this.repository.getMostPopular(limit);
  }

  getPodcastById(id: string): Promise<Podcast> {
    return this.repository.getById(id);
  }
}
