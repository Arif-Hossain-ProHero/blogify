import Logo from "../assets/logo.svg";
import SearchIcon from "../assets/icons/search.svg";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { clearInfo } from "../utils/saveUserData";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const { user } = auth;
  const { profile } = useProfile();
  const avatar = `http://localhost:3000/uploads/avatar/${profile.avatar}`;

  const handleLogout = () => {
    setAuth({});
    clearInfo();
  };

  return (
    <header>
      <nav className="container">
        {/* <!-- Logo --> */}
        <div>
          <Link to="/">
            <img className="w-32" src={Logo} alt="lws" />
          </Link>
        </div>

        {/* <!-- Actions - Login, Write, Home, Search -->
      <!-- Notes for Developers -->
      <!-- For Logged in User - Write, Profile, Logout Menu -->
      <!-- For Not Logged in User - Login Menu --> */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/createBlog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to={"/search"}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={SearchIcon} alt="Search" />
                  <span>Search</span>
                </Link>
              </li>
            )}
            {user ? (
              <li onClick={handleLogout}>
                <p className="text-white/50 hover:text-white transition-all duration-200 cursor-pointer">
                  {" "}
                  Logout{" "}
                </p>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  {" "}
                  Login{" "}
                </Link>
              </li>
            )}
            {user && (
              <li className="flex items-center">
                {avatar ? (
                  <Link to={`/profile/${user.id}`}>
                    <img src={avatar} className="avater-img" />
                  </Link>
                ) : (
                  <Link
                    to={`/profile/${user.id}`}
                    className="avater-img bg-orange-600 text-white"
                  >
                    <span className="">
                      {user?.firstName.charAt(0).toUpperCase()}
                    </span>
                    {/* <!-- User's first name initial --> */}
                  </Link>
                )}

                {/* <!-- Logged-in user's name --> */}
                <Link to={`/profile/${user.id}`} className="text-white ml-2">
                  {user?.firstName} {user.lastName}
                </Link>
                {/* <!-- Profile Image --> */}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
