import React from 'react'

import './RecordedMatch.css'

const CHAMPION_ICONS = {
	266: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Aatrox.png",
	103: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ahri.png",
	84: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Akali.png",
	12: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Alistar.png",
	32: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Amumu.png",
	34: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Anivia.png",
	1: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Annie.png",
	22: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ashe.png",
	136: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/AurelionSol.png",
	268: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Azir.png",
	432: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Bard.png",
	53: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Blitzcrank.png",
	63: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Brand.png",
	201: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Braum.png",
	51: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Caitlyn.png",
	164: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Camille.png",
	69: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Cassiopeia.png",
	31: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Chogath.png",
	42: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Corki.png",
	122: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Darius.png",
	131: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Diana.png",
	119: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Draven.png",
	36: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/DrMundo.png",
	245: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ekko.png",
	60: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Elise.png",
	28: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Evelynn.png",
	81: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ezreal.png",
	9: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Fiddlesticks.png",
	114: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Fiora.png",
	105: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Fizz.png",
	3: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Galio.png",
	41: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Gangplank.png",
	86: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Garen.png",
	150: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Gnar.png",
	79: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Gragas.png",
	104: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Graves.png",
	120: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Hecarim.png",
	74: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Heimerdinger.png",
	420: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Illaoi.png",
	39: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Irelia.png",
	427: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ivern.png",
	40: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Janna.png",
	59: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/JarvanIV.png",
	24: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Jax.png",
	126: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Jayce.png",
	202: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Jhin.png",
	222: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Jinx.png",
	145: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kaisa.png",
	429: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kalista.png",
	43: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Karma.png",
	30: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Karthus.png",
	38: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kassadin.png",
	55: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Katarina.png",
	10: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kayle.png",
	141: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kayn.png",
	85: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kennen.png",
	121: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Khazix.png",
	203: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kindred.png",
	240: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Kled.png",
	96: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/KogMaw.png",
	7: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Leblanc.png",
	64: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/LeeSin.png",
	89: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Leona.png",
	127: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Lissandra.png",
	236: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Lucian.png",
	117: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Lulu.png",
	99: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Lux.png",
	54: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Malphite.png",
	90: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Malzahar.png",
	57: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Maokai.png",
	11: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/MasterYi.png",
	21: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/MissFortune.png",
	62: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/MonkeyKing.png",
	82: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Mordekaiser.png",
	25: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Morgana.png",
	267: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Nami.png",
	75: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Nasus.png",
	111: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Nautilus.png",
	76: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Nidalee.png",
	56: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Nocturne.png",
	20: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Nunu.png",
	2: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Olaf.png",
	61: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Orianna.png",
	516: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ornn.png",
	80: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Pantheon.png",
	78: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Poppy.png",
	555: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Pyke.png",
	133: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Quinn.png",
	497: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Rakan.png",
	33: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Rammus.png",
	421: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/RekSai.png",
	58: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Renekton.png",
	107: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Rengar.png",
	92: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Riven.png",
	68: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Rumble.png",
	13: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ryze.png",
	113: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Sejuani.png",
	35: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Shaco.png",
	98: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Shen.png",
	102: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Shyvana.png",
	27: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Singed.png",
	14: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Sion.png",
	15: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Sivir.png",
	72: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Skarner.png",
	37: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Sona.png",
	16: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Soraka.png",
	50: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Swain.png",
	134: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Syndra.png",
	223: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/TahmKench.png",
	163: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Taliyah.png",
	91: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Talon.png",
	44: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Taric.png",
	17: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Teemo.png",
	412: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Thresh.png",
	18: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Tristana.png",
	48: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Trundle.png",
	23: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Tryndamere.png",
	4: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/TwistedFate.png",
	29: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Twitch.png",
	77: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Udyr.png",
	6: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Urgot.png",
	110: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Varus.png",
	67: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Vayne.png",
	45: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Veigar.png",
	161: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Velkoz.png",
	254: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Vi.png",
	112: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Viktor.png",
	8: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Vladimir.png",
	106: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Volibear.png",
	19: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Warwick.png",
	498: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Xayah.png",
	101: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Xerath.png",
	5: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/XinZhao.png",
	157: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Yasuo.png",
	83: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Yorick.png",
	154: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Zac.png",
	238: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Zed.png",
	115: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ziggs.png",
	26: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Zilean.png",
	142: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Zoe.png",
	143: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Zyra.png"
};

export default class RecordedMatch extends React.Component{  
		constructor(props) {
			super(props);

			this.toggleExpanded = this.toggleExpanded.bind(this);
			this.goToClip = this.goToClip.bind(this);

			this.state = {
				expanded: false,
			}
		}

		toggleExpanded() {
			this.setState(() => {
				return {
					expanded: !this.state.expanded
				}
			})
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

    render(){
			const lulURL = 'https://static-cdn.jtvnw.net/emoticons/v1/425618/2.0';
			const pogURL = 'https://static-cdn.jtvnw.net/emoticons/v1/88/2.0';

        return(
        <div class={this.props.win ? `match-list--match match-victory ${this.state.expanded ? 'expand' : ''}` : `match-list--match match-defeat ${this.state.expanded ? 'expand' : ''}`}>
			    <div onClick={this.toggleExpanded} className="match-top">
					<div className="left">
					<div className="played">
						<div className="champion">
							<div className="champion--inner" style={{ backgroundImage: `url(${CHAMPION_ICONS[parseInt(this.props.championID, 10)]})` }}>
								<img src="http://ddragon.leagueoflegends.com/cdn/8.8.1/img/champion/Kaisa.png" alt=""/>
							</div>
						</div>
					</div>
					<div className="info">
						<div className="result"><span>{this.props.win ? "Victory" : "Defeat"}</span></div>
						<div className="time">24 mins ago</div>
					</div>
				</div>
				<div className="metrics">
					<div className="metric metric-kda">
						<span className="metric--major">{this.props.kills}/{this.props.deaths}/{this.props.assists}</span>
						<span className="metric--minor">KDA</span>
					</div>
				</div>
				</div>
				<div className="match-bottom">
					<h4 className="clips-title">This games clips</h4>
					<ul className="match-clips">
						<li className="clip">
							<a href="#0" className="clip-link">
								<div className="clip-emote">
									<img src={lulURL} />
								</div>
								<div className="clip-text">
									<span onClick={this.goToClip} className="clip-url">https://clips.twitch.tv/DiligentCuriousNewtSoonerLater</span>
								</div>
							</a>
						</li>
						<li className="clip">
							<a href="#0" className="clip-link">
								<div className="clip-emote">
									<img src={lulURL} />
								</div>
								<div className="clip-text">
									<span onClick={this.goToClip} className="clip-url">https://clips.twitch.tv/DiligentCuriousNewtSoonerLater</span>
								</div>
							</a>
						</li>
						<li className="clip">
							<a href="#0" className="clip-link">
								<div className="clip-emote">
									<img src={pogURL} />
								</div>
								<div className="clip-text">
									<span onClick={this.goToClip} className="clip-url">https://clips.twitch.tv/DiligentCuriousNewtSoonerLater</span>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
        );
    }
}