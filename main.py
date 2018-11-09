from time import sleep
from twitchchat import twitch_chat
from utils import fetchCurrentMatchId
import time
import requests
import logging
import json
import os

## persistent function
prev_state = []
curr_state = []
initial_time = []


# Stream specific info
channelName = 'iwilldominate' # Name of player on Twitch
broadcasterID = 25653002 # Twitch broadcaster ID of player
summonerName = 'D OMEGALUL M' # Summoner name of player
summonerRegion = 'NA' # Physical region of the player
playState = [-1, 0] # State of whether a player is in a game. [0] is match id (if not -1 their in game). [1] is the epoch time of when the last check was done. 

# Authentication
#
#
#



# the time in seconds to wait since the last occurance of a given emote 
ellapse = 5
# How many emotes / ellapse are required for an alert to be sent (in percentage of current viewers of streamer)
thresholdFactor = 0.0001
# Counter for emotes [0] is timestamp, [1] is count of emotes
targetEmoteCounter = {'POG':[0,0], 'HA': [0,0], 'LUL': [0,0], '?': [0,0]}
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
    else:
        for targetEmote in targetEmoteCounter.keys():
            # Found a target emote
            if targetEmote in msg['message'].upper():
                targetEmoteCounter[targetEmote][1] += 1
                # If no timestamp, create one
                if targetEmoteCounter[targetEmote][0] == 0:
                    targetEmoteCounter[targetEmote][0] = time.time()
                # Once the it's 5 seconds past the timestamp, check if thres/?hold is met. 
                elif time.time() >= targetEmoteCounter[targetEmote][0] + ellapse:
                    # If threshold met, make the call
                    if targetEmoteCounter[targetEmote][1] >= json.loads(requests.get("https://api.twitch.tv/kraken/streams/" + str(broadcasterID), data=None, headers={'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': clientID})
.content.decode('latin1'))['stream']['viewers'] * thresholdFactor:
                        onThresholdMeet(targetEmote, targetEmoteCounter[targetEmote][1])                    
                    targetEmoteCounter[targetEmote] = [0,0]

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
    sleep(45)
    # print(clipRequest.status_code, clipRequest.reason, clipRequest.text)
#     print("Threshold of:" + str(json.loads(requests.get("https://api.twitch.tv/kraken/streams/" + str(broadcasterID), data=None, headers={'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': clientID})
# .content.decode('latin1'))['stream']['viewers'] * thresholdFactor) + "exceeded. Have " + str(emoteCount))
#     


# def new_subscriber(name, months):
#     print('New subscriber {0}! For {1} months'.format(name, months))


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