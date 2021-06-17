import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import styled from 'styled-components';

const HeadLinks = styled.div`
  background-color: #88b3bf;
  padding: 10px 15px;
  a {
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    display: inline-block;
    margin-right: 15px;
    text-decoration: none;
    transition: all 0.3s ease;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      opacity: 0.6;
    }
    &.active {
      text-decoration: underline;
      pointer-events: none;
    }
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <HeadLinks>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/gallery">
            Add photos
          </NavLink>
          <NavLink activeClassName="active" to="/trello">
            Trello
          </NavLink>
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
