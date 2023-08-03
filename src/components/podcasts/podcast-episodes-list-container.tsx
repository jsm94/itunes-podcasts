import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Episode } from "../../modules/podcasts/domain/Episode";

import {
  LoadingActionTypes,
  useLoadingDispatch,
} from "../../context/LoadingContext";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { Card } from "../card/card";

import { PodcastEpisodesList } from "./podcast-episodes-list";

export const PodcastEpisodesListContainer = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const [episodes, setEpisodes] = useState<Episode[] | undefined>(undefined);

  const { getEpisodes } = usePodcasts();
  const dispatch = useLoadingDispatch();

  const loadData = async () => {
    dispatch({ type: LoadingActionTypes.PUSH });
    const episodes = await getEpisodes(podcastId!);
    setEpisodes(episodes);
    dispatch({ type: LoadingActionTypes.POP });
  };

  useEffect(() => {
    loadData();
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
