import React from 'react';
import "./Home.css"

const Home = () => {
    return (
        <div className="outer_home">
            <div>
                <h2>This is a Quora Clone with it's barebone functionalities of :-</h2>
                <ol>
                    <li>Posting a Question</li>
                    <li>Answering a Question</li>
                    <li>Reading answers to questions</li>
                </ol>
            </div>

            <div>
                It uses firebase as backend and also uses firebase google authentication system to authenticate users without
                username and password.
                <br />
                <hr/>
                The Technologies used in making this project are :-
                <b>
                    <ul>
                        <li>@react-firebase/auth, @react-firebase/database, @react-firebase/firestore </li>
                        <li>firebase</li>
                        <li>jodit-react</li>
                        <li>react, react-dom</li>
                        <li>react-loader-spinner</li>
                        <li>react-router-dom</li>
                    </ul>
                </b>
            </div>
        </div>
    )
}

export default Home
