import { waitFor } from "@testing-library/react";
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

  it("renders the header with the text 'Podcaster'", () => {
    const { getByRole } = renderWithRouter(<App />);
    const header = getByRole("heading", { name: /podcaster/i });

    waitFor(() => {
      expect(header).toBeInTheDocument();
    });
  });
});
