import React from 'react';
import axios from 'axios';
import './styles/Form.css';
import Spinner from './Spinner';

export default class Form extends React.Component {
    state = { search: '', onLoad: false };
      
    handleSubmit = async (event) => {
      event.preventDefault();
      this.setState({onLoad: true})
      const resp = await axios.get(`https://newsapi.org/v2/everything?q=${this.state.search}&apiKey=0d3e47a246944e8d87b889da40165508`);
      this.props.onSubmit(resp.data.articles);
      this.setState({ search: '', onLoad:false });
    };
   
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.state.onLoad ? <Spinner /> : null}
            <input 
              className="text-area"
              type="text" 
              value={this.state.search}
              onChange={event => this.setState({ search: event.target.value })}
              placeholder="Type Anything..." 
              required 
            />
            <button className="button">Search</button>
          </form>
        );
      }
  }