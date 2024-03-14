import { useNavigate } from "react-router-dom";
import { convertDate } from "../utils/convertDate";

/* eslint-disable react/prop-types */
export default function Myblogs({ blog }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };
  return (
    <div onClick={handleClick} className="my-6 space-y-4">
      {/* <!-- Blog Card Start --> */}
      <div className="blog-card">
        <img className="blog-thumb" src={blog.thumbnail} alt="" />
        <div className="mt-2">
          <h3 className="text-slate-300 text-xl lg:text-2xl">{blog?.title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1">{blog?.content}</p>

          {/* <!-- Meta Informations --> */}
          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              {blog.author.avatar && (
                <img
                  className="rounded-full avater-img"
                  src={`http://localhost:3000/uploads/avatar/${blog.author.avatar}`}
                />
              )}
              {blog?.author.avatar == "" && (
                <div className="avater-img bg-indigo-600 text-white">
                  <span className="">{blog.author.firstName.charAt(0)}</span>
                </div>
              )}

              <div>
                <h5 className="text-slate-500 text-sm">
                  {" "}
                  {blog.author.firstName} {blog.author.lastName}
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{convertDate(blog.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
              <span>{blog.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Blog Card End --> */}
    </div>
  );
}
