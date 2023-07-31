import { useState } from "react";
import { PodcastService } from "../../modules/podcasts/application/PodcastService";
import { Podcast } from "../../modules/podcasts/domain/Podcast";
import { ApiPodcastService } from "../../modules/podcasts/infra/ApiPodcastService";

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  const getPodcasts = async () => {
    const podcastApi = new PodcastService(new ApiPodcastService());
    const response = await podcastApi.getMostPopularPodcasts(100);
    setPodcasts(response);
  };

  return {
    podcasts,
    getPodcasts,
  };
};
