import requests
from datetime import datetime, timedelta
import json

def fetch_wordle_data(date):
    url = f"https://www.nytimes.com/svc/wordle/v2/{date}.json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['solution']
    else:
        return None

def main():
    today = datetime.today()
    wordle_data = {}
    for i in range(35):
        date = (today + timedelta(days=i)).strftime("%Y-%m-%d")
        wordle = fetch_wordle_data(date)
        if wordle:
            wordle_data[date] = wordle
            print(f"{date} | {wordle}")
        else:
            print(f"No data found for {date}.")

    with open("wordle.json", "w") as json_file:
        json.dump(wordle_data, json_file, indent=4)

if __name__ == "__main__":
    main()
