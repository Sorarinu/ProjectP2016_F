# coding: utf-8

from bs4 import BeautifulSoup
import urllib.request


class Scraping(object):
    def __init__(self, url):
        self.url = url

    def get_html(self):
        html = urllib.request.urlopen(self.url)
        return html

    def convert_html(self):
        html = self.get_html()
        soup = BeautifulSoup(html, 'lxml')
        return soup

    def get_body_text(self):
        soup = self.convert_html()
        with open('test_html_body.txt', 'w') as file:
            for string in soup.stripped_strings:
                string = repr(string).rstrip("'").lstrip("'")
                file.write(string + '\n')


if __name__ == '__main__':
    Scraping('http://www.yahoo.co.jp/').get_body_text()
