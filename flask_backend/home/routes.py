from flask import render_template
from flask import Blueprint
from flask import make_response
from flask import current_app as app
from flask import json
from flask import request

from flask_backend.externals.google_storage import generate_signed_url, make_blob_public
from flask_backend.externals.google_firestore import update_index
from flask_backend.externals.google_vision import detect_labels_uri

# Blueprint Configuration
home_bp = Blueprint(
    'home_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

@home_bp.route('/', methods=['GET'])
def home():
    """Will render React once compiled."""
    return render_template("index.html")

@home_bp.route('/get-upload-url', methods=['POST'])
def get_upload_url():

    resp = make_response()

    # cors open for development purposes, must be redefined for production
    resp.headers.add("Access-Control-Allow-Origin", "*")

    if 'filename' not in request.form:
        resp.status_code = 400
        resp.set_data("Filename not included in request")
        return resp
    
    filename = request.form['filename']
    resp.set_data(generate_signed_url(app.config["BUCKET_NAME"], filename))
    return resp

@home_bp.route('/add-image', methods=['POST'])
def add_image():
    err = False
    resp = make_response()

    # cors open for development purposes, must be redefined for production
    resp.headers.add("Access-Control-Allow-Origin", "*")

    if not all(k in request.form for k in ['filename', 'source', 'autogen_tags']):
        resp.status_code = 400
        resp.set_data("Missing data")
        return resp

    filename = request.form['filename']

    # make image public
    public_url = make_blob_public(app.config["BUCKET_NAME"], filename)

    tags = []
    # if auto generated tags selected, call vision api
    if request.form['autogen_tags'] ==  "true":
        try:
            tags = detect_labels_uri(public_url)
        except Exception as e:
            print(e)
            if 'custom_tags' not in request.form:
                # cleanup
                try:
                    delete_blob(app.config["BUCKET_NAME"], filename)
                except Exception as e:
                    print(e)
                resp.status_code = 417 
                return resp

    if 'custom_tags' in request.form:
        tags += request.form["custom_tags"].split(",")

    # update firestore
    try:
        update_index(app.config["FIRESTORE_COLLECTION"], public_url, filename, request.form['source'], tags)
    except Exception as e:
            print(e)
            resp.status_code = 417 
            return resp

    # return tags
    resp.set_data(str(json.dumps(tags)))
    return resp
