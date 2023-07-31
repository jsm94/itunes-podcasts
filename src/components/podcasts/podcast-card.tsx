import { Podcast } from "../../modules/podcasts/domain/Podcast";

import "./podcast-card.css";

type PodcastCardProps = {
  className?: string;
  podcast: Podcast;
  onClick: () => void;
};

export const PodcastCard = ({
  className,
  podcast,
  onClick,
}: PodcastCardProps) => {
  return (
    <div className={["podcast-card", className].join(" ")} onClick={onClick}>
      <div className="podcast-card__content">
        <img
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
