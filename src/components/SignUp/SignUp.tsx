import { useState } from 'react';
import type { FormEvent } from 'react';
import './SignUp.scss'
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = UserAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      navigate('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error(err);
    }
  }

  return (
    <div className='signup-container'>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>{t('signup.title')}</h2>
        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
        <button className="signup-button">{t('signup.button')}</button>
        <p>{t('signup.alreadyMember')}{' '}
          <Link to="/login" className='signup-link'>{t('signup.loginLink')}</Link>
        </p>
      </form>
    </div>
  )
}