import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PopularBlogs() {
  const [polularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/blogs/popular");
      setPopularBlogs(response.data.blogs);
      console.log(response.data.blogs);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {polularBlogs?.length > 0 &&
          polularBlogs.map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/blog/${blog.id}`}
                className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
              >
                {blog.title}
              </Link>
              <p className="text-slate-600 text-sm">
                by{" "}
                <Link to={`profile/${blog.author.id}`}>
                  {blog.author.firstName} {blog.author.lastName}
                </Link>
                <span> · </span>
                {blog?.likes.length} likes
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
