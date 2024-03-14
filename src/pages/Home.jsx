import { useEffect, useRef, useState } from "react";
import BlogCard from "../components/blogs/BlogCard";
import FavoriteBlogs from "../components/blogs/FavoriteBlogs";
import PopularBlogs from "../components/blogs/PopularBlogs";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

let PAGE = 1;

export default function Home() {
  const { auth } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(PAGE);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        `http://localhost:3000/blogs?page=${PAGE}`
      );
      if (response.status == 200) {
        setBlogs([...blogs, ...response.data.blogs]);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `http://localhost:3000/blogs?page=${page}`
      );
      const data = response.data;

      if (data.blogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);

  const handleBlogDelete = async (e, id) => {
    e.stopPropagation();
    if (confirm("Do you really want to delete the blog")) {
      const response = await api.delete(`http://localhost:3000/blogs/${id}`);
      const updatedBlogs = blogs.filter((blog) => blog.id != id);
      setBlogs(updatedBlogs);
    }
  };

  const updateBlogHandler = (blogId, e) => {
    e.stopPropagation();
    navigate(`/updateBlog/${blogId}`);
  };

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* <!-- Blog Contents --> */}
          <div className="space-y-3 md:col-span-5">
            {/* <!-- Blog Card Start --> */}

            {blogs.length > 0 &&
              blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onDelete={handleBlogDelete}
                  onEditHandler={updateBlogHandler}
                />
              ))}
          </div>

          {/* <!-- Sidebar --> */}
          <div className="md:col-span-2 h-full w-full space-y-5">
            <PopularBlogs />
            {/* Favorite */}
            <FavoriteBlogs />
          </div>
        </div>
      </div>
      {hasMore && <div ref={loaderRef}>Loading more products...</div>}
      {hasMore || (
        <p className="container w-full p-6 text-3xl text-purple-800 font-semibold">
          No More Products to Load
        </p>
      )}
    </section>
  );
}
