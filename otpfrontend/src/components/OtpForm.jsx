import React, { useState } from 'react';
import '../App.css';

function OtpForm({ onOtpSent }) {
  const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const sendOTP = async () => {
    try {
      const response = await fetch('https://localhost:7118/OTP/SentToEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email /*, phone */})
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('OTP sent successfully!');
        localStorage.setItem('otp_email', email);
        onOtpSent();  // Show OTP input field
      } else {
        setStatus('Failed: ' + result.message);
      }
    } catch (err) {
      setStatus('Something went wrong.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>OTP Generation</h2>
      <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
      {/* <input type="text" placeholder="Enter Phone" value={phone} onChange={e => setPhone(e.target.value)} /> */}
      <button onClick={sendOTP}>Send OTP</button>
      <p>{status}</p>
    </div>
  );
}

export default OtpForm;
