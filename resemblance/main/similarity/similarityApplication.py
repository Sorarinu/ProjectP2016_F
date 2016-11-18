# coding:utf-8

import codecs
import json
from functools import wraps

from flask import Flask, abort, request, Response
from resemblance.main.similarity.api.search.loadModel import LoadModel
from resemblance.main.similarity.api.search.scraping import Scraping

from resemblance.main.similarity.api.search.genModel import CreateModel
from resemblance.main.similarity.conf.constants import *

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
        flag = LoadModel(MODEL, data['search_word']).load_model_similar()
        bookmark_data['similar_flag'] = flag
    return data


@app.route('/api/v1/similarity-search/', methods=['POST'])
@consumes('application/json')
def similarity_search():
    dict_data = add_flag()
    response = json.dumps(dict_data, ensure_ascii=False, sort_keys=True)
    return Response(response, mimetype='application/json')


if __name__ == '__main__':
    app.run()
