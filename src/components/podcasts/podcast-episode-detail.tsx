import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Episode } from "../../modules/podcasts/domain/Episode";

import { ROUTES } from "../../constants/app.constants";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { parseTextToHtml } from "../../utils/formatters";

import { Card } from "../card/card";

import {
  LoadingActionTypes,
  useLoadingDispatch,
} from "../../context/loading-context";
import "./podcast-episode-detail.css";

export const PodcastEpisodeDetail = () => {
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);
  const navigate = useNavigate();
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();

  const { getEpisodes } = usePodcasts();
  const dispatch = useLoadingDispatch();

  const loadData = async () => {
    dispatch({ type: LoadingActionTypes.PUSH });
    const episodes = await getEpisodes(podcastId!);
    const episode = episodes?.find(
      (episode) => episode.id === Number(episodeId),
    );
    if (!episode) {
      navigate(ROUTES.NOT_FOUND);
      dispatch({ type: LoadingActionTypes.POP });
      return;
    }
    setEpisode(episode);
    dispatch({ type: LoadingActionTypes.POP });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="podcast-episode-detail">
      {episode ? (
        <Card>
          <h2 className="podcast-episode-detail__title">{episode?.title}</h2>
          <div
            className="podcast-episode-detail__description"
            dangerouslySetInnerHTML={{
              __html: parseTextToHtml(episode?.description),
            }}
          />
          <hr />
          <audio
            className="podcast-episode-detail__audio-controls"
            controls
            src={episode?.audio}
          />
        </Card>
      ) : (
        <div className="podcast-episode-detail__skeleton skeleton-box" />
      )}
    </div>
  );
};
