import { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

export default function FavoriteBlogs() {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const response = await api.get(
          `http://localhost:3000/blogs/favourites`
        );
        if (response.status === 200) {
          setFav(response.data.blogs);
          setLoading(false);
        } else {
          console.error("Failed to fetch favorites:", response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      }
    };

    fetchFav();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>
      {fav.map((f) => (
        <ul className="space-y-5 my-5" key={f.id}>
          <li>
            <Link
              to={`/blog/${f.id}`}
              className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
            >
              {f.title}
            </Link>
            <p className="text-slate-600 text-sm">
              {f.tags &&
                f.tags.split(",").map((t, index) => (
                  <span key={t}>
                    #{t.trim()}
                    {index !== f.tags.split(",").length - 1 && ", "}
                  </span>
                ))}
            </p>
          </li>
        </ul>
      ))}
    </div>
  );
}
