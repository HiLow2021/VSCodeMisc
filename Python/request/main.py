import requests

response = requests.get("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
print(response.status_code)
print(response.json())