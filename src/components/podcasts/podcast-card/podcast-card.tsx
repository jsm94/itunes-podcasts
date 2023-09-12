import { Podcast } from "../../../modules/podcasts/domain/Podcast";

import "./podcast-card.css";

type PodcastCardProps = {
  className?: string;
  podcast: Podcast;
};

export const PodcastCard = ({ className, podcast }: PodcastCardProps) => {
  return (
    <div className={["podcast-card", className].join(" ")}>
      <div className="podcast-card__content">
        <img
          loading="lazy"
          className="podcast-card__image"
          src={podcast.image}
          alt={podcast.title}
        />
        <h3 className="podcast-card__title">{podcast.title}</h3>
        <p className="podcast-card__author">Author: {podcast.author}</p>
      </div>
    </div>
  );
};

PodcastCard.displayName = "PodcastCard";

export const PodcastCardSkeleton = () => {
  return <div className="skeleton-box podcast-card--skeleton" />;
};
