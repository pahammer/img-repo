from google.cloud import firestore
from google.cloud import storage
from google.cloud import vision

# create google objects
firestore_client = firestore.Client()
storage_client = storage.Client()

client = vision.ImageAnnotatorClient()
image = vision.Image()