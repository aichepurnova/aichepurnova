import sqlite3

from flask import Flask
from flask_restful import Api


def get_db_connection():
    conn = sqlite3.connect('db.sqlite3')
    conn.row_factory = sqlite3.Row
    return conn


app = Flask(__name__, static_url_path="", static_folder="static")
api = Api(app)

import views
import api_resources
