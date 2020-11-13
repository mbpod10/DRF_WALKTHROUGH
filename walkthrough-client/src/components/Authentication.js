import React, { useState, useEffect } from 'react'
import { API } from "../Api-Service"
import { useCookies } from 'react-cookie'

const Authentication = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')
  const [isLoginView, setIsLoginView] = useState(true)

  const [token, setToken] = useCookies(['mr-token'])

  // IF TOKEN IS SUCCESSFUL THEN GO TO THE MOVIES LIST
  useEffect(() => {
    console.log(token)
    if (token['mr-token']) window.location.href = "/movies"
  }, [token])
  ////////////////////////////////////////////////////////////////


  const loginClicked = (event) => {
    console.log("Login")
    API.loginClicked({ username: username, password: password })
      .then((response) => {
        setToken('mr-token', response.data.token)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const registerClicked = (event) => {
    console.log("Register")
    API.registerClicked({ username: username, password: password })
      .then((response) => {
        console.log(response.data)
        loginClicked()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div>
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}

        <label htmlFor='username'>Username</label><br />
        <input id='username' type="text" placeholder="username" value={username}
          onChange={event => setUsername(event.target.value)}
        /><br />
        <label htmlFor='password'>Password</label><br />
        <input type='password' id='password' placeholder="Password" value={password}
          onChange={event => setPassword(event.target.value)} /><br />
        {
          isLoginView ?
            <button onClick={loginClicked}>Login</button> :
            <button onClick={registerClicked}>Register</button>
        }
        {
          isLoginView ?
            <p onClick={() => setIsLoginView(false)}>Don't Have An Account? Register Here</p> :
            <p onClick={() => setIsLoginView(true)}>Have An Account? Login Here</p>
        }
      </div>
    </>
  )
}

export default Authentication