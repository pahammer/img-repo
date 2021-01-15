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
    const [tagsGenerated, setTagsGenerated] = useState(false);
    const [indexUpdated, setIndexUpdated] = useState(false);

    // form data
    const [generatedTags, setGeneratedTags] = useState(false);
    const [image, setImage] = useState();
    const [customTags, setCustomTags] = useState('');
    const [source, setSource] = useState('');

    // resulting tags
    const [tags, setTags] = useState([]);

    // for modal
    const [showUploadModal, setShowUploadModal] = useState(false);

    const clearForm = () => {
        setShowUploadModal(false)
        setSource('');
        setCustomTags('');
        setImage();
        setTags([]);
        setError('');
        setLoading(false);

        setIsUploaded(false);
        setTagsGenerated(false);
        setIndexUpdated(false);
    }

    const handleUpload = () => {
        setIsUploaded(false);
        setTagsGenerated(false);
        setIndexUpdated(false);

        if (image && source) {

            // check if no tags and auto generated was not selected
            if (customTags === "" && !generatedTags){
                setError('*Please input custom tags or select the "Auto-generate tags" option.')
            }
            else{
                setLoading(true);
                const formData = new FormData();
                formData.append('filename', image.name)

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
                            body: image
                        }).then((response)=> {

                            if (response.status === 200){
                                setIsUploaded(true);

                                const formData = new FormData();
                                formData.append('filename', image.name)
                                formData.append('source', source)
                                formData.append('autogen_tags', generatedTags)
                                if (customTags !== ""){
                                    formData.append('custom_tags', customTags.toLowerCase().match(/([^, ]+)/g))
                                }
                                // final POST request to get auto-generated tags and update the search index
                                axios.post("http://0.0.0.0:5000/add-image", formData)
                                .then((response) => {
                                    setLoading(false);
                                    if (generatedTags){
                                        setTagsGenerated(true);
                                    }
                                    setIndexUpdated(true);
                                    setTags(response.data);
                                })
                                .catch((error) => { console.log(error); setLoading(false);})
                            }

                        }).catch((error) => { console.log(error); setLoading(false); })
                    }
                }).catch((error) => { console.log(error); setLoading(false); })
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
                <Modal.UploadFormContainer>
                    <Modal.ModalButton><input type="file" onChange={({ target }) => setImage(target.files[0])}></input></Modal.ModalButton>
                    <Modal.Input placeholder="Source" name="source" onChange={({ target }) => setSource(target.value)} required/>
                    <Modal.Input placeholder="Custom Image Tags (e.g. red, cat)" name="customTags" onChange={({ target }) => setCustomTags(target.value)} />
                    <Modal.CheckboxField onChange={({ target }) => setGeneratedTags(target.checked)}>Auto-generate Tags</Modal.CheckboxField>
                    <Modal.Submit onClick={handleUpload}>Upload!</Modal.Submit>
                </Modal.UploadFormContainer>

                {/* Respose notes for user */}

                {isUploaded ? <Modal.Text>Your image has been uploaded! </Modal.Text> : null}
                {generatedTags && tagsGenerated ? <Modal.Text>The following tags have been generated/added to your image: {tags.toString()}</Modal.Text> : null}

                {error !== "" ? <Modal.Text color="error">{error}</Modal.Text> : null}

                {loading ? <Modal.Loading><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading..."></img></Modal.Loading> : null}

            </Modal.ModalMain>
        </Modal.ModalComponent>
        : null }
      </Nav>
    </>
    );
}