# coding:utf-8
import logging

from gensim.models import word2vec

from resemblance.main.word2vec_sample.wakati import MeacabWakati


class CreateModel(object):
    def __init__(self, file_name):
        self.file_name = file_name

    def create_model(self):
        logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
        wakati_file = MeacabWakati(self.file_name).write_wakati()
        with open(wakati_file.name, 'r', encoding='utf-8') as file:
            sentences = word2vec.LineSentence(file)
            model = word2vec.Word2Vec(sentences,
                                      sg=1,
                                      size=100,
                                      min_count=1,
                                      window=10,
                                      hs=1,
                                      negative=0)
            model.save("models/sample.model")
            print("Finish")
