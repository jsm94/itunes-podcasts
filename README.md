# Frontend Technical Assessment - iTunes podcasts mini-app

This technical assessment consists of a mini-app to listen to music podcasts.

🔗 https://itunes-podcasts.vercel.app/

---

## Summary

- The app should has **3 views**:
  - Main view
  - Podcast detail
  - Podcast episode detail
- The app should follow the style guidelines defined in the technical assessment document.
- The app should be a **SPA**.
- The app should have 2 modes:
  - **development** (no-minified content)
  - **production** (minified content)

### Restrictions

- Routing should be based on clean URLs, hash-based routing (#) is not allowed.
- Frontend frameworks are not allowed (AngularJS or Ember)

### Allowed

- Can use ES2020 syntax
- Can use build tools like Webpack or Parcel
- The assessment will be checked on Chrome's latest version. Fit on mobile/tablet devices is not necessary.
- Handle errors it's not necessary for user feedback, only shows a `console` message with a stack trace.

---

## Requirements

### Main view

URL: `/`

- [x] Show the list of the 100 most popular podcasts according to this Apple's list:
      `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
- [x] The list results should be cached for 1 day to not make the API call again while cached.
- [x] The users could filter the podcast list by writing on the input search. The string should match with podcast title and/or author's name.
- [x] The list should react immediately with the filter while typing.
- [x] Click on a podcast should navigate to the podcast detail view.

### Podcast detail

URL: `/podcast/{podcastId}`

- [x] Should show a sidebar with the podcast image, title, author and description. According to this endpoint:
      `https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20`
- [x] Should show a main section with the total number of episodes and the list of them with its title, release date and duration.
- [x] The podcast detail should be cached for 1 day to not make the API call again while cached.
- [x] Click on the episode title should navigate to the episode detail view.

> Service for external resources that not allow JSON neither CORS headers: `https://allorigins.win`

### Episode detail

URL: `/podcast/{podcastId}/episode/{episodeId}`

- [x] Should show the same sidebar from the previous view. The podcast title and author should be links to the podcast detail view.
- [x] Should show a main section with the episode title, description and an HTML5 audio player to play the podcast. The HTML descriptions should be interpreted not escaped.

### Header

- [x] The application title is a link that navigates to main view.
- [x] There should be an indicator that only appears while navigating through views to show that a transition is running.

---

## Stack

Following the previous guidelines and making some assumptions and opinions, I decide to choose the next stack for the development:

- **Webpack**: for not using a pre-configured bundler and fine-tune this project from the start.
- **TypeScript**: a JavaScript superset to improve development experience and maintainability with types and interfaces.
- **CSS**: only native CSS applying the BEM approach
- **Jest & React Testing Library**: for testing purpouses
- **Cypress**: for e2e testing
- **ESLint & Prettier**: for ensuring code quality, consistency, and adherence to coding standards.
- **Husky**: for run tests, lint and format before a commit to ensure code quality.
- **React Router Dom v6**: to manage navigation

I also decided to implement a **hexagonal architecture** and **DDD** for better scalability and testable code.
Use of **ITCSS** architecture to organize the css in conjunction with the **BEM** methodology, thus improving scalability and maintenance of the project and its components.

For the size of this project, it's not necessary but I added **Code Splitting** technics to minimize the main bundle size by applying **Lazy and Suspense** modules from **React**. In a hypothetical situation when the app grows that technics improves **core web vitals** and performance.

---

## Instructions

### Tools & Versions

Minimal versions:

- _Node v18.X_
- _npm 8.19.4_

### Installation

- `npm install`

### Build

- Production bundle: `npm run build:pro`
- Development bundle: `npm run build:dev`

### Dev Scripts

- Start Dev Server: `npm run start`
- Lint: `npm run lint` or `npm run lint:fix`
- Format: `npm run format`

### Testing

- Run unit/integration tests: `npm run test`
- Run E2E test: `npm run test:e2e`
- Run E2E test on browser: `npm run cypress:open`
- Run test coverage: `npm run test:coverage`

**\*Be sure that web server is running (`npm run start`) before Cypress tests.**
