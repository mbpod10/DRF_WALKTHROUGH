import React, { useState, useEffect } from 'react'
import { API } from "../Api-Service"


const MovieForm = (props) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const makeAPICall = () => {
      setTitle(props.movie.title)
      setDescription(props.movie.description)
    }
    makeAPICall()
  }, [props.movie])

  const updateClicked = () => {
    console.log('updated')
    API.updateMovie(props.movie.id, { description: description, title: title })
      .then((response) => {
        console.log(response.data)
        props.updateMovie(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createClicked = () => {
    console.log('updated')
    API.createMovie({ description: description, title: title })
      .then((response) => {
        console.log(response.data)
        props.movieCreated(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
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
          {props.movie.id ? <button onClick={updateClicked}>Update</button> :
            <button onClick={createClicked}>Create</button>
          }



        </div> : null}
    </React.Fragment>
  )

}

export default MovieForm