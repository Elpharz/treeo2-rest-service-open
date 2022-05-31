from distutils.log import debug
from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import json
from google.cloud import pubsub_v1

app = Flask(__name__)

load_dotenv()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="service_account.json"

PUB_SUB_TOPIC = os.getenv("PUB_SUB_TOPIC")
PUB_SUB_PROJECT = os.getenv("PUB_SUB_PROJECT")
PUB_SUB_SUBSCRIPTION= os.getenv("PUB_SUB_SUBSCRIPTION")

# producer function to push a message to a topic
def push_payload(payload, topic, project):        
    publisher = pubsub_v1.PublisherClient() 
    topic_path = publisher.topic_path(project, topic)        
    data = json.dumps(payload).encode("utf-8")           
    publisher.publish(topic_path, data=data)
    print("Pushed message to topic.")  

@app.route('/')
def index():
    return 'This is Treeo \(*___*)/'

@app.route('/push', methods=['POST'])
def push_to_gcp_pub_sub():
    data = request.get_json()
    activity_id = data.get("activityId", "")
    measurement_count = data.get("measurementCount", "")

    payload = {"activity":activity_id, "count": measurement_count}
    push_payload(payload, PUB_SUB_TOPIC, PUB_SUB_PROJECT)
    return jsonify({"data": f"pushed to topic {PUB_SUB_TOPIC}", "payload": payload})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9012, debug=True)