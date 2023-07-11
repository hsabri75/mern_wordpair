import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
const LoginSignup = ()=>{
    const [email, setEmail] =useState('h1@gmail.com')
    const [password, setPassword] =useState('qweQWE123.')
    const {loginSignup, error, isLoading} = useLogin()
    const handleClick = async (e: React.FormEvent, type: "login" |"signup" ) => {
        e.preventDefault()
        loginSignup(email,password,type)
    }
    return (
        <form className='login' > 
            <h3>Log in/ Sign up</h3>
            <label>Email:</label>
            <input 
                type='email'
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
            ></input>
            <label>Password:</label>
            <input 
                type='password'
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
            ></input>
            <button disabled={isLoading} onClick={(e: React.FormEvent ) => {handleClick(e,"login")}}>login</button>
            <button disabled={isLoading} onClick={(e: React.FormEvent ) => {handleClick(e,"signup")}}>signup</button>
            {error && <div className='error' >{error}</div>}     
        </form>
        
    )
}

export default LoginSignup