import { render } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the header with the text 'Podcaster'", () => {
    const { getByRole } = render(<App />);
    const header = getByRole("heading", { name: /podcaster/i });
    expect(header).toBeInTheDocument();
  });
});
