import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { Home } from "./pages/home/home";
import { PodcastPage } from "./pages/podcast/podcast-page";

import { PodcastEpisodeDetail } from "./components/podcasts/podcast-episode-detail";
import { PodcastEpisodesListContainer } from "./components/podcasts/podcast-episodes-list-container";

import "./assets/styles/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastPage />,
        children: [
          {
            path: "/podcast/:podcastId",
            element: <PodcastEpisodesListContainer />,
          },
          {
            path: "/podcast/:podcastId/episode/:episodeId",
            element: <PodcastEpisodeDetail />,
          },
        ],
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
