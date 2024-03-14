import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Field from "../components/common/Field";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [updatedFormData, setUpdatedFormData] = useState({
    thumbnail: null,
    content: "",
    title: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setUpdatedFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setUpdatedFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submitHandler = async (formData) => {
    const thumb = formData.thumbnail[0];
    const newFormData = new FormData();
    newFormData.append("thumbnail", thumb);
    newFormData.append("title", formData.title);
    newFormData.append("tags", formData.tags);
    newFormData.append("content", formData.content);
    if (!blogId) {
      try {
        const response = await api.post(
          `http://localhost:3000/blogs/`,
          newFormData
        );
        if (response.status === 201) {
          alert("You successfully created the blog");
          navigate(`/blog/${response.data.blog.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await api.patch(
          `http://localhost:3000/blogs/${blogId}`,
          newFormData
        );
        navigate(`/blog/${response.data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/blogs/${blogId}`);
      setUpdatedFormData(response.data);
    };
    fetchData();
  }, [blogId]);

  return (
    <div className="container">
      {/* <!-- Form Input field for creating Blog Post --> */}
      <form
        action=""
        encType="multipart/form-data"
        className="createBlog"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
          <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
            <input
              id="thumbnail"
              type="file"
              name="thumbnail"
              onChange={handleChange}
              {...register("thumbnail", { required: true })}
            />
          </div>
        </div>
        <div className="mb-6">
          <Field error={errors.title}>
            <input
              {...register("title", { required: "Title is Required" })}
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              value={updatedFormData.title}
              placeholder="Enter your blog title"
            />
          </Field>
        </div>

        <div className="mb-6">
          <Field error={errors.tags}>
            <input
              {...register("tags", { required: "Tags is Required" })}
              type="text"
              id="tags"
              onChange={handleChange}
              value={updatedFormData?.tags}
              name="tags"
              placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
            />
          </Field>
        </div>

        <div className="mb-6">
          <Field error={errors.content}>
            <textarea
              {...register("content", { required: "content is Required" })}
              id="content"
              name="content"
              value={updatedFormData?.content}
              onChange={handleChange}
              placeholder="Write your blog content"
              rows="8"
            ></textarea>
          </Field>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          {blogId ? "Update Blog" : "Create Blog"}{" "}
        </button>
      </form>
    </div>
  );
}
