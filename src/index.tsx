import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import styled from 'styled-components';

const HeadLinks = styled.div`
  background-color: blue;
  a {
    font-size: 20px;
    line-height: 28px;
    color: #fff;
    display: inline-block;
    margin-right: 15px;
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <HeadLinks>
          <Link to="/">HOME</Link>
          <Link to="/form">FORM</Link>
        </HeadLinks>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
