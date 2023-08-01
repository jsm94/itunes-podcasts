import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePodcasts } from "../../hooks/podcasts/usePodcasts";
import { Podcast } from "../../modules/podcasts/domain/Podcast";

export const PodcastPage = () => {
  const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
  const { getPodcasts, podcasts } = usePodcasts();
  const { podcastId } = useParams<{ podcastId: string }>();

  useEffect(() => {
    getPodcasts();
  }, []);

  useEffect(() => {
    const podcast = podcasts.find((podcast) => podcast.id === podcastId);
    setPodcast(podcast);
  }, [podcasts]);

  return (
    <div>
      <h1>{podcast?.title}</h1>
    </div>
  );
};
