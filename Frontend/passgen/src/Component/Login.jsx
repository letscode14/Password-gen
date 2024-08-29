import { useContext, useState } from "react";
import Loading from "./Loading";
import { validateEmail, validatePassword } from "../assets/Utils/utils";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import { errorToast, successToast } from "../Toast/toast";
import { ModeContext } from "../Context/Context";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(ModeContext);

  const [error, setError] = useState({ passError: "", emailError: "" });
  const login = async () => {
    setLoading(true);
    setError(() => ({ passError: "", emailError: "" }));
    if (!data.email && !data.password) {
      setError((prev) => ({
        ...prev,
        passError: "Field is required",
        emailError: "Field is required",
      }));
      return setLoading(false);
    }
    if (!data.email) {
      setError((prev) => ({ ...prev, emailError: "Field is required" }));

      return setLoading(false);
    }
    if (!data.password) {
      setError((prev) => ({ ...prev, passError: "Field is required" }));
      return setLoading(false);
    }
    const isValid = validateEmail(data.email);

    if (!isValid) {
      setError((prev) => ({ ...prev, emailError: "Email not valid" }));
      return setLoading(false);
    }

    const isValidP = validatePassword(data.password);
    if (isValidP !== true) {
      setError((prev) => ({ ...prev, passError: isValidP }));
      return setLoading(false);
    }
    try {
      const response = await axiosInstance.post("/api/login", data);
      if (response.status == 200) {
        setUser(true);
        localStorage.setItem("accesstoken", response.data.token);
        successToast(response.data.message);
        navigate("/create");
      }
    } catch (error) {
      errorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex grow  items-center justify-center ">
      <div className="w-[400px]  border py-16 rounded-lg border-black dark:border-slate-700 shadow-lg px-4">
        <div className="text-center mb-5 text-2xl dark:text-white text-black">
          Login
        </div>
        <form>
          <div className="sm:col-span-3 mb-2">
            <label
              htmlFor="first-name"
              className="block dark:text-white text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                value={data.email}
                type="text"
                autoComplete="given-name"
                className="block w-full 
              dark:bg-[#0d3c5f]
              dark:text-white text-black
              rounded-md  py-1.5
               border border-gray-800"
              />
            </div>
            <label className="text-sm text-red-500 ">
              {error.emailError && error.emailError}
            </label>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block dark:text-white text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                value={data.password}
                type="password"
                autoComplete="given-name"
                className="block w-full 
              dark:bg-[#0d3c5f]
               dark:text-white text-black
              border border-gray-800
              rounded-md  py-1.5"
              />
            </div>
            <label className="text-sm text-red-500 ">
              {" "}
              {error.passError && error.passError}
            </label>
          </div>
        </form>
        <div className="flex justify-center my-3">
          <button
            onClick={login}
            className="min-w-40 min-h-9 flex items-center justify-center uppercase dark:bg-[#1e88d8] bg-[#000000] px-10 py-2 font-semibold rounded-lg text-sm"
          >
            {loading ? <Loading /> : "login"}
          </button>
        </div>
        <div className="text-center dark:text-white text-black">
          Dont have account?{" "}
          <span className="cursor-pointer" onClick={() => navigate("/signup")}>
            Signup
          </span>
        </div>
      </div>
    </div>
  );
}
