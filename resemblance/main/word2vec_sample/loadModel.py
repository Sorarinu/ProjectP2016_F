# coding:utf-8
from gensim.models import word2vec

class LoadModel(object):
    def __init__(self, fname, folder_word):
        self.fname = fname
        self.folder_word = folder_word

    def load_model_similar(self):
        # 分かち書きしてmodelファイルを生成する。
        load = word2vec.Word2Vec.load(self.fname)
        isFeature = False
        try:
            results = load.most_similar(positive=[self.folder_word], topn=30)
        except TypeError:
            return isFeature
        except KeyError:
            return isFeature
        else:
            for x in results:
                if x[1] <= 0.9:
                    continue
                else:
                    isFeature = True
            return isFeature



