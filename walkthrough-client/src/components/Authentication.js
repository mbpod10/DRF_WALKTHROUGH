import React, { useState, useEffect, useContext } from 'react'
import { API } from "../Api-Service"
import { TokenContext } from "../index"
import { useCookies } from 'react-cookie'

const Authentication = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')

  const [token, setToken] = useCookies(['mr-token'])

  useEffect(() => {
    console.log(token)
    // if (token) window.location.href = "/movies"
  }, [token])

  const loginClicked = (event) => {
    console.log("Login")
    API.loginClicked({ username: username, password: password })
      .then((response) => {
        // console.log(response.data.token)
        setToken('mr-token', response.data.token)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div>
        <label htmlFor='username'>Username</label><br />
        <input id='username' type="text" placeholder="username" value={username}
          onChange={event => setUsername(event.target.value)}
        /><br />
        <label htmlFor='password'>Password</label><br />
        <input type='password' id='password' placeholder="Password" value={password}
          onChange={event => setPassword(event.target.value)} /><br />
        <button onClick={loginClicked}>Login</button>
      </div>
    </>
  )
}

export default Authentication