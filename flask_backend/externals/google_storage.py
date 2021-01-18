import datetime
from . import storage_client


def generate_signed_url(bucket_name, filename):
    """Creates a temp URL"""
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename)

    return blob.generate_signed_url(
            expiration=datetime.timedelta(minutes=2),
            method="PUT",
            content_type="image/jpeg",
            version='v4')

def make_blob_public(bucket_name, filename):
    """Makes a blob publicly accessible."""
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename)
    blob.make_public()
    
    return blob.public_url

def delete_blob(bucket_name, filename):
    """Deletes a blob"""
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename)

    blob.delete()
