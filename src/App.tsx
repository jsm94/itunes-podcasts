import { Outlet } from "react-router-dom";

import { Header } from "./components/header";

export const App: React.FC = () => {
  return (
    <div className="app-layout">
      <Header>
        <h1>Podcaster</h1>
      </Header>
      <main className="app-layout__main">
        <Outlet />
      </main>
    </div>
  );
};
