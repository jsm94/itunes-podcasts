import { Episode } from "../domain/Episode";
import { Podcast } from "../domain/Podcast";
import { PodcastRepository } from "../domain/PodcastRepository";

import { mapperEpisodesServiceResponseToEpisode } from "./mappers/mapperEpisodesServiceResponseToEpisode";
import { mapperPodcastServiceResponseToPodcast } from "./mappers/mapperPodcastServiceResponseToPodcast";

import { ApiEpisodesServiceResponse } from "./types/ApiEpisodesServiceResponse";
import { ApiPodcastServiceResponse } from "./types/ApiPodcastServiceResponse";

const MIN_LIMIT = 0;
const MAX_LIMIT = 200;

const proxyUrl = "https://api.allorigins.win/raw?url=";

const podcastLimit = (limit: number) => {
  if (limit <= MIN_LIMIT || limit > MAX_LIMIT) {
    throw new Error("Limit must be between 1 and 200");
  }
};

export class ApiPodcastService implements PodcastRepository {
  async getMostPopular(limit: number): Promise<Podcast[]> {
    podcastLimit(limit);
    const response = await fetch(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=1310/json`,
      {
        method: "GET",
      },
    );
    const data = (await response.json()) as ApiPodcastServiceResponse;
    return mapperPodcastServiceResponseToPodcast(data);
  }

  async getEpisodes(id: string): Promise<Episode[]> {
    const response = await fetch(
      `${proxyUrl}https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
      {
        method: "GET",
      },
    );
    const data = (await response.json()) as ApiEpisodesServiceResponse;
    return mapperEpisodesServiceResponseToEpisode(data);
  }
}
