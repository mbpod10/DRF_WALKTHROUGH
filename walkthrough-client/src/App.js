import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './App.css';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import MovieList from "./components/MovieList"
import MovieDetail from "./components/MovieDetail"
import MovieForm from "./components/MovieForm"
import { useCookies } from 'react-cookie'
import apiUrl from "./APIConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {

  const [token, setToken, deleteToken] = useCookies(['mr-token'])

  const [movies, setMovies] = useState(["Movie 1", "Movie 2"])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [editedMovie, setEditedMovie] = useState(null)

  // IF NO TOKEN THEN GO BACK TO LOGIN BC THEY ARE NOT AUTHENTICATED
  useEffect(() => {
    console.log(token)
    if (!token['mr-token']) window.location.href = "/"
  }, [token])
  ////////////////////////////////////////////////////////////////

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token['mr-token']}`
  }

  useEffect(() => {
    const makeAPICall = () => {
      axios.get(`${apiUrl}/api/movies/`,
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

  const updateMovie = movie => {
    const newMovies = movies.map(mov => {
      if (mov.id === movie.id) {
        return movie
      }
      return mov
    })
    setMovies(newMovies)
  }

  const newMovie = () => {
    setEditedMovie({ title: '', description: '' })
    console.log("new Move")
  }

  const movieCreated = (movie) => {
    const newMovies = [...movies, movie]
    setMovies(newMovies)
  }

  const removeClicked = (movie) => {
    const newMovies = movies.filter(mov => {
      if (mov.id === movie.id) {
        return false
      }
      return true
    })
    setMovies(newMovies)
  }

  const logoutUser = () => {
    console.log("logout")
    deleteToken(['mr-token'])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className='layout'>
        <div>
          <MovieList
            movies={movies}
            movieClicked={movieClicked}
            editClicked={editClicked}
            removeClicked={removeClicked} />
          <button onClick={newMovie}>New Movie</button>
        </div>
        <MovieDetail movie={selectedMovie} updateMovie={movieClicked} />
        {editedMovie ? <MovieForm movie={editedMovie} updateMovie={updateMovie}
          movieCreated={movieCreated}
        /> : null}

      </div>
    </div>
  );
}

export default App;
