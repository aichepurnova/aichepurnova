import os
import urllib

import pandas as pd
import sqlalchemy
from flask import render_template, request, jsonify, send_from_directory
from sqlalchemy import text
from werkzeug.datastructures import ImmutableMultiDict

from index import app, get_db_connection
from models import Character


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
    params = ['name', 'about', 'position',
              'skills', 'hobby', 'education',
              'email', 'phone', 'contacts']
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
    exp_from = form.get('from')
    to = form.get('to')
    place = form.get('place')
    position = form.get('position')
    desc = form.get('desc')

    data = {
        'name': form.get('name'),
        'about': form.get('about'),
        'position': form.get('position'),
        'education': form.get('education'),
        'hobby': form.get('hobby'),
        'phone': form.get('phone'),
        'email': form.get('email'),
        'other': form.get('other')
    }

    return jsonify({'output': render_template('rb_output.html',
                                              data=data,
                                              skills=skills)})


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


@app.route('/game')
def game():
    return render_template('game.html')
