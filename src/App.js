import './App.css';
import Navbar from './components/Navbar/Navbar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import firebaseConfig from './firebase/config';
import { FirestoreProvider } from "@react-firebase/firestore";
import { Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost/CreatePost';
import QuestionPoster from './components/QuestionPoster/QuestionPoster';
import AllPosts from './components/AllPosts/AllPosts';
import Reader from './components/AllPosts/Reader';
import Home from './Home';


function App() {
  return (
    <div className="App">
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <FirestoreProvider firebase={firebase} {...firebaseConfig}>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/read_answers" element={<AllPosts />} />
              <Route path="/post_question" element={<QuestionPoster/>}/>
              <Route path="/answer_question" element={<CreatePost />} />
              <Route path="/read_answer/:id" element={<Reader/>}/>
          </Routes>
        </FirestoreProvider>
      </FirebaseAuthProvider>
    </div>
  );
}

export default App;
