import { waitFor } from "@testing-library/react";

import { renderWithRouter } from "../../mocks/render-with-providers";

import { mockPodcastsListData } from "../../modules/podcasts/infra/mocks/mockPodcastsListData";
import { PodcastPage } from "./podcast";

const renderPodcastPage = () => {
  return renderWithRouter(<PodcastPage />, {
    route: "/podcast/1437402802", // "A History of Rock Music in 500 Songs" mocked id
    path: "/podcast/:podcastId",
  });
};

describe("Podcast", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPodcastsListData),
      }),
    ) as jest.Mock<Promise<Response>>;
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
});
