'use client'

import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import Alert from './Alert';
import api from '@/app/api/axiosConfig'; 

interface User {
    name: string,
    email: string,
    password: string,
    birthday: string
}

export default function SubscribeForm() {
    const [name, setName] = useState<string | ''>('')
    const [email, setEmail] = useState<string | ''>('')
    const [password, setPassword] = useState<string | ''>('')
    const [birthday, setBirthday] = useState<string | ''>('')
    const [message, setMessage] = useState<string | ''>('')

    async function Login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {

            const newTask: User = {
                name,
                email,
                password,
                birthday
            };
            const response = await api.post('/api/users/newUser/', newTask);
            if (response.status === 201) {
                console.log(response.status);
                setMessage("User created, go back to login page")
            }
        } catch (error) {
            console.error('Error creating task', error);
        }
    }

    return <form onSubmit={Login} className='w-96 max-w-full flex flex-col p-12 rounded-lg bg-base-100 lex items-center justify-center gap-3'>
        <h2 className='text-xl mb-3'>Create Account</h2>
        <input
            name='name'
            type="name"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='input input-secondary w-full bg-base-100' />
        <input
            name='email'
            type="email"
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input input-secondary w-full bg-base-100' />
        <input
            name='password'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input input-secondary w-full bg-base-100   ' />
        <input
            name='birthday'
            placeholder='Birthday'
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className='input input-secondary w-full bg-base-100' />
        <button className='btn btn-primary text-white w-full' type='submit'>Subscribe</button>
        {message && <Alert message={message} />}

        <Link href={'/login'}>I already have an account</Link>
    </form>
}
