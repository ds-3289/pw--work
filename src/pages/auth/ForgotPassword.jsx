import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './ForgotPassword.css';

const STEPS = ['email', 'otp', 'password'];

function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: 'Weak', level: 1, color: 'var(--color-danger)' };
  if (score <= 4) return { label: 'Medium', level: 2, color: 'var(--color-accent)' };
  return { label: 'Strong', level: 3, color: 'var(--color-success)' };
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [timer, setTimer] = useState(900);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const t = setInterval(() => setTimer((s) => s - 1), 1000);
      return () => clearInterval(t);
    }
    return undefined;
  }, [step, timer]);

  const strength = getPasswordStrength(password);
  const mins = Math.floor(timer / 60);
  const secs = String(timer % 60).padStart(2, '0');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('otp'); setTimer(900); }, 500);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (mobileOtp.length !== 6) { setError('Enter 6-digit mobile OTP'); return; }
    setError('');
    setStep('password');
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (strength.level < 2) { setError('Password too weak'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Password reset. All active sessions invalidated. Email & SMS notification sent.');
      navigate('/login');
    }, 600);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <img src="/logo.png" alt="FinZ" className="forgot-card__logo" />
        <h1 className="forgot-card__title">Reset Password</h1>
        <p className="forgot-card__subtitle">Screen 03 — Email + mobile OTP verification</p>

        <div className="forgot-steps">
          {STEPS.map((s, i) => (
            <span key={s} className={`forgot-steps__item ${step === s ? 'forgot-steps__item--active' : ''} ${STEPS.indexOf(step) > i ? 'forgot-steps__item--done' : ''}`}>
              {i + 1}. {s}
            </span>
          ))}
        </div>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="forgot-form">
            <Input label="Registered Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <p className="forgot-note">Mobile OTP will be sent to your registered number</p>
            <Button type="submit" loading={loading} className="forgot-form__btn">Send Reset Link</Button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="forgot-form">
            <p className="forgot-timer">Link expires in {mins}:{secs}</p>
            <Input label="Mobile OTP (6 digits)" value={mobileOtp} onChange={(e) => setMobileOtp(e.target.value)} maxLength={6} required />
            {error && <p className="forgot-error">{error}</p>}
            <Button type="submit" className="forgot-form__btn">Verify OTP</Button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handleReset} className="forgot-form">
            <Input label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="forgot-strength">
              <div className="forgot-strength__bar">
                <div className="forgot-strength__fill" style={{ width: `${(strength.level / 3) * 100}%`, background: strength.color }} />
              </div>
              <span style={{ color: strength.color }}>{strength.label}</span>
            </div>
            <p className="forgot-note">Cannot reuse last 5 passwords (checked on server)</p>
            <Input label="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            {error && <p className="forgot-error">{error}</p>}
            <Button type="submit" loading={loading} className="forgot-form__btn">Reset Password</Button>
          </form>
        )}

        <Link to="/login" className="forgot-back">← Back to login</Link>
      </div>
    </div>
  );
}