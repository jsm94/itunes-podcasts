import { screen, waitFor } from "@testing-library/react";
import { App } from "./App";
import { renderWithRouter } from "./mocks/render-with-providers";
import { mockPodcastsListData } from "./modules/podcasts/infra/mocks/mockPodcastsListData";

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPodcastsListData),
      }),
    ) as jest.Mock<Promise<Response>>;
  });

  it("renders without crashing", () => {
    const { container } = renderWithRouter(<App />);

    waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it("renders the header with the text 'Podcaster'", async () => {
    renderWithRouter(<App />);
    const header = await screen.findByRole("heading", { name: /podcaster/i });

    expect(header).toBeInTheDocument();
  });
});
