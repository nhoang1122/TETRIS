import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState  } from 'react'

import { UserAuth } from '../Context/AuthContext'

import './SignUp.css'

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const {createUser} = UserAuth();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        setError('')
        try{
            await createUser(email,password)
            navigate('/Account')
        } catch (e) {
            setError(e.message)
            console.log("HIT",e.message)
        } 
    }

  return (
    <div className='main'>
        <div>
            <h1>SIGN UP</h1>
        </div>
        <form onSubmit={submitHandler}>
            <div>
                <label>EMAIL</label>
                <br />
                <input onChange={(e) => setEmail(e.target.value)} type="email"/>
            </div>
            <br />
            <div>
                <label>PASSWORD</label>
                <br />
                <input onChange={(e) => setPassword(e.target.value)} type="password"/>
            </div>
            <br />
            <button>SIGN UP</button>
            <p>Already Have An Account? <Link to='/'>SIGN IN</Link></p>
        </form>
    </div>
  )
}

export default SignUp