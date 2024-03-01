import { NavLink, Link } from "react-router-dom";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { IoSunnyOutline,IoMoonOutline } from "react-icons/io5";

import { toast } from "react-toastify";
import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
function NavBar() {
  const { user, signUp, logOut, isLoading } = useAuth();
  const { isDarkMode, changeMode } = useDarkMode();
  const [open,setIsOpen] = useState(false)
  const links = [
    {
      label: "Movies",
      path: "movies",
    },
    {
      label: "Tv Shows",
      path: "tv",
    },
    {
      label: <FaSearch />,
      path: "search",
    },

  ];
  const btniconStyle =
    " dark:text-white text-lightext flex items-center text-xl md:text-2xl hover:text-primaryhover outline-none";
  const loginHandler = async () => {
    try {
      const data = await signUp();
      if (data)
        toast.success(`logged in successfully`, {
          position: "top-right",
        });
    } catch (err) {
      console.error(err);
    }
  };
  const logoutHandler = async () => {
    try {
      await logOut();
      toast.success(`logged out successfully`, {
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
    }
  };
  const linkstyle = ({ isActive }) =>
    isActive
      ? "text-primaryhover hover:text-primaryhover flex items-center"
      : "hover:text-primaryhover flex items-center";

  return (
    <div className="dark:bg-dark bg-primary fixed w-full top-0 z-40">
      <div className="container py-2 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-secondary text-6xl font-bebas font-bold tracking-widest">
            Movii
          </h1>
        </Link>

        <div
          className={`dark:text-white text-lightext flex gap-11 transition-all duration-300 md:flex-row md:bg-transparent
         dark:bg-black bg-gray-100 shadow-md md:shadow-none right-0 flex-col md:relative fixed top-[76px] md:top-0 md:w-fit w-3/4 md:h-full 
        h-[calc(100vh-76px)] py-8 md:py-0 text-center items-center ${
          open ? "translate-x-0" : "translate-x-[1000px]"
        } md:translate-x-0   text-lg `}>
          {links.map((link, i) => (
            <NavLink className={linkstyle} key={i} to={link.path}>
              {link.label}
            </NavLink>
          ))}
          {user && (
            <NavLink to="/watchlist" className={`${linkstyle} `}>
              WatchList
            </NavLink>
          )}
        </div>
        <div className="flex gap-2 md:gap-6 items-center">
          {!user ? (
            <button onClick={loginHandler} className={btniconStyle}>
              <FaRegUserCircle />
            </button>
          ) : (
            <button onClick={logoutHandler} className={btniconStyle}>
              <MdLogout />
            </button>
          )}
          {isDarkMode ? (
            <button className={btniconStyle} onClick={changeMode}>
              <IoMoonOutline />
            </button>
          ) : (
            <button className={btniconStyle} onClick={changeMode}>
              <IoSunnyOutline />
            </button>
          )}
          <button
            className={`md:hidden ${btniconStyle}`}
            onClick={() => setIsOpen(!open)}>
            <CiMenuBurger />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
