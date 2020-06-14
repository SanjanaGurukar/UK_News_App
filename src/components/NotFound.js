import React from 'react';
import './styles/NotFound.css';
import notfound from './images/news.png'

function NotFound(){

        return (
            <div>
                <div className="NotFound">
                    <img src={notfound} className="img" alt="404 Not Found!"/>
                    <p className="notfound-text">&#8592; Click on any topic or search for anything &#8592;</p>
                </div>
            </div>
        )
}

export default NotFound;