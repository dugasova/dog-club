import { useState } from 'react';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext';
import './Login.scss'

export default function Login() {
  const { logIn } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const naviigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password)
      naviigate('/account')

    } catch (error) {

      setError('Invalid email or password. Please try again.');
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log in to your account</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button type="submit" className="login-button">
          Log in
        </button>
        <p className="login-help">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  )
}