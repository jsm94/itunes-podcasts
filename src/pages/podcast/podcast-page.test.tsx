import { waitFor } from "@testing-library/react";

import { renderWithRouter } from "../../mocks/render-with-providers";

import { Route } from "react-router";
import { PodcastEpisodesListContainer } from "../../components/podcasts/podcast-episodes-list-container";
import { mockEpisodesListData } from "../../modules/podcasts/infra/mocks/mockEpisodesListData";
import { mockPodcastsListData } from "../../modules/podcasts/infra/mocks/mockPodcastsListData";
import { PodcastPage } from "./podcast-page";

const renderPodcastPage = () => {
  return renderWithRouter(<PodcastPage />, {
    route: "/podcast/1437402802", // "A History of Rock Music in 500 Songs" mocked id
    path: "/podcast/:podcastId",
    children: [
      <Route
        key={1}
        path="/podcast/:podcastId"
        element={<PodcastEpisodesListContainer />}
      />,
    ],
  });
};

describe("Podcast", () => {
  beforeAll(() => {
    global.fetch = jest.fn((url) => {
      if (
        url ===
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
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
});
