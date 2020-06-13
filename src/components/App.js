import React from 'react';
import logo from './images/logo.svg';
import uk from './images/uk.svg';
import ReplacementImage from './images/news.png'
import './styles/App.css';
import Spinner from './Spinner';
import Form from './Form';
import NotFound from './NotFound';
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

  /*
  As soon as the component is rendered, start the spinner component until the fetch for headlines is done and setstate of the data
  */
  componentDidMount(){
    this.setState({fetchInProgress: true})
    fetch('http://newsapi.org/v2/top-headlines?country=gb&apiKey=0d3e47a246944e8d87b889da40165508')
      .then(results => results.json())
      .then(response => {
        this.setState({data: response.articles, headlines: response.articles,fetchInProgress:false});
      });
    }

    /*
    assign the value of the data to the main headlines which was loaded in the mounting stage rather than calling the api again
    */
    getHeadlines(){
      this.setState({data: this.state.headlines})
    }

    /*
    open the article in a new tab
    */
    openInNewTab(url){
      window.open(url, "_blank")
    }

    /*
    on click of the categories in the sidebar, get the articles related to it and re-assign the data object 
    */
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

    /*
    callback function to get the data from the child component - Form component
    */
    handleSearch = (newArticles) => {
      this.setState({data: newArticles})
    };

  render(){
   const subCategories = ["business", "entertainment", "health", "science", "sports", "technology"];
    
    return (
      <React.Fragment>
        {/* call the spinner component if the api fetch call is still in progress */}
        {this.state.fetchInProgress ? <Spinner/> : null}
        <div className= "App">
          {/* Header section displaying the Headline and the logo */}
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="h2" onClick={()=>this.getHeadlines()}>Latest news from the United Kingdom</h2>
            <img src={uk} className="App-uk" alt="UK" />
          </header>

          {/* Sidebar section displaying the categories in UK news */}
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

              {/* Form component used to find any data entered by the user in the text box - satisfying Everything api requirement */}
              <h4 className="pageHead"> Type any topic to get the latest news</h4>
                <Form onSubmit={this.handleSearch} />
            </ul>
            
            {/* Content section where the actual news data got as a response from the api is displayed */}
            {this.state.data ?
            <section className= "content">
              {this.state.data.map(article => 
              <section key={article.title}>
            
                <div className="content-title">{article.title}</div>
                <img className="content-img" src={article.urlToImage} alt="NewsImage" onError={(e) => {e.target.src = ReplacementImage}}/>
                  <div className="content-text">
                    <p className="description" onClick={()=>this.openInNewTab(article.url)}>
                      {article.description ? article.description : "Read Full Article here..."}
                    </p>
                    <p className="author"><b>Author:</b> {article.author}</p>
                    <p className="slide-up-fade-in"><b>Source: </b> {article.source.name}</p>
                    <p className="date"><b>Published on: </b> {article.publishedAt.slice(0,10)}</p>
                  </div>
                  
              </section>
              )}
            </section>
            :
            <NotFound/>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
