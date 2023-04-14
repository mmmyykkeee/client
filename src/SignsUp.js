// // import React, { useState, useEffect } from "react";
// // import { GoogleLogin } from 'react-google-login';


// // function SignUp() {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     username: "",
// //     phoneNumber: "",
// //   });
// //   const [formErrors, setFormErrors] = useState({});
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     const getUsers = async () => {
// //       try {
// //         const response = await fetch("/users");
// //         const data = await response.json();
// //         setUsers(data);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     getUsers();
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });

// //     // Reset error state for field on change
// //     setFormErrors({
// //       ...formErrors,
// //       [name]: "",
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     let errors = {};

// //     // Check for existing email, username, and phone number
// //     const emailExists = users.some((user) => user.email === formData.email);
// //     const usernameExists = users.some(
// //       (user) => user.username === formData.username
// //     );
// //     const phoneNumberExists = users.some(
// //       (user) => user.phoneNumber === formData.phoneNumber
// //     );

// //     if (emailExists) {
// //       errors.email = "This email is already taken";
// //     }

// //     if (usernameExists) {
// //       errors.username = "This username is already taken";
// //     }

// //     if (phoneNumberExists) {
// //       errors.phoneNumber = "This phone number is already taken";
// //     }

// //     if (!/^(\+254)[0-9]{9}$/.test(formData.phoneNumber)) {
// //       errors.phoneNumber = "Phone number must start with +254";
// //     }

// //     if (Object.keys(errors).length > 0) {
// //       setFormErrors(errors);
// //       return;
// //     }

// //     // Make API request to sign up user
// //     try {
// //       const response = await fetch("/signup", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (response.ok) {
// //         setSuccessMessage("Sign up successful");
// //         setTimeout(() => {
// //           setSuccessMessage("");
// //           window.location.href = "/Sign-In";
// //         }, 3000);
// //       } else {
// //         const data = await response.json();
// //         setFormErrors({
// //           ...errors,
// //           [data.error]: data.message,
// //         });
// //         setSuccessMessage("");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };


// //   const handleGoogleSignUp = async (googleData) => {
// //     // Make API request to sign up user using Google account information
// //     try {
// //       const response = await fetch("/signup/google", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ tokenId: googleData.tokenId }),
// //       });
  
// //       if (response.ok) {
// //         setSuccessMessage("Sign up successful");
// //         setTimeout(() => {
// //           setSuccessMessage("");
// //           window.location.href = "/Sign-In";
// //         }, 3000);
// //       } else {
// //         const data = await response.json();
// //         setFormErrors({
// //           ...formErrors,
// //           [data.error]: data.message,
// //         });
// //         setSuccessMessage("");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
  
// //   const handleGoogleSignUpFailure = (error) => {
// //     console.log(error);
// //   };
  

// //   return (
// //     <div className="containers">
// //       <h1>Sign Up</h1>
// //       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <label htmlFor="email">Email</label>
// //         <input
// //           type="email"
// //           id="email"
// //           name="email"
// //           value={formData.email}
// //           onChange={handleInputChange}
// //           required
// //           style={{
// //             border: formErrors.email ? "1px solid red" : "1px solid black",
// //           }}
// //         />
// //         {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}

// //         <label htmlFor="username">Username</label>
// //         <input
// //           type="text"
// //           id="username"
// //           name="username"
// //           value={formData.username}
// //           onChange={handleInputChange}
// //           required
// //           style={{
// //             border: formErrors.username ? "1px solid red" : "1px solid black",
// //           }}
// //         />
// //         {formErrors.username && (
// //           <p style={{ color: "red" }}>{formErrors.username}</p>
// //         )}

// //         <label htmlFor="password">Password</label>
// //         <input
// //           type="password"
// //           id="password"
// //           name="password"
// //           value={formData.password}
// //           onChange={handleInputChange}
// //           required
// //           style={{
// //             border: formErrors.password ? "1px solid red" : "1px solid black",
// //           }}
// //         />
// //         {formErrors.password && (
// //           <p style={{ color: "red" }}>{formErrors.password}</p>
// //         )}

// //         <label htmlFor="phoneNumber">Phone Number</label>
// //         <input
// //           type="tel"
// //           id="phoneNumber"
// //           name="phoneNumber"
// //           value={formData.phoneNumber}
// //           onChange={handleInputChange}
// //           required
// //           style={{
// //             border: formErrors.phoneNumber
// //               ? "1px solid red"
// //               : "1px solid black",
// //           }}
// //         />
// //         {formErrors.phoneNumber && (
// //           <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
// //         )}
// // <div className="d-flex"> 
  
