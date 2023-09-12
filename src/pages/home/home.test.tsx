import { fireEvent, screen, waitFor } from "@testing-library/react";

import { mockPodcastsListData } from "../../modules/podcasts/infra/mocks/mockPodcastsListData";

import { renderWithRouter } from "../../mocks/render-with-providers";

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
    const { baseElement } = renderWithRouter(<Home />);
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });

  it("should have a list of the 100 most popular podcasts", async () => {
    renderWithRouter(<Home />);

    const podcastTitle = await screen.findByText(
      /A History of Rock Music in 500 Songs/i,
    );

    expect(podcastTitle).toBeInTheDocument();
  });

  it("should have an input to search for podcasts", async () => {
    renderWithRouter(<Home />);

    const input = await screen.findByPlaceholderText(/filter podcasts.../i);

    expect(input).toBeInTheDocument();
  });

  it("should filter with a non match word when typing in the input and show nothing", async () => {
    renderWithRouter(<Home />);

    const podcastTitle = /A History of Rock Music in 500 Songs/i;

    expect(await screen.findByText(podcastTitle)).toBeInTheDocument();

    const input = await screen.findByPlaceholderText(/filter podcasts.../i);
    fireEvent.change(input, { target: { value: "nonmatch" } });

    waitFor(() => {
      expect(screen.getByText(podcastTitle)).not.toBeInTheDocument();
    });
  });

  it("should show a count of the filtered podcasts", async () => {
    renderWithRouter(<Home />);

    const podcastTitle = /A History of Rock Music in 500 Songs/i;

    expect(await screen.findByText(podcastTitle)).toBeInTheDocument();

    const input = await screen.findByPlaceholderText(/filter podcasts.../i);
    fireEvent.change(input, { target: { value: "history" } });

    const statusElement = await screen.findByRole("status");

    expect(statusElement.innerHTML === "1").toBeTruthy();
  });
});
