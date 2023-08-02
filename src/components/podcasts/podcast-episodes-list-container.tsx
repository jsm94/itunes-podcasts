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
    getEpisodes(podcastId!).then(() => {
      dispatch({ type: LoadingActionTypes.POP });
    });
  }, []);

  return (
    <>
      <Card>
        <h2 className="podcast-page__episodes-title">
          Episodes: {episodes?.length}
        </h2>
      </Card>
      <Card>
        <PodcastEpisodesList episodes={episodes} />
      </Card>
    </>
  );
};
