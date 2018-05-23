from bs4 import BeautifulSoup
import requests
import json
import sys
import base64

def get_base64(url):
    response = requests.get(url)
    return ("data:" +
            response.headers['Content-Type'] + ";" +
            "base64," + base64.b64encode(response.content).decode('utf-8'))



r = requests.get('https://wizardoflegend.gamepedia.com/Relics')

soup = BeautifulSoup(r.text, 'lxml')

rows = soup.find_all('tr')[1:]
items = {}
for row in rows:
    try:
        children = list(row.children)[1::2]
        image_slug = children[0].a['href'][1:]
        image_page = f'https://wizardoflegend.gamepedia.com/File:{image_slug}.png'

        print(image_page)
        image_r = requests.get(image_page)
        image_soup = BeautifulSoup(image_r.text, 'lxml')
        image_url = image_soup.find('a', class_='internal')['href']

        serialized = {
            'name': children[1].text,
            'image': image_url,
            'description': children[2].text,
            'type': children[3].text,
            'cost': children[4].text,
        }
        items[serialized['name']] = serialized
    except Exception as e:
        print(e, row)

with open(sys.argv[1], 'w') as f:
    json.dump(items, f, indent=2)
