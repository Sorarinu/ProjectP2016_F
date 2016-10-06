# coding:utf-8
from gensim.models import word2vec

from resemblance.main.word2vec_sample.genModel import CreateModel
from resemblance.main.word2vec_sample.scraping import Scraping
from resemblance.main.word2vec_sample.constants import *


def load_model(fname):
    # 分かち書きしてmodelファイルを生成する。
    load = word2vec.Word2Vec.load(fname)
    results = load.most_similar(positive=['ブログ'], topn=10)
    for x in results:
        print(x[0], '\t', x[1])


if __name__ == '__main__':
    page = Scraping('http://yahoo.co.jp').create_scraping_file()
    CreateModel(page).create_model()
    load_model(MODEL)
