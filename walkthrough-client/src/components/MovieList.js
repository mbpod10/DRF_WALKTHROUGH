import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { API } from "../Api-Service"
import { useCookies } from 'react-cookie'


const MovieList = (props) => {

  const [token] = useCookies(['mr-token'])

  const movieClicked = (movie) => (event) => {
    props.movieClicked(movie)
  }

  const editClicked = (movie) => {
    props.editClicked(movie)
  }

  const removeClicked = (movie) => {
    props.removeClicked(movie)
    console.log(movie.id)
    API.deleteMovie(movie.id, token['mr-token'])
      .then((response) => {
        console.log(`'${movie.title}' DELETED`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {props.movies && props.movies.map(movie => {
        return (
          <div key={movie.id} className='movie-item'>
            <h2 className='title' onClick={movieClicked(movie)}>{movie.title}</h2>
            <div>
              <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
              <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MovieList