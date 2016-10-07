# coding: utf-8

from bs4 import BeautifulSoup
import urllib.request
import lxml


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
        str_list = []
        for string in soup.stripped_strings:
            string = repr(string).rstrip("'").lstrip("'")
            str_list.append(string)
        return str_list

    def create_scraping_file(self):
        with open('html_body.txt', 'w') as file:
            str_list = self.get_body_text()
            for strings in str_list:
                file.write(strings + "\n")
        return file.name
