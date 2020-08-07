import React from 'react';

import './Jumbotron-Style.css';

const JumbotronComponent = ({params:{h1Text, pText, bText, imageUrl, inverted}}) => (
        
    
    <div className="jumbotron-container">

        
        <div className="jumbotron-text">
            
            <h1 className="jumbotron-title">{h1Text}</h1>
            <p className="jumbotron-content">{pText}</p>
            {bText ? 
                <div className="button-style">
                    <img src="https://i.imgur.com/SE2JiQf.png" className="button-image"></img>{bText}
                </div> : null}
        
        </div>
        
        
        {imageUrl ? <div className={inverted ? "CTA-image inverted" : "CTA-image"} >
            <img src={imageUrl} alt="A CTA"/>
        </div> : null}
    </div>
);

export default JumbotronComponent;