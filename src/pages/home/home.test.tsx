import { render, waitFor } from "@testing-library/react";

import { mockPodcastsListData } from "../../modules/podcasts/infra/mocks/mockPodcastsListData";
import { Home } from "./home";

describe("Home", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPodcastsListData),
      }),
    ) as jest.Mock<Promise<Response>>;
  });

  it("should render successfully", async () => {
    const { baseElement } = render(<Home />);
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });

  it("should have a list of the 100 most popular podcasts", async () => {
    const { getByText } = render(<Home />);
    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });
  });
});
