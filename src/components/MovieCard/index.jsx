import React, { useEffect, useRef } from "react";
import Button from "@components/Button";
import { useFavoriteMovies } from "@context/favoriteMovies";
import { useNavigate } from "react-router-dom";
import { formatToURL } from "@utils";
import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
  const { favoriteMovies, addToFavorite } = useFavoriteMovies();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  let poster_path = `https://image.tmdb.org/t/p/w154/${movie.poster_path}`;

  if (movie.poster_path === null) {
    poster_path = `https://via.placeholder.com/200x300/191919/ffffff?text=${encodeURI(
      movie.title
    )}`;
  }

  const isFavorite = favoriteMovies.some(
    (favMovie) => favMovie.id === movie.id
  );

  const goToMovieDetails = () => {
    navigate(`/movie/${movie.id}&${formatToURL(movie.title)}`);
  };

  const handleFavoriteMovie = (e) => {
    e.stopPropagation();
    addToFavorite(movie);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const dataImage = element.getAttribute("data-image");
          element.src = dataImage;
          element.classList.add("MovieCard__img--loaded");
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect(imageRef.current);
    };
  }, []);

  return (
    <figure className="MovieCard" onClick={goToMovieDetails}>
      <img
        className="MovieCard__img"
        data-image={poster_path}
        alt={movie.title}
        width="200"
        height="300"
        ref={imageRef}
      />
      <figcaption className="MovieCard__title">{movie.title}</figcaption>
      <Button
        icon="🤍"
        className={`MovieCard__btn ${isFavorite ? "active" : ""}`}
        variant="secondary"
        size="small"
        onClick={handleFavoriteMovie}
      />
    </figure>
  );
};

export const MovieCardLoading = () => {
  return (
    <div>
      <div className="img-loading"></div>
      <div className="text-loading"></div>
    </div>
  );
};

export default MovieCard;