// //           <button type="submit">Sign Up</button>
// //           <GoogleLogin
// //     clientId="911028964437-v14hdmug36ejb65sblnhh3242288ggna.apps.googleusercontent.com"
// //     buttonText="Sign up with Google"
// //     onSuccess={handleGoogleSignUp}
// //     onFailure={handleGoogleSignUpFailure}
// //     cookiePolicy={'single_host_origin'}
// //   />
// // </div>

// //       </form>
      

// //     </div>
// //   );
// // }

// // export default SignUp;


// import React, { useState, useEffect } from "react";


// function SignUp() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     username: "",
//     phoneNumber: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const response = await fetch("/users");
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUsers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Reset error state for field on change
//     setFormErrors({
//       ...formErrors,
//       [name]: "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let errors = {};

//     // Check for existing email, username, and phone number
//     const emailExists = users.some((user) => user.email === formData.email);
//     const usernameExists = users.some(
//       (user) => user.username === formData.username
//     );
//     const phoneNumberExists = users.some(
//       (user) => user.phoneNumber === formData.phoneNumber
//     );

//     if (emailExists) {
//       errors.email = "This email is already taken";
//     }

//     if (usernameExists) {
//       errors.username = "This username is already taken";
//     }

//     if (phoneNumberExists) {
//       errors.phoneNumber = "This phone number is already taken";
//     }

//     if (!/^(\+254)[0-9]{9}$/.test(formData.phoneNumber)) {
//       errors.phoneNumber = "Phone number must start with +254";
//     }

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     // Make API request to sign up user
//     try {
//       const response = await fetch("/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSuccessMessage("Sign up successful");
//       } else {
//         const data = await response.json();
//         setFormErrors({
//           ...errors,
//           [data.error]: data.message,
//         });
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  
  
//     return (
//       <div className="containers">
//         <h1>Sign Up</h1>
//         {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             style={{
//               border: formErrors.email ? "1px solid red" : "1px solid black",
//             }}
//           />
//           {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
  
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             required
//             style={{
//               border: formErrors.username ? "1px solid red" : "1px solid black",
//             }}
//           />
//           {formErrors.username && (
//             <p style={{ color: "red" }}>{formErrors.username}</p>
//           )}
  
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             style={{
//               border: formErrors.password ? "1px solid red" : "1px solid black",
//             }}
//           />
//           {formErrors.password && (
//             <p style={{ color: "red" }}>{formErrors.password}</p>
//           )}
  
//           <label htmlFor="phoneNumber">Phone Number</label>
//           <input
//             type="tel"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             required
//             style={{
//               border: formErrors.phoneNumber
//                 ? "1px solid red"
//                 : "1px solid black",
//             }}
//           />
//           {formErrors.phoneNumber && (
//             <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
//           )}
  
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     );
//   }
  
//   export default SignUp;
  


import React, { useState, useEffect } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("/users");
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
      [name]: "",
    });
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
      errors.email = "This email is already taken";
    }

    if (usernameExists) {
      errors.username = "This username is already taken";
    }

    if (phoneNumberExists) {
      errors.phoneNumber = "This phone number is already taken";
    }

    if (!/^(\+254)[0-9]{9}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must start with +254";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Make API request to sign up user
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Sign up successful");
        setTimeout(() => {
          setSuccessMessage("");
          window.location.href = "/Sign-In";
        }, 3000);
      } else {
        const data = await response.json();
        setFormErrors({
          ...errors,
          [data.error]: data.message,
        });
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containers">
      <h1>Sign Up</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={{
            border: formErrors.email ? "1px solid red" : "1px solid black",
          }}
        />
        {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          style={{
            border: formErrors.username ? "1px solid red" : "1px solid black",
          }}
        />
        {formErrors.username && (
          <p style={{ color: "red" }}>{formErrors.username}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          style={{
            border: formErrors.password ? "1px solid red" : "1px solid black",
          }}
        />
        {formErrors.password && (
          <p style={{ color: "red" }}>{formErrors.password}</p>
        )}

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          style={{
            border: formErrors.phoneNumber
              ? "1px solid red"
              : "1px solid black",
          }}
        />
        {formErrors.phoneNumber && (
          <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;