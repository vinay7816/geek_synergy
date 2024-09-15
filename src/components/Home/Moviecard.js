import React from "react";
import "./Moviecard.css"; 
import moment from "moment";

const MovieCard = ({ movie }) => {
  const timestamp=movie.releasedDate;
  const formattedDate = moment(timestamp * 1000).format('MMMM Do YYYY'); 
  return (
    <div className="movie-card">
      <div className="movie-header">
        <div className="vote-section">
          <button className="upvote">&#9650;</button>
          <span>{movie.totalVoted}</span>
          <button className="downvote">&#9660;</button>
          <p>Votes</p>
        </div>

        <div className="movie-info">
          <img src={movie.poster} alt={movie.title} className="poster" />
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p className="movie-genre">Genre: {movie.genre}</p>
            <p>Director: {movie.director}</p>
            <p>Starring: {movie.stars}</p>
            <p>{movie.runTime?`${movie.runTime}Min`:""} | {movie.language} | {formattedDate}</p>
            <p>{movie.pageViews} views | Voted by {movie.totalVoted} People</p>
          </div>
        </div>
      </div>
      <button className="trailer-btn">Watch Trailer</button>
    </div>
  );
};

export default MovieCard;
