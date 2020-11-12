import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const MovieList = (props) => {

  const movieClicked = (movie) => (event) => {
    props.movieClicked(movie)
  }

  const editClicked = (movie) => {

    props.editClicked(movie)
  }


  return (
    <div>
      {props.movies && props.movies.map(movie => {
        return (
          <div key={movie.id} className='movie-item'>
            <h2 className='title' onClick={movieClicked(movie)}>{movie.title}</h2>
            <div>
              <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MovieList