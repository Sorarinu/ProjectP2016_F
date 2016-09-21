# -*- coding: utf-8 -*-

import unicodedata
import difflib

# 互いに類似度を比較する文字列のリスト
strs = [
    "スパゲッティー",
    "ｽﾊﾟｹﾞｯﾃｨ",
    "スパゲティ",
    "カペッリーニ",
]

# リスト内包表記で strs の中の文字列から重複なしの組み合わせを作る
for (str1, str2) in [
    (str1, str2)
    for str1 in strs
    for str2 in strs
    if str1 < str2
    ]:
    # unicodedata.normalize() で全角英数字や半角カタカナなどを正規化する
    normalized_str1 = unicodedata.normalize('NFKC', str1)
    normalized_str2 = unicodedata.normalize('NFKC', str2)

    print(str1, "<~>", str2)

    # 類似度を計算、0.0~1.0 で結果が返る
    s = difflib.SequenceMatcher(None, normalized_str1, normalized_str2).ratio()
    print(''"match ratio:", s, "\n")
