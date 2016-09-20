# -*- coding: utf-8 -*-

import difflib
import unicodedata

from resemblance.main.scraping import Scraping


class Resemblance(object):
    def __init__(self, url):
        self.url = url

    def Resemblance(self):
        # 互いに類似度を比較する文字列のリスト
        str_list = Scraping(self.url).get_body_text()
        # リスト内包表記で strs の中の文字列から重複なしの組み合わせを作る
        for (str1, str2) in [
            (str1, str2)
            for str1 in str_list
            for str2 in str_list
            if str1 < str2
        ]:
            # unicodedata.normalize() で全角英数字や半角カタカナなどを正規化する
            normalized_str1 = unicodedata.normalize('NFKC', str1)
            normalized_str2 = unicodedata.normalize('NFKC', str2)

            print(str1, "<~>", str2)

            # 類似度を計算、0.0~1.0 で結果が返る
            s = difflib.SequenceMatcher(None, normalized_str1, normalized_str2).ratio()
            print(''"match ratio:", s, "\n")
