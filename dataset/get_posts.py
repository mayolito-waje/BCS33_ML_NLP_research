import warnings
from facebook_scraper import get_posts, set_cookies, exceptions
from utils import clean_csv, count_rows
import pandas as pd
import numpy as np
import datetime
import time
import json
import os
import random
from itertools import cycle

# Setting user agent will cause the scraper not to work for some reason
# Ignore unsupported browser warnings, scraping will still work...
warnings.filterwarnings('ignore')

freedom_wall_id = 'profile.php?id=100091661232706'
filename = 'csv/posts.csv'
cookies = cycle(['cookies1.txt', 'cookies2.txt', 'cookies3.txt'])

fetched_posts_count = 0
temporary_banned_count = 0

# load the original csv to check for duplicates
posts_dataset = set(
    [(d, p.strip())
     for d, p, l in pd.read_csv(filename).itertuples(index=False)]
)

# to handle pagination
start_url = ''
# with open('start_url.txt', 'r', encoding='utf-8') as f:
#     start_url = f.read()


def handle_pagination_url(url):
    global start_url
    start_url = url


set_cookies(next(cookies))

while True:
    try:
        for post in get_posts(freedom_wall_id, timeout=60, pages=10000,
                              start_url=start_url, request_url_callback=handle_pagination_url, options={"posts_per_page": 150}):
            fetched_posts_count += 1
            # with open('start_url.txt', 'w', encoding='utf-8') as f:
            #     f.write(start_url)

            date = post['time']
            text = post['post_text']

            if len(text) > 0 and (date.strftime("%Y-%m-%d %H:%M:%S"), text.strip()) not in posts_dataset:
                print(
                    f'#{fetched_posts_count} Extracted post "{text[:10]}...", date: {date}')

                extracted_data = pd.DataFrame(
                    [[date, text, 0]], columns=['date', 'post_text', 'label'])

                if (os.path.isfile(filename)):
                    extracted_data.to_csv(filename, mode='a',
                                          header=False, index=False)
                else:
                    df = pd.DataFrame(columns=['date', 'post_text', 'label'])
                    df = pd.concat([df, extracted_data])
                    df.to_csv(filename, index=False)
            else:
                print(
                    f'#{fetched_posts_count} Empty text or already fetched: "{text[:10]}..."')

            if (fetched_posts_count >= 200):
                break

            set_cookies(next(cookies))
            time.sleep(random.randint(1, 30) + np.random.uniform(0, 1))

        print('Extraction complete.')
        break
    except exceptions.TemporarilyBanned:
        temporary_banned_count += 1
        sleep_secs = 600 * temporary_banned_count
        print(
            f'Temporarily banned, sleeping for {sleep_secs / 60} m ({sleep_secs} secs)')

        # with open('start_url.txt', 'w', encoding='utf-8') as f:
        #     f.write(start_url)
        #     print(f'Updated start url: {start_url}')

        clean_csv()
        count_rows()
        time.sleep(sleep_secs)

clean_csv()
count_rows()
