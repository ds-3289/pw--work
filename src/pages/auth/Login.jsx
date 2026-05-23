import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captcha, setCaptcha] = useState('');
  const [locked, setLocked] = useState(false);

  const showCaptcha = failedAttempts >= 3;
  const captchaCode = '7K2M';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked) return;
    if (showCaptcha && captcha.toUpperCase() !== captchaCode) {
      setError('Invalid CAPTCHA');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 600));
      if (email === 'admin@finz.com' && password === 'password') {
        if (remember) localStorage.setItem('finz_remember_device', 'true');
        navigate('/mfa');
      } else {
        const next = failedAttempts + 1;
        setFailedAttempts(next);
        if (next >= 5) {
          setLocked(true);
          setError('Account locked. Admin alerted via SMS.');
        } else {
          setError(`Invalid credentials (${next}/5 attempts)`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/logo.png" alt="FinZ" className="auth-card__logo" />
        

        <form onSubmit={handleSubmit} className="auth-form">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@finz.com" disabled={locked} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={locked} />

          {showCaptcha && !locked && (
            <div className="auth-captcha">
              <span className="auth-captcha__code">{captchaCode}</span>
              <Input label="Enter CAPTCHA" value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Type code above" />
            </div>
          )}

          <label className="auth-form__remember">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} disabled={locked} />
            Remember this device (links to Session module)
          </label>

          {error && <p className="auth-form__error">{error}</p>}

          <Button type="submit" loading={loading} disabled={locked} className="auth-form__submit">
            {locked ? 'Locked' : 'Sign In'}
          </Button>
        </form>

        <Link to="/forgot-password" className="auth-card__link">Forgot password?</Link>

        <div className="auth-sso">
          <p className="auth-sso__label">SSO (coming soon)</p>
          <div className="auth-sso__buttons">
            <button type="button" disabled className="auth-sso__btn">Google</button>
            <button type="button" disabled className="auth-sso__btn">Microsoft</button>
          </div>
        </div>
      </div>
    </div>
  );
}