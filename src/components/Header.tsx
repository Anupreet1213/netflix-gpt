import { User, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import userSlice from "../utils/userSlice";
// import appStore from "../utils/appStore";

interface RootState {
  user: User;
}

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        console.log(error);
      });
  };

  return (
    <div className="bg-gradient-to-b from-black flex justify-between items-center pr-5">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user ? (
        <div className="flex gap-3">
          <img
            className="w-12"
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            alt="user-icon"
          />
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
