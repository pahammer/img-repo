<br />
<h1 align="center">
  <br>
  Img Repo
  <br>

<h4 align="center">An interactive image repository web application, developed with the Flask and React web frameworks.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#built-with">Built With</a> •
  <a href="#development-setup">Development Setup</a> •
  <a href="#notes-on-design">Notes on Design</a>
</p>

![search](https://github.com/pahammer/img-repo/blob/master/.github/search.gif)

</h1>

<!-- FEATURES-->

## Key Features

- Upload images
- Search for images by image properties(tags)
- Automatic label detection

## Built With

- []() Python & Flask
- []() Javascript & React

### 3rd Party / Infrastructure

- Google Cloud Storage
  - For access & storage of images
- Google Cloud Vision API
  - For label detection
- Google Cloud Firestore
  - Image index
    <br>
    <br>

---

## Development Setup

### Prerequisites

Due to the reliance on a few third-party tools from the GCP suite, <b>you will need a GCP account, in addition to the following:</b>

- [Enable the Cloud Vision API](https://cloud.google.com/vision/docs/setup#api)
- [Create a Cloud Firestore database](https://cloud.google.com/firestore/docs/quickstart-servers#create_a_in_native_mode_database)
- [Create a service account](https://cloud.google.com/compute/docs/access/service-accounts#serviceaccount)
- [Create a storage bucket](https://cloud.google.com/storage/docs/creating-buckets)
  - See also [controlling access](https://cloud.google.com/storage/docs/access-control)
- [Configure CORS on your bucket](https://cloud.google.com/storage/docs/configuring-cors#code-samples)
  - This is due to the architecture of the application. Images are not uploaded to our backend server, but rather directly to google cloud, through the use of signed URLs. See [upload flow](#upload-flow) for more.

### Configuration

Replace the values in **.env.example** with your values and rename this file to **.env**:

- `GOOGLE_APPLICATION_CREDENTIALS`: File path to your credentials file. Same credentials are used for all clients(firestore, storage, vision). Ensure proper account access has been granted for said service account.
- `SECRET_KEY`: Flask application secret key.
- `BUCKET_NAME`: Your google cloud storage bucket name.
- `FIRESTORE_COLLECTION`: Name of google cloud firestore collection, used for updating db.

Also:

- Add your firebase config to img-repo/react-frontend/src/lib/firebase.prod.js
- The collections name (firestore db) must be provided in the img-repo/react-frontend/src/containers/browse.js page

### Installation

To clone and run this application, you'll need Git, Python3, pip, and Nodejs installed on your computer. From your command line:

#### Frontend:

```bash
# Clone this repository
$ git clone https://github.com/pahammer/img-repo

# Go into the repository and again into the react-frontend directory
$ cd img-repo/react-frontend

# Install dependencies
$ npm install

# Run the app
$ npm start
```

#### Backend:

```bash
# Go into the repository
# Run startup script (Linux Mac)
$ ./start.sh
```

<br>

---

<br>

## Notes on Design

<br>

### Upload Flow

As previously mentioned, images are not sent to our backend application. Our backend app is designed to grant temporary access to a specific object by signing and providing a temporary URL. Allowing the client to upload their image directly to google cloud. [More on signed URLS](https://cloud.google.com/storage/docs/access-control/signed-urls)

This flow happens behind the scenes with React, so the flow is seamless to the user. The entire upload process is displayed below:

<!-- INSERT DATA FLOW / ARCHITECTURE HERE -->

![dataflow](https://github.com/pahammer/img-repo/blob/master/.github/data-flow.png)

1. The Client issues a POST request to flask route '/get-signed-url' with a "filename" parameter. Flask responds with a signed URL (if all goes well).
2. The Client issues a PUT request to the URL received with the image in the message body
3. The Client finalizes the form by issuing a POST to '/add-image', filling in the remaining details: source, filename, custom tags, and auto-generated tag option.
4. Should the Client select the "auto-generate tags" option, flask makes a request to the Cloud Vision API with the URL of the newly uploaded image file. Vision responds with a list of tags it believes are relevant to the image.
5. Lastly, Flask dumps all of this data in the Firestore collection (tags, file location, and source).

### Search Flow

Search is a much shorter process. React simply queries the Firestore db for tags that equal searched terms. Images are pulled from google storage.

React uses the [array-contains-any](https://cloud.google.com/firestore/docs/query-data/queries#in_not-in_and_array-contains-any) query which "returns documents where the given field is an array that contains one or more of the comparison values".

This implementation of search has flaws, of course. One caveat: "fuzzy" searching is not supported; only exact matches are returned in the query, as described above. A better solution would be to develop and integrate a search engine using something like Elasticsearch.

---

## Credits

This software uses the following open source software:

- Python
  - Flask
  - python-dotenv
- React
  - Styled components

## License

MIT
