/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { api } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import LikeIcon from "../../assets/icons/like.svg";
import LikedIcon from "../../assets/icons/liked.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import FilledHeartIcon from "../../assets/icons/heart-filled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import SingleComment from "../SingleComment";

export default function BlogComments({ data }) {
  const { auth } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(data?.comments || []);
  const [likes, setLikes] = useState(data?.likes || []);
  const [isFavourite, setIsFavourite] = useState(data?.isFavourite || false);
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => like.id === auth?.user?.id)
  );

  const handleComment = async () => {
    try {
      const response = await api.post(
        `http://localhost:3000/blogs/${data?.id}/comment`,
        { content: commentText }
      );
      console.log(response);
      setCommentText("");
      setComments(response.data.comments);
      alert("Comment submitted successfully");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLikes = async () => {
    try {
      if (auth?.user?.id) {
        const response = await api.post(
          `http://localhost:3000/blogs/${data?.id}/like`
        );
        if (response.status === 200) {
          setLikes(response.data.likes);
          setIsLiked(response.data.isLiked);
        }
      } else {
        alert("Login to Like the blog");
      }
    } catch (error) {
      console.error("Error handling likes:", error);
    }
  };

  const toggleFav = async () => {
    try {
      if (auth?.user?.id) {
        const response = await api.patch(
          `http://localhost:3000/blogs/${data?.id}/favourite`
        );
        setIsFavourite(response.data?.isFavourite);
      } else {
        alert("Please Login to set it Favourite");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments?.length})
        </h2>
        <div className="flex items -center space-x-4">
          {auth?.user?.avatar ? (
            <img
              src={`http://localhost:3000/uploads/avatar/${auth?.user?.avatar}`}
              className="w-10 h-10 grid place-items-center rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
              <span className="">
                {" "}
                {auth?.user?.firstName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              disabled={!auth?.authToken}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-600 cursor-pointer text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleComment}
                disabled={!auth?.authToken}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
        {/* Comment body */}
        {comments?.length > 0 &&
          comments.map((comment) => (
            <SingleComment key={comment.id} comment={comment} />
          ))}
      </div>
      {/* floating action */}
      <div className="floating-action">
        <ul className="floating-action-menus">
          {isLiked ? (
            <li onClick={handleLikes}>
              <img src={LikedIcon} alt="like" />
              <span>{likes?.length}</span>
            </li>
          ) : (
            <li onClick={handleLikes}>
              <img src={LikeIcon} alt="like" />
              <span>{likes?.length}</span>
            </li>
          )}

          <li>
            {isFavourite ? (
              <img onClick={toggleFav} src={FilledHeartIcon} alt="Favourite" />
            ) : (
              <img onClick={toggleFav} src={HeartIcon} alt="Favourite" />
            )}
          </li>
          <a href="#comments">
            <li>
              <img src={CommentIcon} alt="Comments" />
              <span>{comments?.length}</span>
            </li>
          </a>
        </ul>
      </div>
    </section>
  );
}
