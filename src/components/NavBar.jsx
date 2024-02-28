import { NavLink, Link } from "react-router-dom";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";
import { PiSlideshowFill } from "react-icons/pi";

function NavBar() {
  const { user, signUp, logOut } = useAuth();
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
  const loginHandler = async () => {
    try {
      const data = await signUp();
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };
    const logoutHandler = async () => {
      try {
        const data = await logOut();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    const linkstyle = ({ isActive }) =>
      isActive
        ? "text-primaryhover hover:text-primaryhover flex items-center"
        : "hover:text-primaryhover flex items-center";

  return (
    <div className="bg-dark">
      <div className="container py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-secondary text-6xl font-bold tracking-widest">
            Movii
          </h1>
        </Link>

        <div className="text-white flex gap-11 transition-all duration-300  text-lg ">
          {links.map((link, i) => (
            <NavLink className={linkstyle} key={i} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div>
          {!user ? (
            <button
              onClick={loginHandler}
              className="text-white flex items-center text-2xl hover:text-primaryhover">
              <FaRegUserCircle />
            </button>
          ) : (
            <div className="text-white flex items-center text-2xl  flex flex-row-reverse gap-6">
              <button
                onClick={logoutHandler}
                className="hover:text-primaryhover">
                <MdLogout />
              </button>
              <NavLink
                to="/watchlist"
                className={`${linkstyle} text-white flex gap-11 transition-all duration-300   text-lg`}>
                <PiSlideshowFill />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
