'use client'

import React, { FormEvent } from 'react'
import { signIn } from "next-auth/react"
import Link from 'next/link';
import api from '@/app/api/axiosConfig'; 


export default function LoginForm() {
    
    async function Login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
    
        const result = await signIn('credentials', {
            ...data,
            callbackUrl: '/dashboard'
        });

        console.log(result);
        
    
        if (result?.error) {
            console.error(result.error);
        } else {
            console.log('Successfully signed in');
        }
    }

    return <form onSubmit={Login} className='w-96 max-w-full flex flex-col p-12 rounded-lg bg-base-100 lex items-center justify-center gap-3'>
        <h2 className='text-xl mb-3'>Login</h2>
        <input
            name='email'
            type="email"
            placeholder='E-mail'
            className='input input-secondary w-full bg-base-100' />
        <input
            name='password'
            type="password"
            placeholder='Password'
            className='input input-secondary w-full bg-base-100   ' />
        <button className='btn btn-primary text-white w-full' type='submit'>Login</button>

        <Link href={'/subscribe'}>Create an account</Link>
    </form>
}
