import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import RecordedMatch from '../RecordedMatch/RecordedMatch';

// import './MatchHistoryPanel.css'

const API_URL = 'https://cors-anywhere.herokuapp.com/https://b7143526.ngrok.io/';
const MATCH_HIST_ENDPOINT = 'getMatchHistory';

export default class MatchHistoryPanel extends React.Component{  

	constructor(props) {
		super(props);

		this.pollForMatchHistory = this.pollForMatchHistory.bind(this);

		this.state = {
			matchHistory: [],
		}
	}
	
	componentDidUpdate() {
		if(this.props.isActive) {
			console.log('polling for matches')
			this.pollForMatchHistory();
		}
	}

	pollForMatchHistory() {
		const url = `${this.props.apiURL}${MATCH_HIST_ENDPOINT}`;
		const x = fetch(url, {
			method : "POST",
			body : JSON.stringify({
				summoner_name: this.props.summonerName,
				region: this.props.region,
				stream_start_time: this.props.streamStartDate,
			}),
		});

		console.log(x);

		x.then(response => response.json())
        .then(json => {
			console.log('unparsed: '+json)
			//const js = json.replace(/'/g, '"');

			let matches = [];

			let wins = 0;
			let losses = 0;

			for(var x of json) {
				console.log(x.match_id);
				console.log(x.champion_name);
				matches.push({
					matchID: x.match_id,
					win: x.win,
					kills: x.kills,
					deaths: x.deaths,
					assists: x.assists,
					championName: x.champion_name,
					championID: x.champion_id,
					clips: [],
				});

				if(x.win) {
					wins++
				} else {
					losses++
				}
			}

			this.props.updateWins(wins)
			this.props.updateLosses(losses)

			this.setState(() => {
				return {
					matchHistory: matches,
				}
			});

			console.log('setting state')
            return json;
        })
	}

    render(){
		const matches = this.state.matchHistory.map((m) => {
			console.log('parsing match')

			console.log(m.win)

			return (
				<div>
					<RecordedMatch
						key={m.matchID}
						win={m.win}
						kills={m.kills}
						deaths={m.deaths}
						assists={m.assists}
						championName={m.championName}
						championID={m.championID}
						clips={m.clips}
					/>
				</div>
			);
		})
			// {this.state.matchHistory === [] ? <LoadingSpinner/> : matches}
        return(
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'scroll' }} id="container">
				{this.state.matchHistory.length === 0 ? <LoadingSpinner/> : matches}
            </div>
        );
    }
}