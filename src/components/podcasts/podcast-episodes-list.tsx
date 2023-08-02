import { Link } from "react-router-dom";
import { Episode } from "../../modules/podcasts/domain/Episode";
import { msToDuration } from "../../utils/formatters";

import "./podcast-episodes-list.css";

type PodcastEpisodesListProps = {
  className?: string;
  episodes: Episode[];
};

export const PodcastEpisodesList = ({
  className,
  episodes,
}: PodcastEpisodesListProps) => (
  <table className={["podcast-episodes-list__table", className].join(" ")}>
    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      {episodes?.map((episode) => (
        <tr key={episode.id}>
          <td className="podcast-episodes-list__episode-title">
            <Link to={`episode/${episode.id}`}>{episode.title}</Link>
          </td>
          <td>{new Date(episode.releaseDate).toLocaleDateString()}</td>
          <td className="podcast-episodes-list__episode-duration">
            {msToDuration(episode.duration)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
