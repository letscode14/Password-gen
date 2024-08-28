import "./App.css";
import Create from "./Component/Create";
import Header from "./Component/Header";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import ModeProvider from "./Context/Context";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="flex flex-col dark:bg-[#040c1d] bg-white w-screen h-screen">
        <ModeProvider>
          <Header />
          <Router>
            <Routes>
              <Route path="/create" element={<Create />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </ModeProvider>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
