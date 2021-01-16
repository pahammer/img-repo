import React, { useState, useEffect } from 'react';
import { Nav, Modal } from '../components';

import logo from '../assets/logo.png';
import close from '../assets/close.png';

export function UploadContainer() {
    const axios = require("axios");

    // user errors
    const [error, setError] = useState('');

    // tracking form status
    const [loading, setLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    // form data
    const [generatedTags, setGeneratedTags] = useState(false);
    const [image, setImage] = useState({ preview: "", raw: ""});
    const [customTags, setCustomTags] = useState('');
    const [source, setSource] = useState('');

    // resulting tags
    const [tags, setTags] = useState([]);

    // for modal
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const clearForm = () => {
        setShowUploadModal(false)
        setSource('');
        setCustomTags('');
        setImage({ preview: "", raw: ""});
        setTags([]);
        setError('');
        setLoading(false);
        setShowForm(true);
        setGeneratedTags(false);

        setIsUploaded(false);
    }

    const handleImageChange = (event) => {
        if (event.target.files.length){
            setImage({
                preview: URL.createObjectURL(event.target.files[0]),
                raw: event.target.files[0]
            });
        }
    };

    const handleUpload = () => {
        setIsUploaded(false);

        if (image && source) {

            // check if no tags and auto generated was not selected
            if (customTags === "" && !generatedTags){
                setError('*Please input custom tags or select the "Auto-generate tags" option.')
            }
            else{
                setShowForm(false);
                setLoading(true);
                const formData = new FormData();
                formData.append('filename', image.raw.name)

                // POST request to get image upload url
                axios.post("http://0.0.0.0:5000/get-upload-url", formData)
                .then((response) => {

                    if (response.data !== ""){

                        // PUT request to upload image to url
                        fetch(response.data.replace(/\"/g, ""), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'image/jpeg'
                            },
                            body: image.raw
                        }).then((response)=> {

                            if (response.status === 200){
                                setIsUploaded(true);

                                const formData = new FormData();
                                formData.append('filename', image.raw.name)
                                formData.append('source', source)
                                formData.append('autogen_tags', generatedTags)
                                if (customTags !== ""){
                                    formData.append('custom_tags', customTags.toLowerCase().match(/([^, ]+)/g))
                                }
                                // final POST request to get auto-generated tags and update the search index
                                axios.post("http://0.0.0.0:5000/add-image", formData)
                                .then((response) => {
                                    setLoading(false);
                                    setTags(response.data);
                                })
                                .catch((error) => { console.log(error); setLoading(false); setError('Issue with request. Please close this window and try again!');})
                            }

                        }).catch((error) => { console.log(error); setLoading(false); setError('Issue with request. Please close this window and try again!');})
                    }
                }).catch((error) => { console.log(error); setLoading(false); setError('Issue with request. Please close this window and try again!');})
            }
        }else{
            setError("*Please select an image and specify it's source.")
        }
    };

    useEffect(() => {
        setError("");
    }, [image, source, customTags]);

    return (
    <>
      <Nav>
        <Nav.Logo src={logo}></Nav.Logo>
        <Modal.Button onClick={() => {setShowUploadModal(true); }}>Upload Image</Modal.Button>

        { showUploadModal ?

        <Modal.ModalComponent>
            <Modal.ModalClose onClick={() => clearForm()}><img src={close} alt="Close" /></Modal.ModalClose>
            <Modal.ModalMain>
                {showForm ?
                <Modal.UploadFormContainer>
                    {image.preview ? <div><Modal.Preview><img src={image.preview} alt={image.raw.name} width="300" height="300"/></Modal.Preview>
                    <Modal.ModalButton><input type="file" onChange={handleImageChange} />{image.raw.name}</Modal.ModalButton></div> : <Modal.ModalButton><input type="file" onChange={handleImageChange} />Select Image</Modal.ModalButton> }
                    <Modal.Input placeholder="Source" name="source" onChange={({ target }) => setSource(target.value)} required/>
                    <Modal.Input placeholder="Custom Image Tags (e.g. red, cat)" name="customTags" onChange={({ target }) => setCustomTags(target.value)} />
                    <Modal.CheckboxField onChange={({ target }) => setGeneratedTags(target.checked)}>Auto-generate Tags</Modal.CheckboxField>
                    <Modal.Submit onClick={handleUpload}>Upload!</Modal.Submit>
                </Modal.UploadFormContainer>
                :
                <Modal.UploadFormContainer>

                    {/* Respose notes for user */}

                    {isUploaded ? <Modal.Text>Your image has been uploaded! </Modal.Text> : null}
                    {tags ? <Modal.Text>The following tags have been added to your image: {tags.toString()}</Modal.Text> : null}
                    {loading ? <Modal.Loading><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading..."></img></Modal.Loading> : null}

                </Modal.UploadFormContainer>
                }
                {error !== "" ? <Modal.Text color="error">{error}</Modal.Text> : null}
            </Modal.ModalMain>
        </Modal.ModalComponent>
        : null }
      </Nav>
    </>
    );
}