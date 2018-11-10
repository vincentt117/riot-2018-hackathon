import React from 'react'
import ExpandButton from '../ExpandButton/ExpandButton';
import MainPanel from '../MainPanel/MainPanel';
import Authentication from '../../util/Authentication/Authentication'

import './App.css'

const API_URL = 'https://262578ce.ngrok.io/';
//const API_URL = 'https://ec2-52-11-102-1.us-west-2.compute.amazonaws.com:8000/';
const MATCH_HIST_ENDPOINT = 'getMatchHistory';

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.updateWins = this.updateWins.bind(this);
        this.updateLosses = this.updateLosses.bind(this);

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            isVisible:true,
            isExpanded:false,
            summonerName:'',
            region:'',
            streamStartDate:'',
            wins:-1,
            losses:-1,
        }
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    visibilityChanged(isVisible){
        this.setState(()=>{
            return {
                isVisible
            }
        })
    }

    toggleExpanded() {
        console.log('toggling expanded in app.js')
        this.setState(() => {
            return {isExpanded: !this.state.isExpanded}
        })
    }

    updateWins(wins) {
        this.setState(() => {
            return {
                wins
            }
        });
    }

    updateLosses(losses) {
        this.setState(() => {
            return {
                losses
            }
        });
    }

    componentDidMount(){
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)
                if(!this.state.finishedLoading){
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(()=>{
                        return {finishedLoading:true}
                    })
                }
            })

            this.twitch.listen('broadcast',(target,contentType,body)=>{
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result... 

                // do something...

            })

            this.twitch.onVisibilityChanged((isVisible,_c)=>{
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })

            this.twitch.configuration.onChanged(()=>{
                let config = this.twitch.configuration.broadcaster ? this.twitch.configuration.broadcaster.content : ''
                try{
                    config = JSON.parse(config)
                }catch(e){
                    config = ''
                }

                console.log('initial fetch with')
                console.log({
                    summoner_name: config.summoner_name,
                    region: config.region,
                    stream_start_time: config.date,
                })
    
                const url = `${API_URL}${MATCH_HIST_ENDPOINT}`;
                const x = fetch(url, {
                    method : "POST",
                    body : JSON.stringify({
                        summoner_name: config.summoner_name,
                        region: config.region,
                        stream_start_time: config.date,
                    }),
                });
        
                console.log(x);
        
                x.then(response => response.json())
                .then(json => {
                    let wins = 0;
                    let losses = 0;
        
                    for(var x of json) {
                        if(x.win) {
                            wins++
                        } else {
                            losses++
                        }
                    }
        
                    this.updateWins(wins)
                    this.updateLosses(losses)
                    return json;
                })

                this.setState(() => {
                    return {
                        summonerName: config.summoner_name,
                        region: config.region,
                        streamStartDate: config.date,
                    }
                });
            })
        }
    }

    componentWillUnmount(){
        if(this.twitch){
            this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
        }
    }
    
    render(){
        console.log(this.state.summonerName)
        console.log(this.state.region)
        console.log(this.state.streamStartDate)
        if(this.state.finishedLoading && this.state.isVisible){
            return (
                <div className="App">
                    <div 
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                        }}
                        className={this.state.theme === 'light' ? 'App-light' : 'App-dark'}
                    >
                        <ExpandButton
                            wins={this.state.wins}
                            losses={this.state.losses}
                            apiURL={API_URL}
                            toggleExpanded={this.toggleExpanded}
                        />
                        <MainPanel
                            summonerName={this.state.summonerName}
                            region={this.state.region}
                            streamStartDate={this.state.streamStartDate}
                            toggleExpanded={this.toggleExpanded}
                            isExpanded={this.state.isExpanded}
                            wins={this.state.wins}
                            losses={this.state.losses}
                            updateWins={this.updateWins}
                            updateLosses={this.updateLosses}
                            apiURL={API_URL}
                        />
                    </div>
                </div>
            )
        }else{
            return (
                <div className="App">
                </div>
            )
        }

    }
}