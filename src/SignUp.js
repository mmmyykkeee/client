import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    // Reset error state for field on change
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  
    // Email validation check
    if (name === 'email') {
      if (
        value &&
        !/^[^\s@]+@[gmail|yahoo]+\.[co]{2}[m]{1}$/.test(value.toLowerCase())
      ) {
        setFormErrors({
          ...formErrors,
          email: 'Please enter a valid email address',
        });
      }
    }
    if (name === 'phoneNumber') {
      if (
        value &&
        !/^\+254\d{9}$/.test(value)
      ) {
        setFormErrors({
          ...formErrors,
          phoneNumber: 'Please enter a valid phone number starting with +254',
        });
      }
    }
  
    // Password validation check
    let passwordCriteriaList = document.querySelectorAll(
      '#password-criteria li'
    );
  
    if (name === 'password') {
      let passwordCriteria = {
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
        length: false,
      };
  
      passwordCriteriaList.forEach((criteria, index) => {
        criteria.classList.remove('criteria-met');
      });
  
      if (/(?=.*[A-Z])/.test(value)) {
        passwordCriteria.uppercase = true;
        const upperCriteria = document.getElementById('password-criteria-upper');
        if (upperCriteria) {
          upperCriteria.classList.add('criteria-met');
        }
      }
  
      if (/(?=.*[a-z])/.test(value)) {
        passwordCriteria.lowercase = true;
        const lowerCriteria = document.getElementById('password-criteria-lower');
        if (lowerCriteria) {
          lowerCriteria.classList.add('criteria-met');
        }
      }
  
      if (/(?=.*\d)/.test(value)) {
        passwordCriteria.number = true;
        const numberCriteria = document.getElementById('password-criteria-number');
        if (numberCriteria) {
          numberCriteria.classList.add('criteria-met');
        }
      }
  
      if (/(?=.*\W)/.test(value)) {
        passwordCriteria.specialChar = true;
        const specialCriteria = document.getElementById('password-criteria-special');
        if (specialCriteria) {
          specialCriteria.classList.add('criteria-met');
        }
      }
  
      if (/(?=.{8,})/.test(value)) {
        passwordCriteria.length = true;
        const lengthCriteria = document.getElementById('password-criteria-length');
        if (lengthCriteria) {
          lengthCriteria.classList.add('criteria-met');
        }
      }
  
      if (
        value &&
        Object.values(passwordCriteria).every((criteria) => criteria === true)
      ) {
        setFormErrors({
          ...formErrors,
          password: '',
        });
      } else {
        setFormErrors({
          ...formErrors,
          password: 'Please enter a password that meets the criteria',
        });
      }
  
      // Set password criteria color
      passwordCriteriaList.forEach((criteria, index) => {
        if (passwordCriteria[Object.keys(passwordCriteria)[index]]) {
          criteria.classList.add('criteria-met');
        }
      });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    // Check for existing email, username, and phone number
    const emailExists = users.some((user) => user.email === formData.email);
    const usernameExists = users.some(
      (user) => user.username === formData.username
    );
    const phoneNumberExists = users.some(
      (user) => user.phoneNumber === formData.phoneNumber
    );
    if (emailExists) {
        errors = { ...errors, email: 'Email already exists' };
        }
        if (usernameExists) {
            errors = { ...errors, username: 'Username already exists' };
          }
          
          if (phoneNumberExists) {
            errors = {
              ...errors,
              phoneNumber: 'Phone number already exists',
            };
          }
          
          if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
          } else {
            try {
              const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
              const data = await response.json();
          
              if (response.ok) {
                setSuccessMessage("Sign up successful");
                setTimeout(() => {
                  setSuccessMessage("");
                  window.location.href = "/Sign-In";
                }, 3000);
             
              } else {
                setFormErrors({ ...formErrors, submit: data.message });
              }
            } catch (error) {
              console.log(error);
            }
          }
        };

        const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
        };
        
        return (
        <div className="signup-container container">
        <form onSubmit={handleSubmit}>
        <h1>Create an account</h1>
        <label htmlFor="email">Email</label>
        <input
               type="email"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleInputChange}
               required
             />
        {formErrors.email && (
  <p className="error" style={{color: 'red'}}>
    {formErrors.email}
  </p>
)}
        <label htmlFor="password">Password</label>
        <div className="password-input-container">
        
            <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required

            />
            
            {showPassword ? (
            <FaEyeSlash
                       className="password-visibility-icon mx-2"
                       onClick={handlePasswordVisibility}
                     />
            ) : (
            <FaEye
                       className="password-visibility-icon mx-2"
                       onClick={handlePasswordVisibility}
                     />
            )}
        
        </div>
        <p className="password-criteria-header">Password Criteria</p>
        <ul id="password-criteria" style={{color: 'red'}}>
        <li id="password-criteria-upper">At least one uppercase letter</li>
        <li id="password-criteria-lower">At least one lowercase letter</li>
        <li id="password-criteria-number">At least one number</li>
        <li id="password-criteria-special">
        At least one special character
        </li>
        <li id="password-criteria-length">At least 8 characters long</li>
        </ul>
        {formErrors.password && (
  <p className="error" style={{color: 'red'}}>
    {formErrors.password}
  </p>
)}
        <label htmlFor="username">Username</label>
        <input
               type="text"
               id="username"
               name="username"
               value={formData.username}
               onChange={handleInputChange}
               required
             />
        {formErrors.username && (
  <p className="error" style={{color: 'red'}}>
    {formErrors.username}
  </p>
)}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
               type="tel"
               id="phoneNumber"
               name="phoneNumber"
               value={formData.phoneNumber}
               onChange={handleInputChange}
               required
             />
     {formErrors.phoneNumber && (
  <p className="error" style={{color: 'red'}}>
    {formErrors.phoneNumber}
  </p>
)}
        {formErrors.submit && (
  <p className="error" style={{color: 'red'}}>
    {formErrors.submit}
  </p>
)}
        {successMessage && <p className="success
        ">{successMessage}</p>}
        <button type="submit">Sign Up</button>
        
        </form>
        </div>
        );
        }
        export default SignUp;          