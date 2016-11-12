# coding:utf-8

import unittest
from resemblance.main.word2vec_sample.constants import *
import requests
import json


class ScrapingTest(unittest.TestCase):
    def test_url_is_none(self):
        load_data = json.loads(SAMPLE_JSON)
        for bookmark_data in load_data['bookmark']:
            try:
                html = requests.get(bookmark_data['url'])
            except requests.HTTPError as e:
                print(e.response)
            except requests.ConnectionError as e:
                print(e.response)
            else:
                self.assertIsNotNone(html)

if __name__ == '__main__':
    unittest.main()

