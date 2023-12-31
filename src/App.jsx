import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import GenericMoviesPage from "./pages/GenericMoviesPage";
import MainLayout from "./layout/MainLayout";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesByCategory from "./template/MoviesByCategory";
import { FavoriteMoviesProvider } from "./context/favoriteMovies";
import { useMovieTrailer } from "./context/movieTrailer";
import MovieTrailer from "@components/MovieTrailer";

function App() {
  const {showTrailer} = useMovieTrailer()
  return (
    <>
      <FavoriteMoviesProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />}>
              <Route path=":categorySlug" element={<MoviesByCategory />} />
            </Route>
            <Route path="/movies/:moviesType" element={<GenericMoviesPage />} />
            <Route path="/movie/:movieSlug" element={<MovieDetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </MainLayout>
        {showTrailer && <MovieTrailer/>}
      </FavoriteMoviesProvider>
    </>
  );
}

export default App;
