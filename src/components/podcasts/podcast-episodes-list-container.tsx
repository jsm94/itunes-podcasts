import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePodcasts } from "../../hooks/podcasts/usePodcasts";
import { Card } from "../card/card";
import { PodcastEpisodesList } from "./podcast-episodes-list";

export const PodcastEpisodesListContainer = () => {
  const { getEpisodes, episodes } = usePodcasts();
  const { podcastId } = useParams<{ podcastId: string }>();

  useEffect(() => {
    getEpisodes(podcastId!);
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
