import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
const Login = ()=>{
    const [email, setEmail] =useState('h1@gmail.com')
    const [password, setPassword] =useState('qweQWE123.')
    const {login, error, isLoading} = useLogin()
    const handleSubmit = async (e: React.FormEvent ) => {
        e.preventDefault()
        login(email,password)
        console.log({email, password})
    }
    return (
        <form className='login' onSubmit={handleSubmit}> 
            <h3>Log in</h3>
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
            <button disabled={isLoading} type="submit">login</button>
            {error && <div className='error' >{error}</div>}     
        </form>
        
    )
}

export default Login