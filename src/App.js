import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, useRoutes } from "react-router-dom";
import Detail from "./screen/Detail";
import Home from "./screen/Home";
import Welcome from "./screen/Welcome";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: ["Nanum Pen Script", "cursive"].join(","),
    fontSize: 32,
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
  );
}

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Welcome /> },
    { path: "/detail", element: <Detail /> },
    { path: "/home", element: <Home /> },
  ]);
  return routes;
};

export default App;
