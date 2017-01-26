# coding:utf-8

import datetime
import json
import os
import random
import sys
import time
import threading
import pymysql as mysql
from contextlib import closing
from functools import wraps
from flask import Flask, abort, request, Response, g
from api.search.loadModel import LoadModelFlag
from api.create.scraping import Scraping
from api.tag.loadModel import LoadModelTag

from api.create.genModel import CreateModel
from conf.constants import *
from datetime import datetime
import logging

app = Flask(__name__)
app.config.from_object(__name__)
PATH_TO = '/var/www/html/ProjectP2016_F/resemblance/main/similarity/conf/log/'
logging.basicConfig(filename=PATH_TO + 'similarity.log', filemode='w',
                    format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
data_store = {'a': 1}


def connection():
    g.db = mysql.connect(host='localhost',
                         user='user',
                         password='passwd',
                         db='sample',
                         charset='utf8',
                         # cursorclassを指定することで
                         # Select結果をtupleではなくdictionaryで受け取れる
                         cursorclass=mysql.cursors.DictCursor)
    return g.db


def init_db():
    with closing(connection()) as db:
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


def consumes(content_type):
    def _consumes(function):
        @wraps(function)
        def __consumes(*argv, **keywords):
            if request.headers['Content-Type'] != content_type:
                abort(400)
            return function(*argv, **keywords)

        return __consumes

    return _consumes


def insert_sql(cursor, url, insert_model, today):
    sql = "INSERT INTO manage_model (url, model, create_at,update_at) VALUES (%s, %s, %s, %s)"
    r = cursor.execute(sql, (url, insert_model, today, None))
    print(r)


@app.route('/api/v1/create/', methods=['POST'])
@consumes('application/json')
def insert_model():
    g.db = connection()
    today = datetime.datetime.today()
    today = today.strftime("%Y/%m/%d %H:%M:%S")
    data = request.json
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        if page is None:
            continue
        else:
            model = CreateModel(page).create_model()
            with g.db.cursor() as cursor:
                insert_sql(cursor, bookmark_data['url'], model, today)
                g.db.commit()
    g.db.close()


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


def add_flag():
    g.db = connection()
    g.db.cursor().execute("select model from manage_model")
    result = g.db.cursor().fetchall()
    data = request.json
    for row in result:
        flag = LoadModelFlag(row, data['searchWord']).load_model_similar_flag()
        data['similar_flag'] = flag
    g.db.cursor().close()
    g.db.close()
    return data


def add_tag():
    data = eval(request.json)
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        CreateModel(page).create_model()
        tag = LoadModelTag(MODEL, data['searchWord']).load_model_similar_tag()
        bookmark_data['tags'] = tag
    return data


def interval_query():
    while True:
        time.sleep(1)
        vals = {'a': random.randint(0, 100)}
        data_store.update(vals)


thread = threading.Thread(name='interval_query', target=interval_query)
thread.setDaemon(True)
thread.start()


def sample():
    while 1:
        time.sleep(5)


def fork():
    pid = os.fork()

    if pid > 0:
        f = open('/var/www/html/ProjectP2016_F/resemblance/main/similarity/pid/similarity.pid', 'w')
        f.write(str(pid) + "\n")
        f.close()
        sys.exit()

    if pid == 0:
        sample()
        # app.run()


if __name__ == '__main__':
    # fork()
    app.run()
