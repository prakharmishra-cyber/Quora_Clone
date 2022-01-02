import React, { useEffect, useState } from 'react'
import './AllPosts.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { IfFirebaseAuthed } from '@react-firebase/auth';

const AllPosts = () => {

    const db = firebase.firestore();
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        var temp = [];
        db.collection("questions").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    temp.push({ cnt: doc.data().Question, unique_id: doc.id });
                });
            }).then(() => setQuestions(temp))
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });        
    }, []);


  
    return (
        <div>
            <IfFirebaseAuthed>
            {
                questions === null ? <div className="isLoading"><Loader
                    type="Puff"
                    color="#383961"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                /></div>
                    : (
                        questions.map((element, index) => {
                            return (
                                <div key={index} className="outer_box additional">
                                    <div><b>Q.&#41;</b>{element.cnt}</div>
                                    <div>
                                        <Link to={`/read_answer/${element.unique_id}`}>
                                            <button className="tt">Read Answers</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    )
            }
            </IfFirebaseAuthed>
        </div>
    )
}

export default AllPosts
