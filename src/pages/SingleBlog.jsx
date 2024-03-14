import { useNavigate, useParams } from "react-router-dom";
import BlogComments from "../components/blogs/BlogComments";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { convertDate } from "../utils/convertDate";

export default function SingleBlog() {
  let { blogId } = useParams();
  const [data, setData] = useState();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/blogs/${blogId}`);
      setData(response.data);
      // setTags(response.data.tags.split(","));
      setLoading(false);
      console.log(response.data);
    };
    fetchData();
  }, [blogId]);

  const handleProfile = (id) => {
    if (auth.user.id) {
      navigate(`/profile/${id}`);
    }
  };

  return (
    <>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{data?.title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div
            onClick={() => handleProfile(data?.author?.id)}
            className="flex items-center capitalize space-x-2 cursor-pointer"
          >
            {data?.author?.avatar ? (
              <img
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
            <h5 className="text-slate-500 text-sm">
              {data?.author.firstName} {data?.author.lastName}
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">
            {convertDate(data?.createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {data?.likes.length} Likes
          </span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`http://localhost:3000/uploads/blog/${data?.thumbnail}`}
          alt=""
        />

        {/* <!-- Tags --> */}
        <ul className="tags">
          {tags.length > 0 && tags.map((t) => <li key={t}>{t}</li>)}
        </ul>

        {/* <!-- Content --> */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {data?.content}
        </div>
      </div>
      {/* {loading ? <p>Loading Comments</p> : <BlogComments data={data} />} */}
      {data && <BlogComments data={data} />}
    </>
  );
}
