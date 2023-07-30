import { Podcast } from "../domain/Podcast";
import { PodcastRepository } from "../domain/PodcastRepository";
import { mapperPodcastServiceResponseToPodcast } from "./mappers/mapperPodcastServiceResponseToPodcast";
import { ApiPodcastServiceResponse } from "./types/ApiPodcastServiceResponse";

export class ApiPodcastService implements PodcastRepository {
  async getMostPopular(limit: number): Promise<Podcast[]> {
    const response = await fetch(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=1310/json`,
      {
        method: "GET",
      },
    );
    const data = (await response.json()) as ApiPodcastServiceResponse;
    return mapperPodcastServiceResponseToPodcast(data);
  }
  async getById(id: string): Promise<Podcast> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
}
