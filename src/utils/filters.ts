import { Podcast } from "../modules/podcasts/domain/Podcast";

export const filterPodcasts = (podcastsToFilter: Podcast[], filter: string) => {
  return podcastsToFilter.filter(
    (podcast) =>
      podcast.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      podcast.author.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
};
