import { HashRouter, useRoutes } from "react-router-dom";
import "./App.css";
import Home from "./screen/Home";

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

const AppRoutes = () => {
  const routes = useRoutes([{ path: "/", element: <Home /> }]);
  return routes;
};

export default App;
