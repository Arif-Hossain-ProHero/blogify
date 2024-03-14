/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import DotsIcon from "../assets/icons/3dots.svg";
import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import { useState } from "react";

export default function SingleComment({ comment }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const handleLink = (authorId) => {
    if (auth?.user?.id) {
      navigate(`/profile/${authorId}`);
    }
  };

  // const toggleEdit = (commentId) => {
  //   setIsEdit((prevIsEdit) => ({
  //       ...prevIsEdit,
  //     [commentId]: !prevIsEdit[commentId],
  //   }));
  // };

  return (
    <div className="flex items-start space-x-4 my-8 relative">
      {comment?.author?.avatar ? (
        <img
          src={`http://localhost:3000/uploads/avatar/${comment.author.avatar}`}
          className="w-10 h-10 grid place-items-center rounded-full cursor-pointer"
          alt="Author Avatar"
          onClick={() => handleLink(comment.author.id)}
        />
      ) : (
        <div className="w-10 h-10 bg-orange-600 text-white grid place-items-center text-5xl rounded-full cursor-pointer">
          <span onClick={() => handleLink(comment.author.id)}>
            {comment?.author?.firstName.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div className="w-full">
        <h5 className="text-slate -500 font-bold">
          <span
            onClick={() => handleLink(comment.author.id)}
            className="cursor-pointer"
          >
            {comment.author.firstName} {comment.author.lastName}
          </span>
        </h5>
        <p className="text-slate-300">{comment.content}</p>
      </div>
      {/* edit delete section */}
      {comment?.author?.id === auth?.user?.id && (
        <div className="absolute right-0 top-0">
          <button
            className="hover:scale-125"
            onClick={() => toggleEdit(comment.id)}
          >
            <img src={DotsIcon} alt="3dots of Action" />
          </button>
          {/* <!-- Action Menus Popup --> */}
          {isEdit[comment.id] && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={EditIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={DeleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
