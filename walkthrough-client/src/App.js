import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import MovieList from "./components/MovieList"
import MovieDetail from "./components/MovieDetail"
import MovieForm from "./components/MovieForm"

function App() {

  const [movies, setMovies] = useState(["Movie 1", "Movie 2"])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [editedMovie, setEditedMovie] = useState(null)

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token 18fa4b9ef0c796afe146aee11f382dd2f642144f'
  }

  useEffect(() => {
    const makeAPICall = () => {
      axios.get('http://127.0.0.1:8000/api/movies/',
        { headers: headers })
        .then((response) => {
          console.log(response.data)
          setMovies(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    makeAPICall()
  }, [])

  const movieClicked = movie => {
    setSelectedMovie(movie)
    setEditedMovie(null)
  }

  const editClicked = (movie) => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className='layout'>
        <MovieList movies={movies} movieClicked={movieClicked} editClicked={editClicked} />
        <MovieDetail movie={selectedMovie} updateMovie={movieClicked} />
        {editedMovie ? <MovieForm movie={editedMovie} /> : null}
      </div>
    </div>
  );
}

export default App;
