//the logic of react hook form starts from this component.
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Input, Logo, Button } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)//this is backend appwrite service that actually stores and transmits user data
            console.log("session created:", session)

            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))//this is redux store's state variables to store user's data after fetching from backend to start current sesssion or to login user into the website.
                navigate("/");
                //the difference in using Link and useNavigate hook is that Link is used to make particular components clickable so that when some task happens user has to click on component wrapped inside Link to go on next url but navigate will redirect automatiaclly after a certain task happens.  
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* handle submit is a method that comes from react hook form in which we provide our own method , here login that handles the on submit functionality, and it is default synatx of react hook form,
                
                now when the form is submitted handleSubmit is an event that is executed and register is kind of a state variable that stores and manage changes of all input fields inside of a form managed by react hook form.
                
                now the main reason of using react hook form is that we don't have to create state variables for all input fields of a form, by using react hook form all data and fields are manged by register functionality in react hook form. */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            //here register variable is initialised with values , but it has to be spreaded first each time for every input box . and we also validate the email input using regular expressions synatx and if it not satisfies necessary conditions it return message.
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
