import { useEffect, useState } from "react";

import { PodcastService } from "../../modules/podcasts/application/PodcastService";
import { Podcast } from "../../modules/podcasts/domain/Podcast";
import { ApiPodcastService } from "../../modules/podcasts/infra/ApiPodcastService";

import { PodcastCard } from "./podcast-card";

import "./podcast-container.css";

export const PodcastsContainer = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    (async () => {
      const podcastApi = new PodcastService(new ApiPodcastService());
      const response = await podcastApi.getMostPopularPodcasts(100);
      setPodcasts(response);
    })();
  }, []);

  return (
    <div className="podcasts-container">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} onClick={() => {}} />
      ))}
    </div>
  );
};
