import { StrictMode, Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { LoadingProvider } from "../context/loading-context";

import { ErrorBoundary } from "../components/error-boundary";

const PodcastEpisodeDetail = lazy(() =>
  import("../components/podcasts/podcast-episode-detail").then((module) => ({
    default: module.PodcastEpisodeDetail,
  })),
);

const Home = lazy(() =>
  import("../pages/home/home").then((module) => ({ default: module.Home })),
);

const PodcastEpisodesListContainer = lazy(() =>
  import(
    "../components/podcasts/podcast-episodes-list/podcast-episodes-list-container"
  ).then((module) => ({
    default: module.PodcastEpisodesListContainer,
  })),
);

const NotFoundPage = lazy(() =>
  import("../pages/not-found/not-found-page").then((module) => ({
    default: module.NotFoundPage,
  })),
);

const PodcastPage = lazy(() =>
  import("../pages/podcast/podcast-page").then((module) => ({
    default: module.PodcastPage,
  })),
);

const router = (parentElement: React.ReactNode) =>
  createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: parentElement,
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: ROUTES.HOME,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: ROUTES.NOT_FOUND,
          element: (
            <Suspense>
              <NotFoundPage />
            </Suspense>
          ),
        },
        {
          path: ROUTES.PODCAST_DETAIL,
          element: (
            <Suspense>
              <PodcastPage />
            </Suspense>
          ),
          children: [
            {
              path: ROUTES.PODCAST_DETAIL,
              element: (
                <Suspense>
                  <PodcastEpisodesListContainer />
                </Suspense>
              ),
            },
            {
              path: ROUTES.PODCAST_EPISODE_DETAIL,
              element: (
                <Suspense>
                  <PodcastEpisodeDetail />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

export const withProviders = (parentElement: React.ReactNode) => {
  return (
    <StrictMode>
      <LoadingProvider>
        <RouterProvider router={router(parentElement)} />
      </LoadingProvider>
    </StrictMode>
  );
};
