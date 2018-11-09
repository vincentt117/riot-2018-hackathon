# falcon_gateway.py
import falcon
import os
import json
import pickle

import data_handler
from data_handler import find_match, find_history, setup_streamer_config
from utils import ThreadingExample

class InfoResource(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        resp.body = ('Placeholder sanity check for GET endpoint')

# Get match status for the user
class getMatchResource(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        resp.body = ('\nThis is the GET MATCH endpoint. \n'
                     'It will return a valid match ID if user is in a match\n'
                     'Otherwise it will return -1\n\n')


    def on_post(self, req, resp): 

        try:
            raw_json = req.stream.read()
        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Error',
                ex.message)
 
        try:
            result_json = json.loads(raw_json.decode(), encoding='utf-8')
            # For Python 2.x, replace with
            # result_json = json.loads(raw_json, encoding='utf-8')
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Malformed JSON',
                'Could not decode the request body. The '
                'JSON was incorrect.')
        
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(find_match(raw_json))  
        # For Python 2.x, replace with
        # resp.body = json.dumps(find_match(model, raw_json), encoding='utf-8') encoding not necessary in python3.
     
class getMatchHistoryResource(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        resp.body = ('\nThis is the GET MATCH HISTORY endpoint. \n'
                     'It will return a JSON for matches from a given start time\n'
                     'Otherwise it will return -1\n\n')


    def on_post(self, req, resp): 
        try:
            raw_json = req.stream.read()
        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Error',
                ex.message)
 
        try:
            result_json = json.loads(raw_json.decode(), encoding='utf-8')
            # For Python 2.x, replace with
            # result_json = json.loads(raw_json, encoding='utf-8')
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Malformed JSON',
                'Could not decode the request body. The '
                'JSON was incorrect.')
        
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(find_history(raw_json))  
        # For Python 2.x, replace with
        # resp.body = json.dumps(find_match(model, raw_json), encoding='utf-8') encoding not necessary in python3.

class streamerSetupResource(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        resp.body = ('This endpoint is for setting up streamer credentials')


    def on_post(self, req, resp): 
        try:
            raw_json = req.stream.read()
        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Error',
                ex.message)
 
        try:
            result_json = json.loads(raw_json.decode(), encoding='utf-8')
            # For Python 2.x, replace with
            # result_json = json.loads(raw_json, encoding='utf-8')
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Malformed JSON',
                'Could not decode the request body. The '
                'JSON was incorrect.')
        
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(setup_streamer_config(raw_json))
        example = ThreadingExample()  
        # For Python 2.x, replace with
        # resp.body = json.dumps(find_match(model, raw_json), encoding='utf-8') encoding not necessary in python3.

class getLatestClip(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        clip_info = {
            'match_id': '69696969',
            'clip_url': 'https://clips.twitch.tv/kappakappakappa',
            'clip_type': 'funny'
            # clips: [{"clip_url":<URL>, "clip_type":<TYPE>, "amount":<NUM>}]
            }
        resp.body = json.dumps(clip_info)

# falcon.API instances are callable WSGI apps. Never change this.
app = falcon.API()

# Resources are represented by long-lived class instances. Each Python class becomes a different "URL directory"
info = InfoResource()
get_match = getMatchResource()
get_match_history = getMatchHistoryResource()
streamer_setup = streamerSetupResource()
get_latest_clip = getLatestClip()

app.add_route('/info', info)
app.add_route('/getMatch', get_match)
app.add_route('/getMatchHistory', get_match_history)
app.add_route('/streamerSetup', streamer_setup)
app.add_route('/getLatestClip', get_latest_clip)
# example = ThreadingExample()