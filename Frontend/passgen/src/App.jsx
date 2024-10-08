import "./App.css";
import Create from "./Component/Create";
import Header from "./Component/Header";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute, { PublicRoute } from "./PrivateComponent/PrivateRoute";
import SavedPass from "./Component/SavedPass";
import { useContext } from "react";
import { ModeContext } from "./Context/Context";
import Loading, { Loading2 } from "./Component/Loading";

function App() {
  const { load, dark } = useContext(ModeContext);

  return (
    <>
      <div className="flex flex-col dark:bg-[#040c1d] bg-white  w-screen xs:px-2 h-screen">
        <Router>
          <Header />
          {load ? (
            dark ? (
              <Loading />
            ) : (
              <Loading2 />
            )
          ) : (
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/saved" element={<SavedPass />}></Route>
              </Route>
              <Route path="/create" element={<Create />} />
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Navigate to="/create" />} />
              </Route>
            </Routes>
          )}
        </Router>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
