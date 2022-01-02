import React, { useState } from 'react';
import './QuestionPoster.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const QuestionPoster = () => {

    const [question, setQuestion] = useState('');
    const db = firebase.firestore();
    

    const handleQuestionPost = (e) => {
        e.preventDefault();

        db.collection('questions').add({
            Question: question,
            author: String(firebase.auth().currentUser.multiFactor.user.displayName).toUpperCase(),
            answered:'False'
        }).then(() => {
            console.log('Question Added Successfully');
            alert('Question Psoted Successfully');
            setQuestion('');
        }).catch((error) => {
            console.log('Some error occured', error.message);
        })

    }

    return (

        <div className="outer_box">
            <div>
                <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Type in the Question" />
            </div>
            <div>
                <button onClick={handleQuestionPost}>Post Question</button>
            </div>
        </div>
    )
}

export default QuestionPoster
