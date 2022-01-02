import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useParams } from 'react-router-dom';
import "./Reader.css";
import parse from "html-react-parser";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Reader = () => {

    const { id } = useParams();
    const db = firebase.firestore();
    const [answers, setAnswers] = useState(null);
    const [q, setQ] = useState(null);

    useEffect(() => {
        var temp = [];
        var r = null;

        db.collection("questions").doc(id).get()
            .then(function (querySnapshot) {
                //console.log(querySnapshot.data());
                r = querySnapshot.data();
            }).then(() => setQ(r))
            .catch((error) => {
                console.log("Error fetching data", error);
            });

        db.collection("posts").doc(id).collection("answers").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.data());
                    temp.push({ author: doc.data().author, date: doc.data().date, postData: doc.data().postData });
                });
            }).then(() => setAnswers(temp))
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }, [db,id]);


    return (
        <div>
            {
                q === null ? null
                    : (
                        <div className="reader_question">
                            {q.Question}
                        </div>
                    )
            }
            <br />
            <br />
            {
                answers === null ? <div className="isLoading"><Loader
                    type="Puff"
                    color="#383961"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                /></div>
                    : (
                        answers.length === 0 ? <div className="no_answers">No one has answered this question</div> :
                            answers.map((element, index) => {
                                return (
                                    <div key={index} className="article_boundry">
                                        {parse(element.postData)}
                                        <div className="article_writer">Authored By :-{element.author}</div>
                                    </div>
                                )
                            })
                    )
            }
        </div>
    )
}

export default Reader
