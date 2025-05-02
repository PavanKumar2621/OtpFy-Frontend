import React, { useState } from 'react';
import '../App.css';

function OtpValidation() {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');

  const validateOTP = async () => {
    const email = localStorage.getItem('otp_email'); // ✅ Get stored email
    if (!otp || !email) {
      setStatus('Email or OTP missing!');
      return;
    }
    try {
      const response = await fetch('https://localhost:7118/OTP/OTPValidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, otp })
      });

      const result = await response.json();

      if (response.ok) {
        alert('OTP verified successfully!');
        setStatus('OTP verified successfully!');
      } else {
        alert('OTP verification failed!');
        setStatus('Verification failed: ' + result.message);
      }
    } catch (err) {
      setStatus('Error validating OTP.');
      console.error(err);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
      <button onClick={validateOTP}>Validate OTP</button>
      <p>{status}</p>
    </div>
  );
}

export default OtpValidation;
