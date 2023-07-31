import { useEffect, useState } from "react";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { PodcastCard } from "./podcast-card";

import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import "./podcast-container.css";

export const PodcastsContainer = () => {
  const { podcasts, getPodcasts } = usePodcasts();
  const [filter, setFilter] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  useEffect(() => {
    getPodcasts();
  }, []);

  useEffect(() => {
    setFilteredPodcasts(podcasts);
  }, [podcasts]);

  useEffect(() => {
    setFilteredPodcasts(
      podcasts.filter(
        (podcast) =>
          podcast.title
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase()) ||
          podcast.author
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase()),
      ),
    );
  }, [filter]);

  return (
    <div className="podcasts-container">
      <div className="podcasts-container__filter">
        <Badge>{filteredPodcasts.length}</Badge>
        <Input
          type="text"
          placeholder="Filter podcasts..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(event.target.value)
          }
        />
      </div>
      <div className="podcasts-container__list">
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};
