import './App.css';
import Header from './components/Header';
import {useState, useEffect} from 'react';
import PlayersList from './components/PlayersList';
import CommentList from './components/CommentList';
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Highlights from './components/Highlights';


function App() {
  const [players, setPlayers] = useState([])
  const [comments, setComments] = useState([])
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/roster")
    .then((response) => response.json())
    .then(setPlayers)
  }, []);

  useEffect(() => {
    fetch("/comments")
      .then((response) => response.json())
      .then((comments) => {
        // console.log(comments); // add this line to log the comments to the console
        setComments(comments);
      });
  }, []);

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((users) => {
        // console.log(comments); // add this line to log the comments to the console
        setUsers(users);
      });
  }, []);


  useEffect(() => {
    fetch("/check_user").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLoginSubmit(event) {
    // Prevent page refresh
    event.preventDefault()

    // Get data from form
    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    // Send data to flask
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      setUser(data)
      setIsLoggedIn(true)
    })
    .then(() => navigate('/'))
  }

  function handleLogout() {
    setUser({});
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <div className="app">
      <Header 
      userStatus={user}
      handleLogout={handleLogout}/>
      <Routes>

        <Route element={
          <PlayersList 
          players={players}
          setPlayers={setPlayers}/>} exact path="/" />

        <Route element={
          <CommentList 
          comments={comments}
          setComments={setComments}
          isLoggedIn={isLoggedIn}
          user={user}
          users={users}
         />} path="/comments" />

        <Route element={
          <Login
          handleSubmit={handleLoginSubmit}
          />} path="/login"/> 

        <Route element={
          <Highlights />
        } path="/highlights"/>

      </Routes>
    </div>
  );
}

export default App;
