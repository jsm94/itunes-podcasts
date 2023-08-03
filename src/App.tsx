import { Link, Outlet } from "react-router-dom";

import { Header } from "./components/header";
import { useLoading } from "./context/loading-context";

export const App: React.FC = () => {
  const state = useLoading();
  return (
    <div className="app-layout">
      <Header>
        <Link className="no-style" to={"/"}>
          <h1>Podcaster</h1>
        </Link>
        {Boolean(state.length) && (
          <div className="pulse-bubble pulse-bubble-animation" />
        )}
      </Header>
      <main className="app-layout__main">
        <Outlet />
      </main>
    </div>
  );
};
