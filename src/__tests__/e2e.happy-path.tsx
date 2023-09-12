/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

import { fireEvent, waitFor } from "@testing-library/react";
import { Route } from "react-router";

import { App } from "../App";
import { PodcastEpisodeDetail } from "../components/podcasts/podcast-episode-detail";
import { PodcastEpisodesListContainer } from "../components/podcasts/podcast-episodes-list/podcast-episodes-list-container";
import { ROUTES } from "../constants/app.constants";
import { renderWithRouter } from "../mocks/render-with-providers";
import {
  API_LIMIT,
  API_URL,
  GENRE,
} from "../modules/podcasts/infra/constants/api.constants";
import { mockEpisodesListData } from "../modules/podcasts/infra/mocks/mockEpisodesListData";
import { mockPodcastsListData } from "../modules/podcasts/infra/mocks/mockPodcastsListData";
import { Home } from "../pages/home/home";
import { PodcastPage } from "../pages/podcast/podcast-page";

const PODCAST_ID = "1437402802";

const renderApp = () => {
  return renderWithRouter(<App />, {
    route: ROUTES.HOME,
    path: ROUTES.HOME,
    children: [
      <Route key={1} path={ROUTES.HOME} element={<Home />} />,
      <Route
        key={2}
        path={ROUTES.PODCAST_DETAIL}
        element={<PodcastPage />}
        children={[
          <Route
            key={1}
            path={ROUTES.PODCAST_DETAIL}
            element={<PodcastEpisodesListContainer />}
          />,
          <Route
            key={2}
            path={ROUTES.PODCAST_EPISODE_DETAIL}
            element={<PodcastEpisodeDetail />}
          />,
        ]}
      />,
    ],
  });
};

describe("Happy-path from search a podcast to listen an episode", () => {
  beforeAll(async () => {
    global.fetch = jest.fn((url) => {
      if (
        url === API_URL.replace("{limit}", API_LIMIT).replace("{genre}", GENRE)
      ) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPodcastsListData),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(mockEpisodesListData),
      });
    }) as jest.Mock<Promise<Response>>;
  });

  it("should render the home page successfully", async () => {
    const { baseElement } = renderApp();
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });

  it('should render the header with the title "Podcasts"', async () => {
    const { getByRole } = renderApp();
    await waitFor(() => {
      expect(getByRole("heading", { name: /podcaster/i })).toBeInTheDocument();
    });
  });

  it('should search the podcast "A History of Rock Music in 500 Songs", click on it and navigates to podcast page', async () => {
    const { getByRole, getByPlaceholderText, getAllByRole } = renderApp();

    const input = getByPlaceholderText(/filter podcasts.../i);
    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: "A History of Rock Music in 500 Songs" },
    });

    const podcastCard = getAllByRole("link").find(
      (link) => link.getAttribute("href") === `${ROUTES.PODCAST}/${PODCAST_ID}`,
    );
    await waitFor(() => {
      expect(podcastCard).toBeInTheDocument();
    });

    fireEvent.click(podcastCard!);
    await waitFor(() => {
      expect(
        getByRole("heading", { name: /A History of Rock Music in 500 Songs/i }),
      ).toBeInTheDocument();
    });
  });

  it("should render episodes list and click on the first episode to navigate to episode detail page", async () => {
    const { getByRole, getAllByRole, getByText } = renderApp();

    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });

    const podcastCard = getAllByRole("link").find(
      (link) => link.getAttribute("href") === `${ROUTES.PODCAST}/${PODCAST_ID}`,
    );
    await waitFor(() => {
      expect(podcastCard).toBeInTheDocument();
    });

    fireEvent.click(podcastCard!);
    await waitFor(() => {
      expect(
        getByRole("heading", { name: /A History of Rock Music in 500 Songs/i }),
      ).toBeInTheDocument();
    });

    const episodesList = getAllByRole("link");
    await waitFor(() => {
      expect(episodesList.length).toBeGreaterThan(2);
    });

    const episode = episodesList.find(
      (link) =>
        link.getAttribute("href") ===
        `${ROUTES.PODCAST}/${PODCAST_ID}/episode/1000621671991`,
    );

    fireEvent.click(episode!);
    await waitFor(() => {
      expect(
        getByRole("heading", { name: /Bakar - Hell N Back/i }),
      ).toBeInTheDocument();
    });
  });
});
