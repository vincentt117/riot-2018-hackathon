import React from 'react'

import './ExpandButton.css'

export default class ExpandButton extends React.Component{  
    render(){
        return(
            <div style={{ width: '100%', height: '100%', position: 'relative' }} id="container">
                <button className="learn-more" onClick={this.props.toggleExpanded}>
                    <div className="circle">
                        <span className="icon arrow"></span>
                    </div>
                    <p className="button-text">See Match Stats</p>
                </button>
            </div>
        );
    }
}