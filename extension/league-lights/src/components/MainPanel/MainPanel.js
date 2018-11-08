import React from 'react'

// import './MainPanel.css'

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

		this.drag = this.drag.bind(this);
		this.dragStart = this.dragStart.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.setTranslate = this.setTranslate.bind(this);

		this.state = {
			active:false,
		}
	}

    dragStart(e) {
	console.log('a')
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

	  console.log(dragItem)
	  console.log(e.target)
		
      if (e.target === dragItem) {
		console.log('boom')
        this.setState(()=>{
            return {
                active:true
            }
        })
      }
    }

    dragEnd() {
		console.log('b')
      initialX = currentX;
      initialY = currentY;

      this.setState(()=>{
		return {
			active:false
		}
	})
    }

    drag(e) {
		console.log('c')
      if (this.state.active) {
      
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
      }
    }

    setTranslate(xPos, yPos, el) {
		console.log('settranslate')
      	el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
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

    render(){
        console.log(this.props.toggleExpanded);

        return(
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', position: 'absolute', top: '8rem' }} id="container">
                <div id="panel" style={{ position: 'relative', height: '12rem', width: '12rem', backgroundColor: 'black', color: 'white' }}>
					<button style={{ position: 'absolute', right: '-1rem', marginLeft: '1rem' }} onClick={this.props.toggleExpanded}>
						X
					</button>
					kappa kappa kappa	
				</div> 
            </div>
        );
    }
}