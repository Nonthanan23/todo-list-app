import React from 'react'
import './Signup.css'
import HeadingComp from './HeadingComp'
import { useState } from 'react'
import axios from 'axios'


const Signup = () => {
  const [Inputs, setInputs] = useState({ email: '', username: '', password: '' });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/v1/register", Inputs).then((response) => {
      console.log(response);setInputs({ email: '', username: '', password: '' });
    })
  }

  return (
    <div className='signup'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column w-100 p-5'>
              <input className='p-2 my-3 signup-input'
                type="email"
                name="email"
                placeholder='Enter Your Email'
                onChange={change}
                value={Inputs.email} />
                <input className='p-2 my-3 signup-input'
                type="username"
                name="username"
                placeholder='Enter Your Username'
                onChange={change}
                value={Inputs.username} />
                <input className='p-2 my-3 signup-input'
                type="password"
                name="password"
                placeholder='Enter Your password'
                onChange={change}
                value={Inputs.password} />
                <button className='p-2 my-3 signup-btn' onClick={submit}>Sign Up</button>
            </div>
          </div>
          <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
            <HeadingComp first='Sign' second='Up' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup