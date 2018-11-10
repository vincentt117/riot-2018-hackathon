import React from 'react'

import './ExpandButton.css'

let poller;

const GET_CLIP_ENDPOINT = 'getLatestClip';
const MOOD = {
    NEUTRAL: 0,
	WIN: 1,
	LOSE: 2,
}

export default class ExpandButton extends React.Component{  
    constructor(props) {
        super(props);

        this.pollForClip = this.pollForClip.bind(this);
        this.displayNewClip = this.displayNewClip.bind(this);
        this.goToClip = this.goToClip.bind(this);

        this.state = {
            clip: {},
            mood: MOOD.NEUTRAL,
            clipURL: '',
            clipType: '',
        }
    }

    componentDidMount() {
    	poller = setInterval(this.pollForClip, 5000)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prev state')
        console.log(prevState)
        console.log('curr state')
        console.log(this.state)

        if (prevState.clipURL !== this.state.clipURL) {
            this.displayNewClip(this.state.clipURL, this.state.clipType)
        }
    }

    componentWillUnmount() {
    	clearInterval(poller);
	}

    displayNewClip(url, type) {
        console.log('DISPLAYING CLIP')

        const icon = document.getElementById('icon')
        icon.classList.add('clipped-entrance');
        window.setTimeout(function(){
            icon.classList.remove('clipped-entrance')
            icon.classList.add('clipped-exit')// removeClass('clipped-entrance').addClass('clipped-exit');
        }, 10000);
        window.setTimeout(function(){
            icon.classList.remove('clipped-exit')
        }, 13000);
        console.log('got new clip, url is',url,'type is',type);
    }

    goToClip(e) {
        // window.open(e.target.innerText, '_blank');

        const str = e.target.innerText;

        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log('copied', str, 'to clipboard!')
    }


    pollForClip() {
		console.log('polling for clip')
		const url = `${this.props.apiURL}${GET_CLIP_ENDPOINT}`;
		const x = fetch(url, {
			method : "GET",
		});

		console.log(x);

		x.then(response => response.json())
        .then(json => {
            
            if (this.state.clipURL !== json.clip_url) {
                console.log('got clip of type '+json.clip_type)

                this.setState(() => {
                    return {
                        clipURL: json.clip_url.split('/edit')[0],
                        clipType: json.clip_type,
                    }
                });
            }
            return json;
        })
	}

    render(){
        let face = 'zzz';
        if (this.props.wins > this.props.losses) {
            face = 'pog'
        } else if (this.props.wins < this.props.losses) {
            face = 'lul'
        }

        return(
            <div style={{ width: '100%', height: '100%', position: 'relative' }} id="container">
                <div id="icon" className="player">

                    <div className="icon">
                        <div className="icon--frame">
                            <div
                                className={`icon--notification ${this.state.clipType === 'LUL' || this.state.clipType === 'HA' ? 'lul' : 'pog'}`}
                                onClick={this.goToClip}
                            >
                                {this.state.clipURL}
                            </div>
                            <div className="icon--jinx" onClick={this.props.toggleExpanded}>
                                <div className={`jinx-face ${face}`}></div>
                            </div>
                            <div className="icon--record">
                                <div className="icon--record-wins">{this.props.wins >= 0 ? this.props.wins : '?'}</div>
                                <div className="icon--record-sep">-</div>
                                <div className="icon--record-losses">{this.props.losses >= 0 ? this.props.losses : '?'}</div>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
        );
    }

    /*
                    <button className="learn-more" onClick={this.props.toggleExpanded}>
                    <div className="circle">
                        <span className="icon arrow"></span>
                    </div>
                    <p className="button-text">See Match Stats</p>
                </button>
    */
}