# environment variable setup for private key file
import os
from dotenv import load_dotenv

load_dotenv()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="service_account.json"

import json
from google.cloud import pubsub_v1
from concurrent.futures import TimeoutError
import time
import requests

# GCP topic, project & subscription ids
PUB_SUB_TOPIC = os.getenv("PUB_SUB_TOPIC")
PUB_SUB_PROJECT = os.getenv("PUB_SUB_PROJECT")
PUB_SUB_SUBSCRIPTION= os.getenv("PUB_SUB_SUBSCRIPTION")
NESTJS=os.getenv("NESTJS")

# Pub/Sub consumer timeout
timeout = 5.0

# callback function for processing consumed payloads 
# prints recieved payload
def process_payload(message):
    my_json = message.data.decode('utf8').replace("'", '"')
    data = json.loads(my_json)
    activityId = data.get("activity")
    count = data.get("count")
    
    url = NESTJS + f"/measurements/activity/count/{activityId}/{count}"
    response = requests.post(url, json=data)
    print(f"Received {message.data}. nest_status: {response.status_code}")
    message.ack()    

# consumer function to consume messages from a topics for a given timeout period
def consume_payload(project, subscription, callback, period):
        subscriber = pubsub_v1.SubscriberClient()
        subscription_path = subscriber.subscription_path(project, subscription)
        print(f"Listening for messages on {subscription_path}..\n")
        streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
        # Wrap subscriber in a 'with' block to automatically call close() when done.
        with subscriber:
            try:
                # When `timeout` is not set, result() will block indefinitely,
                # unless an exception is encountered first.                
                streaming_pull_future.result(timeout=period)
            except TimeoutError:
                streaming_pull_future.cancel()

# loop consumer functions with delay
while(True):    
    print("===================================")
    consume_payload(PUB_SUB_PROJECT, PUB_SUB_SUBSCRIPTION, process_payload, timeout)
    time.sleep(10)