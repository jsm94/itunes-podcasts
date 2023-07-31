import { useState } from "react";
import { PodcastService } from "../../modules/podcasts/application/PodcastService";
import { Podcast } from "../../modules/podcasts/domain/Podcast";
import { ApiPodcastService } from "../../modules/podcasts/infra/ApiPodcastService";
import { useLocalStorage } from "../localStorage/useLocalStorage";

const KEY_PODCASTS = "podcasts";

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const { setItem, getItem } = useLocalStorage<Podcast[]>();

  const getPodcasts = async () => {
    const cachedPodcasts = getItem(KEY_PODCASTS);
    if (cachedPodcasts) {
      setPodcasts(cachedPodcasts);
      return;
    }
    const podcastApi = new PodcastService(new ApiPodcastService());
    const response = await podcastApi.getMostPopularPodcasts(100);
    setItem(KEY_PODCASTS, response);
    setPodcasts(response);
  };

  return {
    podcasts,
    getPodcasts,
  };
};
