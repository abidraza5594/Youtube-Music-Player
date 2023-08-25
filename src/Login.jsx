import React, { useState } from 'react';
import './loginform.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      const storedUser = JSON.parse(localStorage.getItem(email));
      if (storedUser && storedUser.password === password) {
        console.log('Login successful');
        navigate('/home');
      } else {
        console.log('Invalid login credentials');
      }
    } else {
      const newUser = { name, email, password };
      localStorage.setItem(email, JSON.stringify(newUser));
      console.log('Signup successful');
      setIsLoginMode(true);
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='formcontainer'>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" onChange={toggleMode} />
            <div className="flip-card__inner">
              <div className={`flip-card__front ${isLoginMode ? '' : 'hidden'}`}>
                <div className="title">Log in</div>
                <form className="flip-card__form" onSubmit={handleFormSubmit}>
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <button className="flip-card__btn" type="submit">
                    Let's go!
                  </button>
                  <p onClick={toggleMode} style={{cursor:"pointer"}}>Don't have an account? Sign up</p>
                </form>
              </div>
              <div className={`flip-card__back ${isLoginMode ? 'hidden' : ''}`}>
                <div className="title">Sign up</div>
                <form className="flip-card__form" onSubmit={handleFormSubmit}>
                  <input
                    className="flip-card__input"
                    name="name"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                  />
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <button className="flip-card__btn" type="submit">
                    Confirm!
                  </button>
                  <p onClick={toggleMode} style={{cursor:"pointer"}}>Already have an account? Log in</p>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
