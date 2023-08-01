import { memo } from "react";
import { Link } from "react-router-dom";

import { Podcast } from "../../modules/podcasts/domain/Podcast";

import { PodcastCard } from "./podcast-card";

type PodcastCardLinkProps = {
  className?: string;
  podcast: Podcast;
};

export const PodcastCardLink = memo(
  ({ className, podcast }: PodcastCardLinkProps) => (
    <Link className="no-style" to={`/podcast/${podcast.id}`}>
      <PodcastCard className={className} podcast={podcast} />
    </Link>
  ),
);

PodcastCardLink.displayName = "PodcastCardLink";
