/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ProfileContext } from "../context";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ProfileProvider = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const { api } = useAxios();
  const [profile, setProfile] = useState(auth || {});

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await api.get(
        `http://localhost:3000/profile/${auth?.user?.id}`
      );
      console.log(response);
      setProfile(response.data);
    };
    fetchProfile();
  }, [auth]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
