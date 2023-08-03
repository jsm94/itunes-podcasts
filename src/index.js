import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { LoadingProvider } from "./context/LoadingContext";

import { App } from "./App";
import { ErrorBoundary } from "./components/error-boundary";
import { Home } from "./pages/home/home";
import { NotFoundPage } from "./pages/not-found/not-found-page";
import { PodcastPage } from "./pages/podcast/podcast-page";

import { PodcastEpisodeDetail } from "./components/podcasts/podcast-episode-detail";
import { PodcastEpisodesListContainer } from "./components/podcasts/podcast-episodes-list-container";

import "./assets/styles/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/404",
        element: <NotFoundPage />,
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

const withProviders = () => {
  return (
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(withProviders());
