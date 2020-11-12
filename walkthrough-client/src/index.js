import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Authentication from "./components/Authentication"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';

export const TokenContext = createContext(null)

const Router = () => {

  const [token, setToken] = useState('')

  return (

    <React.StrictMode>
      <TokenContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Route exact path="/" component={Authentication} />
          <Route path="/movies" component={App} />
        </BrowserRouter>
      </TokenContext.Provider>
    </React.StrictMode>

  )
}

ReactDOM.render(<Router />, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
