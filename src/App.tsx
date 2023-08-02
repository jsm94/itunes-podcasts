import { Link, Outlet } from "react-router-dom";

import { Header } from "./components/header";

export const App: React.FC = () => {
  return (
    <div className="app-layout">
      <Header>
        <Link className="no-style" to={"/"}>
          <h1>Podcaster</h1>
        </Link>
      </Header>
      <main className="app-layout__main">
        <Outlet />
      </main>
    </div>
  );
};
