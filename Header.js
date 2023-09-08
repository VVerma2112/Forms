import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { logoutRedux } from "../redux/userSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout Successfully!!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };


  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-slate-300">
      <div className="flex items-center h-full justify-between">
        <div></div>
       

        <div className="flex items-center gap-4 md:gap-7">

         
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <FaUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email ? (
                  <>
                    <Link
                      to={"myprofile"}
                      className="cursor-pointer text-black px-2 bg-white "
                    >
                      MyProfile{" "}
                    </Link>
                    <p
                      className="cursor-pointer text-white px-2 bg-red-400"
                      onClick={handleLogout}
                    >
                      Logout {userData.firstName}{" "}
                    </p>
                  </>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
