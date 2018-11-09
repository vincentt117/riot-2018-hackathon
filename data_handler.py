import json
import cassiopeia as cass
from utils import fetchCurrentMatchId, fetchMatchHistory, findLatestClip


def find_match(raw_json):
    #input_dict = json.loads(raw_json.decode())
    # pre-process raw-json
    input_dict = json.loads(raw_json)

    # calculate response
    match_status = fetchCurrentMatchId(input_dict["summoner_name"], input_dict["region"])
    
    # post-process results
    result = str({"match_status": match_status })
    print(result)
    return result #currently returns string


def find_history(raw_json):
    input_dict = json.loads(raw_json)
    match_history = fetchMatchHistory(input_dict["summoner_name"], input_dict["region"], input_dict["stream_start_time"])
    return match_history

def find_latest_clip():
    array= [“https://clips.twitch.tv/LittleFuriousDragonflyArgieB8/edit“, “LUL”, 4]
    clip_info = {}
    clip_info.update(
        'match_id': '69696969',
        'clip_url': 'https://clips.twitch.tv/kappakappakappa',
        'clip_type': 'funny')
    return clip_info

def setup_streamer_config(raw_json):
    input_dict = json.loads(raw_json)
    #cass.set_default_region("NA")
    #cass.set_default_region(input_dict["region"])
    global player
    global stream_start_time
    global broadcaster_id

    stream_start_time = input_dict["stream_start_time"]
    broadcaster_id = input_dict["broadcaster_id"]
    player = cass.Summoner(name=input_dict["summoner_name"], region=input_dict["region"])
    
    success = str('Streamer config setup for Summoner Name: '+str(player.name)+' in the '+str(player.region)+' region.')
    result = str({"setup_status": success })
    return result
# for debuging
# find_match(raw_json)

#def predict():
#    return True

"""
raw_json = '{"summoner_name":"Cycon", "region":"NA","stream_start_time":"2018-11-07T18:32:26.055379-08:00", "broadcaster_id":"12321314"}'
setup_streamer_config(raw_json)
print('streamer setup done')
find_match(raw_json)
print('match status done')
"""

#print(stream_start_time)
#print(broadcaster_id)

