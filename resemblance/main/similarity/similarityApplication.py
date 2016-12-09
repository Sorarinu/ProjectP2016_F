# coding:utf-8

import json
from functools import wraps

from flask import Flask, abort, request, Response, g
from flaskext.mysql import MySQL
from api.search.loadModel import LoadModelFlag
from api.search.scraping import Scraping
from api.tag.loadModel import LoadModelTag

from api.search.genModel import CreateModel
from conf.constants import *

app = Flask(__name__)
app.config.from_object(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'test'
app.config['MYSQL_DATABASE_PASSWORD'] = 'test'
app.config['MYSQL_DATABASE_DB'] = 'test'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


def consumes(content_type):
    def _consumes(function):
        @wraps(function)
        def __consumes(*argv, **keywords):
            if request.headers['Content-Type'] != content_type:
                abort(400)
            return function(*argv, **keywords)

        return __consumes

    return _consumes


def connect_db():
    """Connects to the specific database."""
    # rv = MySQL.connect(app.config['DATABASE'])
    # rv.row_factory = MySQL.Row
    rv = 1
    return rv


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = mysql.connect()
    return db


def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def request_data_eval():
    data = {
        'serachWord': request.json['serachWord'],
        'bookmark': request.json['bookmark']
    }
    return data


def add_tag():
    data = request_data_eval()
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        if page is None:
            pass
        else:
            CreateModel(page).create_model()
            tag = LoadModelTag(MODEL, data['searchWord']).load_model_similar_tag()
            bookmark_data['tags'] = tag
    return data


def add_flag():
    data = request.json
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        if page is None:
            bookmark_data['similar_flag'] = False
        else:
            CreateModel(page).create_model()
            flag = LoadModelFlag(MODEL, data['searchWord']).load_model_similar_flag()
            bookmark_data['similar_flag'] = flag
    return data


@app.route('/api/v1/similarity-search/', methods=['POST'])
@consumes('application/json')
def similarity_search():
    dict_data = add_flag()
    response = json.dumps(dict_data, ensure_ascii=False, sort_keys=True)
    return Response(response, mimetype='application/json')


@app.route('/api/v1/tags/', methods=['POST'])
@consumes('application/json')
def similarity_tag():
    dict_data = add_tag()
    response = json.dumps(dict_data, ensure_ascii=False, sort_keys=True)
    return Response(response, mimetype='application/json')


@app.route('/api/v1/create-model/', methods=['POST'])
@consumes('application/json')
def create_model():
    data = request_data_eval()
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        CreateModel(page).create_model()


if __name__ == '__main__':
    app.run(port=8089)
