import React, { useState } from "react";
import Header from "../components/Header/Header";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import LogInForm from "../components/LoginForm/LogInForm";

const SignIn = () => {
  const [flag, setFlag] = useState(false);
  function handleFlag() {
    setFlag(!flag);
  }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <div >
          {!flag ? <h1>SignUp</h1> : <h1>LogIn</h1>}
          {!flag ? <SignUpForm /> : <LogInForm />}
          {!flag ? (
            <p className="accounts" onClick={handleFlag}>Aleardy have an Account? <span>Click Here.</span></p>
          ) : (
            <p className="accounts" onClick={() => setFlag(!flag)}>
              Don't have an Account? <span>Click Here.</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
