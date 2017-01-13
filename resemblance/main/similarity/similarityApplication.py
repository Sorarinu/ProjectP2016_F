# coding:utf-8

import json
import os
import random
import sys
import time
import threading
from functools import wraps
from flaskext.mysql import MySQL
from flask import Flask, abort, request, Response
from api.search.loadModel import LoadModelFlag
from api.create.scraping import Scraping
from api.tag.loadModel import LoadModelTag

from api.create.genModel import CreateModel
from conf.constants import *

app = Flask(__name__)
app.config.from_object(__name__)
mysql = MySQL()
mysql.init_app(app)


def connnection():
    cur = mysql.connect().cursor()
    return cur

data_store = {'a': 1}
def interval_query():
    while True:
        time.sleep(1)
        vals = {'a': random.randint(0,100)}
        data_store.update(vals)

thread = threading.Thread(name='interval_query', target=interval_query)
thread.setDaemon(True)
thread.start()

def consumes(content_type):
    def _consumes(function):
        @wraps(function)
        def __consumes(*argv, **keywords):
            if request.headers['Content-Type'] != content_type:
                abort(400)
            return function(*argv, **keywords)

        return __consumes

    return _consumes


def add_flag():
    print(type(request.json))
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


def add_tag():
    data = eval(request.json)
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        CreateModel(page).create_model()
        tag = LoadModelTag(MODEL, data['searchWord']).load_model_similar_tag()
        bookmark_data['tags'] = tag
    return data


def sample():
    while 1:
        time.sleep(5)
        print("sample-daemon")


def fork():
    pid = os.fork()

    if pid > 0:
        f = open('/var/www/html/ProjectP2016_F/resemblance/main/similarity/pid/similarity.pid', 'w')
        f.write(str(pid) + "\n")
        f.close()
        sys.exit()

    if pid == 0:
        sample()
        app.run(port=8089)


if __name__ == '__main__':
    fork()
