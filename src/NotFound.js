import React from 'react';
import './NotFound.css';
import notfound from './notfound.png'

function NotFound(){

        return (
            <div>
                <div className="NotFound">
                    <img src={notfound} className="img"/>
                </div>
            </div>
        )
}

export default NotFound;