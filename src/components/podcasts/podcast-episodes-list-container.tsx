import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  LoadingActionTypes,
  useLoadingDispatch,
} from "../../context/LoadingContext";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { Card } from "../card/card";

import { PodcastEpisodesList } from "./podcast-episodes-list";

export const PodcastEpisodesListContainer = () => {
  const { getEpisodes, episodes } = usePodcasts();
  const { podcastId } = useParams<{ podcastId: string }>();
  const dispatch = useLoadingDispatch();

  useEffect(() => {
    dispatch({ type: LoadingActionTypes.PUSH });
    getEpisodes(podcastId!).finally(() => {
      dispatch({ type: LoadingActionTypes.POP });
    });
  }, []);

  return (
    <>
      {episodes?.length ? (
        <Card>
          <h2 className="podcast-page__episodes-title">
            Episodes: {episodes?.length}
          </h2>
        </Card>
      ) : (
        <div className="podcast-page__episode-title--skeleton skeleton-box" />
      )}
      {episodes?.length ? (
        <Card>
          <PodcastEpisodesList episodes={episodes} />
        </Card>
      ) : (
        <div className="podcast-page__episode-list--skeleton skeleton-box" />
      )}
    </>
  );
};
