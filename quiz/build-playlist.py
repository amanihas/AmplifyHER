from flask import Flask, render_template, jsonify
import requests
import csv

endpoint_url = "https://api.spotify.com/v1/recommendations?"

# OUR FILTERS
limit=10
market="US"
seed_genres="pop"
target_danceability=0.5

query = f'{endpoint_url}limit={limit}&market={market}&seed_genres={seed_genres}&target_danceability={target_danceability}'

response =requests.get(query, 
               headers={"Content-Type":"application/json", 
                        "Authorization":"Bearer BQBhLmKg0mfIajBHZkrpg9epb18oZWEvCxp35Cdp2BYeaRopbSOABnUibgO4UxEE9SPf24z-RkjUvNKW56652V13AqMEV4j8aHp8eRqDuSGCQDhbg1s"})

json_response = response.json()

gender_data = {}

with open('gender_dataset.csv', mode='r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        name = row['NAME']
        gender = row['GENDER']
        gender_data[name] = gender.lower()
    
uris = []
filtered_uris = []

with open('output.txt', 'w') as f:
    for track in json_response['tracks']:
        artist_name = track['artists'][0]['name']
        if artist_name in gender_data:
            artist_gender = gender_data[artist_name]
            if artist_gender == 'male':
                continue  # Skip songs by male artists
        uris.append(track)
        content = f"\"{track['name']}\" by {artist_name}"
        f.write(content + "\n")
        filtered_uris.append(track['uri'])

# uris = []

# with open('output.txt', 'w') as f:
#     for i in json_response['tracks']:
#             uris.append(i)
#             content = f"\"{i['name']}\" by {i['artists'][0]['name']}"
#             f.write(content+"\n")