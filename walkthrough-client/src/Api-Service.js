import axios from "axios"
import apiUrl from "./APIConfig"

export class API {
  static updateMovie(mov_id, body, TOKEN) {
    return axios.put(`${apiUrl}/api/movies/${mov_id}/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${TOKEN}`
        }
      })
  }
  static createMovie(body, TOKEN) {
    return axios.post(`${apiUrl}/api/movies/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${TOKEN}`
        }
      })
  }
  static deleteMovie(mov_id, TOKEN) {
    return axios.delete(`${apiUrl}/api/movies/${mov_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${TOKEN}`
        }
      })
  }
  static loginClicked(body) {
    return axios.post(`${apiUrl}/auth/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }
  static registerClicked(body) {
    return axios.post(`${apiUrl}/api/users/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }
}



