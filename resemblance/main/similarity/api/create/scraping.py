# coding: utf-8

from bs4 import BeautifulSoup
import urllib.request
import requests
import urllib.error
from logging import error
from conf.constants import *


class Scraping(object):
    def __init__(self, url):
        self.url = url

    def get_html(self):
        try:
            html = urllib.request.urlopen(self.url)
        except urllib.error.HTTPError as e:
            error('HTTPError = ' + str(e.reason))
            html = None
            return html
        except urllib.request.URLError as e:
            error('URLError = ' + str(e.reason))
            html = None
            return html
        except requests.RequestException as e:
            error('H = ' + str(e.response))
            html = None
            return html
        else:
            return html

    def convert_html(self):
        html = self.get_html()
        if html is None:
            return None
        else:
            soup = BeautifulSoup(html, 'lxml')
            return soup

    def get_body_text(self):
        soup = self.convert_html()
        str_list = []
        if soup is None:
            return None
        else:
            for string in soup.stripped_strings:
                string = repr(string).rstrip("'").lstrip("'")
                str_list.append(string)
            return str_list

    def create_scraping_file(self):
        str_list = self.get_body_text()
        if str_list is None:
            return None
        else:
            with open(BODY_TEXT_FILE, 'w') as file:
                for strings in str_list:
                    file.write(strings + "\n")
            return file.name
