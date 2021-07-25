import React, { useState } from "react";
import "./sign-in.styles.scss";

import CustomButton from "../../component/custom-button/custom-button.component.jsx";
import FormInput from "../../component/form-input/form-input.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils.js";

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I have already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput handleChange={handleChange} name="email" type="email" value={email} required label="email" />

        <FormInput
          handleChange={handleChange}
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
