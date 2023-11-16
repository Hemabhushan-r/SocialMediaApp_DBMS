import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");
  const [signUpConfirmPass, setSignUpConfirmPass] = useState("");
  const [signUpDOB, setSignUPDOB] = useState("");
  const [signUPGender, setSignUpGender] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPass, setSignInPass] = useState("");
  const [isErrorSignIn, setIsErrorSignIn] = useState(false);
  const [isErrorSignUp, setIsErrorSignUp] = useState(false);
  const [errorMesSignIn, setErrormesSignIn] = useState("");
  const [errorMesSignUp, setErrormesSignUp] = useState("");
  const navigate = useNavigate();

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const data = { email: signInEmail, password: signInPass };
    const url = "http://localhost:5000/user/signin";
    try {
      const response = await axios.post(url, data);
      console.log(response);
      setErrormesSignIn((prev) => "");
      setIsErrorSignUp((prev) => false);
      localStorage.setItem("email", signInEmail);
      localStorage.setItem("auth_token", response?.data?.token);
      navigate("/home");
    } catch (err) {
      setErrormesSignIn((prev) => err?.response?.data?.message);
      setIsErrorSignIn((prev) => !prev);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    /*{
    "firstname":"Hemabhushan",
    "lastname":"R",
    "email":"hemabhushanr1234@gmail.com",
    "password":"test",
    "confirmpassword":"test",
    "dob":"2003-11-15",
    "gender":"Male"
} */
    const data = {
      firstname: firstName,
      lastname: lastName,
      email: signUpEmail,
      password: signUpPass,
      confirmpassword: signUpConfirmPass,
      dob: signUpDOB,
      gender: signUPGender,
    };
    const url = "http://localhost:5000/user/signup";
    try {
      const response = await axios.post(url, data);
      console.log(response);
      setErrormesSignUp((prev) => "");
      setIsErrorSignUp((prev) => false);
      localStorage.setItem("email", signInEmail);
      localStorage.setItem("auth_token", response?.data?.token);
      navigate("/home");
    } catch (err) {
      setErrormesSignUp((prev) => err?.response?.data?.message);
      setIsErrorSignUp((prev) => !prev);
    }
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (errormessage) => (
    <div className="error">{errormessage}</div>
  );

  // JSX code for login form
  const renderSignInForm = (
    <div className="card p-2 form shadow-lg">
      <form onSubmit={handleSignInSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input
            type="text"
            name="uname"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            value={signInPass}
            onChange={(e) => setSignInPass(e.target.value)}
            required
          />
          {isErrorSignIn ? renderErrorMessage(errorMesSignIn) : ""}
        </div>
        <div className="button-container">
          <input type="submit" />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignUp((prev) => !prev);
            }}
            type="button"
            className="mx-3 btn btn-success"
          >
            Sign Up Instead
          </button>
        </div>
      </form>
    </div>
  );

  const renderSignUpForm = (
    <div className="card p-2 form mx-5 shadow-lg">
      <form onSubmit={handleSignUpSubmit}>
        <div className="row justify-content-center">
          <div className="col-5 input-container">
            <label>First Name</label>
            <input
              type="text"
              name="fname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="col-5 input-container">
            <label>Last Name</label>
            <input
              type="text"
              name="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 input-container">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 input-container">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              value={signUpPass}
              onChange={(e) => setSignUpPass(e.target.value)}
              required
            />
          </div>
          <div className="col-10 input-container">
            <label>Confirm Password </label>
            <input
              type="password"
              name="cpass"
              value={signUpConfirmPass}
              onChange={(e) => setSignUpConfirmPass(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 input-container">
            <label>Date of Birth </label>
            <input
              type="date"
              name="dob"
              value={signUpDOB}
              onChange={(e) => setSignUPDOB(e.target.value)}
              required
            />
          </div>
          <div className="col-10 input-container">
            <select
              className="form-select"
              value={signUPGender}
              onChange={(e) => setSignUpGender(e.target.value)}
              aria-label="select gender"
            >
              <option selected>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Others</option>
            </select>
            {isErrorSignUp ? renderErrorMessage(errorMesSignUp) : ""}
          </div>
        </div>

        <div className="button-container">
          <input type="submit" className="btn btn-success" />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignUp((prev) => !prev);
            }}
            type="button"
            className="mx-3 btn btn-success"
          >
            Sign In Instead
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="container-fluid vh-100 mx-auto align-middle">
      <div className="title">{isSignUp ? "Sign Up" : "Sign In"}</div>
      {isSignUp ? renderSignUpForm : renderSignInForm}
    </div>
  );
};
export default SignIn;
