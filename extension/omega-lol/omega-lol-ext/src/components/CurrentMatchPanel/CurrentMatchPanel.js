import React from 'react'
import RecordedMatch from '../RecordedMatch/RecordedMatch'
import { resolve } from 'rsvp';

// import './CurrentMatchPanel.css'

const API_URL = 'https://cors-anywhere.herokuapp.com/https://ff9628df.ngrok.io/';
const MATCH_STATE_ENDPOINT = 'getMatch';
const MATCH_HIST_ENDPOINT = 'getMatchHistory';
const SUMMONER_NAME = 'imaqtpie';
const REGION = 'NA';
const MATCH_STATE = {
	LOADING: 1,
	ACTIVE: 2,
	ENDED: 3,
	INACTIVE: 4,
}

let poller;

export default class CurrentMatchPanel extends React.Component{
    constructor(props) {
		super(props);

		this.pollForNewGame = this.pollForNewGame.bind(this);
		this.enterSummoner = this.enterSummoner.bind(this);
		this.submitSummoner = this.submitSummoner.bind(this);
		// this.checkMatchState = this.checkMatchState.bind(this);

		this.state = {
			match:MATCH_STATE.LOADING,
			summoner:SUMMONER_NAME,
			matchID:'-1',
			temp_summoner:'',
		}
    }

    componentDidMount() {
    	poller = setInterval(this.pollForNewGame, 5000)
    }

    componentWillUnmount() {
    	clearInterval(poller);
	}
	
	enterSummoner(e) {
		const val = e.target.value

		this.setState(() => {
			return {
				temp_summoner: val,
			}
		});
	}

	submitSummoner() {
		const temp = this.state.temp_summoner;
		this.setState(() => {
			return {
				summoner: this.state.temp_summoner,
				match: MATCH_STATE.LOADING,
			}
		});
	}
	
	pollForNewGame() {
		console.log('polling for new game')
		const url = `${API_URL}${MATCH_STATE_ENDPOINT}`;
		const x = fetch(url, {
			method : "POST",
			body : JSON.stringify({
				summoner_name: this.state.summoner,
				region: REGION,
			}),
		});

		console.log(x);

		x.then(response => response.json())
        .then(json => {
			console.log('then!!')
			console.log('unparsed: '+json)
			const js = json.replace(/'/g, '"');
			const parsedJS = JSON.parse(js);
			console.log(parsedJS)

			let newMatchState;
			switch(parsedJS.match_status) {
				case -1:
					newMatchState = MATCH_STATE.INACTIVE;
					break;
				default:
					newMatchState = MATCH_STATE.ACTIVE;
			}
			console.log(newMatchState)
			this.setState(() => {
				return {
					match: newMatchState,
					matchID: parsedJS.match_status,
				}
			});
            return json;
        })
		/*
		then(
			response => {
				// console.log(response)
				console.log(response.text())

				let newMatchState;
				switch(response.text()) {
					case 'active':
						newMatchState = MATCH_STATE.ACTIVE;
						break;
					default:
						newMatchState = MATCH_STATE.LOADING;
				}
				console.log(newMatchState)
				this.setState(() => {
					return {
						match: newMatchState,
					}
				});
			}
		);
		*/
	}

	/*this.setState(() => {
		return {
			match: newMatchState,
		}
	});*/

    render(){
		console.log(this.state)

		let matchStatePanel = (
			<div>
				Loading Current Match...
			</div>
		)
		switch(this.state.match) {
			case MATCH_STATE.INACTIVE:
				matchStatePanel = (
					<div>
						No Active Match for {this.state.summoner}
					</div>
				)
				break;
			case MATCH_STATE.ACTIVE:
				matchStatePanel = (
					<div>
						{this.state.summoner} is in a Match!
						ID is {this.state.matchID}
					</div>
				);
				break;
			default:
				break;
		}

        return(
			<div>
				<div style={{ backgroundColor: 'blue', color: 'white', width: '40%', height: '40%', position: 'relative' }} id="container">
					{matchStatePanel}
				</div>
				<div style={{ backgroundColor: 'orange', color: 'black', width: '40%', height: '40%', position: 'relative' }}>
					Get status for NA summoner: <input value={this.state.temp_summoner} onChange={this.enterSummoner.bind(this)}/>
					<button style={{ backgroundColor: 'green' }} onClick={this.submitSummoner}>Search</button>
				</div>
				<RecordedMatch/>
			</div>
        );
    }
}