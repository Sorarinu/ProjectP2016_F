# coding:utf-8

import codecs
import json
from functools import wraps

from flask import Flask, abort, request, Response
from api.search.loadModel import LoadModelFlag
from api.search.scraping import Scraping
from api.tag.loadModel import LoadModelTag

from api.search.genModel import CreateModel
from conf.constants import *

app = Flask(__name__)


def consumes(content_type):
    def _consumes(function):
        @wraps(function)
        def __consumes(*argv, **keywords):
            if request.headers['Content-Type'] != content_type:
                abort(400)
            return function(*argv, **keywords)

        return __consumes

    return _consumes


@app.route('/api/v1/', methods=['POST'])
@consumes('application/json')
def hello_cloudBM():
    test_data = codecs.decode(request.data, 'utf-8')
    json_data = json.dumps(test_data, ensure_ascii=False, sort_keys=True)
    return Response(json_data, mimetype='application/json')


def add_flag():
    data = eval(codecs.decode(request.data, 'utf-8'))
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        CreateModel(page).create_model()
        flag = LoadModelFlag(MODEL, data['search_word']).load_model_similar_flag()
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
    data = eval(codecs.decode(request.data, 'utf-8'))
    for bookmark_data in data['bookmark']:
        page = Scraping(bookmark_data['url']).create_scraping_file()
        CreateModel(page).create_model()
        tag = LoadModelTag(MODEL, data['search_word']).load_model_similar_tag()
        bookmark_data['tags'] = tag
    return data


if __name__ == '__main__':
    app.run(port=8080)
