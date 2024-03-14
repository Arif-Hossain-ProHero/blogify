import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg";
import DotsIcon from "../../assets/icons/3dots.svg";
import { useState } from "react";
import { convertDate } from "../../utils/convertDate";

/* eslint-disable react/prop-types */
export default function BlogCard({ blog, onDelete, onEditHandler }) {
  const { auth } = useAuth();
  const { user } = auth;
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/blog/${blog.id}`);
  };

  const toggleEdit = (e) => {
    e.stopPropagation();
    setIsEdit(!isEdit);
  };

  const handleProfile = (e) => {
    e.stopPropagation();
    if (user.id) {
      navigate(`/profile/${blog.author.id}`);
    }
  };

  return (
    <div className="blog-card" onClick={handleClick}>
      <img
        className="blog-thumb"
        src={`http://localhost:3000/uploads/blog/${blog.thumbnail}`}
        alt=""
      />
      <div className="mt-2 relative">
        <Link to={`/blog/${blog.id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">{blog.title}</h3>
        </Link>
        <p className="mb-6 text-base text-slate-500 mt-1">{blog.content}</p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div
            onClick={handleProfile}
            className="flex items-center capitalize space-x-2"
          >
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

        {/* <!-- action dot --> */}
        {user?.id == blog?.author.id && (
          <div className="absolute right-0 top-0">
            <button onClick={toggleEdit} className="hover:scale-110">
              <img src={DotsIcon} alt="3dots of Action" />
            </button>

            {/* <!-- Action Menus Popup --> */}
            {isEdit && (
              <div className="action-modal-container">
                <button
                  className="action-menu-item hover:text-lwsGreen"
                  onClick={(e) => onEditHandler(blog.id, e)}
                >
                  <img src={EditIcon} alt="Edit" />
                  Edit
                </button>
                <button
                  className="action-menu-item hover:text-red-500"
                  onClick={(e) => onDelete(e, blog.id)}
                >
                  <img src={DeleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
        {/* <!-- action dot ends --> */}
      </div>
    </div>
  );
}
