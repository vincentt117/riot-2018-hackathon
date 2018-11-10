import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

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

export default class ConfigPage extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        this.enterSummonerName = this.enterSummonerName.bind(this);
        this.setRegion = this.setRegion.bind(this);
        this.displayInfo = this.displayInfo.bind(this);

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            tempSummonerName: '',
            region: '',
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

    displayInfo() {
        console.log(this.state)
    }

    render(){
        if(this.state.finishedLoading && this.Authentication.isModerator()){
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        <div style={{ padding: '1rem', width: '100%', height: '100%', backgroundColor: 'black', color: 'white' }}>
                            <p>Welcome to Omega-LoL</p>
                            <p>To get set up, we'll need your Summoner Name and Region</p>
                            <div>
                                Summoner Name
                                <input value={this.state.tempSummonerName} onChange={this.enterSummonerName}/>
                            </div>
                            <div>
                                Region
                                <select onChange={this.setRegion}>
                                    {REGION_LIST.map((region) => {
                                        return(
                                            <option key={region} value={region}>{region}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <button onClick={this.displayInfo}>Complete Setup</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        Loading...
                    </div>
                </div>
            )
        }
    }
}