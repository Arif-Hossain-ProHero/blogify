import { Navigate, Outlet } from "react-router-dom";
// import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

// import PostProvider from "../providers/PostProvider";
// import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <>
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
