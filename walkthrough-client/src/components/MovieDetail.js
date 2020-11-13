import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { useCookies } from 'react-cookie'


const MovieDetail = (props) => {

  let mov = props.movie
  const [token] = useCookies(['mr-token'])

  useEffect(() => {
    console.log(token)
  }, [token])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token['mr-token']}`
  }

  const [highlighted, setHighlighted] = useState(-1)


  const highlightRate = (high) => event => {
    setHighlighted(high)
  }

  const rateClicked = (rate) => (event) => {
    axios.post(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`,
      {
        stars: rate + 1
      },
      { headers: headers })
      .then((data) => {
        console.log(data)
      })
      .then(() => {
        // console.log(getDetails())
        getDetails()
      })
      .catch((error) => {
        console.log(error)
      })
    getDetails()
  }

  const getDetails = () => {
    axios.get(`http://127.0.0.1:8000/api/movies/${mov.id}/`,
      { headers: headers })
      .then((data) => {
        console.log(data)
        props.updateMovie(data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      {mov ? (
        <div>
          <h1>{mov.title}</h1>
          <p>{mov.description}</p>
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange' : ''} />
            ({mov.no_of_ratings})
          <div className='rate-container'>
            <h2>Rate It</h2>
            {[...Array(5)].map((element, index) => {
              return <FontAwesomeIcon key={index} icon={faStar} className={highlighted > index - 1 ? 'purple' : ''}
                onMouseEnter={highlightRate(index)}
                onMouseLeave={highlightRate(-1)}
                onClick={rateClicked(index)}
              />
            })}
          </div>
        </div>
      ) : null}


    </React.Fragment>
  )
}

export default MovieDetail