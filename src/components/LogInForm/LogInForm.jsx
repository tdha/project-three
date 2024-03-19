import { useState } from 'react';
import * as usersService from '../../utilities/users-services';
import { Link } from 'react-router-dom';

function LogInForm({ setUser, showSignup, setShowSignup }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent form from being submitted to the server
    try {
      const user = await usersService.login(credentials); // The promise returned by the signUp service method will resolve to the user object included in the payload of the JSON Web Token (JWT)
      setUser(user);
    } catch {
      console.error(err);
      setError('Login failed. Please try again.');
    }
  }

  return (
    <div>
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={credentials.email} onChange={handleChange} required placeholder='Email' />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={credentials.password} onChange={handleChange} required placeholder='Password' />
                <button type="submit">Log in</button>
            </form>
            <p>Don't have an account? Click <Link onClick={() => setShowSignup(!showSignup)}>here</Link> to sign up.</p>
        </div>
        <p className="error-message">{error}</p>
    </div>
  );
}

export default LogInForm;