import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';
import { Search, ImageDisplay } from '../components';

import chevron_right from '../assets/chevron-right.png';

export function BrowseContainer() {

    const { firebase } = useContext(FirebaseContext);

    const [content, setContent] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [onFirstLoad, setOnFirstLoad] = useState(true);

    // const [error, setError] = useState('');

    const handleSearch = () => {

        setOnFirstLoad(false);
        if (searchTerm){
            firebase
                .firestore()
                .collection('')
                // .where('tag', 'array-contains', searchTerm.toLowerCase())
                // combines up to 10 array-contains clauses
                .where('tags', 'array-contains-any', searchTerm.toLowerCase().match(/([^, ]+)/g))
                .get()
                .then((snapshot)=> {
                    const allContent = snapshot.docs.map((contentObj) => ({
                        ...contentObj.data(),
                        docId: contentObj.id,
                    }));
                    setContent(allContent);
                })
                .catch((error) => {
                    console.log(error.message);
                });
            };
    };

    // trigger search when the enter key is clicked
    const handleKeypress = (event) => {
        if (event.charCode === 13){
            handleSearch();
        }
    };

    return (
    <>
        <Search>
            <Search.Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} onKeyPress={handleKeypress}/>
            <Search.Submit onClick={handleSearch} src={chevron_right}/>
        </Search>

        <ImageDisplay>
            {content.length > 0 ?
                <ImageDisplay.Group>
                {content.map((slideItem) => (
                    <ImageDisplay.Item key={slideItem.docId} item={slideItem} />
                ))}
                </ImageDisplay.Group>
            : <ImageDisplay.Group>
                { onFirstLoad ? <p>:)</p>
                : <p>:(</p>
            }
            </ImageDisplay.Group> }
        </ImageDisplay>
    </>
    );
}