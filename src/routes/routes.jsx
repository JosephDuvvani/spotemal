import App from "../App";
import Game from "../pages/game";
import Home from "../pages/home";

export default [
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "game",
        element: <Game />,
      }
    ]
  }
];
