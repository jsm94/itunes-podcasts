import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { LoadingProvider } from "../context/LoadingContext";

import { ErrorBoundary } from "../components/error-boundary";
import { PodcastEpisodeDetail } from "../components/podcasts/podcast-episode-detail";
import { PodcastEpisodesListContainer } from "../components/podcasts/podcast-episodes-list-container";

import { Home } from "../pages/home/home";
import { NotFoundPage } from "../pages/not-found/not-found-page";
import { PodcastPage } from "../pages/podcast/podcast-page";

const router = (parentElement: React.ReactNode) =>
  createBrowserRouter([
    {
      path: "/",
      element: parentElement,
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

export const withProviders = (parentElement: React.ReactNode) => {
  return (
    <LoadingProvider>
      <RouterProvider router={router(parentElement)} />
    </LoadingProvider>
  );
};
