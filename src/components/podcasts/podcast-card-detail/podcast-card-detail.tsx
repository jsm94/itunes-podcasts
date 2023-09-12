import { Link } from "react-router-dom";
import { Podcast } from "../../../modules/podcasts/domain/Podcast";

import { Card } from "../../card/card";

import { ROUTES } from "../../../constants/app.constants";
import "./podcast-card-detail.css";

type PodcastCardDetailProps = {
  className?: string;
  podcast: Podcast;
};

export const PodcastCardDetail = ({
  className,
  podcast,
}: PodcastCardDetailProps) => {
  return (
    <Card className={["podcast-card-detail", className].join(" ")}>
      <div className="podcast-card-detail__image-container">
        <img
          loading="lazy"
          className="podcast-card-detail__image"
          src={podcast?.image}
          alt={podcast?.title}
        />
      </div>
      <hr />
      <div className="podcast-card-detail__info">
        <Link className="no-style" to={`${ROUTES.PODCAST}/${podcast?.id}`}>
          <h1 className="podcast-card-detail__title">{podcast?.title}</h1>
        </Link>
        <p className="podcast-card-detail__author">by {podcast?.author}</p>
      </div>
      <hr />
      <div>
        <h2 className="podcast-card-detail__subtitle">Description:</h2>
        <p
          className="podcast-card-detail__description"
          title={podcast?.description}
        >
          {podcast?.description}
        </p>
      </div>
    </Card>
  );
};
