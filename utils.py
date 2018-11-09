import os
import arrow
import cassiopeia as cass
from time import sleep
import time
import requests
import logging
import json
import os
import threading

from twitchchat import twitch_chat
#import data_handler

from cassiopeia.core import Summoner, MatchHistory, Match

# constants/init variables
cass.set_riot_api_key("RGAPI-52e11cdb-3e82-43f6-b615-c03d083800d1")
cass.set_default_region("NA")


""" #cannot include these in main otherwise they are run everytime a function is called
player = cass.Summoner(name="Darshan", region="NA")


# get last 15 match IDs
match = player.match_history[0]
match_id = match.id

# Current champion playing
champion_played = match.participants[player].champion
print(champion_played)

# Champions the person is good with
good_with = player.champion_masteries.filter(lambda cm: cm.level >= 6)
print([cm.champion.name for cm in good_with])


"""

# find and return all matches from the time at the start of the stream

def fetchMatchHistory(name, region, stream_start_time):
    player = cass.Summoner(name=name, region=region)
    start_time = arrow.get(stream_start_time)  
    end_time = arrow.now()
    match_history = MatchHistory(summoner=player, begin_time=start_time, end_time=end_time)

    match_data = []
    for match in match_history:
        #print(match.id)
        p = match.participants[player]
        #print("\nSince the match was created from a matchref, we only know one participant:")
        #print(p.summoner.name, 'playing', p.champion.name)
        #print(p.id, p.summoner.account.id, p.summoner.region, p.participantstats.kills, p.participantstats.deaths, p.participantstats.assists)
        match_dict = {}
        match_dict.update({
            'match_id': match.id,
            'win': p.stats.win,
            'kills': p.stats.kills,
            'deaths': p.stats.deaths,
            'assists': p.stats.assists,
            'champion_id': p.champion.id,
            'champion_name': p.champion.name
            })
        match_data.append(match_dict)
        print(match.id, p.stats.win, p.stats.kills, p.stats.deaths, p.stats.assists, p.champion.id, p.champion.name)
        #print(p.summoner.region, p.summoner.account.id, p.summoner.name, p.summoner.id, p.champion.id, p.ParticipantStatsData.kills)
    print(match_data)
    return match_data

# Get current match ID.
# Returns -1 if not in a match, or a positive integer ID if in a match
def fetchCurrentMatchId(name, region):
    player = cass.Summoner(name=name, region=region)
    try:
        current_match_id = player.current_match.id
        # below for debugging
        # print(current_match_id)
        # print("User is currently in a match!")
        return current_match_id
    except:
        # print("User is not currently in a match!")
        return -1



"""TESTS"""
# Test for Current Match ID
#fetchCurrentMatchId("Darshan", "NA")

# Test for Match History
#now_time = arrow.now()
#start_time = now_time.replace(days=-1)
#fetchMatchHistory("Darshan","NA", start_time)


""" MAIN.PY CODE """

# Stream specific info
channelName = 'nightblue3' # Name of player on Twitch
broadcasterID = 26946000 # Twitch broadcaster ID of player
summonerName = 'LOLXDLOLXDD' # Summoner name of player
summonerRegion = 'NA' # Physical region of the player
playState = [-1, 0] # State of whether a player is in a game. [0] is match id (if not -1 their in game). [1] is the epoch time of when the last check was done. 

# Authentication
chatOauthToken = 'oauth:k72vf2xg7d5bksevy1wywmpr82jvzf'
clipingOauthToken = 'jipian02wzvt9rq5l8jfoiakrbxkny'
clientID = 'zboofba8qoqwr9lb5aouo0hiwvfqlg'

# the time in seconds to wait since the last occurance of a given emote 
ellapse = 5
# How many emotes / ellapse are required for an alert to be sent (in percentage of current viewers of streamer)
thresholdFactor = 0.0005
# Counter for emotes [0] is timestamp, [1] is count of emotes
targetEmoteCounter = {'POG':[0,0], 'HA': [0,0], 'LUL': [0,0], 'TYLER': [0,0]}
# Store clip URLs as they are generated
clipStore = []


