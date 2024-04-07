import requests

endpoint_url = "https://api.spotify.com/v1/recommendations?"

# Make the API request
response = requests.get(endpoint_url, headers={"Authorization": "Bearer YOUR_ACCESS_TOKEN"})
if response.status_code == 200:
    json_response = response.json()  # Define json_response here after successful API response
    print(json_response)  # Debugging statement to inspect API response
    # Proceed with processing json_response, e.g., filtering tracks
else:
    print("Error:", response.status_code)  # Handle API request error

print(json_response)

# OUR FILTERS
limit=10
market="US"
seed_genres="pop"
target_danceability=0.9

query = f'{endpoint_url}limit={limit}&market={market}&seed_genres={seed_genres}&target_danceability={target_danceability}'

response = requests.get(query, 
                        headers={"Content-Type":"application/json", 
                                 "Authorization":"Bearer BQA3nUDhdE_ZtaYNX_OJyX66Sk2gPnT-POPp6zmyEqxnpirCpdx4kvtJqkuEmL-voVpAS958v-VU8Ovl1sw-AQslEnexMRCnHkuT-dc8CmyYgndFw6Y"})

json_response = response.json()

# Filter out artists who are "he/him"
filtered_tracks = [track for track in json_response['tracks'] if not any(artist['gender'] == 'he/him' for artist in track['artists'])]

# Write filtered tracks to output file
with open('filtered_output.txt', 'w') as f:
    for track in filtered_tracks:
        content = f"\"{track['name']}\" by {track['artists'][0]['name']}"
        f.write(content + "\n")