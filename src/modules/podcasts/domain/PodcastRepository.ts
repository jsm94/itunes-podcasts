import { Podcast } from "./Podcast";

export interface PodcastRepository {
  getMostPopular(limit: number): Promise<Podcast[]>;
  getById(id: string): Promise<Podcast>;
}
