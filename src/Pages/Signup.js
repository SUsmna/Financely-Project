import React from 'react';
import Header from '../components/Header';
import "../App.css"
import SignupSignincomponent from '../components/SignupSignin';

function Signup() {
  return (
    <div>
      <Header />
      <div className='wrapper'>
        <SignupSignincomponent />
      </div>
    </div>
  )
}

export default Signup