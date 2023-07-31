import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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

  it("should have an input to search for podcasts", async () => {
    const { getByPlaceholderText } = render(<Home />);
    await waitFor(() => {
      expect(getByPlaceholderText(/filter podcasts.../i)).toBeInTheDocument();
    });
  });

  it("should filter with a non match word when typing in the input and show nothing", async () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });
    const input = getByPlaceholderText(/filter podcasts.../i);
    fireEvent.change(input, { target: { value: "nonmatch" } });
    expect(
      screen.queryByText(/A History of Rock Music in 500 Songs/i),
    ).not.toBeInTheDocument();
  });

  it("should show a count of the filtered podcasts", async () => {
    const { getByRole, getByPlaceholderText, getByText } = render(<Home />);
    const input = getByPlaceholderText(/filter podcasts.../i);
    await waitFor(() => {
      expect(
        getByText(/A History of Rock Music in 500 Songs/i),
      ).toBeInTheDocument();
    });
    fireEvent.change(input, { target: { value: "history" } });
    expect(getByRole("status").innerHTML === "1").toBeTruthy();
  });
});
