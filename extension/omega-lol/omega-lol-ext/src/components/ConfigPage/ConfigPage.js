import React from 'react'
import Authentication from '../Authentication/Authentication'
import ConfigContainer from './ConfigContainer/ConfigContainer'

import './Config.css'

const REGION_LIST = [
    'NA',
    'EU',
    'KR',
    'BR',
    'EUNE',
    'EUW',
    'JP',
    'LAN',
    'LAS',
    'OCE',
    'TR',
    'RU',
    'PBE'
];

const API_URL = 'https://262578ce.ngrok.io';
//const API_URL = 'https://ec2-52-11-102-1.us-west-2.compute.amazonaws.com:8000/';
const ENDPOINT = 'streamerSetup'

export default class ConfigPage extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        this.enterSummonerName = this.enterSummonerName.bind(this);
        this.setRegion = this.setRegion.bind(this);
        this.saveConfig = this.saveConfig.bind(this);

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            tempSummonerName: '',
            region: REGION_LIST[0],
        }
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    componentDidMount(){
        // do config page setup as needed here
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
    
            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })

            this.twitch.configuration.onChanged(()=>{
                let config = this.twitch.configuration.broadcaster ? this.twitch.configuration.broadcaster.content : []
                try{
                    config = JSON.parse(config)
                }catch(e){
                    config = []
                }

                this.setState(()=>{
                    return{
                        commands:config
                    }
                })
            })
        }
    }

    enterSummonerName(e) {
        const entry = e.target.value;
        this.setState(() => {
            return {
                tempSummonerName: entry,
            }
        });
    }

    setRegion(e) {
        const region = REGION_LIST[e.target.selectedIndex];
        this.setState(() => {
            return {
                region,
            }
        });
    }

    saveConfig(){
        let date = new Date();
        console.log('DATE: '+date)
        var dayOffset = (12*60*60*1000);
        const dateStr = new Date(date.setTime(date.getTime() - dayOffset)).toISOString().replace('Z','000-00:00');
        console.log('DATE STR: '+dateStr)

        const config = {
            summoner_name: this.state.tempSummonerName,
            region: this.state.region,
            date: dateStr,
        }

        this.twitch.configuration.set('broadcaster', '0.0.1', JSON.stringify(config))

        const body = {
            summoner_name: this.state.tempSummonerName,
            region: this.state.region,
            broadcaster_id: this.Authentication.getUserId(),
            stream_start_time: dateStr,
        }
        console.log(body)
        const url = `${API_URL}/${ENDPOINT}`;
        fetch(url, {
			method : "POST",
			body : JSON.stringify(body),
		}).then(response=>console.log(response.json()));

        // send post request to server with
        /* 
            {
                summoner_name: this.state.tempSummoner,
                region: this.state.region,
                userID: this.Authentication.getUserId(),
            }
        */
    }

    render(){
        if(this.state.finishedLoading && this.Authentication.isModerator()){
            return(
                <div class="omegaLOL-dash--frame">
                    <div class="omegaLOL-dash">
                        <div class="omegaLOL-dash--inner">
                            <div class="dash-row">
                                <div class="dash-logo">
                                    <img src="http://oi65.tinypic.com/nbp640.jpg" alt=""/>
                                </div>
                                <h2 class="dash-title">Welcome to <span>OmegaLOL!</span></h2>
                                <p>To get set up we'll need your summoner name and region:</p>
                            </div>
                            <div class="dash-row">
                                <label for="summoner">Summoner Name:</label>
                                <input value={this.state.tempSummonerName} onChange={this.enterSummonerName} id="summoner" type="text"/>
                            </div>
                            <div class="dash-row">
                                <span class="label-span">Region:</span>
                                <select onChange={this.setRegion} name="" id="">
                                    {REGION_LIST.map((region) => {
                                        return(
                                            <option key={region} value={region}>{region}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div class="dash-row">
                                <div class="button-frame">
                                    <button onClick={this.saveConfig}>Complete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        Loading...
                    </div>
                </div>
            );
        }
    }
}