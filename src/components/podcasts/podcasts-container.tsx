import { useEffect, useState } from "react";

import { Podcast } from "../../modules/podcasts/domain/Podcast";

import {
  LoadingActionTypes,
  useLoadingDispatch,
} from "../../context/loading-context";

import { useDebounceCallback } from "../../hooks/debounce/useDebounceCallback";
import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

import { PodcastCardSkeleton } from "./podcast-card";
import { PodcastCardLink } from "./podcast-card-link";

import "./podcast-container.css";

export const PodcastsContainer = () => {
  const [podcasts, setPodcasts] = useState<Podcast[] | undefined>([]);
  const [filter, setFilter] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  const { getPodcasts } = usePodcasts();
  const dispatch = useLoadingDispatch();

  const _filterPodcasts = (podcastsToFilter: Podcast[]) => {
    return podcastsToFilter.filter(
      (podcast) =>
        podcast.title
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase()) ||
        podcast.author.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  };

  const loadData = async () => {
    dispatch({ type: LoadingActionTypes.PUSH });
    const podcasts = await getPodcasts();
    setPodcasts(podcasts);
    dispatch({ type: LoadingActionTypes.POP });
  };

  const debouncedFilter = useDebounceCallback(() => {
    setFilteredPodcasts(_filterPodcasts(podcasts!));
  }, 500);

  useEffect(() => {
    loadData();
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
        {filteredPodcasts?.map((podcast) => (
          <PodcastCardLink key={podcast.id} podcast={podcast} />
        ))}
        {filteredPodcasts?.length === 0 && !filter && (
          <PodcastsContainerSkeletons />
        )}
        {filteredPodcasts?.length === 0 && filter && (
          <p>
            No podcasts found for filter: <b>{filter}</b>
          </p>
        )}
      </div>
    </div>
  );
};

const PodcastsContainerSkeletons = () => (
  <>
    <PodcastCardSkeleton />
    <PodcastCardSkeleton />
    <PodcastCardSkeleton />
    <PodcastCardSkeleton />
  </>
);
