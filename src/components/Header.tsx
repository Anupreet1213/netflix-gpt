import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LANG_CONFIG, LOGO, USER_LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { RootState } from "../utils/appStore";
// import userSlice from "../utils/userSlice";
// import appStore from "../utils/appStore";

interface RootStateUser {
  user: User;
}

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store: RootStateUser) => store.user);
  const isGpt = useSelector((store: RootState) => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  const toggleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

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

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="bg-gradient-to-b from-black flex justify-between items-center pr-5 fixed w-full z-50">
      <img className="w-44" src={LOGO} alt="logo" />
      {user ? (
        <div className="flex gap-3">
          <img className="w-12" src={USER_LOGO} alt="user-icon" />
          {isGpt ? (
            <select
              className="bg-gray-900 text-white p-1 rounded-lg"
              name="Lang"
              onChange={handleLangChange}
            >
              {LANG_CONFIG.map((lang) => {
                return <option value={lang.langKey}>{lang.langName}</option>;
              })}
            </select>
          ) : (
            <></>
          )}
          <button
            onClick={toggleGptSearch}
            className="bg-transparent border-red-500 border p-2 rounded-lg text-white"
          >
            {isGpt ? "HomePage" : "GPT Search"}
          </button>
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
