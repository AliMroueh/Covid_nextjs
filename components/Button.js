import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'
// import { useDispatch } from 'react-redux';
// import { signout } from '../actions/userActions';

const Button = (props) => {
    // const dispatch = useDispatch();
    // const submitHandler = () =>{
    //     dispatch(signout())
    // }

    // const { status, data: session } = useSession();
    // const router = useRouter();

    const submitHandler = ()=>{
        signOut({callbackUrl: '/login'});
    }
  return (
    <button className='bg-cyan-900 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-cyan-600 
    duration-500' onClick={submitHandler}>
      {props.children}
    </button>
  )
}

export default Button