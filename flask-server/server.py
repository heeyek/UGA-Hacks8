from flask import Flask
from flask import request
import os
import json
import requests
import openai
from dotenv import load_dotenv

load_dotenv()

response = requests.get('https://www.travel-advisory.info/api')
openai.api_key = os.getenv('OPEN_API_KEY')

# Dict = response.json()
# for x in Dict['data']:
#     if Dict['data'][x]['name'] == val:
#         print(Dict['data'][x]['name'])
#         print(Dict['data'][x]['advisory']['message'])
#         break

# prompt = """ Generate an image of """ + val

# response = openai.Image.create(
#     prompt = prompt,
#     n=1,
#     size="1024x1024"
# )

# print(response["data"][0]["url"])

app = Flask(__name__)



#Members API route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/pics")
def index():
    # Call Open AI 
    # Return result in JSON format
    prompt = """ Generate an image of """ + request.args.get('country')
    response = openai.Image.create(
        prompt = prompt,
        n=1,
        size="1024x1024"
    )

     # Generate country facts using Chat GPT
    completions = openai.Completion.create(
        model = 'text-davinci-003',
        prompt = """ Tell me 5 facts about """ + request.args.get('country'),
        max_tokens = 1000
    )

    
    
    # print(response["data"][0]["url"])

    return {
        "country":request.args.get('country'),
        "pictureUrl":response["data"][0]["url"],
        "facts":completions.choices[0].text
    }

   
    

if __name__ == "__main__":
    app.run(debug=True)