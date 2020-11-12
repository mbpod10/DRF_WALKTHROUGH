import axios from "axios"

const TOKEN = "18fa4b9ef0c796afe146aee11f382dd2f642144f"
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${TOKEN}`
}

export class API {
  static updateMovie(mov_id, body) {
    return axios.put(`http://127.0.0.1:8000/api/movies/${mov_id}/`,
      body,
      { headers: headers })
      .then((response) => {
        console.log(headers, mov_id, body)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}



