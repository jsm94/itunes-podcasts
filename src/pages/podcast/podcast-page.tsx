import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import {
  LoadingActionTypes,
  useLoadingDispatch,
} from "../../context/LoadingContext";

import { Podcast } from "../../modules/podcasts/domain/Podcast";

import { usePodcasts } from "../../hooks/podcasts/usePodcasts";

import { PodcastCardDetail } from "../../components/podcasts/podcast-card-detail";

import { PodcastCardSkeleton } from "../../components/podcasts/podcast-card";
import "./podcast-page.css";

export const PodcastPage = () => {
  const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
  const { podcastId } = useParams<{ podcastId: string }>();
  const navigate = useNavigate();

  const { getPodcasts } = usePodcasts();
  const dispatch = useLoadingDispatch();

  const loadData = async () => {
    dispatch({ type: LoadingActionTypes.PUSH });
    const podcasts = await getPodcasts();
    const podcast = podcasts?.find((podcast) => podcast.id === podcastId);
    if (!podcast) {
      navigate("/404");
      dispatch({ type: LoadingActionTypes.POP });
      return;
    }
    setPodcast(podcast);
    dispatch({ type: LoadingActionTypes.POP });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="podcast-page">
      <div className="podcast-page__container">
        <aside className="podcast-page__aside">
          {podcast && <PodcastCardDetail podcast={podcast} />}
          {!podcast && <PodcastCardSkeleton />}
        </aside>
        <section className="podcast-page__section">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
