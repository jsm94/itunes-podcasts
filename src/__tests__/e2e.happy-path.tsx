/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

import { fireEvent, screen, waitFor } from "@testing-library/react";
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
    renderApp();
    expect(
      await screen.findByRole("heading", { name: /podcaster/i }),
    ).toBeInTheDocument();
  });

  it('should search the podcast "A History of Rock Music in 500 Songs", click on it and navigates to podcast page', async () => {
    renderApp();

    const input = await screen.findByPlaceholderText(/filter podcasts.../i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: "A History of Rock Music in 500 Songs" },
    });

    const podcastCards = await screen.findAllByRole("link");
    const podcastCardFinded = podcastCards.find(
      (link) => link.getAttribute("href") === `${ROUTES.PODCAST}/${PODCAST_ID}`,
    );
    expect(podcastCardFinded).toBeInTheDocument();

    fireEvent.click(podcastCardFinded!);
    expect(
      await screen.findByRole("heading", {
        name: /A History of Rock Music in 500 Songs/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render episodes list and click on the first episode to navigate to episode detail page", async () => {
    renderApp();

    const podcastTitle = /A History of Rock Music in 500 Songs/i;

    expect(await screen.findByText(podcastTitle)).toBeInTheDocument();

    const podcastCards = await screen.findAllByRole("link");
    const podcastCardFinded = podcastCards.find(
      (link) => link.getAttribute("href") === `${ROUTES.PODCAST}/${PODCAST_ID}`,
    );
    expect(podcastCardFinded).toBeInTheDocument();

    fireEvent.click(podcastCardFinded!);
    expect(
      await screen.findByRole("heading", { name: podcastTitle }),
    ).toBeInTheDocument();

    const episodesList = await screen.findAllByRole("link");
    expect(episodesList.length).toBeGreaterThan(2);

    const episode = episodesList.find(
      (link) =>
        link.getAttribute("href") ===
        `${ROUTES.PODCAST}/${PODCAST_ID}/episode/1000621671991`,
    );

    fireEvent.click(episode!);
    expect(
      await screen.findByRole("heading", { name: /Bakar - Hell N Back/i }),
    ).toBeInTheDocument();
  });
});
