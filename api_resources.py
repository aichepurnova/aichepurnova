import json

import pandas as pd
from flask import request, Response, jsonify
from flask_restful import Resource

from index import api
from models import Classes, Races, Backgrounds


class CharsParams(Resource):
    def get(self):
        data = dict(request.args)

        classes = Classes.get_data()
        races = Races.get_data()
        backgrounds = Backgrounds.get_data()

        classes = classes[classes['class'] == data['cl']].reset_index(drop=True)
        races = races[races['race_full'] == data['race']].reset_index(drop=True)
        backgrounds = backgrounds[backgrounds['background'] == data['bg']].reset_index(drop=True)

        preview = {
            'class': [data['cl']],
            'race': [data['race']],
            'background':[data['bg']],
            'size': [races['size'][0]],
            'speed': [races['speed'][0]],
            'dice': [classes['dice'][0]],
            'saves': [classes['saves'][0]],
            'bonuses': [races['bonuses'][0]],
            'proficiencies-class': [classes['proficiencies'][0]],
            'proficiencies-bg': [backgrounds['proficiencies'][0]],
            'tools-class': [classes['tools'][0]],
            'tools-bg': [backgrounds['tools'][0]],
            'languages-race': [races['languages'][0]],
            'languages-bg': [backgrounds['languages'][0]],
            'skills-class': [classes['skills'][0]],
            'skills-race': [races['skills'][0]]
            }

        df = pd.DataFrame(preview)
        return Response(df.to_json(orient="records"), mimetype='application/json')


api.add_resource(CharsParams, '/chars/get_chars_params')
