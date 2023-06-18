import requests

response = requests.get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
response_json = response.json()
print(response_json)