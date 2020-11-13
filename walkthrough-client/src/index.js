import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Authentication from "./components/Authentication"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'

const Router = () => {

  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Route exact path="/" component={Authentication} />
          <Route path="/movies" component={App} />
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}
ReactDOM.render(<Router />, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
