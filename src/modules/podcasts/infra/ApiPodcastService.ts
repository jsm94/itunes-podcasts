import { Episode } from "../domain/Episode";
import { Podcast } from "../domain/Podcast";
import { PodcastRepository } from "../domain/PodcastRepository";

import {
  API_ESPISODES_URL,
  API_URL,
  GENRE,
  PROXY_URL,
} from "./constants/api.constants";

import { mapperEpisodesServiceResponseToEpisode } from "./mappers/mapperEpisodesServiceResponseToEpisode";
import { mapperPodcastServiceResponseToPodcast } from "./mappers/mapperPodcastServiceResponseToPodcast";

import { ApiEpisodesServiceResponse } from "./types/ApiEpisodesServiceResponse";
import { ApiPodcastServiceResponse } from "./types/ApiPodcastServiceResponse";

const MIN_LIMIT = 0;
const MAX_LIMIT = 200;

const proxyUrl = PROXY_URL;

const podcastLimit = (limit: number) => {
  if (limit <= MIN_LIMIT || limit > MAX_LIMIT) {
    throw new Error("Limit must be between 1 and 200");
  }
};

export class ApiPodcastService implements PodcastRepository {
  abortController: AbortController;

  constructor(abortController: AbortController) {
    this.abortController = abortController;
  }

  async getMostPopular(limit: number): Promise<Podcast[]> {
    podcastLimit(limit);
    try {
      const response = await fetch(
        API_URL.replace("{limit}", limit.toString()).replace("{genre}", GENRE),
        {
          method: "GET",
          signal: this.abortController.signal,
        },
      );
      const data = (await response.json()) as ApiPodcastServiceResponse;
      return mapperPodcastServiceResponseToPodcast(data);
    } catch (error) {
      throw new Error("Error fetching podcasts");
    }
  }

  async getEpisodes(id: string): Promise<Episode[]> {
    try {
      const response = await fetch(
        `${proxyUrl}${encodeURIComponent(
          API_ESPISODES_URL.replace("{id}", id),
        )}`,
        {
          method: "GET",
          signal: this.abortController.signal,
        },
      );
      const data = (await response.json()) as ApiEpisodesServiceResponse;
      return mapperEpisodesServiceResponseToEpisode(data);
    } catch (error) {
      throw new Error("Error fetching episodes");
    }
  }
}
