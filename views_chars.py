import json

from flask import render_template, request

from index import app, get_db_connection
from models import Character, Classes, Races, Backgrounds


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

    classes_list = list(classes['class_en'].unique())
    races_list = list(races['race_full'])
    backgrounds_list = list(backgrounds['background'])

    preview = {
        'class': classes['class_en'][0],
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
            'class': classes['starting_skills'][0],
            'race': races['skills'][0]
        }
    }

    return render_template('chars_create.html',
                           classes=classes_list,
                           races=races_list,
                           backgrounds=backgrounds_list,
                           preview=preview)


@app.route('/chars/get_chars')
def get_chars():

    chars_df = Character.get_chars()
    chars_list = []
    for index, row in chars_df.iterrows():
        chars_list.append({
            'id': str(chars_df['id'][index]),
            'name': chars_df['name'][index],
            'race': chars_df['race'][index],
            'klass': chars_df['klass'][index],
            'level': str(chars_df['level'][index]),
            'image': chars_df['image'][index]
        })

    output = {'chars': chars_list}

    return output


@app.route('/chars/get_character')
def get_character():

    char_id = request.args.get('id')
    char_id = char_id.split('=')[1]
    df = Character.get_details(char_id)
    df = df.reset_index(drop=True)
    details = df.loc[0].to_dict()

    output = {
        'details': details
    }

    return output
