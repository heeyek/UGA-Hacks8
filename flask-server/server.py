from flask import Flask
import os
import json
import requests
import openai
from dotenv import load_dotenv

load_dotenv()

response = requests.get('https://www.travel-advisory.info/api')

openai.api_key = os.getenv('OPEN_API_KEY')
prompt = """ Generate an image of alpaca """

response = openai.Image.create(
    prompt = prompt,
    n=1,
    size="1024x1024"
)

print(response["data"][0]["url"])

app = Flask(__name__)



#Members API route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/pics")
def index():
    return {"pandapics": [response["data"][0]["url"], "Panda2", "Panda3"]}

if __name__ == "__main__":
    app.run(debug=True)