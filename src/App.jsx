import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import TvShows from "./pages/TvShows";
import "react-loading-skeleton/dist/skeleton.css";
import DetailPage from "./pages/DetailPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WatchList from "./pages/WatchList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DarkModeProvider } from "./context/DarkModeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/tv",
        element: <TvShows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailPage />,
      },
      {
        path: "/watchlist",
        element: (
          <ProtectedRoute>
            <WatchList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          theme={"dark"}
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          draggable={true}
          className="md:w-fit w-3/4 mx-auto"
        />
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
