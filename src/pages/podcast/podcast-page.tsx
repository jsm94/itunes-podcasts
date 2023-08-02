import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import {
  LoadingActionTypes,
  useLoadingDispatch,
} from "../../context/LoadingContext";

import { Podcast } from "../../modules/podcasts/domain/Podcast";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { PodcastCardDetail } from "../../components/podcasts/podcast-card-detail";

import "./podcast-page.css";

export const PodcastPage = () => {
  const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
  const { getPodcasts, podcasts } = usePodcasts();
  const { podcastId } = useParams<{ podcastId: string }>();
  const dispatch = useLoadingDispatch();

  useEffect(() => {
    dispatch({ type: LoadingActionTypes.PUSH });
    getPodcasts().then(() => {
      dispatch({ type: LoadingActionTypes.POP });
    });
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
          <Outlet />
        </section>
      </div>
    </div>
  );
};
