import { PodcastCard } from "./podcast-card";

import { useEffect } from "react";
import { usePodcasts } from "../../hooks/podcasts/usePodcasts";
import "./podcast-container.css";

export const PodcastsContainer = () => {
  const { podcasts, getPodcasts } = usePodcasts();

  useEffect(() => {
    getPodcasts();
  }, []);

  return (
    <div className="podcasts-container">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} onClick={() => {}} />
      ))}
    </div>
  );
};
