import { Link, useNavigate } from "react-router-dom";
import { convertDate } from "../utils/convertDate";
import { useAuth } from "../hooks/useAuth";

/* eslint-disable react/prop-types */
export default function Test({ data }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleProfile = (id, e) => {
    e.stopPropagation();
    if (auth.user.id) {
      navigate(`/profile/${id}`);
    }
  };
  return (
    <div className="blog-card" onClick={() => handleClick(data?.id)}>
      <img
        className="blog-thumb"
        src="./assets/blogs/React-Roadmap.jpg"
        alt=""
      />
      <div className="mt-2 relative">
        <Link to={`/blog/${data.id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">{data?.title}</h3>
        </Link>
        <p className="mb-6 text-base text-slate-500 mt-1">
          {data?.content.slice(0, 200)}...
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            {data?.author?.avatar ? (
              <img
                onClick={(e) => handleProfile(data?.author?.id, e)}
                src={`http://localhost:3000/uploads/avatar/${data.author.avatar}`}
                className="w-10 h-10 grid place-items-center rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                <span className="">
                  {" "}
                  {data?.author?.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div>
              <h5
                className="text-slate-500 text-sm hover:scale-105"
                onClick={(e) => handleProfile(data?.author?.id, e)}
              >
                {data?.author.firstName} {data?.author.lastName}
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{convertDate(data?.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{data?.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
