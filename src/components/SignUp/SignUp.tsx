import { useState } from 'react';
import type { FormEvent } from 'react';
import './SignUp.scss'
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signUp } = UserAuth()

  const navigate = useNavigate()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password)
      navigate('/account')
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      console.log(error)
    }
  }
  return (
    <div className='signup-container'>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>SignUp</h2>
        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
        <button className="signup-button">Sign up</button>
        <p>Already Subscribe{' '}
          <span onClick={() => navigate('/login')} className='signup-link'>Log in</span>
        </p>
      </form>
    </div>
  )
}