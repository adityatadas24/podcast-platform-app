import React, { useState } from "react";
import Input from "../Inputs/Input";
import "./style.css";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { toast } from "react-toastify";
import { setUser } from "../../slices/UserSlice";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signupEmailPassword(e) {
    e.preventDefault();
   setLoading(true)
    console.log("name", fullName);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    if (
      fullName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password.length >= 6) {
        if (password === confirmPassword) {
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
              name: fullName,
              email: user.email,
              uid: user.uid,
            });

            dispatch(
              setUser({
                name: fullName,
                email: user.email,
                uid: user.uid,
              })
            );

            toast.success("User Created Successfully!");
            setFullName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            navigate("/profile");
          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false)
            // ..
          }
        } else {
          toast.error("password and confirm password do not match");
          setLoading(false)
        }
      } else {
        toast.error("password should be at least 6 characters");
        setLoading(false)
      }
    } else {
      toast.error("All Fields are Mandatory");
      setLoading(false)
    }
  }

  return (
    <div>
      <div>
        <Input
          type="text"
          value={fullName}
          setState={setFullName}
          placeholder="Full Name"
          name="name"
          required={true}
        />
        <Input
          type="email"
          value={email}
          setState={setEmail}
          placeholder="Email"
          name="email"
          required={true}
        />
        <Input
          type="password"
          value={password}
          setState={setPassword}
          placeholder="Password"
          name="password"
          required={true}
        />
        <Input
          type="password"
          value={confirmPassword}
          setState={setConfirmPassword}
          placeholder="Confirm Password"
          name="confirmPassword"
          required={true}
        />
        <Button text={loading ? 'Loading...' : 'SignUp'} disabled={loading} handleSubmit={signupEmailPassword} />
      </div>
    </div>
  );
};

export default SignUpForm;
