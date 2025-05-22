import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import About from './components/about/About'
import Signup from './components/signup/Signup'
import Signin from "./components/signup/Signin";
import Todo from './components/ToDo/Todo'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { authActions } from './store'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = (sessionStorage.getItem("id"));
    if (id) {
      dispatch(authActions.login());
    }
  })


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/ToDo" element={<Todo />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Signin" element={<Signin />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App