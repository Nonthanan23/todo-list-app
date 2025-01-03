import React from 'react'
import './Signup.css'
import HeadingComp from './HeadingComp'

const Signin = () => {
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
                placeholder='Enter Your Email' />
                <input className='p-2 my-3 signup-input'
                type="password"
                name="password"
                placeholder='Enter Your password' />
                <button className='p-2 my-3 signup-btn'>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default Signin