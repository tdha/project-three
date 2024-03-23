import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LogInForm from '../../components/LogInForm/LogInForm';
import './AuthPage.css';

function AuthPage({ setUser }) {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <main className="login">
      <img src="../../assets/logo.png" alt="" />
      {showSignup ? (
        <SignUpForm
          setUser={setUser}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      ) : (
        <LogInForm
          setUser={setUser}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      )}
    </main>
  );
}

export default AuthPage;
