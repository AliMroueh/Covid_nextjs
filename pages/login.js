import Link from "next/link";

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';

import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function login() {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // get the data from useSession and rename it to session
    const { data: session } = useSession();

    const router = useRouter();
    // const { redirect } = router.query;
  
    useEffect(() => {
        //   if already signin the go to home page '/'
      if (session?.user) {
        // console.log('session')
        router.push('/');
      }
    }, [router, session]);

    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
          const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
          if (result.error) {
            toast.error(result.error);
          }
        } catch (err) {
          toast.error(getError(err));
        }
    };
    return (
        <>
        <ToastContainer position="bottom-center" limit={1} />
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src="./T-cell-1.jpg" alt="" />
        </div>

        <div className='bg-cyan-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-cyan-900 p-8 px-8'  onSubmit={handleSubmit(submitHandler)}>
                <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>
        {/* {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>} */}
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" 
                    {...register('email', {
                        required: 'Please enter email',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                            message: 'Please enter valid email',
                        },
                        })}
                    id="email"
                    autoFocus
                    // onChange={(e) => setEmail(e.target.value)}
                    ></input>
                     {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                    type="password" 
                    {...register('password', {
                        required: 'Please enter password',
                        minLength: { value: 6, message: 'password is more than 5 chars' },
                      })}
                    id="password"
                    autoFocus
                    // onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    {/* <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <p>Forgot Password</p> */}
                    Don't have an account? {' '}
                 <Link className='text-teal-500 hover:font-semibold' href={`/register`}>Create</Link>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Login</button>
                
            </form>
        </div>
    </div>
    </>
    )
}
