import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
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
        .then(() => {
          // Signed in
          // const user = userCredential.user;
          // console.log(user);
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
    <div className="bg-login-bg bg-cover h-screen">
      <Header />
      <div className="flex flex-col items-center py-36">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="lg:w-[30%] flex flex-col bg-black bg-opacity-90 text-white py-6 px-12 rounded-md"
        >
          <h1 className="font-bold py-4 text-3xl">
            {" "}
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
          {isSignUp ? (
            <input
              ref={name}
              className="p-4 my-2 bg-slate-600 rounded-md bg-opacity-70 "
              type="text"
              placeholder="Full Name"
            />
          ) : (
            <></>
          )}

          <input
            ref={email}
            className="p-4 my-2 bg-slate-600 rounded-md bg-opacity-70 "
            type="text"
            placeholder="Email"
          />
          <input
            ref={password}
            className="p-4 my-2 bg-slate-600 rounded-md bg-opacity-70 "
            type="password"
            placeholder="Password"
          />
          <p className="text-red-500 py-1 text-lg ">{errorMessage}</p>
          <button
            onClick={handleFormSubmit}
            className="p-4 my-2 rounded-md bg-red-600 font-bold text-lg"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <p onClick={toggleSignIn} className="my-8 cursor-pointer">
            {" "}
            <span className="text-gray-500">
              {isSignUp ? "Already Registered ?" : "New to netflix"}
            </span>{" "}
            {isSignUp ? "Sign In Here" : "Sign Up Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
