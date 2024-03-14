import { Link } from "react-router-dom";
import CloseIcon from "../assets/icons/close.svg";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "../api";
import Test from "../components/Test";

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function Search() {
  const { auth } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDataWithDebounce = debounce(async (text) => {
    setLoading(true);
    try {
      const response = await api.get(`http://localhost:3000/search?q=${text}`);
      if (response.status === 200) {
        setSearchResults(response.data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, 700);

  useEffect(() => {
    if (searchText.trim() !== "") {
      fetchDataWithDebounce(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <section className="absolute left-0 top-0 w-full h-screen grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10 h-full">
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desired Blogs
          </h3>
          <input
            type="text"
            placeholder="Start Typing to Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
          />
        </div>

        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {loading ? (
              <p>Loading...</p>
            ) : searchResults.length === 0 ? (
              <p>No results found.</p>
            ) : (
              searchResults.map((re) => <Test key={re.id} data={re} />)
            )}
          </div>
        </div>

        <Link to="/">
          <img
            src={CloseIcon}
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
          />
        </Link>
      </div>
    </section>
  );
}
