import React, { useState } from 'react';
import OtpForm from './components/OtpForm';
import OtpValidation from './components/OtpValidation';

function App() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="App">
      <OtpForm onOtpSent={() => setOtpSent(true)} />
      {otpSent && <OtpValidation />}
    </div>
  );
}

export default App;
