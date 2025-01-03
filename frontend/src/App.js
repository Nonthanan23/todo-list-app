import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import About from './components/about/About'
import Signup from './components/signup/Signup'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signin from './components/signup/Signin'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Signin" element={<Signin />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App