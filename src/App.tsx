import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./ui/AppLayout";
import About from "./features/about/About";
import BuyManga from "./features/buyManga/BuyManga";
import Home from "./features/home/Home";
import Genres from "./features/genres/Genres";
import Manga from "./features/manga/Manga";
import Cart from "./features/cart/Cart";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/buy-manga",
        element: <BuyManga />,
      },
      {
        path: "manga/:id",
        element: <Manga />,
      },
      {
        path: "/genres",
        element: <Genres />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
