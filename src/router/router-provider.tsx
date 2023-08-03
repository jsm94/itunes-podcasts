import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { LoadingProvider } from "../context/loading-context";

import { ErrorBoundary } from "../components/error-boundary";
import { PodcastEpisodeDetail } from "../components/podcasts/podcast-episode-detail";
import { PodcastEpisodesListContainer } from "../components/podcasts/podcast-episodes-list-container";

import { Home } from "../pages/home/home";
import { NotFoundPage } from "../pages/not-found/not-found-page";
import { PodcastPage } from "../pages/podcast/podcast-page";

const router = (parentElement: React.ReactNode) =>
  createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: parentElement,
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: ROUTES.HOME,
          element: <Home />,
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <NotFoundPage />,
        },
        {
          path: ROUTES.PODCAST_DETAIL,
          element: <PodcastPage />,
          children: [
            {
              path: ROUTES.PODCAST_DETAIL,
              element: <PodcastEpisodesListContainer />,
            },
            {
              path: ROUTES.PODCAST_EPISODE_DETAIL,
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
