import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/AuthContext';
import './Login.scss'

export default function Login() {
  const { logIn } = UserAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/account');
    } catch (err) {
      setError(t('login.error'));
      console.error(err);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{t('login.title')}</h2>
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
          {t('login.button')}
        </button>
        <p className="login-help">
          {t('login.noAccount')} <Link to="/signup">{t('login.signupLink')}</Link>
        </p>
      </form>
    </div>
  )
}