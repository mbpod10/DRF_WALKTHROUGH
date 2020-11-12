import React, { useState, useEffect } from 'react'
import { API } from "../Api-Service"


const MovieForm = (props) => {

  const [title, setTitle] = useState(props.movie.title)
  const [description, setDescription] = useState(props.movie.description)

  const updateClicked = () => {
    console.log('updated')
    API.updateMovie(props.movie.id, { description: description, title: title })
  }

  return (
    <React.Fragment>
      { props.movie ?
        <div>
          <label htmlFor='title'>Title</label><br />
          <input id='title' type="text" placeholder="title" value={title}
            onChange={event => setTitle(event.target.value)}
          /><br />
          <label htmlFor='description'>Description</label><br />
          <textarea id='description' type='text' placeholder="Description" value={description}
            onChange={event => setDescription(event.target.value)}
          ></textarea> <br />
          <button onClick={updateClicked}>Update</button>
        </div> : null}
    </React.Fragment>
  )

}

export default MovieForm