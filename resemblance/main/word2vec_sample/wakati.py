# coding:utf-8

import MeCab


class MeacabWakati(object):
    # ファイルを読み込み、mecabで分かち書きしたものを返す
    def __init__(self, file_name):
        self.file_name = file_name

    def write_wakati(self):
        tagger = MeCab.Tagger('-F\s%f[6] -U\s%m -E\\n')
        with open(self.file_name, 'r', encoding='utf-8') as read_file:
            with open('wakati.txt', 'w', encoding='utf-8') as write_file:
                line = read_file.readline()
                while line:
                    result = tagger.parse(line)
                    write_file.write(result[1:])  # skip first \s
                    line = read_file.readline()
        return write_file
