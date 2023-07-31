import { useEffect, useState } from "react";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { PodcastCard } from "./podcast-card";

import { Input } from "../ui/input";
import "./podcast-container.css";

export const PodcastsContainer = () => {
  const { podcasts, getPodcasts } = usePodcasts();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPodcasts();
  }, []);

  return (
    <div className="podcasts-container">
      <div className="podcasts-container__filter">
        <Input
          type="text"
          placeholder="Filter podcasts..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(event.target.value)
          }
        />
      </div>
      <div className="podcasts-container__list">
        {podcasts
          .filter(
            (podcast) =>
              podcast.title
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase()) ||
              podcast.author
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase()),
          )
          .map((podcast) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              onClick={() => {}}
            />
          ))}
      </div>
    </div>
  );
};
