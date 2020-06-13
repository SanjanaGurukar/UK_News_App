import React from "react";
import "./styles/Spinner.css";
import icon from './images/icon-news.svg';

export default class Spinner extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="loading">
        <img src={icon} className="App-logo" alt="icon" />
        </div>
      </React.Fragment>
    );
  }
}
