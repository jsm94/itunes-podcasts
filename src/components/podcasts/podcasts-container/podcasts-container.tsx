import { useEffect, useRef, useState } from "react";

import { Podcast } from "../../../modules/podcasts/domain/Podcast";

import {
  LoadingActionTypes,
  useLoadingDispatch,
} from "../../../context/loading-context";

import { useDebounceCallback } from "../../../hooks/debounce/useDebounceCallback";
import { usePodcasts } from "../../../hooks/podcasts/usePodcasts";

import { filterPodcasts } from "../../../utils/filters";

import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";

import { PodcastCardSkeleton } from "../podcast-card";
import { PodcastCardLink } from "../podcast-card-link/podcast-card-link";

import "./podcast-container.css";

export const PodcastsContainer = () => {
  const [filter, setFilter] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState<
    Podcast[] | undefined
  >([]);

  const podcastsRef = useRef<Podcast[] | undefined>([]);

  const { getPodcasts } = usePodcasts();
  const dispatch = useLoadingDispatch();

  const loadData = async () => {
    dispatch({ type: LoadingActionTypes.PUSH });
    const podcasts = await getPodcasts();
    podcastsRef.current = podcasts;
    setFilteredPodcasts(podcasts);
    dispatch({ type: LoadingActionTypes.POP });
  };

  const debouncedFilter = useDebounceCallback(() => {
    setFilteredPodcasts(filterPodcasts(podcastsRef.current!, filter));
  }, 500);

  const noResults = filteredPodcasts?.length === 0;
  const isLoading = noResults && !filter;

  useEffect(() => {
    loadData();
  }, []);

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
        {isLoading && <PodcastsContainerSkeletons />}
        {noResults && filter && <IsNotResults filter={filter} />}
      </div>
    </div>
  );
};

const IsNotResults = ({ filter }: { filter: string }) => (
  <p>
    No podcasts found for filter: <b>{filter}</b>
  </p>
);

const PodcastsContainerSkeletons = () => (
  <>
    <PodcastCardSkeleton />
    <PodcastCardSkeleton />
    <PodcastCardSkeleton />
    <PodcastCardSkeleton />
  </>
);
