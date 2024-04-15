import React, { useState } from "react";
import Input from "../Inputs/Input";
import { doc, getDoc,} from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { toast } from "react-toastify";
import Button from "../Buttons/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/UserSlice";


const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
const dispatch = useDispatch();


async function loginEmailPassword(e) {
    e.preventDefault();
    setLoading(true)
    if (email !== "" && password !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        dispatch(
          setUser({
            name: userData.name,
            email: userData.email,
            uid: userData.uid,
            profilePic: userData.profilePic,
          })
        );

        toast.success("Login Successfully!");
      
        navigate("/profile");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
setLoading(false)
        // ..
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

        <Button text={loading ? 'Loading...' : 'LogIn'} disabled={loading} handleSubmit={loginEmailPassword} />
      </div>
    </div>
  );
};

export default LogInForm;
