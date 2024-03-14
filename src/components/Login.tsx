import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignIn = () => {
    setIsSignUp(!isSignUp);
  };

  const handleFormSubmit = () => {
    const returnVal = checkValidation(
      email.current?.value || "",
      password.current?.value || "",
      name.current?.value || ""
    );
    if (!isSignUp && returnVal === "Please enter a valid name") {
      setErrorMessage(null);
    } else {
      setErrorMessage(returnVal);
    }
    if (errorMessage) return;

    if (isSignUp) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || ""
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = user;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          //   const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          // ..
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || ""
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          navigate("/browse");
          // ...
        })
        .catch((error) => {
          //   const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  return (
    // <div className="bg-login-bg">
    <div className="bg-login-bg h-[100vh] bg-cover">
      <Header />
      <div className="flex justify-center mt-[6%]">
        <form
          action=""
          className="flex flex-col bg-black px-16 py-16 lg:w-[28%] gap-6 opacity-90 rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-white text-3xl">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
          {isSignUp ? (
            <input
              type="text"
              placeholder="Enter Full Name"
              className="p-3 rounded bg-[#333333] text-teal-700 placeholder-[#8c8c8c]"
              ref={name}
            />
          ) : (
            <></>
          )}
          <input
            type="text"
            placeholder="Enter Email"
            className="p-3 rounded bg-[#333333] text-teal-700 placeholder-[#8c8c8c]"
            ref={email}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-3 rounded bg-[#333333] placeholder-[#8c8c8c]"
            ref={password}
          />
          {errorMessage ? (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          ) : (
            <></>
          )}
          <button
            className="bg-red-600 text-white p-3 rounded"
            type="submit"
            onClick={handleFormSubmit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <p className="text-gray-400 cursor-pointer" onClick={toggleSignIn}>
            {isSignUp ? (
              <span>
                Already Registered? <span className="text-white">Sign In!</span>
              </span>
            ) : (
              <span>
                New to Netflix? <span className="text-white">Sign Up now!</span>
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
