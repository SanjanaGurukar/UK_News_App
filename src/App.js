import React from 'react';
import logo from './logo.svg';
import uk from './uk.svg';
import './App.css';
import Spinner from './Spinner';
const classNames = require('classnames');


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data : null,
      subCategory : null,
      headlines: null,
      fetchInProgress: false
    }
  }

  componentDidMount(){
    this.setState({fetchInProgress: true})
    fetch('http://newsapi.org/v2/top-headlines?country=gb&apiKey=0d3e47a246944e8d87b889da40165508')
      .then(results => results.json())
      .then(response => {
        this.setState({data: response.articles, headlines: response.articles,fetchInProgress:false});
      });
    }

    getHeadlines(){
      this.setState({data: this.state.headlines})
    }

    onClick(category){
      this.setState({fetchInProgress: true})
      fetch(`http://newsapi.org/v2/top-headlines?country=gb&category=${category}&apiKey=0d3e47a246944e8d87b889da40165508`)
      .then((results) => {
        return results.json();
      }) 
      .then((response) => {
        this.setState({ data: response.articles, subCategory: category, fetchInProgress:false })                
      })
      .catch((error) => {
        console.log(error, "catch the hoop")
        this.setState({fetchInProgress: false})
      })
    }

  render(){
    
   const subCategories = ["business", "entertainment", "health", "science", "sports", "technology"];
    
   return (
    <React.Fragment>
      {this.state.fetchInProgress ? <Spinner/> : null}
    <div className= "App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="h2" onClick={()=>this.getHeadlines()}>Latest news from the United Kingdom</h2>
        <img src={uk} className="App-uk" alt="UK" />
      </header>
      
      <div className="layout-row">
        <ul className="sidebar">
          {subCategories.map((category) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.subCategory === category
                })
              }
              onClick={() => this.onClick(category)}
              key={category}>
                <a>{category}</a>
              </li>
            )
          })}
        </ul>
        
        {this.state.data !== null ?
        <section className= "content">
           {this.state.data.map(article => 
          <section key={article.title}>
         
        <div className="content-title">{article.title}</div>
        <img className="content-img" src={article.urlToImage} alt="NewsImage"/>
            <div className="content-text">
              <p className="description"><b>Full article:</b> <a href={article.url}>{article.description}</a></p>
              <p className="author"><b>Author:</b> {article.author}</p>
              <p className="slide-up-fade-in"><b>Source: </b> {article.source.name}</p>
              <p className="date"><b>Published on: </b> {article.publishedAt.slice(0,10)}</p>
            </div>
           <hr/>
          </section>
          )}
        </section>
        :
        null}
      </div>
    </div>
    
    </React.Fragment>
  );
  }
}
