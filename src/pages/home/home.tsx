import { useEffect, useState } from "react";
import { PodcastService } from "../../modules/podcasts/application/PodcastService";
import { Podcast } from "../../modules/podcasts/domain/Podcast";
import { ApiPodcastService } from "../../modules/podcasts/infra/ApiPodcastService";

export const Home = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    (async () => {
      const podcastApi = new PodcastService(new ApiPodcastService());
      const response = await podcastApi.getMostPopularPodcasts(100);
      setPodcasts(response);
    })();
  }, []);

  return (
    <>
      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id}>{podcast.title}</li>
        ))}
      </ul>
    </>
  );
};
