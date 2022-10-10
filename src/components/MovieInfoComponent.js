import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(
        `https://movie-task.vercel.app/api/movie?movieId=${selectedMovie}`
      );
      setMovieInfo(res.data.data);
    };
    fetchData();
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <InfoColumn>
            {movieInfo?.original_title && (
              <MovieName>
                <span>{movieInfo?.original_title}</span> :{" "}
                {movieInfo?.adult === true ? "18+" : "Below 18"}
              </MovieName>
            )}
            {movieInfo?.vote_average && (
              <MovieInfo>
                IMDB Rating: <span>{movieInfo?.vote_average}</span>
              </MovieInfo>
            )}
            {movieInfo?.release_date && (
              <MovieInfo>
                Release Date: <span>{movieInfo?.release_date}</span>
              </MovieInfo>
            )}
            {movieInfo?.spoken_languages[0] && (
              <MovieInfo>
                Language:{" "}
                <span>{movieInfo?.spoken_languages[0].english_name}</span>
              </MovieInfo>
            )}
            {movieInfo?.status && (
              <MovieInfo>
                Release Status: <span>{movieInfo?.status}</span>
              </MovieInfo>
            )}
            {movieInfo?.runtime && (
              <MovieInfo>
                Runtime: <span>{movieInfo?.runtime}mins</span>
              </MovieInfo>
            )}
            {movieInfo?.genres && (
              <MovieInfo>
                Genre:{" "}
                <span>
                  {movieInfo?.genres.map((genre) => (
                    <>{genre.name} </>
                  ))}
                </span>
              </MovieInfo>
            )}
            {movieInfo?.tagline && (
              <MovieInfo>
                Tagline: <span>{movieInfo?.tagline}</span>
              </MovieInfo>
            )}
            {movieInfo?.overview && (
              <MovieInfo>
                Overview: <span>{movieInfo?.overview}</span>
              </MovieInfo>
            )}
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        <Placeholder src='/react-movie-app/movie-icon.svg' />
      )}
    </Container>
  );
};
export default MovieInfoComponent;
