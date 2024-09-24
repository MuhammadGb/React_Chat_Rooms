import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./config";
import { Styles } from "../styles/styles";
import { useSelector, useDispatch } from "react-redux";
import Auth from "../components/Auth";
// import Home from "../components/Home";
// import Room from "../components/Room";
const Home = lazy(() => import(`../components/Home`));
const Room = lazy(() => import(`../components/Room`));

const Router = () => {
  const user = useSelector((state) => state.user);
  //console.log(user);
  return (
    <Suspense fallback={null}>
      <Styles />
      {!user.name || !user.id ? (
        <Auth />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      )}
    </Suspense>
  );
};

export default Router;
