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
    const { getByText } = renderWithRouter(<Home />);
    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });
  });

  it("should have an input to search for podcasts", async () => {
    const { getByPlaceholderText } = renderWithRouter(<Home />);
    await waitFor(() => {
      expect(getByPlaceholderText(/filter podcasts.../i)).toBeInTheDocument();
    });
  });

  it("should filter with a non match word when typing in the input and show nothing", async () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(<Home />);

    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });

    const input = getByPlaceholderText(/filter podcasts.../i);
    fireEvent.change(input, { target: { value: "nonmatch" } });

    await waitFor(() => {
      expect(
        screen.queryByText(/A History of Rock Music in 500 Songs/i),
      ).not.toBeInTheDocument();
    });
  });

  it("should show a count of the filtered podcasts", async () => {
    const { getByRole, getByPlaceholderText, getByText } = renderWithRouter(
      <Home />,
    );

    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });

    const input = getByPlaceholderText(/filter podcasts.../i);
    fireEvent.change(input, { target: { value: "history" } });

    await waitFor(() => {
      expect(getByRole("status").innerHTML === "1").toBeTruthy();
    });
  });
});
