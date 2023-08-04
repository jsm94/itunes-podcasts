import { waitFor } from "@testing-library/react";
import { Route } from "react-router";

import { ROUTES } from "../../constants/app.constants";

import { renderWithRouter } from "../../mocks/render-with-providers";

import { mockEpisodesListData } from "../../modules/podcasts/infra/mocks/mockEpisodesListData";
import { mockPodcastsListData } from "../../modules/podcasts/infra/mocks/mockPodcastsListData";

import { PodcastEpisodesListContainer } from "../../components/podcasts/podcast-episodes-list-container";

import {
  API_LIMIT,
  API_URL,
  GENRE,
} from "../../modules/podcasts/infra/constants/api.constants";
import { PodcastPage } from "./podcast-page";

const renderPodcastPage = () => {
  return renderWithRouter(<PodcastPage />, {
    route: `${ROUTES.PODCAST}/1437402802`, // "A History of Rock Music in 500 Songs" mocked id
    path: ROUTES.PODCAST_DETAIL,
    children: [
      <Route
        key={1}
        path={ROUTES.PODCAST_DETAIL}
        element={<PodcastEpisodesListContainer />}
      />,
      <Route
        key={1}
        path={ROUTES.PODCAST_EPISODE_DETAIL}
        element={<h1>Bakar - Hell N Back</h1>}
      />,
    ],
  });
};

describe("Podcast", () => {
  beforeAll(() => {
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

  it("should render successfully", async () => {
    const { baseElement } = renderPodcastPage();
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });

  it("should have a podcast title", async () => {
    const { getByText } = renderPodcastPage();
    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });
  });

  it("show a number of episodes", async () => {
    const { getByText } = renderPodcastPage();
    await waitFor(() => {
      expect(getByText(/episodes: 1/i)).toBeInTheDocument();
    });
  });

  it("should have a list of episodes", async () => {
    const { getByText } = renderPodcastPage();
    await waitFor(() => {
      expect(getByText(/Bakar - Hell N Back/i)).toBeInTheDocument();
    });
  });

  it("when click on episode should redirect to episode page", async () => {
    const { getByText, getByRole } = renderPodcastPage();

    await waitFor(() => {
      getByText(/Bakar - Hell N Back/i).click();
    });

    await waitFor(() => {
      expect(
        getByRole("heading", { name: /Bakar - Hell N Back/i }),
      ).toBeInTheDocument();
    });
  });
});
