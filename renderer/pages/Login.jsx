import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons

const Login = () => {
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!password.trim()) {
            isValid = false;
            newErrors.password = 'Password is required.';
        }

        if (!phonenumber.trim()) {
            isValid = false;
            newErrors.phonenumber = 'Phone Number is required.';
        } else if (!/^[0-9]{10}$/.test(phonenumber)) {
            isValid = false;
            newErrors.phonenumber = 'Please enter a valid number.';
        }

        if (!isValid) {
            setErrors(newErrors);
            setSuccessMessage('');
            return;
        }

        setErrors({});
        setSuccessMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('https://machanite-be.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phonenumber, password }),
            });

            const data = await response.json();
            console.log("Token Num",data.token);
            
            if (response.ok) {
                sessionStorage.setItem('authToken', data.token); // Store token in sessionStorage
                router.push('/AddProduct');
            } else {
                setErrors({ apiError: data.message || 'Invalid credentials.' });
            }
        } catch (error) {
            setErrors({ apiError: 'Failed to connect to the server.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='border h-[470px] bg-white rounded-lg shadow-md w-96 flex justify-center items-center flex-col space-y-8'>
                <div className='w-52 border-black'>
                    <h1 className='flex justify-center text-3xl font-bold text-[#7d40ff]'>Login Page</h1>
                    <p className='flex justify-center mt-1'>Sign in to your account</p>
                </div>

                <form onSubmit={submit} className='space-y-3'>
                    <div className='flex flex-col w-80'>
                        <label htmlFor='phonenumber'>Phone Number</label>
                        <input
                            type='tel'
                            id='phonenumber'
                            placeholder='Phone Number'
                            name='phonenumber'
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            className='bg-gray-200 rounded-full mt-1 py-2 px-4'
                            required
                        />
                        {errors.phonenumber && (
                            <p className='text-red-500 text-sm mt-1'>{errors.phonenumber}</p>
                        )}
                    </div>

                    <div className='flex flex-col w-full relative'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-gray-200 rounded-full mt-1 py-2 px-4 pr-10'
                            required
                        />
                        <div
                            className='absolute right-4 top-9 cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <AiFillEye size={20} className='text-gray-600' />
                            ) : (
                                <AiFillEyeInvisible size={20} className='text-gray-600' />
                            )}
                        </div>
                        {errors.password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <Link href='/forgot-password' className='text-[#6923ff] justify-end flex w-32 ml-48'>
                            Forget Password?
                        </Link>
                    </div>
                </form>

                <div className='flex justify-center flex-col'>
                    {errors.apiError && (
                        <p className='text-red-500 text-lg flex justify-center'>{errors.apiError}</p>
                    )}
                    {successMessage && (
                        <p className='text-green-500 text-lg flex justify-center'>{successMessage}</p>
                    )}
                    <div className='w-24 m-auto mb-2 px-6 py-2 flex justify-center bg-[#7d40ff] text-white rounded-md'>
                        <button onClick={submit} className='flex justify-center' disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                    <p>
                        Don't have an account?{' '}
                        <Link href='/Signup' className='text-[#6924ff]'>
                            Signup here
                        </Link>
                    </p>
                </div>
            </div>
            {/* <Link href='/home'>
                <p className=' '>Go to home</p>
            </Link> */}
        </div>
    );
};

export default Login;