# Uncomment to see entire set-up process
# logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)
tirc = twitch_chat('TheMenEgg', chatOauthToken, [channelName],clientID)


# {"match_status": -1 } player not in match
# {"match_status": 18237141 } player in match

# Function called when new message in Twitch chat
def new_message(msg):
    print(msg['message'] + " " + str(targetEmoteCounter) + " " + str(json.loads(requests.get("https://api.twitch.tv/kraken/streams/" + str(broadcasterID), data=None, headers={'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': clientID})
.content.decode('latin1'))['stream']['viewers'] * thresholdFactor) )
    playState[0] = fetchCurrentMatchId(summonerName, summonerRegion)
    if playState[0] == -1:
        playState[1] = time.time()
        tirc.stop()
        # Purge the clipStore
        clipStore = []
    else:
        for targetEmote in targetEmoteCounter.keys():
            # Found a target emote
            if targetEmote in msg['message'].upper():
                targetEmoteCounter[targetEmote][1] += 1
                # If no timestamp, create one
                if targetEmoteCounter[targetEmote][0] == 0:
                    targetEmoteCounter[targetEmote][0] = time.time()
                # Once the it's 5 seconds past the timestamp, check if thres/?hold is met. 
            if time.time() >= targetEmoteCounter[targetEmote][0] + ellapse:
                # If threshold met, make the call
                if targetEmoteCounter[targetEmote][1] >= json.loads(requests.get("https://api.twitch.tv/kraken/streams/" + str(broadcasterID), data=None, headers={'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': clientID})
.content.decode('latin1'))['stream']['viewers'] * thresholdFactor:
                    highestEmoteCount = max([i[0] for i in targetEmoteCounter.values()])
                    highestEmote = targetEmote
                    for i in targetEmoteCounter:
                        if targetEmoteCounter[i] == highestEmoteCount:
                            highestEmote = i
                    onThresholdMeet(highestEmote, targetEmoteCounter[highestEmote][1])   

# Function called when the threshold is meet within the ellapse
def onThresholdMeet(emote, emoteCount):
    clipStore.append([json.loads(requests.post("https://api.twitch.tv/helix/clips", data={'broadcaster_id': broadcasterID}, headers={'Authorization':'Bearer ' + clipingOauthToken}).content.decode('latin1'))['data'][0]['edit_url'], emote, emoteCount])
    # If the file is empty
    if os.stat("matchClip.json").st_size != 0:
        with open('matchClip.json') as f:
            data = json.load(f)
            data[str(playState[0])] = clipStore
    else:
        data = {str(playState[0]): clipStore}
    with open("matchClip.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    # Purge the emote counter
    for i in targetEmoteCounter:
        targetEmoteCounter[i] = [0,0]
    sleep(30)


# Function to get latest clip
def getLatestClip():
    if not clipStore:
        return []
    else:
        ret = clipStore[-1]
        ret.append(playState[0])
        return clipStore[-1]


# def new_subscriber(name, months):
#     print('New subscriber {0}! For {1} months'.format(name, months))

"""MULTITHREADING CODE BEGIN"""

"""MULTITHREADING CODE END"""
class ThreadingExample(object):
    """ Threading example class

    The run() method will be started and it will run in the background
    until the application exits.
    """

    def __init__(self, interval=1):
        """ Constructor

        :type interval: int
        :param interval: Check interval, in seconds
        """
        #print("TEST begin init")
        self.interval = interval

        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True                            # Daemonize thread
        thread.start()                                  # Start the execution
        #print("TEST end init")
    def run(self):
        """ Method that runs forever """
        while 1:
            playState[0] = fetchCurrentMatchId(summonerName, summonerRegion)
            if playState[0] == -1:
                if playState[1] + 30 < time.time(): 
                    ## query the API for the end match data
                    sleep(5)
                else: 
                    sleep(5)

            elif playState[0] > 0:
                playState[1] = time.time()    
                tirc.subscribeChatMessage(new_message)
                tirc.start()
                tirc.join()


            else:
                ## throw error, player should always either be in a match or not in a match
                current_cond_err = 'Error checking CURRENT match status logical'
                raise ValueError(current_cond_err)