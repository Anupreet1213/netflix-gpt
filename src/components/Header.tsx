import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_LOGO } from "../utils/constants";
// import userSlice from "../utils/userSlice";
// import appStore from "../utils/appStore";

interface RootState {
  user: User;
}

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when header unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        console.log(error);
      });
  };

  return (
    <div className="bg-gradient-to-b from-black flex justify-between items-center pr-5 fixed w-full z-10">
      <img className="w-44" src={LOGO} alt="logo" />
      {user ? (
        <div className="flex gap-3">
          <img className="w-12" src={USER_LOGO} alt="user-icon" />
          <span>{user?.displayName}</span>
          <button className="text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
