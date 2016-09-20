# coding:utf-8

import MeCab

# 参考サイトのコピペ
# ファイルを読み込み、mecabで分かち書きしたものを返す
def wakati(file_name):
    tagger = MeCab.Tagger('-Owakati')
    with open(file_name, 'r', encoding='shift-jis') as file:
        for line in file:
            node = tagger.parse(line)
            print(node)

if __name__ == '__main__':
    wakati('xxxxxxx.txt')
