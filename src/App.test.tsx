import { render, waitFor } from "@testing-library/react";
import { App } from "./App";
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
    const { container } = render(<App />);

    waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it("renders the header with the text 'Podcaster'", () => {
    const { getByRole } = render(<App />);
    const header = getByRole("heading", { name: /podcaster/i });

    waitFor(() => {
      expect(header).toBeInTheDocument();
    });
  });
});
