import { Header } from "./components/header";
import { Home } from "./pages/home/home";

export const App: React.FC = () => {
  return (
    <div className="app-layout">
      <Header>
        <h1>Podcaster</h1>
      </Header>
      <main className="app-layout__main">
        <Home />
      </main>
    </div>
  );
};
