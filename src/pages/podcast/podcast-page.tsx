import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Podcast } from "../../modules/podcasts/domain/Podcast";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { Card } from "../../components/card/card";
import { PodcastCardDetail } from "../../components/podcasts/podcast-card-detail";
import { PodcastEpisodesList } from "../../components/podcasts/podcast-episodes-list";

import "./podcast-page.css";

export const PodcastPage = () => {
  const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
  const { getPodcasts, podcasts, getEpisodes, episodes } = usePodcasts();
  const { podcastId } = useParams<{ podcastId: string }>();

  useEffect(() => {
    getPodcasts();
    getEpisodes(podcastId!);
  }, []);

  useEffect(() => {
    const podcast = podcasts.find((podcast) => podcast.id === podcastId);
    setPodcast(podcast);
  }, [podcasts]);

  return (
    <div className="podcast-page">
      <div className="podcast-page__container">
        <aside className="podcast-page__aside">
          {podcast && <PodcastCardDetail podcast={podcast} />}
        </aside>
        <section className="podcast-page__section">
          <Card>
            <h2 className="podcast-page__episodes-title">
              Episodes: {episodes?.length}
            </h2>
          </Card>
          <Card>
            <PodcastEpisodesList episodes={episodes} />
          </Card>
        </section>
      </div>
    </div>
  );
};
