import React from 'react';
import './Signup.css';
import HeadingComp from './HeadingComp';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({ email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/v1/login", Inputs).then((response) => {
      sessionStorage.setItem("id",response.data.others._id);
      dispatch(authActions.login());
      history('/todo');
    })
  }


  return (
    <div><div className='signup'>
      <div className='container'>
        <div className='row'>
                    <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
            <HeadingComp first='Sign' second='In' />
          </div>
          <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column w-100 p-5'>
              <input className='p-2 my-3 signup-input'
                type="email"
                name="email"
                placeholder='Enter Your Email'
                value={Inputs.email}
                onChange={change} />
                <input className='p-2 my-3 signup-input'
                type="password"
                name="password"
                placeholder='Enter Your password'
                value={Inputs.password}
                onChange={change} />
                <button className='p-2 my-3 signup-btn' onClick={submit}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default Signin