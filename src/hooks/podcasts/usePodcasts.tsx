import { useState } from "react";

import { PodcastService } from "../../modules/podcasts/application/PodcastService";
import { Episode } from "../../modules/podcasts/domain/Episode";
import { Podcast } from "../../modules/podcasts/domain/Podcast";
import { ApiPodcastService } from "../../modules/podcasts/infra/ApiPodcastService";

import { useLocalStorage } from "../localStorage/useLocalStorage";

const KEY_PODCASTS = "podcasts";
const KEY_EPISODES = "episodes";

type Element = Podcast[] | Episode[];

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Element>([]);
  const [episodes, setEpisodes] = useState<Element>([]);
  const { setItem, getItem } = useLocalStorage<
    Element | Map<string, Episode[]>
  >();

  const getPodcasts = async () => {
    const cachedPodcasts = getItem(KEY_PODCASTS) as Podcast[];
    if (cachedPodcasts?.length) {
      setPodcasts(cachedPodcasts);
      return;
    }
    const podcastApi = new PodcastService(new ApiPodcastService());
    const response = await podcastApi.getMostPopularPodcasts(100);
    setItem(KEY_PODCASTS, response);
    setPodcasts(response);
  };

  const getEpisodes = async (podcastId: string) => {
    let cachedEpisodes = new Map<string, Episode[]>(
      getItem(KEY_EPISODES) as Map<string, Episode[]>,
    );

    if (cachedEpisodes.size === 0) {
      cachedEpisodes = new Map<string, Episode[]>();
    }

    if (cachedEpisodes?.has(podcastId)) {
      setEpisodes(cachedEpisodes.get(podcastId) as Episode[]);
      return;
    }

    const podcastApi = new PodcastService(new ApiPodcastService());
    const response = await podcastApi.getEpisodesByPodcastId(podcastId);
    cachedEpisodes?.set(podcastId, response);
    setItem(KEY_EPISODES, cachedEpisodes);
    setEpisodes(response);
  };

  return {
    podcasts,
    episodes,
    getPodcasts,
    getEpisodes,
  };
};
