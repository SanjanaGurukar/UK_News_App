import React from 'react';
import './styles/NotFound.css';
import notfound from './images/notfound.png'

function NotFound(){

        return (
            <div>
                <div className="NotFound">
                    <img src={notfound} className="img" alt="404 Not Found!"/>
                </div>
            </div>
        )
}

export default NotFound;