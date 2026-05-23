import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './MFAVerification.css';

export default function MFAVerification() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [mode, setMode] = useState('totp');
  const [trustedDevice, setTrustedDevice] = useState(false);
  const [showBackup, setShowBackup] = useState(false);
  const [backupCode, setBackupCode] = useState('');
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, [mode]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) refs.current[index - 1]?.focus();
  };

  const handleVerify = () => {
    const code = showBackup ? backupCode : digits.join('');
    if (code.length >= 6) {
      if (trustedDevice) localStorage.setItem('finz_trusted_mfa', String(Date.now()));
     localStorage.setItem('finz_authenticated', 'true');
      navigate('/dashboard');
    }
  };

  const handleSmsOtp = () => {
    setMode('sms');
    setDigits(['', '', '', '', '', '']);
  };

  return (
    <div className="mfa-page">
      <div className="mfa-card">
        <img src="/logo.png" alt="FinZ" className="mfa-card__logo" />
        <h1 className="mfa-card__title">Two-Factor Verification</h1>
        <p className="mfa-card__subtitle">Screen 02 — Mandatory MFA for Super Admin</p>

        <div className="mfa-tabs">
          <button type="button" className={mode === 'totp' ? 'mfa-tabs__active' : ''} onClick={() => setMode('totp')}>Authenticator (TOTP)</button>
          <button type="button" className={mode === 'sms' ? 'mfa-tabs__active' : ''} onClick={handleSmsOtp}>SMS OTP</button>
        </div>

        {!showBackup ? (
          <>
            <p className="mfa-hint">
              {mode === 'totp' ? 'Enter 6-digit code from Google Authenticator / Authy' : 'OTP sent to registered mobile'}
            </p>
            <div className="mfa-inputs">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="mfa-inputs__box"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mfa-backup-form">
            <label className="mfa-backup-form__label">Recovery code</label>
            <input
              type="text"
              value={backupCode}
              onChange={(e) => setBackupCode(e.target.value)}
              className="mfa-backup-form__input"
              placeholder="XXXX-XXXX-XXXX"
            />
          </div>
        )}

        <label className="mfa-trusted">
          <input type="checkbox" checked={trustedDevice} onChange={(e) => setTrustedDevice(e.target.checked)} />
          Trust this device (skip MFA for 30 days)
        </label>

        <Button onClick={handleVerify} className="mfa-submit">Verify & Continue</Button>

        <div className="mfa-links">
          <button type="button" onClick={() => setShowBackup(!showBackup)}>
            {showBackup ? 'Use authenticator instead' : 'Use backup recovery code'}
          </button>
          <button type="button">Regenerate recovery codes</button>
        </div>

        <p className="mfa-audit">MFA events are logged in audit trail</p>
      </div>
    </div>
  );
}