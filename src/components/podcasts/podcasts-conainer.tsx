import { useEffect, useState } from "react";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { PodcastCard } from "./podcast-card";

import { useDebounceCallback } from "../../hooks/debounce/useDebounceCallback";
import { Podcast } from "../../modules/podcasts/domain/Podcast";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import "./podcast-container.css";

export const PodcastsContainer = () => {
  const { podcasts, getPodcasts } = usePodcasts();
  const [filter, setFilter] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  const _filterPodcasts = (podcastsToFilter: Podcast[]) => {
    return podcastsToFilter.filter(
      (podcast) =>
        podcast.title
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase()) ||
        podcast.author.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  };

  const debouncedFilter = useDebounceCallback(() => {
    setFilteredPodcasts(_filterPodcasts(podcasts));
  }, 500);

  useEffect(() => {
    getPodcasts();
  }, []);

  useEffect(() => {
    debouncedFilter();
  }, [podcasts]);

  useEffect(() => {
    debouncedFilter();
  }, [filter]);

  return (
    <div className="podcasts-container">
      <div className="podcasts-container__filter">
        <Badge>{filteredPodcasts?.length ?? 0}</Badge>
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
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};
