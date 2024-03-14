import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import SingleBlog from "./pages/SingleBlog";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import Search from "./pages/Search";
import PrivateRoutes from "./routes/PrivateRoutes";

export default function App() {
  return (
    <div className="bg-[#030317] text-white min-h-screen	">
      <Header />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Profile />} path="/profile" />
          <Route element={<Profile />} path="/profile/:profileId" />
          <Route element={<CreateBlog />} path="/createBlog" />
          <Route element={<CreateBlog />} path="/updateBlog/:blogId" />
          <Route element={<SingleBlog />} path="/blog/:blogId" />
          <Route element={<Search />} path="/search" />
        </Route>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Registration />} path="/register" />
      </Routes>
      <Footer />
    </div>
  );
}
