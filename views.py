import os
import urllib

import pandas as pd
import sqlalchemy
from flask import render_template, request, jsonify, send_from_directory
from sqlalchemy import text
from werkzeug.datastructures import ImmutableMultiDict

from index import app, get_db_connection
from models import Character, Classes, Races, Backgrounds


def deserialize_form(form, search_list='', immutable=True):
    form_str = form.replace('%20', ' ')
    form = []
    for element in form_str.split('&'):
        element = element.split('=')
        element = (urllib.parse.unquote(element[0]), urllib.parse.unquote(element[1]))
        form.append(element)
    # form = dict((x.strip(), y.strip()) for x, y in (element.split('=') for element in form_str.split('&')))
    if search_list != '':
        form.append(('search', ','.join(map(str, search_list))))
    if immutable:
        form = ImmutableMultiDict(form)
    return form


@app.route('/media/<path:filename>')
def send_file(filename):
    path, file = os.path.split(filename)
    if not path:
        path = 'media/'
    return send_from_directory(path, file)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/inchepurnov')
def inchepurnov():
    return render_template('inchepurnov.html')


@app.route('/rb')
def get_resume():
    params = ['name', 'about', 'job',
              'skills', 'hobby', 'education',
              'email', 'phone', 'other',
              'from', 'to', 'position', 'place', 'desc']
    data = {}

    for param in params:
        value = request.cookies.get(param)
        if value == None:
            value = ''
        data[param] = value

    return render_template('rb_index.html', data=data)


@app.route('/rb_post', methods=['POST'])
def post_resume():
    form = request.get_json()
    form = deserialize_form(form)
    skills = form.get('skills')
    skills = skills.split(',')
    skills = [skill.replace('+', ' ').strip() for skill in skills]
    exp_from = form.getlist('from')
    to = form.getlist('to')
    place = form.getlist('place')
    position = form.getlist('position')
    desc = form.getlist('desc')

    exp_df = pd.DataFrame(
        {
            'from': exp_from,
            'to': to,
            'place': place,
            'position': position,
            'desc': desc
        }
    )

    data = {
        'name': form.get('name').replace('+', ' '),
        'about': form.get('about').replace('+', ' '),
        'job': form.get('job').replace('+', ' '),
        'education': form.get('education').replace('+', ' '),
        'hobby': form.get('hobby').replace('+', ' '),
        'phone': form.get('phone').replace('+', ' '),
        'email': form.get('email').replace('+', ' '),
        'other': form.get('other').replace('+', ' ')
    }

    return jsonify({'output': render_template('rb_output.html',
                                              data=data,
                                              skills=skills,
                                              exp_df=exp_df)})


@app.route('/slider')
def slider():
    return render_template('slider.html')


@app.route('/chars')
def chars():
    conn = get_db_connection()
    chars = conn.execute('SELECT * FROM chars_character').fetchall()
    conn.close()
    return render_template('chars_overview.html', characters=chars)


@app.route('/character')
def character():
    """
    Reads char id from req args
    Loads char data from db

    :return: renders char_single.html with char details
    """
    char_id = request.args.get('id', type=str)
    details = Character.get_details(char_id)

    return render_template('chars_single.html', details=details)


@app.route('/chars/create_new_character')
def create_new_character():
    """
    Takes data from dnd.su based tables
    Renders from to add a new character
    :return:
    """

    classes = Classes.get_data()
    races = Races.get_data()
    backgrounds = Backgrounds.get_data()

    classes_list = list(classes['class'].unique())
    races_list = list(races['race_full'])
    backgrounds_list = list(backgrounds['background'])

    preview = {
        'class': classes['class'][0],
        'race': races['race_full'][0],
        'background': backgrounds['background'][0],
        'size': races['size'][0],
        'speed': races['speed'][0],
        'dice': classes['dice'][0],
        'saves': classes['saves'][0],
        'bonuses': races['bonuses'][0],

        'proficiencies': {
            'class': classes['proficiencies'][0],
            'bg': backgrounds['proficiencies'][0],
            'all': ['Athletics (STR)', 'Acrobatics (DEX)', 'Sleight of Hand (DEX)', 'Stealth (DEX)',
                    'Arcana (INT)', 'History (INT)', 'Investigation (INT)', 'Nature (INT)', 'Religion (INT)',
                    'Animal Handling (WIS)', 'Insight (WIS)', 'Medicine (WIS)', 'Perception (WIS)', 'Survival (WIS)',
                    'Deception (CHA)', 'Intimidation (CHA)', 'Performance (CHA)', 'Persuasion (CHA)']
        },

        'tools': {
            'class': classes['tools'][0],
            'bg': backgrounds['tools'][0]
        },

        'languages': {
            'race': races['languages'][0],
            'bg': backgrounds['languages'][0]
        },

        'skills': {
            'class': classes['skills'][0],
            'race': races['skills'][0]
        }
    }

    return render_template('chars_create.html',
                           classes=classes_list,
                           races=races_list,
                           backgrounds=backgrounds_list,
                           preview=preview)

@app.route('/game')
def game():
    return render_template('game.html')
