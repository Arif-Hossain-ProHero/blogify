import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../api";
import { useProfile } from "../hooks/useProfile";
import Myblogs from "../components/Myblogs";
import EditIcon from "../assets/icons/edit.svg";
import CheckIcon from "../assets/icons/check.svg";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { auth } = useAuth();
  const { user } = auth;
  const { profile, setProfile } = useProfile();
  const [profileImg, setProfileImg] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [bio, setBio] = useState("Edit Your Bio...");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileUploaderRef = useRef();
  const { profileId } = useParams();

  const handleImgUpload = (e) => {
    e.preventDefault();
    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }
      console.log(formData);
      const response = await api.post(
        `http://localhost:3000/profile/avatar`,
        formData
      );
      if (response.status === 200) {
        // setProfile(response.data.user);
        const data = response.data.user;
        setProfileImg(response.data.user.avatar);
        setProfile({
          ...profile,
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBioEdit = async () => {
    try {
      const response = await api.patch("http://localhost:3000/profile", {
        bio,
      });

      if (response.status === 200) {
        const data = response.data.user;
        setProfile({
          ...profile,
          data,
        });
      }
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await api.get(
        `http://localhost:3000/profile/${profileId}`
      );
      setProfileImg(response.data.avatar);
      setBio(response.data.bio);
      setUserName(response.data.firstName + " " + response.data.lastName);
      setEmail(response.data.email);
      setBlogs(response.data.blogs);
      setLoading(false);
    };
    fetchProfile();
  }, [profileId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* <!-- profile image --> */}
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {/* <!-- User's first name initial --> */}

            {profileImg ? (
              <img
                src={`http://localhost:3000/uploads/avatar/${profileImg}`}
                className="w-full h-full  grid place-items-center rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                <span className="">
                  {" "}
                  {profile?.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {user.id == profileId && (
              <form action="" encType="multipart/form-data">
                <button
                  onClick={handleImgUpload}
                  className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                >
                  <img src={EditIcon} alt="Edit" />
                </button>
                <input id="file" type="file" ref={fileUploaderRef} hidden />
              </form>
            )}
          </div>

          {/* <!-- name , email --> */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {userName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{email}</p>
          </div>

          {/* <!-- bio --> */}
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              {editMode ? (
                <textarea
                  className="p-2 leading-[188%] text-gray-200 lg:text-lg rounded-md bg-zinc-700 border"
                  value={bio}
                  rows={4}
                  cols={55}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
              )}
            </div>
            {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
            <button
              className="flex-center h-7 w-7 rounded-full"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? (
                <img src={CheckIcon} alt="checkIcon" onClick={handleBioEdit} />
              ) : (
                <img src={EditIcon} alt="Edit" />
              )}
            </button>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        {blogs.length > 0 &&
          blogs.map((blog) => <Myblogs key={blog.id} blog={blog} />)}
      </div>
    </main>
  );
}
