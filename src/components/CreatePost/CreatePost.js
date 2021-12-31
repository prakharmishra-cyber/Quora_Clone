import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from "jodit-react";
import './CreatePost.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const CreatePost = () => {
    const editor = useRef(null);
    const db = firebase.firestore();
    const [content, setContent] = useState('');
    const [Queries, SetQueries] = useState(null);
    const [curr_question, setCurr_Question] = useState(null);

    useEffect(() => {
        var temp = [];
        db.collection("questions").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    temp.push({ cnt: doc.data().Question, unique_id: doc.id });
                });
            }).then(() => SetQueries(temp))
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }, []);

    const handlePost = () => {
        alert('button clicked');
        db.collection('posts').doc(curr_question).collection('answers').add({
            postData: content,
            author: String(firebase.auth().currentUser.multiFactor.user.displayName).toUpperCase(),
            date: new Date()
        }).then(() => {
            console.log('Post Added Successfully');
            setContent('');
            alert('Post Added Successfully');
        }).catch((error) => {
            console.log('Some error occured');
        })

    }

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    const handleQChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setCurr_Question(e.target.value);
    }

    return (
        <div className="b">

            <div className="c dropdown">
                <label htmlFor="Question">Select a Question</label>
                <select name="Question" onChange={handleQChange} >
                    <option value="" disabled selected>Select a Question</option>
                    {
                    Queries === null ? null : (Queries.map((element, index) => {
                        return (
                            <option key={index} value={element.unique_id}>{element.cnt}</option>
                        )
                    }))
                }</select>
            </div>

            <div className="c">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => { }}
                />
            </div>

            <div className="c">
                <button onClick={handlePost}>POST</button>
            </div>

        </div>
    );
}

export default CreatePost
