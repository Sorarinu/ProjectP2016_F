# coding:utf-8

import MeCab
import re
from resemblance.main.word2vec_sample.constants import *


class MeacabWakati(object):
    # ファイルを読み込み、mecabで分かち書きしたものを返す
    def __init__(self, file_name):
        self.file_name = file_name

    # def preprocessing(self, sentence):
    #     return sentence.rstrip()

    def extract_noun(self, sentence):
        tagger = MeCab.Tagger()
        nouns = []
        # sentence = self.preprocessing(sentence)
        sentence = re.sub(re.compile("[!-/:-@[-`{-~]"), '', sentence)
        for chunk in tagger.parse(sentence).splitlines()[:-1]:
            (surface, feature) = chunk.split('\t')
            if feature.startswith('名詞'):
                nouns.append(surface)
        return ''.join(nouns)

    def write_wakati(self):
        tagger = MeCab.Tagger('-F\s%f[6] -U\s%m -E\\n')
        with open(self.file_name, 'r', encoding='utf-8') as read_file:
            with open(WAKATI_FILE, 'w', encoding='utf-8') as write_file:
                line = read_file.readline()
                while line:
                    li = self.extract_noun(line)
                    result = tagger.parse(li)
                    write_file.write(result[1:])  # skip first \s
                    line = read_file.readline()
        return write_file
