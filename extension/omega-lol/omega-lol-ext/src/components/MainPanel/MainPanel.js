import React from 'react'
import CurrentMatchPanel from '../CurrentMatchPanel/CurrentMatchPanel'
import MatchHistoryPanel from '../MatchHistoryPanel/MatchHistoryPanel'

import './MainPanel.css'

let dragItem;
let container;
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

export default class MainPanel extends React.Component{  
    constructor(props) {
        super(props);

        //this.setWins = this.setWins.bind(this);
        //this.setLosses = this.setLosses.bind(this);
        this.drag = this.drag.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.setTranslate = this.setTranslate.bind(this);
        this.togglePanel = this.togglePanel.bind(this);

        this.state = {
            active:false,
        }
    }

    dragStart(e) {
        /*if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
		
        if (e.target === dragItem) {
            this.setState(()=>{
                return {
                    active:true
                }
            })
        }*/
    }

    dragEnd() {
        /*initialX = currentX;
        initialY = currentY;

        this.setState(()=>{
            return {
              active:false
            }
        });*/
    }

    drag(e) {
        /*if (this.state.active) {
            e.preventDefault();
          
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            this.setTranslate(currentX, currentY, dragItem);
        }*/
    }

    setTranslate(xPos, yPos, el) {
      // 	el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    componentDidUpdate(prevProps) {
        console.log('received update in mainpanel.js')
        if (prevProps.isExpanded !== this.props.isExpanded) {
            this.togglePanel();
        }
    }

    componentDidMount() {
        dragItem = document.getElementById("panel");
        container = document.getElementById("container");

        dragItem.style.transform = "";
        initialX = 0;
        initialY = 0;
        xOffset = 0;
        yOffset = 0;

        container.addEventListener("touchstart", this.dragStart, false);
        container.addEventListener("touchend", this.dragEnd, false);
        container.addEventListener("touchmove", this.drag, false);
      
        container.addEventListener("mousedown", this.dragStart, false);
        container.addEventListener("mouseup", this.dragEnd, false);
        container.addEventListener("mousemove", this.drag, false);
    }

    togglePanel() {
        console.log('toggling panel vis')
        const container = document.getElementById("maincontainer");
        if(this.props.isExpanded) {
            container.classList.add('panel-open');
        } else {
            container.classList.remove('panel-open');
        }
    }

    render(){
        return(
            <div className="omegaLOL" id="maincontainer">
                <div className="omegaLOL-frame--outer" id="panel">
                    <div className="omegaLOL-frame--inner">
                        <div 
                            onClick={this.props.toggleExpanded}
                            style={{ cursor: 'pointer', top: 0, right: '-1.5rem', position: 'absolute', color:'white' }}
                        >
                            X
                        </div>
                        <div className="session-header">
                            <div className="session-title"><span>Today</span></div>
                            <div className="session-record">
                                <div className="session-wins"><span>{this.props.wins > -1 ? this.props.wins : '?'}</span></div>
                                <div className="session-sep"></div>
                                <div className="session-losses"><span>{this.props.losses > -1 ? this.props.losses : '?'}</span></div>
                            </div>
                        </div>
                        <MatchHistoryPanel
                            streamStartDate={this.props.streamStartDate}
                            summonerName={this.props.summonerName}
                            region={this.props.region}
                            updateWins={this.props.updateWins}
                            updateLosses={this.props.updateLosses}
                            apiURL={this.props.apiURL}
                            isActive={this.props.isExpanded}
                        />
                        <div className="match-list">
                            <div className="matches"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
	}
    
    /*
                <div id="container">
                <div className="omegaLOL-frame--outer" id="panel">
                    <div className="omegaLOL-frame--inner">
                        <div className="session-header">
                            <div className="session-title"><span>Today</span></div>
                            <div className="session-record">
                                <div className="session-wins">8</div>
                                <div className="session-sep"></div>
                                <div className="session-losses">2</div>
                            </div>
                        </div>
                        <div className="match-list">
                            <div className="matches"></div>
                        </div>
                    </div>
                </div>
            </div>
    */

	/*
	            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', position: 'absolute', top: '8rem' }} id="container">
                <div id="panel" style={{ position: 'relative', height: '12rem', width: '12rem', backgroundColor: 'black', color: 'white' }}>
					<button style={{ position: 'absolute', right: '-1rem', marginLeft: '1rem' }} onClick={this.props.toggleExpanded}>
						X
					</button>
					<div className="">
						<CurrentMatchPanel/>
					</div>
				</div> 
			</div>
	*/
}