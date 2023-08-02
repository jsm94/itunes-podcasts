import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";
import { Episode } from "../../modules/podcasts/domain/Episode";

import { Card } from "../card/card";

import { parseTextToHtml } from "../../utils/formatters";

import "./podcast-episode-detail.css";

export const PodcastEpisodeDetail = () => {
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const { episodes, getEpisodes } = usePodcasts();

  useEffect(() => {
    getEpisodes(podcastId!);
  }, []);

  useEffect(() => {
    const episode = episodes.find(
      (episode) => episode.id === Number(episodeId),
    );
    setEpisode(episode);
  }, [episodes]);

  return (
    <div className="podcast-episode-detail">
      {episode ? (
        <Card>
          <h2>{episode?.title}</h2>
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
