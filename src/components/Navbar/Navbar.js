import React from 'react';
import './Navbar.css';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';


const Navbar = () => {

    var provider = new firebase.auth.GoogleAuthProvider();
    const history = useNavigate();

    const googleSignInPopup = ( e ) => {
        e.preventDefault();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                console.log(user);
                history('/read_answers');
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    const handleSignOut = ( e ) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            console.log('Sign Out Successful');
        }).catch((error) => {
            console.log(error.message);
        })

    }

    return (
        <div className="nav-header">
            <div className="nav-title">Quora</div>
            <div>
                <IfFirebaseUnAuthed>
                    <button onClick={googleSignInPopup} className="nav-login">Login</button>
                </IfFirebaseUnAuthed>

                <IfFirebaseAuthed>
                    <Link to="/read_answers"><button className='nav-login'>Read Answers</button></Link>
                    <Link to="/post_question"><button className='nav-login'>Post a Question</button></Link>
                    <Link to="/answer_question"><button className='nav-login'>Answer a Question</button></Link>
                    <button className='nav-login' onClick={handleSignOut}>Sign Out</button>
                </IfFirebaseAuthed>
            </div>
        </div>
    )
}

export default Navbar
