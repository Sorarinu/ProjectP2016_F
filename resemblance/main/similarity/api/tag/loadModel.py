# coding:utf-8
from gensim.models import word2vec

class LoadModelTag(object):
    def __init__(self, fname, folder_word):
        self.fname = fname
        self.folder_word = folder_word

    def load_model_similar_tag(self):
        # 分かち書きしてmodelファイルを生成する。
        load = word2vec.Word2Vec.load(self.fname)
        tag = []
        try:
            results = load.most_similar(positive=[self.folder_word], topn=5)
        except TypeError:
            return tag
        except KeyError:
            return tag
        else:
            for x in results:
                tag.append(x[0])
            return tag



