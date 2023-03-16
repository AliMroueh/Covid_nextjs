import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();
  // const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [router, session]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err.response.data.message)
      toast.error(getError(err.response.data.message));
      toast.error(getError(err));
    }
  };
  return (
<>
        <ToastContainer position="bottom-center" limit={1} />
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
<div className='hidden sm:block'>
    <img className='w-full h-full object-cover' src="./gettyimages-1216445906_web.jpg" alt="" />
</div>

<div className='bg-cyan-800  flex flex-col justify-center'>
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-cyan-900 p-8 px-8'  
    onSubmit={handleSubmit(submitHandler)}
    >
        <h2 className='text-4xl text-white font-bold text-center'>Create </h2>
        <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor='name'>Name</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                    type="text"
                    id='name' 
                    autoFocus
                    {...register('name', {
                      required: 'Please enter name',
                    })}
                    />
            {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
          </div>
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
            />
            {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" 
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            autoFocus
            />
            {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
            <label>Confirm Password</label>
            <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" 
            {...register('confirmPassword', {
              required: 'Please enter confirm password',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'confirm password is more than 5 chars',
              },
            })}
            />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>
        <div className='flex justify-between text-gray-400 py-2'>
        Already have an account? {' '}
         <Link className='text-teal-500 hover:font-semibold' href={`/`}>Sign-In</Link>
        </div>
        <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Register</button>
        
    </form>
</div>
</div>
</>
      
  )
}
